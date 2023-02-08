const axios = require('axios');
const midtransClient = require('midtrans-client');
class Controller {
  static async getHotelByLocation(req, res) {
    try {
      const { search } = req.query;
      let qSearch = 'Hanoi';
      if (search) {
        qSearch = search;
      }
      let options = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
        params: { text: qSearch },
        headers: {
          'X-RapidAPI-Key': process.env.APIDOJO_KEY,
          'X-RapidAPI-Host': process.env.APIDOJO_HOST,
        },
      };

      const { data } = await axios(options);

      const sendUser = data.map((el) => {
        return {
          imageUrl: el?.image_url?.replace('150x150', '350x350'),
          region: el.region,
          country: el.country,
          hotels: el.hotels,
          destId: el.dest_id,
          label: el.label,
          latitude: el.latitude,
          longitude: el.longitude,
          hotelId: el.hotels,
          nearHotelId: el.nr_hotels,
        };
      });
      // res.json(data);
      // res.json(sendUser);
      res.status(200).json(sendUser);
      // console.log(sendUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async getAllHotel(req, res) {
    try {
      let { arrivalDate, departureDate, roomQuantity, childrenQuantity } =
        req.body;
      // for default data
      if (!arrivalDate || !departureDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        const threeDaysAfterTomorrow = new Date(dayAfterTomorrow);
        threeDaysAfterTomorrow.setDate(threeDaysAfterTomorrow.getDate() + 2);

        const formattedToday = today
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedTomorrow = tomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedDayAfterTomorrow = dayAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedThreeDaysAfterTomorrow = threeDaysAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        arrivalDate = formattedToday;
        departureDate = formattedThreeDaysAfterTomorrow;
      }
      if (!roomQuantity || childrenQuantity) {
        roomQuantity = 1;
        childrenQuantity = 1;
      }

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
          'X-RapidAPI-Key': process.env.APIDOJO_KEY,
          'X-RapidAPI-Host': process.env.APIDOJO_HOST,
        },
      };
      const { data } = await axios(options);
      const allHotels = data?.result?.map((el) => {
        return {
          mainImgUrl: el?.main_photo_url?.replace('square60', 'square500'),
          timezone: el.timezone,
          score: el.review_score_word,
          city: el.city,
          address: el.address,
          checkIn: el.checkIn,
          url: el.url,
          id: el.id,
          currencyCode: el.currency_code,
          latitude: el.latitude,
          longitude: el.longitude,
          district: el.district,
          hotelFacilities: el.hotel_facilities,
          hotelId: el.hotel_id,
          hotelName: el.hotel_name,
          price: el.price_breakdown,
          district: el.district,
          country: el.country_trans,
          score: el.review_score,
        };
      });

      res.status(200).json({
        count: data.count,
        searchMetaData: data.search_meta_data,
        unfilteredCount: data.unfiltered_count,
        hotels: allHotels,
        searchId: data.search_id,
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  static async detailHotel(req, res) {
    try {
      const { id } = req.params;
      const { search_id } = req.query;
      let { arrivalDate, departureDate } = req.body;

      if (!arrivalDate || !departureDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        const threeDaysAfterTomorrow = new Date(dayAfterTomorrow);
        threeDaysAfterTomorrow.setDate(threeDaysAfterTomorrow.getDate() + 2);

        const formattedToday = today
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedTomorrow = tomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedDayAfterTomorrow = dayAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedThreeDaysAfterTomorrow = threeDaysAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        arrivalDate = formattedToday;
        departureDate = formattedThreeDaysAfterTomorrow;
      }

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
          'X-RapidAPI-Key': process.env.APIDOJO_KEY,
          'X-RapidAPI-Host': process.env.APIDOJO_HOST,
        },
      };

      let { data } = await axios(options);

      const benefits = data[0]?.top_ufi_benefits?.map((el) => {
        return {
          name: el.translated_name,
          icon: el.icon,
        };
      });
      const policies = data[0]?.hotel_text?.policies.map((el) => {
        return {
          message: el.content,
          name: el.class,
        };
      });
      const importantInformation = data[0]?.hotel_text?.important_information;
      const availableRooms = data[0]?.available_rooms;
      const countryName = data[0]?.country_trans;
      const rooms = data[0]?.rooms;
      const facilities = data[0]?.facilities_block.facilities;
      console.log(data);
      // res.json(data);
      res.status(200).json({
        benefits,
        policies,
        importantInformation,
        availableRooms,
        countryName,
        rooms,
        facilities,
        longitude: data[0]?.longitude,
        city: data[0]?.city,
        price: data[0]?.block[0]?.price_breakdown,
        latitude: data[0]?.latitude,
        priceBreakdown: data[0]?.block_price_breakdown,
        hotelId: data[0]?.hotel_id,
        hotelName: data[0]?.hotel_name,
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }

  static async getRoomHotel(req, res) {
    try {
      console.log('masuk gak?');
      const { id } = req.params;
      let { arrivalDate, departureDate } = req.body;

      if (!arrivalDate || !departureDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        const threeDaysAfterTomorrow = new Date(dayAfterTomorrow);
        threeDaysAfterTomorrow.setDate(threeDaysAfterTomorrow.getDate() + 2);

        const formattedToday = today
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedTomorrow = tomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedDayAfterTomorrow = dayAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        const formattedThreeDaysAfterTomorrow = threeDaysAfterTomorrow
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '-');
        arrivalDate = formattedToday;
        departureDate = formattedThreeDaysAfterTomorrow;
      }
      const options = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms',
        params: {
          hotel_id: id,
          departure_date: departureDate,
          arrival_date: arrivalDate,
          rec_guest_qty: '2',
          rec_room_qty: '1',
          currency_code: 'USD',
          languagecode: 'en-us',
          units: 'imperial',
        },
        headers: {
          'X-RapidAPI-Key': process.env.APIDOJO_KEY,
          'X-RapidAPI-Host': process.env.APIDOJO_HOST,
        },
      };
      const { data } = await axios(options);
      const block = data[0]?.block?.map((el) => {
        return {
          priceBreakDown: el.product_price_breakdown,
          blockId: el.block_id,
          roomId: el.room_id,
          roomName: el.room_name,
          name: el.name,
          roomCount: el.room_count,
          meatplan: el.mealplan,
          roomTypeID: el.roomtype_id,
        };
      });

      res.status(200).json({
        rooms: data[0].rooms,
        block: block,
        hotelId: data[0].hotel_id,
        arrivalDate: data[0].arrival_date,
        departureDate: data[0].departure_date,
      });
    } catch (err) {
      res.json(err);
      console.log(err);
    }
  }

  static async checkInHotel(req, res) {
    try {
      // Create Snap API instance
      let { price, name, email } = req.body;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANDS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            'Your-Order-id' +
            Math.floor(100000000000 + Math.random() * 90000000),
          gross_amount: +price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name,
          email,
        },
      };

      const data = await snap.createTransaction(parameter);
      console.log(data);
      res.json(data);
    } catch (err) {
      console.log(err);
      if (err.name === 'MidtransError') {
        res.json(err.ApiResponse.error_messages[0]);
      } else {
        res.json(err);
      }
    }
  }
}

module.exports = Controller;
