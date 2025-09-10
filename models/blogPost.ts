import { Schema, model, Document } from 'mongoose';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

export interface BlogPostDocument extends Document {
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

const BlogPostSchema = new Schema<BlogPostDocument>({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export const BlogPostModel = model<BlogPostDocument>('BlogPost', BlogPostSchema);
