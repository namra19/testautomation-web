require('dotenv').config();

type Credentials = {
    email: string;
    password: string;
};

type Users = {
    adminLogin: Credentials;
    user1Login: Credentials;
    user2Login: Credentials;
    invalidEmail: Credentials;
    invalidPassword: Credentials;
    emptyCredentials: Credentials;
    invalidFormat: Credentials;
};

export const users: Users = {
    adminLogin: {
        email: process.env.ADMIN_EMAIL!,
        password: process.env.ADMIN_PASSWORD!
    },
    user1Login: {
        email: process.env.USER1_EMAIL!,
        password: process.env.USER1_PASSWORD!
    },
    user2Login: {
        email: process.env.USER2_EMAIL!,
        password: process.env.USER2_PASSWORD!,
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
};