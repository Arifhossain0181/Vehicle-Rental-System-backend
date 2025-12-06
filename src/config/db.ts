import dotenv from "dotenv";
import { Pool } from "pg";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

//PostgreSQL connection configuration

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  max: 20,
});

// Test connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const initDB = async () => {
  let retries = 3;
  while (retries > 0) {
    try {
      // Test connection first
      await pool.query('SELECT NOW()');
      console.log('Database connection established successfully.');

      await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
            );
            `);
    await pool.query(`
                CREATE TABLE IF NOT EXISTS Vehicles(
                    id SERIAL PRIMARY KEY,
                    vehicle_name VARCHAR(100) NOT NULL,
                    type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
                    registration_number VARCHAR(50) UNIQUE NOT NULL,
                    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
                    availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
                );
                `);
    await pool.query(`
                        CREATE TABLE IF NOT EXISTS Bookings(
                        id SERIAL PRIMARY KEY,
                        customer_id INTEGER NOT NULL,
                        vehicle_id INTEGER NOT NULL,
                        FOREIGN KEY (customer_id) REFERENCES Users(id),
                        FOREIGN KEY (vehicle_id) REFERENCES Vehicles(id),
                        rent_start_date DATE NOT NULL,
                        rent_end_date DATE NOT NULL,
                        total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
                        status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
                    );
                    `);
    console.log("Database initialized successfully.");
    return; // Success, exit the function
  }
   catch (error) {
    retries--;
    console.error(` Database initialization failed. Retries left: ${retries}`);
    console.error(error);
    
    if (retries === 0) {
      console.error("Server will continue running, but DB operations will fail.");
    } else {
      console.log("Retrying in 5 seconds...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  }
};
export { initDB, pool };
