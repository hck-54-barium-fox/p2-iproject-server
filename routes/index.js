const express = require('express');
const routeUser = require('./user');
const routes = express.Router();

const Controller = require('../controllers/main');
// cari hotel berdasarkan location
routes.use(routeUser);
routes.get('/hotels', Controller.getAllHotel);
// mendapatkan destination location berdasarkan lokasi
routes.get('/hotels/location', Controller.getHotelByLocation);
// rooms dari hotel"
routes.get('/hotels/:id', Controller.getRoomHotel);
// properti detail dari hotel yang di maksud
routes.get('/hotels/properties/:id', Controller.detailHotel);

module.exports = routes;
