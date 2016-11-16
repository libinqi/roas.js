import _ from 'lodash';
import development from './env/development';
import test from './env/test';
import production from './env/production';

const env = process.env.NODE_ENV || 'development';
const configs = {
  development: development,
  test: test,
  production: production
};
const defaultConfig = {
  env: env
};

var config = _.merge(defaultConfig, configs[env]);

module.exports = config;
