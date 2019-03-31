const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const cmd = require('node-cmd')

var questions = [
  {
    type: 'input',
    name: 'summary',
    message: "Write a short changes summary: use imperative grammar like 'fix', 'change'\n >>",
    validate: function (value) {
      if (value.length <= 0 || value.length > 50) {
        return 'Please enter a commit summary of valid length'
      } else {
        return true
      }
    }
  },
  {
    type: 'list',
    name: 'commit_type',
    message: "Commit type",
    choices: ['feature', 'fix', 'docs', 'style', 'refactor', 'performance', 'test', 'build', 'revert']
  },
  {
    type: 'input',
    name: 'affected',
    message: "Which part of the app does this affect? (e.g. files, functionalities) \n >>"
  }
]

class BommitCommand extends Command {
  async run() {
    const {flags} = this.parse(BommitCommand)
    inquirer
      .prompt(questions)
      .then(answers => {
        var commit =`${answers.commit_type}(${answers.affected}) ${answers.summary}`;
        if(flags.all) {
          this.log(`${commit} all`)
        } else {
          this.log(`${commit}`)
        }
      })
  }
}

BommitCommand.description = `Standardize your git commits!

Run bommit to write your commits in a structured way. Commits tracked files unless run with -a flag, which adds and commits all files.
`

BommitCommand.flags = {
  help: flags.help({char: 'h'}),
  version: flags.version({char: 'v'}),
  all: flags.boolean({char: 'a', default: false, description: 'add and commit all files'}),
}

module.exports = BommitCommand
