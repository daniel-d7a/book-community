"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fireBaseConfig_1 = require("../../fireBaseConfig");
const firestore_1 = require("firebase/firestore");
// TODO: add try catches to catch errors
exports.db = (0, firestore_1.getFirestore)(fireBaseConfig_1.app);
// users collection
// comments collection
// replies collection
