"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _App = _interopRequireDefault(require("../App"));

var _readfile = _interopRequireDefault(require("./readfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readInput = () => {
  let pathToJson = '';
  process.stdin.on('data', async inputStdin => {
    pathToJson += inputStdin;

    const jsonPath = _path.default.resolve(pathToJson);

    const fileData = await (0, _readfile.default)(jsonPath);
    (0, _App.default)(fileData);
  });
};

var _default = readInput;
exports.default = _default;