import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    address: {
      type: String, 
      required: true, 
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
