const express = require('express');
const routeUser = require('./user');
const routes = express.Router();

const Controller = require('../controllers/main');
// cari hotel berdasarkan location
routes.use(routeUser);
routes.get('/hotels', Controller.getAllHotel);
// mendapatkan destination location berdasarkan lokasi
routes.get('/hotels/location', Controller.getHotelByLocation);
// detail dari hotel yang di maksud
routes.get('/hotels/:id', Controller.detailHotel);

module.exports = routes;
