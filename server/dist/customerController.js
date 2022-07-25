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
const databaseConnection_1 = require("./databaseConnection");
class CustomerController {
    getCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            databaseConnection_1.pool.query('SELECT name,id from customer ORDER BY id ASC', (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).json(result.rows);
                }
            });
        });
    }
    getCustomerIdByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerName = req.params.name;
            databaseConnection_1.pool.query('SELECT id FROM customer WHERE name = $1', [customerName], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send(result.rows);
                }
            });
        });
    }
}
exports.customerController = new CustomerController();
