import mongoose from "mongoose";

const OderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },

    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number , required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: Date , required: true },
    isProcessing: { type: Boolean, required: true },
},{timeseries: true});
 
const Order = mongoose.models.Order || mongoose.model('Order', OderSchema);

export default Order;