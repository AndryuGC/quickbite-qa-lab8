const { test, expect } = require('@playwright/test');

test('R05 - No permite confirmar sin nombre de entrega', async ({ page }) => {
  await page.goto('/');
  await page.locator('#products button[data-product="Pizza"]').click();
  await expect(page.locator('#cart-count')).toHaveText('1');
  await expect(page.locator('#customer')).toHaveValue('');
  await page.locator('#checkout').click();
  // Regla de negocio: sin nombre de entrega el pedido NO debe confirmarse.
  await expect(page.locator('#message')).not.toContainText('Pedido confirmado');
});

test('R06 - Búsqueda sin coincidencias', async ({ page }) => {
  await page.goto('/');
  await page.locator('#search').fill('Sushi');
  await expect(page.locator('#products button.add')).toHaveCount(0);
  await expect(page.locator('#products')).toBeEmpty();
});