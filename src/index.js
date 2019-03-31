const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const cmd = require('node-cmd')
const git = require('simple-git')

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
        let commit_msg =`${answers.commit_type}(${answers.affected}) ${answers.summary}`;

        if(flags.all) {
          git().add('./*')
            .exec(() => git_commit(commit_msg))
        } else {
          git().status((err, s) => {
            if (err)
              throw err

            git_add(s.not_added)
            git_add(s.conflicted)
            git_add(s.created)
            git_add(s.deleted)
            git_add(s.modified)
            git_add(s.renamed)
          })
            .exec(() => git_commit(commit_msg))
        }

      })
  }
}

function git_add(array) {
  for(var i = 0; i < array.length; i++) {
    git().add(array[i])
  }
}

function git_commit(commit_msg) {
  git().commit(commit_msg)
    .exec(() => console.log(`COMMIT SUCCESS: ${commit_msg}`))
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
