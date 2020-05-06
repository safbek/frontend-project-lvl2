#!/usr/bin/env node

import program from 'commander';
import genDiff from '../gendiff-cli/gendiff-cli.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f --format [type]')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });

program.parse(process.argv);
