import express from "express";

import {
  getCouponByCode,
} from "../controllers/couponController.js";

const router = express.Router();

router.get(
  "/:code",
  getCouponByCode
);

export default router;