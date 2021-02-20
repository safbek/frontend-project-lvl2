#!/usr/bin/env node

// import program from 'commander';
import { Command } from 'commander/esm.mjs';

import genDiff from '../../index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.opts())));

program.parse(process.argv);
