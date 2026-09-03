import { WordItem } from '../../types';
import { a1_part1 } from './a1_1';
import { a1_part2 } from './a1_2';
import { a1_part3 } from './a1_3';
import { a1_part4 } from './a1_4';

export const OXFORD_EXTENDED_A1: Omit<WordItem, 'id'>[] = [
  ...a1_part1,
  ...a1_part2,
  ...a1_part3,
  ...a1_part4,
];
