import mongoose, { Schema, Document } from "mongoose";

export interface IWishlistItem {
    product: mongoose.Types.ObjectId;
    addedAt?: Date;
}

export interface IWishlist extends Document {
    userId: mongoose.Types.ObjectId;
    items: IWishlistItem[];
}

const WishlistItemSchema = new Schema<IWishlistItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    addedAt: { type: Date, default: Date.now }
});

const WishlistSchema = new Schema<IWishlist>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [WishlistItemSchema]
}, { timestamps: true });

const WishlistModel = mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default WishlistModel;