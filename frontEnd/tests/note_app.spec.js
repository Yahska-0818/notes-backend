import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, learning full stack with FSO')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('mluukkai')
    await textboxes[1].fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('mluukkai logged in')).toBeVisible()
  })
  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
})
