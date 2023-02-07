const axios = require('axios');
class Controller {
  static async getHotelByLocation(req, res) {
    try {
      const { search } = req.query;
      let qSearch = 'indonesia';
      if (search) {
        qSearch = search;
      }
      let options = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
        params: { text: qSearch },
        headers: {
          'X-RapidAPI-Key':
            'e37e683ae2msh4c91670eb2a0104p1e1b2ejsn5493002a9979',
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      };

      const { data } = await axios(options);

      const sendUser = data.map((el) => {
        return {
          imageUrl: el.image_url,
          region: el.region,
          country: el.country,
          hotels: el.hotels,
          destId: el.dest_id,
          label: el.label,
          latitude: el.latitude,
          longitude: el.longitude,
        };
      });
      // res.json(sendUser);
      res.status(200).json(sendUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async getAllHotel(req, res) {
    try {
      const { arrivalDate, departureDate, roomQuantity, childrenQuantity } =
        req.body;
      const options = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map',
        params: {
          arrival_date: arrivalDate,
          departure_date: departureDate,
          room_qty: roomQuantity,
          guest_qty: '1',
          bbox: '14.291283,14.948423,120.755688,121.136864',
          search_id: 'none',
          children_age: '11,5',
          price_filter_currencycode: 'USD',
          categories_filter: 'class::1,class::2,class::3',
          languagecode: 'en-us',
          travel_purpose: 'leisure',
          children_qty: childrenQuantity,
          order_by: 'popularity',
        },
        headers: {
          'X-RapidAPI-Key':
            'e37e683ae2msh4c91670eb2a0104p1e1b2ejsn5493002a9979',
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      };
      const { data } = await axios(options);
      // const allHotels = data?.result?.map((el) => {
      //   return {
      //     mainImgUrl: el.main_photo_url,
      //     timezone: el.timezone,
      //     score: el.review_score_word,
      //     city: el.city,
      //     address: el.address,
      //     checkIn: el.checkIn,
      //     url: el.url,
      //     id: el.id,
      //     currencyCode: el.currency_code,
      //     latitude: el.latitude,
      //     longitude: el.longitude,
      //     district: el.district,
      //     hotelFacilities: el.hotel_facilities,
      //     hotelId: el.hotel_id,
      //     hotelName: el.hotel_name,
      //   };
      // });
      // res.status(200).json({
      //   count: data.count,
      //   searchMetaData: data.search_meta_data,
      //   unfilteredCount: data.unfiltered_count,
      //   hotels: allHotels,
      //   searchId: data.search_id,
      // });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  static async detailHotel(req, res) {
    try {
      const { id } = req.params;
      const { search_id } = req.query;
      const { arrivalDate, departureDate } = req.body;

      const options = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/detail',
        params: {
          hotel_id: id,
          search_id: search_id,
          departure_date: departureDate,
          arrival_date: arrivalDate,
          rec_guest_qty: '2',
          rec_room_qty: '1',
          dest_ids: '-3727579',
          recommend_for: '3',
          languagecode: 'en-us',
          currency_code: 'USD',
          units: 'imperial',
        },
        headers: {
          'X-RapidAPI-Key':
            'e37e683ae2msh4c91670eb2a0104p1e1b2ejsn5493002a9979',
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      };

      let { data } = await axios(options);

      const benefits = data[0].top_ufi_benefits.map((el) => {
        return {
          name: el.translated_name,
          icon: el.icon,
        };
      });
      const policies = data[0].hotel_text?.policies.map((el) => {
        return {
          message: el.content,
          name: el.class,
        };
      });
      const importantInformation = data[0].hotel_text.important_information;
      const availableRooms = data[0].available_rooms;
      const countryName = data[0].country_trans;
      const rooms = data[0].rooms;
      const facilities = data[0].facilities_block.facilities;
      // res.json(data);
      res.status(200).json({
        benefits,
        policies,
        importantInformation,
        availableRooms,
        countryName,
        rooms,
        facilities,
        longitude: data[0].longitude,
        city: data[0].city,
        price: data[0].block[0].price_breakdown,
        latitude: data[0].latitude,
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

module.exports = Controller;
