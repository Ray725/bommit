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
    message: "Which part of the app does this affect? \n >>"
  }
]

class BommitCommand extends Command {
  async run() {
    const {flags} = this.parse(BommitCommand)
    inquirer
      .prompt(questions)
      .then(answers => {
        var commit =`${answers.commit_type}(${answers.affected}) ${answers.summary}`;
        this.log(commit)
      })
  }
}

/*
const all = flags.build({
  char: 'a',
  description: 'add all flags and build',
})
*/

BommitCommand.description = `Standardize your git commits!
Intended use is running after staging desired files.
`

BommitCommand.flags = {
  help: flags.help({char: 'h'}),
  version: flags.version({char: 'v'}),
  all: flags.boolean({char: 'a', default: false}),
}

module.exports = BommitCommand
