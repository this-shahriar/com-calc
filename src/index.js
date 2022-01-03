import path from 'path';
import main from './App';
import readFileFromInput from './utils/readfile';

//start of the application and waiting for input
let pathToJson = '';
process.stdin.on('data', async (inputStdin) => {
  pathToJson += inputStdin;
  const jsonPath = path.resolve(pathToJson);
  const fileData = await readFileFromInput(jsonPath);
  main(fileData);
});
