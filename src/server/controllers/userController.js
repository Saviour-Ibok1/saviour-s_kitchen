import User from "../models/User.js";

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user.",
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const {
      name,
      phone,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.name = name.trim();
    user.phone = phone?.trim() || "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
}