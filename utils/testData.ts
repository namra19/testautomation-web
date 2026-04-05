export type TestEnv = 'qa';

const testEnv = (process.env.TEST_ENV as TestEnv) || 'qa';

const usersByEnv: Record<TestEnv, {
    adminLogin: { email: string; password: string };
    user1Login: { email: string; password: string };
    user2Login: { email: string; password: string };
    invalidEmail: { email: string; password: string };
    invalidPassword: { email: string; password: string };
    emptyCredentials: { email: string; password: string };
    invalidFormat: { email: string; password: string };


}> = {
    qa: {
        adminLogin: {
            email: 'admin@admin.com',
            password: '2020'
        },
        user1Login: {
            email: 'biancunha@gmail.com',
            password: '123456'
        },
        user2Login: {
            email: 'growdev@growdev.com.br',
            password: 'growdev123',
        },

        invalidEmail: {
            email: 'wrong@example.com',
            password: '123456'
        },
        invalidPassword: {
            email: 'admin@admin.com',
            password: 'wrongpass'
        },
        emptyCredentials: {
            email: '',
            password: ''
        },
        invalidFormat: {
            email: 'not-an-email',
            password: '123456'
        }

    },

};

export const users = usersByEnv[testEnv];
