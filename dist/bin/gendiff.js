#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _gendiffCli = _interopRequireDefault(require("../gendiff-cli/gendiff-cli.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.description('Compares two configuration files and shows a difference.').version('0.0.1').option('-f --format [type]').arguments('<filepath1> <filepath2>').action((filepath1, filepath2) => {
  (0, _gendiffCli.default)(filepath1, filepath2);
});

_commander.default.parse(process.argv);