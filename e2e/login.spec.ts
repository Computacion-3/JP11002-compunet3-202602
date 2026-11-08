import { test, expect } from '@playwright/test'

test.use({ storageState: { cookies: [], origins: [] } }) // empezar sin sesión

test('muestra un error con credenciales incorrectas', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('tu@correo.com').fill('ana@icesi.edu.co')
    await page.getByPlaceholder('********').fill('incorrecta')
    await page.getByRole('button', { name: 'Iniciar sesión' }).click()
    await expect(page.getByText('Credenciales inválidas')).toBeVisible()
    await expect(page).toHaveURL('/login')
})

test('redirige a /login si no hay sesión', async ({ page }) => {
    await page.goto('/routines')
    await expect(page).toHaveURL('/login')
})

test('la cookie de sesión es httpOnly', async ({ page, context }) => {
    await page.goto('/login')
    await page.getByPlaceholder('tu@correo.com').fill('ana@icesi.edu.co')
    await page.getByPlaceholder('********').fill('123456')
    await page.getByRole('button', { name: 'Iniciar sesión' }).click()
    await expect(page).toHaveURL('/routines')
    const session = (await context.cookies()).find((c) => c.name === 'session')
    expect(session?.httpOnly).toBe(true)
})
