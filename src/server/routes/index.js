
const {log} = require("console");
const {connectDB} = require("../db.js");
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/ping', async (req, res) => {
		res.json({"message":"pong"});
	}
);

router.get('/ows', async (req, res, next) => {
	let result = {"status": 0, "message": "no Data"};
	if (req.query.address) {
		try {
			const {db} = await connectDB();
			const collection = db.collection("addresses");
			const queryFind = {"stakeAddress": req.query.address};
			result = await collection.find(queryFind).toArray();
		} catch(e) {
			return res.json({"status": 0, "message": "Database error!"});
		}
	}
	
	return res.json({"status": 1, "data": result[0]});
});

router.get('*', (req, res) => {
	res.sendFile(BASEPATH + 'src/server/views/app.html')
});

module.exports = router;
