import { Router } from "express";
import axios from "axios";

const router = Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home'
	});
});

export default router;