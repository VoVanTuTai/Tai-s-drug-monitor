const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// Import middleware
const checkName = require('../middleware/checkName');
const checkDosage = require('../middleware/checkDosage');
const checkCard = require('../middleware/checkCard');
const checkPack = require('../middleware/checkPack');
const checkPerDay = require('../middleware/checkPerDay');

// Routes render pages
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);

route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API for CRUD operations
// Thêm middleware validation cho POST và PUT
route.post(
  '/api/drugs',
  checkName,
  checkDosage,
  checkCard,
  checkPack,
  checkPerDay,
  controller.create
);

route.put(
  '/api/drugs/:id',
  checkName,
  checkDosage,
  checkCard,
  checkPack,
  checkPerDay,
  controller.update
);

// API for CRUD operations

route.get('/api/drugs', controller.find);

route.delete('/api/drugs/:id', controller.delete);
route.post('/api/purchase', controller.purchase);
module.exports = route;
