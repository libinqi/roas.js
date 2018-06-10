import development from './env/development';
import test from './env/test';
import production from './env/production';

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

export const appPath = process.cwd();
export const config = isTest ? test : (isProd ? production : development);
export const env = process.env.NODE_ENV || 'development';