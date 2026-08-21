import "dotenv/config";

import { connectDatabase } from "../config/database.js";
import Coupon from "../models/Coupon.js";

const coupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimumOrder: 5000,
    active: true,
  },
  {
    code: "SAVE1000",
    type: "fixed",
    value: 1000,
    minimumOrder: 10000,
    active: true,
  },
  {
    code: "FREEDELIVERY",
    type: "free_delivery",
    value: 0,
    minimumOrder: 5000,
    active: true,
  },
];

async function seedCoupons() {
  try {
    await connectDatabase();

    await Coupon.deleteMany({});

    await Coupon.insertMany(coupons);

    console.log(
      "Coupons seeded successfully."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Failed to seed coupons.",
      error
    );

    process.exit(1);
  }
}

seedCoupons();