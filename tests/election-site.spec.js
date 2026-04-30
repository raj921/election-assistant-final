// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Election Guide', () => {
  test('document has accessible title and main landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Election Guide/i);
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.getByRole('navigation', { name: /primary/i })).toBeVisible();
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/');
    const skip = page.getByRole('link', { name: /skip to main content/i });
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute('href', '#main-content');
  });

  test('timeline section renders phases from data', async ({ page }) => {
    await page.goto('/');
    await page.locator('#timeline').scrollIntoViewIfNeeded();
    await expect(page.locator('#timelineContainer .timeline-item').first()).toBeVisible();
    await expect(page.getByText(/Announcement of Elections/i)).toBeVisible();
  });

  test('quiz flow: first question and options appear', async ({ page }) => {
    await page.goto('/');
    await page.locator('#quiz').scrollIntoViewIfNeeded();
    await expect(page.locator('#quizQuestion')).not.toHaveText('');
    const opts = page.locator('#quizOptions .quiz-option');
    await expect(opts).toHaveCount(4);
  });

  test('chat FAB is keyboard-focusable and labeled', async ({ page }) => {
    await page.goto('/');
    const fab = page.getByRole('button', { name: /open ai assistant/i });
    await expect(fab).toBeVisible();
    await fab.focus();
    await expect(fab).toBeFocused();
  });

  test('2024 results dashboard renders when data is present', async ({ page }) => {
    await page.goto('/');
    await page.locator('#results2024').scrollIntoViewIfNeeded();
    await expect(page.locator('#resultsStats .result-stat-card')).toHaveCount(4);
    await expect(page.locator('#barChart .bar-row').first()).toBeVisible();
  });

  test('timeline lists all eight election phases', async ({ page }) => {
    await page.goto('/');
    await page.locator('#timeline').scrollIntoViewIfNeeded();
    await expect(page.locator('#timelineContainer .timeline-item')).toHaveCount(8);
  });

  test('facts ticker renders repeating key facts', async ({ page }) => {
    await page.goto('/');
    await page.locator('#facts').scrollIntoViewIfNeeded();
    const items = page.locator('#factsTicker .fact-item');
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThanOrEqual(10);
  });

  test('learn section exposes four keyboard-accessible bento cards', async ({ page }) => {
    await page.goto('/');
    await page.locator('#learn').scrollIntoViewIfNeeded();
    const cards = page.locator('#bentoGrid .bento-card[role="button"]');
    await expect(cards).toHaveCount(4);
    await expect(cards.first()).toHaveAttribute('tabindex', '0');
  });

  test('quiz advances after correct answer and next', async ({ page }) => {
    await page.goto('/');
    await page.locator('#quiz').scrollIntoViewIfNeeded();
    await expect(page.locator('#quizQuestion')).toContainText(/minimum age to vote/i);
    await page.getByRole('button', { name: /18 years/i }).click();
    await expect(page.locator('#quizExplanation')).toHaveClass(/show/);
    await page.locator('#quizNextBtn').click();
    await expect(page.locator('#quizQuestion')).toContainText(/EVM stand for/i);
  });

  test('external resource links use rel noopener', async ({ page }) => {
    await page.goto('/');
    const eci = page.getByRole('link', { name: /Election Commission/i });
    await expect(eci).toHaveAttribute('rel', /noopener/);
  });

  test('chat dialog is hidden from assistive tech until opened', async ({ page }) => {
    await page.goto('/');
    const panel = page.locator('#chatPanel');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('#chatFab')).toHaveAttribute('aria-expanded', 'false');
  });

  test('single top-level heading in hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
  });
});
