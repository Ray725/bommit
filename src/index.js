const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'summary',
    message: "Short changes summary: use imperative grammar like 'fix' vs. 'fixed'\n\n >>",
    validate: function (value) {
      if (value.length <= 0 || value.length > 50) {
        return 'Please enter a valid commit summary'
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
  }
]

class BommitCommand extends Command {
  async run() {
    const {flags} = this.parse(BommitCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.js`)
    inquirer.prompt(questions).then(answers => {
        this.log(JSON.stringify(answers, null, '  '))
      })
  }
}


BommitCommand.description = `Describe the command here
...
Extra documentation goes here
`

BommitCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = BommitCommand
