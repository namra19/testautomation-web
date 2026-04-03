export type TestEnv = 'qa' ;

const testEnv = (process.env.TEST_ENV as TestEnv) || 'qa';

const usersByEnv: Record<TestEnv, {
    adminLogin: { email: string; password: string };
    user1Login: { email: string; password: string };
    user2Login: { email: string; password: string };
  

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

    },

};

export const users = usersByEnv[testEnv];
