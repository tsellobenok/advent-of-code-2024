import type { Register } from './types.ts';

const COMBO_OPERANDS: Record<string, number | Register | null> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 'A',
  5: 'B',
  6: 'C',
  7: null,
};

export const getOutput = (registers: Record<Register, number>, program: string[]) => {
  const output: number[] = []

  for (let i = 0; i < program.length; i += 2) {
    const instruction = program[i];
    const operand = program[i + 1];

    let comboValue = 0;
    let literalValue = Number(operand);

    if (typeof COMBO_OPERANDS[operand] === 'number') {
      comboValue = COMBO_OPERANDS[operand];
    } else if (typeof COMBO_OPERANDS[operand] === 'string') {
      comboValue = registers[COMBO_OPERANDS[operand]];
    }

    switch (instruction) {
      case '0':
        registers.A = Math.floor(registers.A / Math.pow(2, comboValue))
        break;
      case '1':
        registers.B = registers.B ^ literalValue;
        break;
      case '2':
        registers.B = comboValue % 8;
        break;
      case '3':
        if (registers.A !== 0) {
          i = literalValue - 2;
        }
        break;
      case '4':
        registers.B = registers.B ^ registers.C;
        break;
      case '5':
        output.push(comboValue % 8);
        break;
      case '6':
        registers.B = Math.floor(registers.A / Math.pow(2, comboValue))
        break;
      case '7':
        registers.C = Math.floor(registers.A / Math.pow(2, comboValue))
        break;
    }
  }

  return output.join(',');
};
