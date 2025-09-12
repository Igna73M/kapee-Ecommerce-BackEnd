import { Schema, model, Document, Types } from 'mongoose';

export interface CartItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface Cart {
    id: number;
    userId: string;
    items: CartItem[];
    total: number;
}

export interface CartDocument extends Document {
    userId: string;
    items: CartItem[];
    total: number;
}

const CartItemSchema = new Schema<CartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const CartSchema = new Schema<CartDocument>({
    userId: { type: String, required: true },
    items: { type: [CartItemSchema], required: true },
    total: { type: Number, required: true },
}, { timestamps: true });

export const CartModel = model<CartDocument>('Cart', CartSchema);
