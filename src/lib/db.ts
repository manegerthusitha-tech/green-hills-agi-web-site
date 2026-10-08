import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Global connection pool cache for Next.js hot reload in development
interface GlobalWithMySQLPool {
  __mysqlPool?: mysql.Pool;
  __dbInitialized?: boolean;
}

const globalWithPool = global as unknown as GlobalWithMySQLPool;

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "123123";
const DB_NAME = process.env.DB_NAME || "green_hills_db";

export function getDbPool(): mysql.Pool {
  if (!globalWithPool.__mysqlPool) {
    globalWithPool.__mysqlPool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return globalWithPool.__mysqlPool;
}

export interface AdminUserRecord {
  id: number;
  username: string;
  password: string; // bcrypt hash
  created_at: Date;
  updated_at: Date;
}

/**
 * Ensures the database and `admin_users` table exist,
 * and inserts the default admin user with encrypted password if missing.
 */
export async function ensureDbInitialized() {
  if (globalWithPool.__dbInitialized) {
    return;
  }

  try {
    // 1. Ensure database exists
    const rootConn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await rootConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConn.end();

    // 2. Ensure table exists
    const pool = getDbPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`admin_users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`username\` VARCHAR(100) NOT NULL UNIQUE,
        \`password\` VARCHAR(255) NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Ensure default admin user exists
    const defaultUser = process.env.ADMIN_USERNAME || "admin";
    const defaultPass = process.env.ADMIN_PASSWORD || "admin123";

    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id FROM `admin_users` WHERE `username` = ?",
      [defaultUser]
    );

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(defaultPass, 10);
      await pool.query(
        "INSERT INTO `admin_users` (`username`, `password`) VALUES (?, ?)",
        [defaultUser, hashedPassword]
      );
      console.log(`[Database] Initialized default admin '${defaultUser}' with encrypted password.`);
    }

    globalWithPool.__dbInitialized = true;
  } catch (error) {
    console.error("[Database] Initialization check failed:", error);
  }
}

/**
 * Find admin user by username
 */
export async function findAdminByUsername(username: string): Promise<AdminUserRecord | null> {
  await ensureDbInitialized();
  const pool = getDbPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT id, username, password, created_at, updated_at FROM `admin_users` WHERE `username` = ?",
    [username]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as AdminUserRecord;
}

/**
 * Verify credentials against database and encrypted password
 */
export async function verifyAdminCredentials(
  username: string,
  plainPassword: string
): Promise<{ success: boolean; user?: { id: number; username: string } }> {
  const user = await findAdminByUsername(username);
  if (!user) {
    return { success: false };
  }

  const isMatch = await bcrypt.compare(plainPassword, user.password);
  if (!isMatch) {
    return { success: false };
  }

  return {
    success: true,
    user: { id: user.id, username: user.username },
  };
}

/**
 * Save new admin or update existing admin password encrypted with bcrypt
 */
export async function saveAdminWithEncryptedPassword(
  username: string,
  plainPassword: string
): Promise<void> {
  await ensureDbInitialized();
  const pool = getDbPool();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    `INSERT INTO \`admin_users\` (\`username\`, \`password\`) 
     VALUES (?, ?) 
     ON DUPLICATE KEY UPDATE \`password\` = VALUES(\`password\`), \`updated_at\` = CURRENT_TIMESTAMP`,
    [username, hashedPassword]
  );
}
