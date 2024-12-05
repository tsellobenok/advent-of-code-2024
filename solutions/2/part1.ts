import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { isSafe } from './utils';

export const getAnswer = () =>
  getInput(import.meta.url)
    .split(EOL)
    .reduce((acc, line) => acc + +isSafe(line.split(' ').map(val => +val)), 0);
