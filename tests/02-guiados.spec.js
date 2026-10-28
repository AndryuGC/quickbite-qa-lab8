const { test, expect } = require('@playwright/test');

test('R01 - Rechaza credenciales incorrectas', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user').fill('usuario.falso');
  await page.locator('#password').fill('clave-incorrecta');
  await page.locator('#login').click();
  await expect(page.locator('#login-result')).toHaveText('Credenciales incorrectas');
});

test('R02 - Filtra productos por búsqueda', async ({ page }) => {
  await page.goto('/');
  await page.locator('#search').fill('Pizza');
  await expect(page.locator('#products button[data-product="Pizza"]')).toBeVisible();
  await expect(page.locator('#products button[data-product="Tacos"]')).toHaveCount(0);
  await expect(page.locator('#products button.add')).toHaveCount(1);
});

test('R03 - Actualiza contador del carrito', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cart-count')).toHaveText('0');
  await page.locator('#products button[data-product="Hamburguesa"]').click();
  await page.locator('#products button[data-product="Pizza"]').click();
  await expect(page.locator('#cart-count')).toHaveText('2');
});

test('R04 - Impide pedido sin productos', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cart-count')).toHaveText('0');
  await page.locator('#checkout').click();
  await expect(page.locator('#message')).toHaveText('Agregue productos al carrito');
});