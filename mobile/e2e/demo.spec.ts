import { expect, test, type Page } from '@playwright/test';

async function navigate(page: Page, name: string) {
  await page.getByRole('tab', { name: new RegExp(name) }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /Un petit lien/ })).toBeVisible();
});

test('explore les profils et leur localisation fictive', async ({ page }) => {
  await expect(page.getByText('DÉMONSTRATION', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/accueil.png', fullPage: true });
  await page.getByRole('button', { name: 'Sélectionner Noah' }).click();
  await expect(page.getByText('Batterie fictive · 24 %')).toBeVisible();
  await page.getByRole('button', { name: 'Voir la localisation' }).click();
  await expect(page.getByText('Parc des Petits Pas', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Sélectionner Léa' }).click();
  await expect(page.getByText('École des Tilleuls', { exact: true })).toBeVisible();
});

test('consulte les alertes et les retire du filtre non lues', async ({ page }) => {
  await navigate(page, 'Alertes');
  await expect(page.getByText(/2 alerte\(s\) non lue\(s\)/)).toBeVisible();
  await page.getByRole('button', { name: 'Non lues', exact: true }).click();
  await expect(page.getByText('Programme école enregistré', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Voir le détail', exact: true }).first().click();
  await page.getByRole('button', { name: 'Marquer comme lue', exact: true }).click();
  await expect(page.getByText(/1 alerte\(s\) non lue\(s\)/)).toBeVisible();
  await page.getByRole('button', { name: 'Voir le détail', exact: true }).click();
  await page.getByRole('button', { name: 'Marquer comme lue', exact: true }).click();
  await expect(page.getByText('Tout est lu.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Toutes', exact: true }).click();
  await expect(page.getByText('Position disponible', { exact: true })).toBeVisible();
  await expect(page.getByText('Batterie à recharger', { exact: true })).toBeVisible();
});

test('valide les horaires puis conserve un programme distinct par enfant', async ({ page }) => {
  await navigate(page, 'École');
  await page.getByRole('textbox', { name: 'Heure de début' }).fill('18:00');
  await page.getByRole('button', { name: 'Enregistrer la simulation' }).click();
  await expect(page.getByRole('alert')).toContainText('après');
  await page.getByRole('textbox', { name: 'Heure de début' }).fill('09:15');
  await page.getByRole('textbox', { name: 'Heure de fin' }).fill('17:00');
  await page.getByRole('switch', { name: 'Activer le mode école simulé' }).click();
  await page.getByRole('button', { name: 'Enregistrer la simulation' }).click();
  await expect(page.getByText(/Simulation enregistrée pour cette session/)).toBeVisible();
  await page.getByRole('button', { name: 'Sélectionner Noah' }).click();
  await expect(page.getByRole('textbox', { name: 'Heure de début' })).toHaveValue('09:00');
  await expect(page.getByRole('switch', { name: 'Activer le mode école simulé' })).not.toBeChecked();
  await page.getByRole('button', { name: 'Sélectionner Léa' }).click();
  await expect(page.getByRole('textbox', { name: 'Heure de début' })).toHaveValue('09:15');
  await expect(page.getByRole('textbox', { name: 'Heure de fin' })).toHaveValue('17:00');
  await expect(page.getByRole('switch', { name: 'Activer le mode école simulé' })).toBeChecked();
});

test('annule puis confirme la remise à zéro des réglages et des alertes', async ({ page }) => {
  await navigate(page, 'École');
  await page.getByRole('textbox', { name: 'Heure de début' }).fill('10:00');
  await page.getByRole('button', { name: 'Enregistrer la simulation' }).click();
  await expect(page.getByText(/Simulation enregistrée pour cette session/)).toBeVisible();
  await navigate(page, 'Alertes');
  await page.getByRole('button', { name: 'Voir le détail', exact: true }).first().click();
  await page.getByRole('button', { name: 'Marquer comme lue' }).click();
  await navigate(page, 'Réglages');
  await page.getByRole('button', { name: 'Réinitialiser la démo' }).click();
  await page.getByRole('button', { name: 'Annuler', exact: true }).click();
  await navigate(page, 'École');
  await expect(page.getByRole('textbox', { name: 'Heure de début' })).toHaveValue('10:00');
  await navigate(page, 'Alertes');
  await expect(page.getByText(/1 alerte\(s\) non lue\(s\)/)).toBeVisible();
  await navigate(page, 'Réglages');
  await page.getByRole('button', { name: 'Réinitialiser la démo' }).click();
  await page.getByRole('button', { name: 'Confirmer la réinitialisation' }).click();
  await expect(page.getByText('La démonstration a été réinitialisée.')).toBeVisible();
  await navigate(page, 'École');
  await expect(page.getByRole('textbox', { name: 'Heure de début' })).toHaveValue('08:30');
  await expect(page.getByText(/Simulation enregistrée pour cette session/)).toHaveCount(0);
  await navigate(page, 'Alertes');
  await expect(page.getByText(/2 alerte\(s\) non lue\(s\)/)).toBeVisible();
});
