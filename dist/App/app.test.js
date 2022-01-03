"use strict";

var _path = _interopRequireDefault(require("path"));

var _ = _interopRequireDefault(require("."));

var _readfile = _interopRequireDefault(require("../utils/readfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Sample results', () => {
  test('sample-1', async () => {
    const result = [0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0];

    const jsonPath = _path.default.resolve('sample/1.json');

    const fileData = await (0, _readfile.default)(jsonPath);
    const commissions = (0, _.default)(fileData);
    const isSame = commissions.length === result.length && commissions.every((value, index) => {
      return value === result[index];
    });
    expect(isSame).toBeTruthy();
  });
});