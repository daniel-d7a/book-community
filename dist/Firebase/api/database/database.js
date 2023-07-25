"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = void 0;
const fireBaseConfig_1 = require("../../fireBaseConfig");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
// TODO: add try catches to catch errors
exports.db = (0, firestore_1.getFirestore)(fireBaseConfig_1.app);
exports.storage = (0, storage_1.getStorage)(fireBaseConfig_1.app);
