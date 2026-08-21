import Product from "../models/Product.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
}

export async function getFeaturedProducts(req, res) {
  try {
    const products = await Product.find({
      featured: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products.",
    });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Invalid product ID.",
    });
  }
}

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product.",
      error: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product.",
      error: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
}