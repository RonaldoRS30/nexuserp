import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { env } from '../config/env';

async function init() {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true,
  });

  const schema = fs.readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf8');
  await connection.query(schema);
  await connection.end();
  console.log(`Base de datos '${env.db.name}' inicializada.`);
}

init().catch((error) => {
  console.error('No se pudo inicializar la base de datos:', error);
  process.exit(1);
});
