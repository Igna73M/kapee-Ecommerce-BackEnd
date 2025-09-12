import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    userId: string;
    items: IOrderItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
    userId: { type: String, required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
