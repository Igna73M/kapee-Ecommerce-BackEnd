import { Request, Response } from 'express';
import { BannerModel } from '../models/banner';
import cloudinary from '../utils/cloudhandle';
import fs from 'fs';

export const getBanners = async (req: Request, res: Response) => {
    try {
        const banners = await BannerModel.find();
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getBannerById = async (req: Request, res: Response) => {
    try {
        const banner = await BannerModel.findById(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createBanner = async (req: Request, res: Response) => {
    try {
        let imageUrl = req.body.image;

        // Upload image to Cloudinary if file is present
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'banner',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const { title, subtitle, discount, buttonText } = req.body;

        const banner = new BannerModel({
            title,
            subtitle,
            discount,
            image: imageUrl,
            buttonText
        });

        await banner.save();
        res.status(201).json(banner);
    } catch (err: any) {
        console.error('Error creating banner:', err);
        res.status(400).json({ message: 'Error creating banner', error: err.message || err.toString() || err });
    }
};

export const updateBanner = async (req: Request, res: Response) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'banner',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const banner = await BannerModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    } catch (err: any) {
        console.error('Error updating banner:', err);
        res.status(400).json({ message: 'Error updating banner', error: err.message || err.toString() || err });
    }
};

export const deleteBanner = async (req: Request, res: Response) => {
    try {
        const banner = await BannerModel.findByIdAndDelete(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting banner', error: err });
    }
};