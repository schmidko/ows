const express = require('express');
const router = express.Router();
const path = require('path');


router.get('*', (req, res) => {
	res.sendFile(BASEPATH + 'src/server/views/app.html')
});

module.exports = router;
