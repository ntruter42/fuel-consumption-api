import pgPromise from 'pg-promise';
import express from 'express';
import bodyParser from 'body-parser';
import session from "express-session";
import flash from 'express-flash';
import { engine } from 'express-handlebars';
import "dotenv/config";

import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import fuelConsumptionRoutes from './routes/fuel-consumption-routes.js';

const pgp = pgPromise();

const connectionOptions = {
	connectionString: process.env.DATABASE_URL || 'postgres://fuel:fuel@localhost:5432/fuel_consumption',
	ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(flash());
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		sameSite: 'None'
	}
}));
app.engine('hbs', engine({
	defaultLayout: 'main.hbs',
	viewPath: './views',
	layoutsDir: './views/layouts',
	helpers: {}
}));
app.set('view engine', 'hbs');

app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.use('/', fuelConsumptionRoutes);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

