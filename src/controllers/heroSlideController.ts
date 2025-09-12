import { Request, Response } from 'express';
import { HeroSlideModel } from '../models/heroSlide';

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
        const slide = new HeroSlideModel(req.body);
        await slide.save();
        res.status(201).json(slide);
    } catch (err) {
        res.status(400).json({ message: 'Error creating hero slide', error: err });
    }
};

export const updateHeroSlide = async (req: Request, res: Response) => {
    try {
        const slide = await HeroSlideModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    } catch (err) {
        res.status(400).json({ message: 'Error updating hero slide', error: err });
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
