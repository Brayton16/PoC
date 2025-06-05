import sql from './config/db.js';
(async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Conexión exitosa a la base de datos:', result[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }
})();
