const axios = require("axios");
const Amadeus = require('amadeus');
let API_KEY = process.env.API_KEY;

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_SECRET_KEY
})

class EventController {
    static async getAllTaxonomies(request, response) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://api.seatgeek.com/2/taxonomies?client_id=${API_KEY}`
            })
            let taxonomies = [];
            let sportTaxonomies = data.taxonomies
                .filter((el) => {
                    return el.parent_id === 1000000;
                })
                .slice(0, 5);
            let musicTaxonomies = data.taxonomies.filter((el) => {
                return el.parent_id === 2000000;
            });

            sportTaxonomies.forEach((el) => {
                taxonomies.push(el);
            });

            musicTaxonomies.forEach((el) => {
                taxonomies.push(el);
            });

            response.status(200).json(taxonomies);
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }

    static async getEventDetail(request, response) {
        try {
            const event = request.params.name ;
            const { data } = await axios({
                method: "GET",
                url: `https://api.seatgeek.com/2/events?q=${event}&client_id=${API_KEY}`,
            });
            let events = data.events.map((el) => {
                const obj = {
                    id: el.id,
                    type: el.type,
                    venue: {
                        state: el.venue.state,
                        venue: el.venue.name,
                        location: {
                            lat: el.venue.location.lat,
                            lon: el.venue.location.lon,
                        },
                        address: el.venue.address,
                        country: el.venue.country
                    },
                    title: el.title,
                    price: el.stats.average_price,
                    date: new Date(el.datetime_local).toISOString().split('T')[0],
                    performer: el.performers[0].name,
                    image: el.performers[0].image
                }
                return obj
            })

            response.status(200).json(events);
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }

    static getHotelByGeolocation(request, response) {
        const {latitude, longitude} = request.headers
        amadeus.referenceData.locations.hotels.byGeocode.get({
            latitude: latitude,
            longitude: longitude,
            radius: 3,
            radiusUnit: 'KM'
        }).then((res) => {
            const hotels = res.result.data.map((el) => {
                const obj = {
                    name: el.name,
                    hotelId: el.hotelId,
                    geoCode: {
                        latitude: el.geoCode.latitude,
                        longitude: el.geoCode.longitude
                    }
                }
                return obj
            })
            response.status(200).json(hotels.slice(0,5))
        }).catch((err) => {
            response.status(400).json({
                message: "Bad Request"
            })
        })
    }

}

module.exports = EventController;
