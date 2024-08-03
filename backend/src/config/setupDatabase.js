import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Create a new database using an existing client of locally installed PostgreSQL
 * @returns {Promise<void>}
 */
async function createDatabase() {
    const client = new Client({
        user: process.env.DB_MAIN_USER,
        password: process.env.DB_MAIN_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_MAIN_NAME,
    });

    try {
        await client.connect();
        console.log("Connected to the PostgreSQL server");

        // Check if the database already exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [process.env.DB_NAME]);
        if (res.rowCount > 0) {
            console.log(`Database ${process.env.DB_NAME} already exists`);
            return;  // Stop further execution if the database exists
        } else {
            // Create the new database
            await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log(`Database ${process.env.DB_NAME} created successfully`);
        }
    } catch (err) {
        console.error('Error creating database and tables', err.stack);
    } finally {
        // Ensure the client is closed in both success and error cases
        await client.end();
    }

    // Now connect to the newly created database and create tables
    const dbClient = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    });

    try {
        await dbClient.connect();
        console.log(`Connected to the database ${process.env.DB_NAME}`);

        const sqlFilePath = path.join(__dirname, '..', '..', '..', 'database', 'init.sql');
        const sql = fs.readFileSync(sqlFilePath).toString();
        const queries = sql.split(';').map(q => q.trim()).filter(q => q.length > 0);

        for (const queryText of queries) {
            await dbClient.query(queryText);
        }

        console.log("Database and tables created successfully");
    } catch (err) {
        console.error('Error creating tables', err.stack);
    } finally {
        // Ensure the dbClient is closed in both success and error cases
        await dbClient.end();
    }
}

createDatabase();
