# API DOCUMENTATION

## 1. POST /register endpoint

Endpoint POST /register berfungsi untuk membuat akun yang nantinya akan mengirim verifikasi ke email user untuk mengkonfirmasi acount

Request Body:

```json
{
  "email": "user@gmail.com",
  "name": "user",
  "password": "userpassword"
}
```

Response Status: **201** -created

```json
{ "message": "User created. Verification email sent. " }
```

Response Error: **400** - Bad Request

```json

    {
      "message": "please fill username section"
    }
    OR
    {
      "message": "please fill email section"
    }
    OR
    {
      "message": "Email section must use email format"
    }
    OR
    {
      "message": "please fill password section"
    }

```

Response Error: **500** -Internal Server Error

```json
{
  "message": "Something went wrong please try again latter"
}
```

## 2. POST /login endpoint

Endpoint POST /login berfungsi untuk login untuk user yang telah memiliki account

Request Body

```json
{
  "email": "user@gmail.com",
  "password": "user_password"
}
```

Response Body:
Response Status:**200** -Ok

```json
{
  "access_token": " ... "
}
```

Response Error: **401** - Unauthorized

```json
{
  "message": "invalid user/email"
}
```

Response Error: **500** -Internal Server Error

```json
{
  "message": "Something went wrong please try again latter"
}
```

## 3. GET /verify endpoint

Endpoint GET /verify endpoint berfungsi untuk memverifikasi user yang telah register agar acount nya dapat digunakan

Request Query --optional

```json
{
  "token": "string"
}
```

Response Body:
Response Status:**200** -Ok

```json
{ "message": "User verified." }
```

## 4. POST /forgot-password

Endpoint ini digunakan untuk mengirim konfirmasi ke email bahwa user ingin mengubah password

Request Body

```json
{
  "email": "string"
}
```

Response status : **200**

```json
{ "message": "Email sent" }
```

Response status: **400**

```json
{ "message": "Email is required" }
```

Response status: **401**

```json
{ "message": "User not Register Yet" }
```

## 5. PATCH /reset-password

Endpoint ini digunakan untuk mengirim perubahan password yang di lakukan saat user hit endpoint sebelumnya

Request Query --Required

```json
{
  "token": "string"
}
```

Request Body --Required

```json
{
  "password": "string"
}
```

Response Status: **200**

```json
{ "message": "Password reset successfully" }
```

Response Status: **400**

```json
{ "message": "Invalid Token" }
```

## 6 GET /hotels

Endpoint ini diguanakan untuk mendapatkan semua informasi mengenai hotel

Request Body --Required

```json
{
  "arrivalDate": "2024-12-25",
  "departureDate": "2024-12-28",
  "roomQuantity": 2,
  "childrenQuantity": 1
}
```

Response Status: **200**

```json
{
  "count": 577,
  "unfilteredCount": 3625,
  "hotels": [
    {
      "mainImgUrl": "https://cf.bstatic.com/xdata/images/hotel/square500/125862888.jpg?k=1b749595d5a338e5b26aab5020f5945c247a7182a75babf928a97820cc3bc703&o=",
      "timezone": "Asia/Manila",
      "score": 8.1,
      "city": "Makati",
      "address": "7820 Makati Avenue Barangay Poblacion,",
      "url": "https://www.booking.com/hotel/ph/lub-d-makati-philippines.html",
      "id": "property_card_3019655",
      "currencyCode": "PHP",
      "latitude": 14.5670961378782,
      "longitude": 121.030726752323,
      "district": "Makati",
      "hotelFacilities": "47,449,110,451,492,17,107,20,445,493,455,506,117,51,46,468,459,421,16,448,497,161,209,3,28,184,461,8,456,484,29,446,403,158,458,91,219,426,462,435,186,81,496,401,25,420,486,457,96,140,454,439,473,124,163,22,444,472,48,424,109,147,172,64,450,491,452,181,170,467,143,464,423,418,499,305,142,160,422,57,485,108,210,2,6,453,436,185",
      "hotelId": 3019655,
      "hotelName": "Lub d Philippines Makati",
      "price": {
        "has_fine_print_charges": 0,
        "sum_excluded_raw": 854.05,
        "currency": "PHP",
        "has_incalculable_charges": 0,
        "all_inclusive_price": 4633.05,
        "has_tax_exceptions": 0,
        "gross_price": "3779.00"
      },
      "country": "Philippines"
    },
    ...
  ],
  "searchId": "ab2c35ed611675903994b6f569efac42232:2:111"
}
```

