const path = require('path')
const fs = require('fs').promises

const chalk = require('chalk')
const Prompt = require('inquirer')

const clone = require('./clone')

const remote = 'https://github.com/FellouAI/eko-browser-extension.git'

const initQuestions = name => [
  {
    type: 'confirm',
    name: 'isInit',
    message: `Are you sure you want to create a project under the ${chalk.green(name)} folder?`,
    prefix: '?'
  }
]

const init = async name => {
  try {
    const { isInit } = await Prompt.prompt(initQuestions(name))
    if (isInit) {
      await clone(remote, name)
      const gitDir = path.join(name, '.git')
      await fs.rm(gitDir, { recursive: true, force: true })
    } else {
      console.log(chalk.red('exit'))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = init
