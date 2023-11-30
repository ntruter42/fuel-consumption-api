import { Router } from "express";
import { fuelConsumption } from "../index.js";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
	const vehicles = await fuelConsumption.vehicles();
	console.log('Vehicles:', vehicles);

	const empty = vehicles.length <= 0;

	res.render('index', {
		title: 'Vehicle Consumption',
		vehicles,
		empty
	});
});

router.get('/add', async (req, res) => {
	const vehicles = await fuelConsumption.vehicles();

	const empty = vehicles.length <= 0;

	const message = {
		text: req.flash('message'),
		type: req.flash('message-type')
	}

	res.render('add', {
		title: 'Add Vehicle',
		vehicles,
		empty,
		message
	});
});

router.post('/add', async (req, res) => {
	const result = await fuelConsumption.addVehicle(req.body);

	req.flash('message', result.message);
	req.flash('message-type', result.status);

	res.redirect('/add');
});

router.get('/refuel/:vehicleId', async (req, res) => {
	const vehicleId = req.params.vehicleId;
	const vehicle = await fuelConsumption.vehicle(vehicleId);
	console.log(vehicle);

	const message = {
		text: req.flash('message'),
		type: req.flash('message-type')
	}

	res.render('refuel', {
		title: 'Refuel Vehicle',
		vehicle,
		message
	});
});

router.post('/refuel/:vehicleId', async (req, res) => {
	const vehicleId = req.params.vehicleId;
	const liters = Number(req.body.liters);
	const amount = Number(req.body.amount);
	const distance = Number(req.body.odometer);
	const filled_up = req.body.filled_up === 'on';

	const result = await fuelConsumption.refuel(vehicleId, liters, amount, distance, filled_up);

	req.flash('message', result.message);
	req.flash('message-type', result.status);

	res.redirect('/refuel/'+vehicleId);
});

export default router;