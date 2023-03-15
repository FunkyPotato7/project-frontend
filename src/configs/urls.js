const baseURL = 'http://localhost:5000';

const urls = {
    admin: {
        getAll: '/admin/users',
        create: '/admin/create',
        block: (id) => `/admin/users/${id}`,
        recreate: (id) => `/admin/users/${id}/re_token`
    },
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: 'auth/logout',
        activate: (token) => `auth/activate/${token}`
    },
    paid: {
        getAll: '/paid',
        export: '/paid/excel',
        statistic: '/paid/statistic',
        update: (id) => `/paid/${id}`
    },
    user: {
        getAuthUser: '/users/me'
    }
};

export {
    baseURL,
    urls
};
