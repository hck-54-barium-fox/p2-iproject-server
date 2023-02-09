const express = require('express');
const routeUser = require('./user');
const routes = express.Router();

const Controller = require('../controllers/main');
const { authentication, authorization } = require('../middlewares/auth');
// cari hotel berdasarkan location
routes.use(routeUser);
routes.get('/hotels', Controller.getAllHotel);
// mendapatkan destination location berdasarkan lokasi
routes.get('/hotels/location', Controller.getHotelByLocation);
// rooms dari hotel"
routes.get('/hotels/:id', authentication, Controller.getRoomHotel);
// properti detail dari hotel yang di maksud
routes.get('/hotels/properties/:id', authentication, Controller.detailHotel);
// chek in saat deal
routes.post(
  '/check-in',
  authentication,
  authorization,
  Controller.checkInHotel
);

module.exports = routes;
