import { test, expect } from '@playwright/test';

const TEST_EMAIL = process.env.TEST_EMAIL || '';
const TEST_PASSWORD = process.env.TEST_PASSWORD || '';

// Login API Tests
test.describe('Login API', () => {

    test('Login with valid credentials returns 200', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: TEST_EMAIL,
                password: TEST_PASSWORD
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.user).toBeDefined();
        expect(body.user.email).toBe(TEST_EMAIL);
    });

    test('Login with invalid password returns 401', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: TEST_EMAIL,
                password: 'WrongPassword123!'
            }
        });
        expect(response.status()).toBe(401);
    });

    test('Login with non-existent email returns 401', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'doesnotexist@fake.com',
                password: TEST_PASSWORD
            }
        });
        expect(response.status()).toBe(401);
    });

    test('Login with missing email returns 400', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                password: TEST_PASSWORD
            }
        });
        expect(response.status()).toBe(400);
    });

    test('Login with missing password returns 400', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: TEST_EMAIL
            }
        });
        expect(response.status()).toBe(400);
    });

    test('Login with invalid email format returns 400', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'notanemail',
                password: TEST_PASSWORD
            }
        });
        expect(response.status()).toBe(400);
    });

    test('Login returns user data on success', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: TEST_EMAIL,
                password: TEST_PASSWORD
            }
        });
        const body = await response.json();
        expect(body.user.id).toBeDefined();
        expect(body.user.fullName).toBeDefined();
        expect(body.user.companyId).toBeDefined();
    });

    test('Login with empty body returns 400', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {}
        });
        expect(response.status()).toBe(400);
    });

});