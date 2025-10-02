"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.createService = exports.getServiceById = exports.getServices = void 0;
const service_1 = require("../models/service");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield service_1.ServiceModel.find();
        res.json(services);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getServices = getServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield service_1.ServiceModel.findById(req.params.id);
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getServiceById = getServiceById;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = new service_1.ServiceModel(req.body);
        yield service.save();
        res.status(201).json(service);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating service', error: err });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield service_1.ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating service', error: err });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield service_1.ServiceModel.findByIdAndDelete(req.params.id);
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting service', error: err });
    }
});
exports.deleteService = deleteService;
