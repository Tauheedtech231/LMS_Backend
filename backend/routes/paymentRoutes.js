import express from "express";
import {  getPayments, updatePaymentStatusByStudent } from "../controllers/paymentController.js";


const router = express.Router();

// GET all payments
router.get("/", getPayments);

// GET single payment
router.put("/:id", updatePaymentStatusByStudent);

export default router;
