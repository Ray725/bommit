const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('bommit', () => {

  test
  .stdout()
  .do(() => cmd.run([]))
  .it('runs', ctx => {
    expect(ctx.stdout).to.contain('imperative grammar')
  })

})
