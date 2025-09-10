import { Request, Response } from 'express';
import { ServiceModel } from '../models/service';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await ServiceModel.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getServiceByTitle = async (req: Request, res: Response) => {
    try {
        const service = await ServiceModel.findOne({ title: req.params.title });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const service = new ServiceModel(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ message: 'Error creating service', error: err });
    }
};

export const updateService = async (req: Request, res: Response) => {
    try {
        const service = await ServiceModel.findOneAndUpdate({ title: req.params.title }, req.body, { new: true });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(400).json({ message: 'Error updating service', error: err });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    try {
        const service = await ServiceModel.findOneAndDelete({ title: req.params.title });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting service', error: err });
    }
};
