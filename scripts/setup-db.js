const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Read environment variables or use defaults
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  
  const parse = (filePath) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...vals] = trimmed.split('=');
          if (key && vals.length) {
            process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      });
    }
  };

  parse(envPath);
  parse(envLocalPath);
}

loadEnv();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123123';
const DB_NAME = process.env.DB_NAME || 'green_hills_db';

const DEFAULT_ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

async function setup() {
  console.log(`[DB Setup] Connecting to MySQL at ${DB_HOST}:${DB_PORT} as ${DB_USER}...`);
  
  // 1. Connect without database to ensure database exists
  const rootConn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  console.log(`[DB Setup] Connected. Ensuring database '${DB_NAME}' exists...`);
  await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await rootConn.end();

  // 2. Connect to the specific database
  const dbConn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  console.log(`[DB Setup] Ensuring 'admin_users' table exists...`);
  await dbConn.query(`
    CREATE TABLE IF NOT EXISTS \`admin_users\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`username\` VARCHAR(100) NOT NULL UNIQUE,
      \`password\` VARCHAR(255) NOT NULL,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Check if admin user exists
  const [rows] = await dbConn.query('SELECT * FROM `admin_users` WHERE `username` = ?', [DEFAULT_ADMIN_USER]);

  if (rows.length === 0) {
    console.log(`[DB Setup] Admin user '${DEFAULT_ADMIN_USER}' not found. Generating bcrypt encrypted password...`);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASS, saltRounds);

    await dbConn.query(
      'INSERT INTO `admin_users` (`username`, `password`) VALUES (?, ?)',
      [DEFAULT_ADMIN_USER, hashedPassword]
    );
    console.log(`[DB Setup] Successfully created admin user '${DEFAULT_ADMIN_USER}' with encrypted password!`);
  } else {
    console.log(`[DB Setup] Admin user '${DEFAULT_ADMIN_USER}' already exists in database.`);
    // Update password to ensure it matches the requested default password if needed
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASS, saltRounds);
    await dbConn.query(
      'UPDATE `admin_users` SET `password` = ? WHERE `username` = ?',
      [hashedPassword, DEFAULT_ADMIN_USER]
    );
    console.log(`[DB Setup] Admin user '${DEFAULT_ADMIN_USER}' password updated and encrypted successfully.`);
  }

  // Display user verification info
  const [allAdmins] = await dbConn.query('SELECT id, username, password, created_at FROM `admin_users`');
  console.log('[DB Setup] Current admin records in database:');
  console.table(allAdmins);

  await dbConn.end();
  console.log('[DB Setup] Setup completed successfully!');
}

setup().catch((err) => {
  console.error('[DB Setup Error]:', err);
  process.exit(1);
});
