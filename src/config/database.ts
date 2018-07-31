export const development = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'roas_dev',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};

export const test = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'roas_test',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};

export const production = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'roas',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};