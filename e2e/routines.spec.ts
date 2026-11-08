import { test, expect } from '@playwright/test'

test('ve la lista de rutinas', async ({ page }) => {
    await page.goto('/routines')
    await expect(page.getByRole('heading', { name: 'Gestión de Rutinas' })).toBeVisible()
})
