"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });
exports.ServiceModel = (0, mongoose_1.model)('Service', ServiceSchema);
