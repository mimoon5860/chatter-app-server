"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class sanitizers {
}
sanitizers.toObjectId = value => {
    return new mongodb_1.ObjectId(value);
};
exports.default = sanitizers;
//# sourceMappingURL=sanitizers.js.map