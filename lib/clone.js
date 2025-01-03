const ora = require('ora')
const chalk = require('chalk')
const gitClone = require('git-clone/promise')

const clone = async function (repo, dir, opotions = {}) {
  const process = ora(`Start download ${chalk.blue(repo)}`)
  process.start()
  process.color = 'yellow'
  process.text = `Downloading..... ${chalk.yellow(repo)} `

  try {
    await gitClone(repo, dir, opotions)
    process.color = 'green'
    process.text = `Download successful ${chalk.green(repo)} `
    process.succeed()
  } catch (error) {
    console.log(error)
    process.color = 'red'
    process.text = 'Download failed'
    process.fail()
  }
}

module.exports = clone
