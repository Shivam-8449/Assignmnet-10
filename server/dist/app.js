"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route"));
const app = express_1.default();
const port = 5000;
let corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use('/', route_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
