import { Router } from "express";
import { fuelConsumption } from "../index.js";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
	const vehicles = await fuelConsumption.vehicles();
	console.log('Vehicles:', vehicles);

	res.render('index', {
		title: 'Home',
		vehicles
	});
});

router.get('/add', async (req, res) => {
	const vehicles = await fuelConsumption.vehicles();
	console.log('Vehicles:', vehicles);

	const message = {
		text: req.flash('message'),
		type: req.flash('message-type')
	}

	res.render('add', {
		title: 'Add Vehicle',
		vehicles,
		message
	});
});

router.post('/add', async (req, res) => {
	const vehicles = await fuelConsumption.vehicles();
	const result = await fuelConsumption.addVehicle(req.body);
	console.log('Result:', result);

	req.flash('message', result.message);
	req.flash('message-type', result.status);

	res.redirect('/add');
});

export default router;