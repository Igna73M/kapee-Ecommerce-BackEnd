import { Request, Response } from 'express';
import { HeroSlideModel } from '../models/heroSlide';
import cloudinary from '../utils/cloudhandle';
import fs from 'fs';

export const getHeroSlides = async (req: Request, res: Response) => {
    try {
        const heroSlides = await HeroSlideModel.find();
        res.json(heroSlides);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getHeroSlideById = async (req: Request, res: Response) => {
    try {
        const slide = await HeroSlideModel.findById(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createHeroSlide = async (req: Request, res: Response) => {
    try {
        let imageUrl = req.body.image;

        // Upload image to Cloudinary if file is present
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'heroslide',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const { title, subtitle, highlight, discount, buttonText } = req.body;

        const heroSlide = new HeroSlideModel({
            title,
            subtitle,
            highlight,
            discount,
            image: imageUrl,
            buttonText
        });

        await heroSlide.save();
        res.status(201).json(heroSlide);
    } catch (err: any) {
        console.error('Error creating hero slide:', err);
        res.status(400).json({ message: 'Error creating hero slide', error: err.message || err.toString() || err });
    }
};

export const updateHeroSlide = async (req: Request, res: Response) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'heroslide',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const heroSlide = await HeroSlideModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!heroSlide) return res.status(404).json({ message: 'Hero slide not found' });
        res.json(heroSlide);
    } catch (err: any) {
        console.error('Error updating hero slide:', err);
        res.status(400).json({ message: 'Error updating hero slide', error: err.message || err.toString() || err });
    }
};

export const deleteHeroSlide = async (req: Request, res: Response) => {
    try {
        const slide = await HeroSlideModel.findByIdAndDelete(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting hero slide', error: err });
    }
};