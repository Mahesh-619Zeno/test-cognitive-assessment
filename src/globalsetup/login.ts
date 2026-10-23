import { chromium } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { env } from '../config/env.config'

;(async () => {
  const browser = await chromium.launch({
    headless: env.headless,
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  console.log(`Opening login page: ${env.loginUrl}`)

  await page.goto(env.loginUrl)

  console.log('Complete Google login in the browser.')

  await page.waitForURL('**/mode/**', {
    timeout: 120000,
  })

  const storagePath = path.resolve(env.storageState)

  const storageDirectory = path.dirname(storagePath)

  if (!fs.existsSync(storageDirectory)) {
    fs.mkdirSync(storageDirectory, {
      recursive: true,
    })
  }

  await context.storageState({
    path: storagePath,
  })

  console.log(`Authentication state saved to: ${storagePath}`)

  await browser.close()
})()
