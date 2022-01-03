import path from 'path';
import main from '.';
import readFileFromInput from '../utils/readfile';

describe('Sample results', () => {
  test('sample-1', async () => {
    const result = [0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0];
    const jsonPath = path.resolve('sample/1.json');
    const fileData = await readFileFromInput(jsonPath);
    const commissions = main(fileData);
    const isSame =
      commissions.length === result.length &&
      commissions.every((value, index) => {
        return value === result[index];
      });

    expect(isSame).toBeTruthy();
  });
});
