const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post('/session/v1', sessionController.getSessionList);
router.post('/session/delete/v1', sessionController.deleteSession);

module.exports = router;