## 7 GET hotels/location

Endpoint ini digunakan untuk mencari 5 tempat wisata berdasrkan query search

Request Query

```json
{
  "search": "Hanoi"
}
```

Response Status : **200**

```json
[
  {
    "imageUrl": "https://cf.bstatic.com/xdata/images/city/350x350/688849.jpg?k=c1f2770a0c096aeb09a6956a9754abbb61b946a932601a4a02bb6aa42d7fa74a&o=",
    "region": "Ha Noi Municipality",
    "country": "Vietnam",
    "hotels": 3807,
    "destId": "-3714993",
    "label": "Hanoi, Ha Noi Municipality, Vietnam",
    "latitude": 21.02788,
    "longitude": 105.8523,
    "hotelId": 3807,
    "nearHotelId": 3807
  },

  ...
]
```

&nbsp;

## 8 GET hotels/:id

Endpoint ini digunakan untuk mendapatkan informasi room-room yang tersidia pada hotel

Request Header

```json
{
  "access_token": "string"
}
```

Request Body --Required

```json
{
  "arrivalDate": "2024-12-25",
  "departureDate": "2024-12-28"
}
```

Response Success: **200** -ok

```json
{
  "rooms": {
    "24584101": {
      "is_high_floor_guaranteed": 0,
      "facilities": [
        {
          "name": "TV",
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "facilitytype_name": "Media & Technology",
          "id": 8,
          "alt_facilitytype_id": 6
        },
        {
          "id": 125,
          "alt_facilitytype_id": 17,
          "alt_facilitytype_name": "Bedroom",
          "facilitytype_id": 8,
          "facilitytype_name": "Services & Extras",
          "name": "Linens"
        },
        {
          "name": "Safe",
          "facilitytype_name": "Room Amenities",
          "alt_facilitytype_name": "General",
          "facilitytype_id": 4,
          "alt_facilitytype_id": 1,
          "id": 6
        },
        {
          "alt_facilitytype_id": 19,
          "id": 132,
          "alt_facilitytype_name": "Accessibility",
          "facilitytype_id": 19,
          "facilitytype_name": "Accessibility",
          "name": "Upper floors accessible by elevator"
        },
        {
          "alt_facilitytype_id": 5,
          "id": 31,
          "name": "Toilet",
          "facilitytype_id": 5,
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom"
        },
        {
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "name": "Flat-screen TV",
          "id": 75,
          "alt_facilitytype_id": 6
        },
        {
          "alt_facilitytype_name": "Services",
          "facilitytype_id": 8,
          "facilitytype_name": "Services & Extras",
          "name": "Wake-up service",
          "alt_facilitytype_id": 3,
          "id": 83
        },
        {
          "alt_facilitytype_id": 6,
          "id": 9,
          "name": "Telephone",
          "facilitytype_id": 6,
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology"
        },
        {
          "name": "Shower",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "alt_facilitytype_id": 5,
          "id": 4
        },
        {
          "alt_facilitytype_id": 12,
          "id": 94,
          "facilitytype_id": 4,
          "alt_facilitytype_name": "Kitchen",
          "facilitytype_name": "Room Amenities",
          "name": "Dryer"
        },
        {
          "name": "Bidet",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "alt_facilitytype_id": 5,
          "id": 100
        },
        {
          "name": "Cable channels",
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "alt_facilitytype_id": 6,
          "id": 68
        },
        {
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Services & Extras",
          "facilitytype_id": 8,
          "name": "Towels",
          "id": 124,
          "alt_facilitytype_id": 5
        },
        {
          "id": 95,
          "alt_facilitytype_id": 17,
          "alt_facilitytype_name": "Bedroom",
          "facilitytype_name": "Room Amenities",
          "facilitytype_id": 4,
          "name": "Wardrobe or closet"
        },
        {
          "alt_facilitytype_id": 5,
          "id": 27,
          "name": "Free toiletries",
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5
        },
        {
          "name": "Toilet paper",
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "id": 141,
          "alt_facilitytype_id": 5
        },
        {
          "alt_facilitytype_id": 1,
          "id": 11,
          "name": "Air conditioning",
          "facilitytype_name": "Room Amenities",
          "alt_facilitytype_name": "General",
          "facilitytype_id": 4
        },
        {
          "name": "Slippers",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "id": 43,
          "alt_facilitytype_id": 5
        },
        {
          "id": 38,
          "alt_facilitytype_id": 5,
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "name": "Private bathroom"
        },
        {
          "name": "Hairdryer",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "facilitytype_name": "Bathroom",
          "id": 12,
          "alt_facilitytype_id": 5
        }
      ],
      "private_bathroom_count": 0,
      "photos": [
        {
          "last_update_date": "2019-02-25 12:29:35",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "photo_id": 183611678,
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "new_order": 0,
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "ratio": 1.5
        },
        {
          "ratio": 1.33333333333333,
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "photo_id": 183967005,
          "last_update_date": "2019-02-27 11:24:07",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "new_order": 1
        },
        {
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "last_update_date": "2019-02-27 11:21:36",
          "photo_id": 183966665,
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "new_order": 2,
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "ratio": 1.33333333333333
        },
        {
          "ratio": 1.33333333333333,
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "photo_id": 183966668,
          "last_update_date": "2019-02-27 11:21:37",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "new_order": 3
        }
      ],
      "children_and_beds_text": {
        "children_at_the_property": [
          {
            "text": "Children of all ages are welcome.",
            "highlight": 0
          },
          {
            "highlight": 0,
            "text": "Children 13 and above are considered adults at this property."
          },
          {
            "highlight": 1,
            "text": "To see correct prices and occupancy info, add the number and ages of children in your group to your search."
          }
        ],
        "cribs_and_extra_beds": [
          {
            "highlight": 0,
            "text": "No capacity for extra beds or cribs."
          }
        ],
        "age_intervals": [],
        "allow_children": 1
      },
      "highlights": [
        {
          "translated_name": "Free WiFi",
          "icon": "icon_wifi"
        },
        {
          "icon": "icon_airconditioning",
          "id": 11,
          "translated_name": "Air conditioning"
        },
        {
          "icon": "icon_bath",
          "id": 38,
          "translated_name": "Attached bathroom"
        },
        {
          "translated_name": "Flat-screen TV",
          "icon": "icon_flattv",
          "id": 75
        }
      ],
      "private_bathroom_highlight": {
        "text": "Private bathroom with shower",
        "has_highlight": 1
      },
      "bed_configurations": [
        {
          "bed_types": [
            {
              "name": "",
              "description": "131–150 cm wide",
              "description_localized": null,
              "bed_type": 2,
              "description_imperial": "52–59 inches wide",
              "name_with_count": "1 full bed",
              "count": 1
            }
          ]
        }
      ],
      "description": "Rooms are air-conditioned and feature a flat-screen TV with cable channels and an attached bathroom with shower facilities.\n\nRooms are fitted with a queen-size bed."
    }
  },
  "block": [
    {
      "priceBreakDown": {
        "has_long_stays_weekly_rate_price": 0,
        "gross_amount_per_night": {
          "currency": "USD",
          "value": 31.0687462876709
        },
        "excluded_amount": {
          "value": 14.912998218082,
          "currency": "USD"
        },
        "gross_amount_hotel_currency": {
          "value": 6846.31,
          "currency": "PHP"
        },
        "all_inclusive_amount": {
          "value": 139.187983368766,
          "currency": "USD"
        },
        "gross_amount": {
          "value": 124.274985150684,
          "currency": "USD"
        },
        "discounted_amount": {
          "currency": "USD",
          "value": 72.9867375700596
        },
        "strikethrough_amount": {
          "currency": "USD",
          "value": 197.261722720743
        },
        "nr_stays": 7,
        "net_amount": {
          "value": 124.274985150684,
          "currency": "USD"
        },
        "has_long_stays_monthly_rate_price": 0,
        "benefits": [
          {
            "badge_variant": "constructive",
            "name": "Mobile-only price",
            "identifier": "mobile-rate",
            "icon": null,
            "kind": "badge",
            "details": "You’re getting a reduced rate because this property is offering a discount when you book from a mobile device."
          }
        ],
        "strikethrough_amount_per_night": {
          "currency": "USD",
          "value": 49.3154306801858
        },
        "items": [
          {
            "name": "Mobile-only price",
            "item_amount": {
              "currency": "USD",
              "value": 13.8083115143961
            },
            "identifier": "mobile-discount",
            "kind": "discount",
            "base": {
              "kind": "rate"
            },
            "details": "You're getting a reduced rate because you're using a mobile device."
          }
        ],
        "included_taxes_and_charges_amount": {
          "value": 0,
          "currency": "USD"
        }
      },
      "blockId": "24584101_272392741_0_2_0",
      "roomId": 24584101,
      "roomName": "Standard Queen Room",
      "name": "Standard Queen Room - Low rate – no money back",
      "roomCount": 14,
      "meatplan": "Continental breakfast costs US$5 per person per night.",
      "roomTypeID": 9
    }
  ],
  "hotelId": 245841,
  "arrivalDate": "2023-02-08",
  "departureDate": "2023-02-12"
}
```

