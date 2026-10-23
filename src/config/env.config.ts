import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

type Env = 'dev'

const ENV = (process.env.TEST_ENV as Env) || 'dev'

const config = {
  dev: {
    baseUrl: 'https://dev.appmod.ai/mode/Enterprise%20Automation%20Composer?actionText=update',
    loginUrl: 'https://dev.appmod.ai/login',
    storageState: 'storage/dev.appmod.cookies.json',
  },
}

export const env = {
  ...config[ENV],
  headless: process.env.HEADLESS === 'true',
}

if (!env.baseUrl) {
  throw new Error(`BASE_URL is missing for environment: ${ENV}`)
}

if (!env.loginUrl) {
  throw new Error(`LOGIN_URL is missing for environment: ${ENV}`)
}

if (!fs.existsSync(env.storageState)) {
  console.warn(
    `Storage state not found for ${ENV}: ${env.storageState}`
  )
  console.warn('Run the authentication setup first.')
}
