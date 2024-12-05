export const NUMBER_REGEXP = /(\d+)/g;

export const extractNumbers = (str: string) =>
  str.matchAll(NUMBER_REGEXP).map(([number]) => +number);
