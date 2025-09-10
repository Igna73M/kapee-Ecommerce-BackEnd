import { Request, Response } from 'express';
import { BannerModel } from '../models/banner';

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
        const banner = new BannerModel(req.body);
        await banner.save();
        res.status(201).json(banner);
    } catch (err) {
        res.status(400).json({ message: 'Error creating banner', error: err });
    }
};

export const updateBanner = async (req: Request, res: Response) => {
    try {
        const banner = await BannerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    } catch (err) {
        res.status(400).json({ message: 'Error updating banner', error: err });
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
