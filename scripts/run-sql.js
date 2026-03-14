const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_XZDTE3H1YGpi@ep-fancy-cake-al6qy1o7-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function run() {
  const file = process.argv[2];
  if (!file) { console.error('Usage: node scripts/run-sql.js <file.sql>'); process.exit(1); }
  const content = fs.readFileSync(file, 'utf8');
  await sql.unsafe(content);
  console.log('Done:', file);
  await sql.end();
}
run().catch(e => { console.error(e.message); process.exit(1); });
