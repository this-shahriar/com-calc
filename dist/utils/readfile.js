"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFileFromInput = async pathname => {
  const file = await _promises.default.readFile(pathname.trim(), {
    encoding: 'utf-8'
  });
  return file;
};

var _default = readFileFromInput;
exports.default = _default;