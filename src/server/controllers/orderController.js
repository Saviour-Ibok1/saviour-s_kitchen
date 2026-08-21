import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  try {
    const {
      items,
      deliveryDetails,
      coupon,
    } = req.body;

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order must contain at least one item.",
      });
    }

    if (!deliveryDetails) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery details are required.",
      });
    }

    const {
      fullName,
      phone,
      address,
      city,
      state,
      deliveryNote,
    } = deliveryDetails;

    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Complete delivery information is required.",
      });
    }

    const productIds = items
      .map((item) => item.product)
      .filter(Boolean);

    const objectIds = productIds.filter(
      (id) => mongoose.isValidObjectId(id)
    );

    const slugs = productIds.filter(
      (id) => !mongoose.isValidObjectId(id)
    );

    const productQuery = {
      available: true,
      $or: [],
    };

    if (objectIds.length > 0) {
      productQuery.$or.push({
        _id: {
          $in: objectIds,
        },
      });
    }

    if (slugs.length > 0) {
      productQuery.$or.push({
        slug: {
          $in: slugs,
        },
      });
    }

    if (productQuery.$or.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid product identifiers.",
      });
    }

    const products = await Product.find(
      productQuery
    );

    if (products.length !== items.length) {
      return res.status(400).json({
        success: false,
        message:
          "One or more selected products are unavailable.",
      });
    }

    const orderItems = items.map((item) => {
      const product = products.find(
        (currentProduct) =>
          currentProduct._id.toString() ===
            item.product ||
          currentProduct.slug === item.product
      );

      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return null;
      }

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image || "",
      };
    });

    if (orderItems.some((item) => !item)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order item.",
      });
    }

    const subtotal = orderItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

    const deliveryFee = 0;
    const discount = 0;
    const tax = 0;

    const total =
      subtotal +
      deliveryFee +
      tax -
      discount;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryDetails: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        deliveryNote:
          deliveryNote?.trim() || "",
      },
      subtotal,
      deliveryFee,
      discount,
      tax,
      total,
      couponCode:
        coupon?.trim() || "",
    });

    res.status(201).json({
      success: true,
      message:
        "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve orders.",
    });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Get order error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve order.",
    });
  }
}
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find({})
      .populate("user", "name email phone")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Get all orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve all orders.",
    });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update order status.",
    });
  }
}