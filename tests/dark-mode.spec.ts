import { expect, test } from '@playwright/test'

test('dark-mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })

  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'svelte-dark-theme' })
  ).toBeVisible()

  await expect(page.getByText('Theme: light')).not.toBeVisible()
  await expect(page.getByText('Theme: dark')).toBeVisible()
  await expect(page.getByText('Setting: light')).not.toBeVisible()
  await expect(page.getByText('Setting: dark')).not.toBeVisible()
  await expect(page.getByText('Setting: sync')).toBeVisible()

  expect(await page.locator('body').getAttribute('class')).toContain('dark')

  await page.getByLabel('Light').click()

  await expect(page.getByText('Theme: light')).toBeVisible()
  await expect(page.getByText('Theme: dark')).not.toBeVisible()
  await expect(page.getByText('Setting: light')).toBeVisible()
  await expect(page.getByText('Setting: dark')).not.toBeVisible()
  await expect(page.getByText('Setting: sync')).not.toBeVisible()

  expect(await page.locator('body').getAttribute('class')).toContain('light')

  await page.getByLabel('Dark').click()

  await expect(page.getByText('Theme: light')).not.toBeVisible()
  await expect(page.getByText('Theme: Dark')).toBeVisible()
  await expect(page.getByText('Setting: light')).not.toBeVisible()
  await expect(page.getByText('Setting: dark')).toBeVisible()
  await expect(page.getByText('Setting: sync')).not.toBeVisible()

  expect(await page.locator('body').getAttribute('class')).toContain('dark')

  await page.getByLabel('Sync').click()

  await expect(page.getByText('Theme: light')).not.toBeVisible()
  await expect(page.getByText('Theme: Dark')).toBeVisible()
  await expect(page.getByText('Setting: light')).not.toBeVisible()
  await expect(page.getByText('Setting: dark')).not.toBeVisible()
  await expect(page.getByText('Setting: sync')).toBeVisible()

  expect(await page.locator('body').getAttribute('class')).toContain('dark')
})