## 9 GET hotels/properties/:id

Endpoint ini digunakan untuk mendapatkan informasi berbagai property yang tersedia pada hotel
Request Header

```json
{
  "access_token": "string"
}
```

Request Body --Required

```json
{
  "arrivalDate": "2024-12-25",
  "departureDate": "2024-12-28"
}
```

Response Success : **200** -ok

```json
{
  "rooms": {
    "24584101": {
      "is_high_floor_guaranteed": 0,
      "facilities": [
        {
          "name": "TV",
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "facilitytype_name": "Media & Technology",
          "id": 8,
          "alt_facilitytype_id": 6
        },
        {
          "id": 125,
          "alt_facilitytype_id": 17,
          "alt_facilitytype_name": "Bedroom",
          "facilitytype_id": 8,
          "facilitytype_name": "Services & Extras",
          "name": "Linens"
        },
        {
          "name": "Safe",
          "facilitytype_name": "Room Amenities",
          "alt_facilitytype_name": "General",
          "facilitytype_id": 4,
          "alt_facilitytype_id": 1,
          "id": 6
        },
        {
          "alt_facilitytype_id": 19,
          "id": 132,
          "alt_facilitytype_name": "Accessibility",
          "facilitytype_id": 19,
          "facilitytype_name": "Accessibility",
          "name": "Upper floors accessible by elevator"
        },
        {
          "alt_facilitytype_id": 5,
          "id": 31,
          "name": "Toilet",
          "facilitytype_id": 5,
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom"
        },
        {
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "name": "Flat-screen TV",
          "id": 75,
          "alt_facilitytype_id": 6
        },
        {
          "alt_facilitytype_name": "Services",
          "facilitytype_id": 8,
          "facilitytype_name": "Services & Extras",
          "name": "Wake-up service",
          "alt_facilitytype_id": 3,
          "id": 83
        },
        {
          "alt_facilitytype_id": 6,
          "id": 9,
          "name": "Telephone",
          "facilitytype_id": 6,
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology"
        },
        {
          "name": "Shower",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "alt_facilitytype_id": 5,
          "id": 4
        },
        {
          "alt_facilitytype_id": 12,
          "id": 94,
          "facilitytype_id": 4,
          "alt_facilitytype_name": "Kitchen",
          "facilitytype_name": "Room Amenities",
          "name": "Dryer"
        },
        {
          "name": "Bidet",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "alt_facilitytype_id": 5,
          "id": 100
        },
        {
          "name": "Cable channels",
          "alt_facilitytype_name": "Media & Technology",
          "facilitytype_name": "Media & Technology",
          "facilitytype_id": 6,
          "alt_facilitytype_id": 6,
          "id": 68
        },
        {
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Services & Extras",
          "facilitytype_id": 8,
          "name": "Towels",
          "id": 124,
          "alt_facilitytype_id": 5
        },
        {
          "id": 95,
          "alt_facilitytype_id": 17,
          "alt_facilitytype_name": "Bedroom",
          "facilitytype_name": "Room Amenities",
          "facilitytype_id": 4,
          "name": "Wardrobe or closet"
        },
        {
          "alt_facilitytype_id": 5,
          "id": 27,
          "name": "Free toiletries",
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5
        },
        {
          "name": "Toilet paper",
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "id": 141,
          "alt_facilitytype_id": 5
        },
        {
          "alt_facilitytype_id": 1,
          "id": 11,
          "name": "Air conditioning",
          "facilitytype_name": "Room Amenities",
          "alt_facilitytype_name": "General",
          "facilitytype_id": 4
        },
        {
          "name": "Slippers",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "id": 43,
          "alt_facilitytype_id": 5
        },
        {
          "id": 38,
          "alt_facilitytype_id": 5,
          "facilitytype_name": "Bathroom",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "name": "Private bathroom"
        },
        {
          "name": "Hairdryer",
          "alt_facilitytype_name": "Bathroom",
          "facilitytype_id": 5,
          "facilitytype_name": "Bathroom",
          "id": 12,
          "alt_facilitytype_id": 5
        }
      ],
      "private_bathroom_count": 0,
      "photos": [
        {
          "last_update_date": "2019-02-25 12:29:35",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "photo_id": 183611678,
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "new_order": 0,
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183611678.jpg?k=c014c057bdb7021b25837880629aafc8336fbe78394c239f44cc84be960412e5&o=",
          "ratio": 1.5
        },
        {
          "ratio": 1.33333333333333,
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "photo_id": 183967005,
          "last_update_date": "2019-02-27 11:24:07",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183967005.jpg?k=d68887f7e5f767a668fd8c64bf895e9f9c1d5c7e80085825d55bafd1eb51c5a4&o=",
          "new_order": 1
        },
        {
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "last_update_date": "2019-02-27 11:21:36",
          "photo_id": 183966665,
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "new_order": 2,
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183966665.jpg?k=818894240cd29ca29bca8b65a72c6d3340e714c7bb002dba46e9e7750fa49955&o=",
          "ratio": 1.33333333333333
        },
        {
          "ratio": 1.33333333333333,
          "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "photo_id": 183966668,
          "last_update_date": "2019-02-27 11:21:37",
          "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/183966668.jpg?k=a27e57e67f0fce3e07cdaaf34f8bd8386f23a842747859a9462bc43b9c764ff0&o=",
          "new_order": 3
        }
      ],
      "children_and_beds_text": {
        "children_at_the_property": [
          {
            "text": "Children of all ages are welcome.",
            "highlight": 0
          },
          {
            "highlight": 0,
            "text": "Children 13 and above are considered adults at this property."
          },
          {
            "highlight": 1,
            "text": "To see correct prices and occupancy info, add the number and ages of children in your group to your search."
          }
        ],
        "cribs_and_extra_beds": [
          {
            "highlight": 0,
            "text": "No capacity for extra beds or cribs."
          }
        ],
        "age_intervals": [],
        "allow_children": 1
      },
      "highlights": [
        {
          "translated_name": "Free WiFi",
          "icon": "icon_wifi"
        },
        {
          "icon": "icon_airconditioning",
          "id": 11,
          "translated_name": "Air conditioning"
        },
        {
          "icon": "icon_bath",
          "id": 38,
          "translated_name": "Attached bathroom"
        },
        {
          "translated_name": "Flat-screen TV",
          "icon": "icon_flattv",
          "id": 75
        }
      ],
      "private_bathroom_highlight": {
        "text": "Private bathroom with shower",
        "has_highlight": 1
      },
      "bed_configurations": [
        {
          "bed_types": [
            {
              "name": "",
              "description": "131–150 cm wide",
              "description_localized": null,
              "bed_type": 2,
              "description_imperial": "52–59 inches wide",
              "name_with_count": "1 full bed",
              "count": 1
            }
          ]
        }
      ],
      "description": "Rooms are air-conditioned and feature a flat-screen TV with cable channels and an attached bathroom with shower facilities.\n\nRooms are fitted with a queen-size bed."
    }
  },
  "block": [
    {
      "priceBreakDown": {
        "has_long_stays_weekly_rate_price": 0,
        "gross_amount_per_night": {
          "currency": "USD",
          "value": 31.0687462876709
        },
        "excluded_amount": {
          "value": 14.912998218082,
          "currency": "USD"
        },
        "gross_amount_hotel_currency": {
          "value": 6846.31,
          "currency": "PHP"
        },
        "all_inclusive_amount": {
          "value": 139.187983368766,
          "currency": "USD"
        },
        "gross_amount": {
          "value": 124.274985150684,
          "currency": "USD"
        },
        "discounted_amount": {
          "currency": "USD",
          "value": 72.9867375700596
        },
        "strikethrough_amount": {
          "currency": "USD",
          "value": 197.261722720743
        },
        "nr_stays": 7,
        "net_amount": {
          "value": 124.274985150684,
          "currency": "USD"
        },
        "has_long_stays_monthly_rate_price": 0,
        "benefits": [
          {
            "badge_variant": "constructive",
            "name": "Mobile-only price",
            "identifier": "mobile-rate",
            "icon": null,
            "kind": "badge",
            "details": "You’re getting a reduced rate because this property is offering a discount when you book from a mobile device."
          }
        ],
        "strikethrough_amount_per_night": {
          "currency": "USD",
          "value": 49.3154306801858
        },
        "items": [
          {
            "name": "Mobile-only price",
            "item_amount": {
              "currency": "USD",
              "value": 13.8083115143961
            },
            "identifier": "mobile-discount",
            "kind": "discount",
            "base": {
              "kind": "rate"
            },
            "details": "You're getting a reduced rate because you're using a mobile device."
          }
        ],
        "included_taxes_and_charges_amount": {
          "value": 0,
          "currency": "USD"
        }
      },
      "blockId": "24584101_272392741_0_2_0",
      "roomId": 24584101,
      "roomName": "Standard Queen Room",
      "name": "Standard Queen Room - Low rate – no money back",
      "roomCount": 14,
      "meatplan": "Continental breakfast costs US$5 per person per night.",
      "roomTypeID": 9
    }
  ],
  "hotelId": 245841,
  "arrivalDate": "2023-02-08",
  "departureDate": "2023-02-12"
}
```

## 10 POST /check-id

Endpoint ini digunakan untuk megirim token midtrans yang akan di guanakan user untuk melakukan boking hotel
Request Header

```json
{
  "access_token": "string"
}
```

Request Body --Required

```json
{
  "price": 10000,
  "name": "bisma",
  "email": "bisma@gmail.com"
}
```

Response Success: **200**

```json
{
  "token": "string",
  "redirectUrl": "string"
}
```

Response Error: **400**

```json
{
  "message": "price must be integer"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
