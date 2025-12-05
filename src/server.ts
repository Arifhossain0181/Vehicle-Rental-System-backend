import express from 'express';
import config from './config';
import { initDB } from './config/db';
import { userrouter } from './Modules/Users/user.routes';
import { VehiclesRoute } from './Modules/Vehicles/Vehicles.route';
import { BookingsRoute } from './Modules/Bookings/Bookings.route';
const app = express();
const PORT = config.port || 5000;

app.use(express.json());

initDB();

// create user route
app.use('/users',userrouter);

// create vehicles route

app.use('/vehicles', VehiclesRoute.router);

// create bookings route
app.use('/booking', BookingsRoute.router);

app.get("/",(req,res) =>{
    res.send("Hello, World! arif here.");
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
   