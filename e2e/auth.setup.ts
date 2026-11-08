import { test as setup, expect } from '@playwright/test'

setup('autenticar', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('tu@correo.com').fill('ana@icesi.edu.co')
    await page.getByPlaceholder('********').fill('123456')
    await page.getByRole('button', { name: 'Iniciar sesión' }).click()
    await expect(page).toHaveURL('/routines')
    await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
