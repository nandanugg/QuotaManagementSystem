import {Pool} from 'postgresql-client';
import { Config } from './env';

export function NewDbPool(config: Config): Pool {
    return new Pool({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        min: 1,
        max: 10,
        idleTimeoutMillis: 5000,
    });
}
