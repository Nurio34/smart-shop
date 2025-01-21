"use server";

import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Create a Nodemailer transporter using an SMTP server (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use any other service like SendGrid or Mailgun
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password (or app-specific password)
  },
});

// Server action function to send the order confirmation email
export async function conformationMailAfterOrder(orderId: string) {
  try {
    // Retrieve the order from the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true, // Get the user information to send the email
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Destructure user and order details
    const { user } = order;
    const { name, email } = user;
    const itemsList = order.items
      .map(
        (item) =>
          `- ${item.product.title} (Quantity: ${item.quantity}) - $${item.price} each`
      )
      .join("\n");

    const totalAmount = order.totalAmount.toFixed(2);

    // Compose the email message
    const mailOptions = {
      from: "your-email@example.com", // Your email address
      to: email, // The recipient's email
      subject: `Order Confirmation - Order #${order.id}`,
      text: `Dear ${name},

Thank you for your purchase! Your order #${order.id} has been confirmed.

Items ordered:
${itemsList}

Total Amount: $${totalAmount}

Your order will be shipped soon!

Best regards,
Smart Shop Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}
