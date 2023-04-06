import { DataSource } from 'typeorm';
import { City, Profile, Url } from '../models';
import { Environments } from '../utils';

const dbSource = new DataSource({
    type: 'postgres',
    host: Environments.database.host,
    port: Environments.database.port,
    username: Environments.database.username,
    password: Environments.database.password,
    database: Environments.database.database,
    synchronize: true,
    logging: true,
    entities: [City, Profile, Url],
    extra: {
        connectionLimit: 5
    }
});

export default dbSource;