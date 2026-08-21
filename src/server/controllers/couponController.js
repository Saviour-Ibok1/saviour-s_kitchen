import Coupon from "../models/Coupon.js";

export async function getCouponByCode(req, res) {
  try {
    const { code } = req.params;

    if (!code?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required.",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive coupon code.",
      });
    }

    if (
      coupon.expiresAt &&
      coupon.expiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "This coupon has expired.",
      });
    }

    res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minimumOrder: coupon.minimumOrder,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to validate coupon.",
    });
  }
}