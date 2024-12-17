const chalk = require('chalk')
const Prompt = require('inquirer')

const clone = require('./clone')

const remote = 'github:FellouAI/eko-chromium-extension#main'

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
    } else {
      console.log(chalk.red('exit'))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = init
