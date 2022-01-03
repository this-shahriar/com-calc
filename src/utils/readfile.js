import fs from 'fs/promises';

const readFileFromInput = async (pathname) => {
  const file = await fs.readFile(pathname.trim(), { encoding: 'utf-8' });
  return file;
};

export default readFileFromInput;
