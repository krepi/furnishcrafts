import { exec } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

/**
 * Function to load mocked data into the PostgreSQL database.
 * This function reads the database connection details from environment variables
 * and executes an SQL script to load mocked data.
 */
const loadMockedData = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    const sqlPath = path.join(__dirname, 'mockedData.sql');
    const command = `psql -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -f ${sqlPath}`;

    client.connect(err => {
        if (err) {
            console.error('Connection error', err.stack);
            return;
        }
        console.log('Connected to the database');

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
            }
            console.log(`Output: ${stdout}`);
            client.end();
        });
    });
};

loadMockedData();


