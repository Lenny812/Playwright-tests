import {test, expect} from '@playwright/test';

// Page Load
test.describe('Page Load', () => {

    test('page loads with correct title', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect.soft(page).toHaveTitle(/FISPTek/);
        console.log(await page.title());
    });

});

// Navbar & Navigation
test.describe('Navbar & Navigation', () => {

    test('Navbar displays correct logo and links', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect.soft(page.locator('.logo-text')).toBeVisible();
        await expect.soft(page.getByRole('link', {name: 'About'})).toBeVisible();
        await expect.soft(page.getByRole('link', {name: 'Contact'})).toBeVisible();
    });

    test('About link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/about"]');
        await expect(page).toHaveURL(/about/);
    });

    test('Contact link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/contact"]');
        await expect(page).toHaveURL(/contact/);
    });

    test('Forgot password link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/forgot-password"]');
        await expect(page).toHaveURL(/forgot-password/);
    });

    test('Signup link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/signup"]');
        await expect(page).toHaveURL(/signup/);
    });

    test('Terms link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/terms"]');
        await expect(page).toHaveURL(/terms/);
    });

    test('Privacy link navigates correctly', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('a[href="/privacy"]');
        await expect(page).toHaveURL(/privacy/);
    });

});

// Theme Toggle
test.describe('Theme Toggle', () => {

    test('Theme toggle switches to light mode', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.getByRole('button', {name: 'Toggle light/dark mode'}).click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });

    test('Theme toggle switches back to dark mode', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.getByRole('button', {name: 'Toggle light/dark mode'}).click();
        await page.getByRole('button', {name: 'Toggle light/dark mode'}).click();
        await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'light');
    });

});

// Carousel
test.describe('Carousel', () => {

    test('Carousel auto-rotates', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.feature-slide[data-index="0"]')).toHaveClass(/active/);
        await page.waitForTimeout(5500);
        await expect(page.locator('.feature-slide[data-index="1"]')).toHaveClass(/active/);
    });

    test('Carousel manual navigation works', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('.slide-btn:nth-child(3)');
        await expect(page.locator('.feature-slide[data-index="2"]')).toHaveClass(/active/);
    });

    test('Carousel slide 1 tags are displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        const slide1 = page.locator('.feature-slide[data-index="0"]');
        await expect(slide1).toContainText('NYC Auto-Fill');
        await expect(slide1).toContainText('Photo Attachments');
        await expect(slide1).toContainText('DOCX Export');
        await expect(slide1).toContainText('AI Conditions Autofill');
    });

    test('Carousel slide 2 tags are displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('.slide-btn:nth-child(2)');
        const slide2 = page.locator('.feature-slide[data-index="1"]');
        await expect(slide2).toContainText('Kanban Workflow');
        await expect(slide2).toContainText('Team Assignments');
        await expect(slide2).toContainText('QEWI Sign-off');
    });

    test('Carousel slide 3 tags are displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.click('.slide-btn:nth-child(3)');
        const slide3 = page.locator('.feature-slide[data-index="2"]');
        await expect(slide3).toContainText('Deadline Search');
        await expect(slide3).toContainText('Violation Lookup');
    });

});

// Form Validation
test.describe('Form Validation', () => {

    test('Shows error for empty form submission', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter your email and password.');
            await dialog.accept();
        });
        await page.click('.btn-login');
    });

    test('Shows error for invalid email format', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter a valid email address.');
            await dialog.accept();
        });
        await page.fill('#loginEmail', 'notanemail');
        await page.fill('#loginPassword', 'Test123!@');
        await page.click('.btn-login');
    });

    test('Shows error for short password', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Password must be at least 8 characters.');
            await dialog.accept();
        });
        await page.fill('#loginEmail', 'test@example.com');
        await page.fill('#loginPassword', '1234567');
        await page.click('.btn-login');
    });

    test('Shows error for password with emoji', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Password cannot contain emojis.');
            await dialog.accept();
        });
        await page.fill('#loginEmail', 'test@example.com');
        await page.fill('#loginPassword', 'Test123!🔐');
        await page.click('.btn-login');
    });

    test('Shows error for invalid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Invalid');
            await dialog.accept();
        });
        await page.fill('#loginEmail', 'fake@notreal.com');
        await page.fill('#loginPassword', 'WrongPassword1!');
        await page.click('.btn-login');
        await page.waitForTimeout(3000);
    });

});

// Password Field
test.describe('Password Field', () => {

    test('Password is hidden by default', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'password');
    });

    test('Password toggle shows password', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.fill('#loginPassword', 'mypassword');
        await page.click('.toggle-pw');
        await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'text');
    });

    test('Password toggle hides password again', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.fill('#loginPassword', 'mypassword');
        await page.click('.toggle-pw');
        await page.click('.toggle-pw');
        await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'password');
    });

    test('Password toggle has aria-label', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.toggle-pw')).toHaveAttribute('aria-label');
    });

});

// Form Elements
test.describe('Form Elements', () => {

    test('Remember me checkbox is clickable', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await page.locator('#rememberMe').check();
        await expect(page.locator('#rememberMe')).toBeChecked();
    });

    test('Email input has autocomplete attribute', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('#loginEmail')).toHaveAttribute('autocomplete', 'email');
    });

    test('Password input has autocomplete attribute', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('#loginPassword')).toHaveAttribute('autocomplete', 'current-password');
    });

    test('Button shows loading state on submit', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await page.fill('#loginEmail', 'test@example.com');
        await page.fill('#loginPassword', 'Test123!@');
        await page.click('.btn-login');
        await expect(page.locator('.btn-login')).toHaveText('Signing in...');
        await expect(page.locator('.btn-login')).toBeDisabled();
    });

    test('Google button is displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.btn-google')).toContainText('Sign in with Google');
    });

});

// Content & Footer
test.describe('Content & Footer', () => {

    test('Login header text is displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.login-header h2')).toContainText('Welcome back');
        await expect(page.locator('.login-header p')).toContainText('Sign in to manage your projects.');
    });

    test('Create account link is displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('a[href="/signup"]')).toContainText('Create an account');
    });

    test('Footer tagline is displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.login-footer')).toContainText('Your all-in-one platform for NYC building compliance.');
    });

    test('Copyright text is displayed', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('.logo-text', {timeout: 30000});
        await expect(page.locator('.login-footer')).toContainText('© 2026 FISPTek™ LLC. All rights reserved.');
    });

});