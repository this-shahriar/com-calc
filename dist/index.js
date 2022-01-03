"use strict";

var _path = _interopRequireDefault(require("path"));

var _App = _interopRequireDefault(require("./App"));

var _readfile = _interopRequireDefault(require("./utils/readfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//start of the application and waiting for input
let pathToJson = '';
process.stdin.on('data', async inputStdin => {
  pathToJson += inputStdin;

  const jsonPath = _path.default.resolve(pathToJson);

  const fileData = await (0, _readfile.default)(jsonPath);
  (0, _App.default)(fileData);
});