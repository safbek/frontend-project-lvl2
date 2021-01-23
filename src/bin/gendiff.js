#!/usr/bin/env node

import program from 'commander';
import genDiff from '../../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f --format [type]')
  .arguments('<filepath1> <filepath2> [formatName]')
  .action((filepath1, filepath2, formatName = 'stylish') => {
    genDiff(filepath1, filepath2, formatName);
  });

program.parse(process.argv);
