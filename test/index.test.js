const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('bommit', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('asks for imperative grammar', ctx => {
    expect(ctx.stdout).to.contain('imperative grammar')
  })

  test
  .stdout()
  .do(() => cmd.run([]))
  .it('asks for imperative grammar', ctx => {
    expect(ctx.stdout).to.contain('imperative grammar')
  })

  /*
  test
  .stdout()
  .do(() => cmd.run(['--name', 'jeff']))
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
  */
})
