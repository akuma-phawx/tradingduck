import { config } from 'dotenv';
config({ path: `${__dirname}/../../.env` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, ADMIN_KEY, SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;
