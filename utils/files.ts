import fs from 'node:fs';

export const getInput = (url: string, fileName = 'input.txt') =>
  fs.readFileSync(new URL(fileName, url), { encoding: 'utf-8' }).trim();
