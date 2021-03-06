require('dotenv').config();
const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(5000),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DIALECT: Joi.string().required(),
    DB_PORT: Joi.number(),
    DB_TIMEZONE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE: Joi.string().required(),
    JWT_COOKIE_EXPIRE: Joi.number().required(),
    GG_CLIENT_ID: Joi.string().required(),
    GG_CLIENT_SECRET: Joi.string().required(),
    GG_REFRESH_TOKEN: Joi.string().required(),
    GG_REDIRECT_URI: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: envVars.DB_DATABASE,
  host: envVars.DB_HOST,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbDialect: envVars.DB_DIALECT,
  dbPort: envVars.DB_PORT,
  dbTimeZone: envVars.DB_TIMEZONE,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpire: envVars.JWT_EXPIRE,
  jwtCookieExpire: envVars.JWT_COOKIE_EXPIRE,
  ggClientId: envVars.GG_CLIENT_ID,
  ggClientSecret: envVars.GG_CLIENT_SECRET,
  ggRedirectUri: envVars.GG_REDIRECT_URI,
  ggRefreshToken: envVars.GG_REFRESH_TOKEN,
};
