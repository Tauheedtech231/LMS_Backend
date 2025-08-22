"use server";

import { sendEmail } from "@/lib/email";

export async function confirmPayment(studentName: string, studentEmail: string, total: number) {
  // 1. Email to student
  await sendEmail(
    studentEmail,
    "Payment Confirmation",
    `<p>Hi ${studentName},</p>
     <p>We received your payment request for <strong>$${total}</strong>.</p>
     <p>Your order is pending admin verification.</p>`
  );

  // 2. Email to admin
  await sendEmail(
    process.env.ADMIN_EMAIL as string,
    "New Manual Payment Submitted",
    `<p>Student <strong>${studentName}</strong> submitted manual payment.</p>
     <p>Amount: <strong>$${total}</strong></p>
     <p>Please verify this payment.</p>`
  );

  return { success: true };
}
