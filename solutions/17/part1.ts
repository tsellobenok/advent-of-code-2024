import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getOutput } from './utils.ts';

import type { Register } from './types.ts';

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const [registersStr, programStr] = input.split(EOL + EOL);
  const [A, B, C] = registersStr.split(EOL).map(r => Number(r.split(': ')[1]));
  const program = programStr.split(': ')[1].split(',');
  const registers: Record<Register, number> = {
    A,
    B,
    C,
  };

  return getOutput(registers, program);
};
