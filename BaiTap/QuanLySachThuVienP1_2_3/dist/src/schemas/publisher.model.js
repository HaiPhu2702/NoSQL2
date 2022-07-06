"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const publisherSchema = new mongoose_1.default.Schema({
    name: String
});
const Publisher = mongoose_1.default.model('Publisher', publisherSchema);
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.model.js.map