bommit
======

Write better git commits

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bommit.svg)](https://npmjs.org/package/bommit)
[![Downloads/week](https://img.shields.io/npm/dw/bommit.svg)](https://npmjs.org/package/bommit)

# Rationale
Standardizing git commits is difficult. It will be easier to write informative commits with a command-line tool that formats commit messages.

## Commit Style 
`commit_type(affected_part): Summary here`

`commit_type` is selected from one of `['feature', 'fix', 'docs', 'style', 'refactor', 'performance', 'test', 'build', 'revert']`.

`affected_part` is free text input; usually, it refers either to which core functionality it affects or which file it mainly impacts.

`Summary` is free text input; `bommit` enforces that it be concise.

In possible future versions, we may include different options for commit style.

# Installation
Run `npm i -g bommit`

# Usage
Stage all your files and run `bommit`. The equivalent command would be running `git commit -am`.

Alternatively, run `bommit -a`. The equivalent series commands would be `git add -A` then `git commit -am`.
