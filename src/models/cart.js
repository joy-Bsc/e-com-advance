import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    createdAt: Date,
    updatedAt: Date,
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;