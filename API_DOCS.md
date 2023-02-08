# API DOCUMENTATIONS

## 1. POST /register Endpoint
Description: endpoint ini digunakan untuk mendaftarkan user

Request Body: 
```json
{
    "email": "string",
    "password": "string"
}
```

Response Body: **201** - Created
```json
{
    "id": 1,
    "email": "willy@mail.com"
}
```

Response Error: **400** - Bad Request
```json
{
    "message": "Invalid email format"
}
or
{
    "message": "Email must be unique"
}
or
{
    "message": "Email is required"
}
or 
{
    "message": "Password is required"
}
```

## 2. POST /login Endpoint
Description: endpoint ini digunakan agar user dapat masuk ke dalam website dengan akun yang sudah didaftarkan

Request Body: 
```json
{
    "email": "string",
    "password": "string"
}
```

Response Body: **200** - OK
```json
{
    "access_token": "string"
}
```

Response Error: **400** - Bad Request
```json
{
    "message": "Email is required"
}
or 
{
    "message": "Password is required"
}
```

Response Error: **401** - Unauthorized
```json
{
    "message": "Invalid email / password"
}
```

## 3. GET /taxonomies Endpoint
Description: endpoint ini digunakan untuk mendapatkan taksonomi / kategori event yang dicari

Request Headers: 
```json
{
    "access_token": "string"
}
```

Response Body: **200** - OK
```json
[
    {
        "id": 1010000,
        "name": "Baseball",
        "parent_id": 1000000,
        "short_name": null,
        "slug": "baseball",
        "images": {
            "1200x525": "https://seatgeek.com/images/performers-landscape/generic-baseball-270f67/677220/1200x525.jpg",
            "1200x627": "https://seatgeek.com/images/performers-landscape/generic-baseball-80baea/677220/1200x627.jpg",
            "136x136": "https://seatgeek.com/images/performers-landscape/generic-baseball-f1a0bc/677220/136x136.jpg",
            "500_700": "https://seatgeek.com/images/performers-landscape/generic-baseball-267601/677220/500_700.jpg",
            "800x320": "https://seatgeek.com/images/performers-landscape/generic-baseball-a113cb/677220/800x320.jpg",
            "banner": "https://seatgeek.com/images/performers-landscape/generic-baseball-85ce55/677220/banner.jpg",
            "block": "https://seatgeek.com/images/performers-landscape/generic-baseball-1d17bf/677220/block.jpg",
            "criteo_130_160": "https://seatgeek.com/images/performers-landscape/generic-baseball-d1f9fa/677220/criteo_130_160.jpg",
            "criteo_170_235": "https://seatgeek.com/images/performers-landscape/generic-baseball-30e389/677220/criteo_170_235.jpg",
            "criteo_205_100": "https://seatgeek.com/images/performers-landscape/generic-baseball-fd743e/677220/criteo_205_100.jpg",
            "criteo_400_300": "https://seatgeek.com/images/performers-landscape/generic-baseball-e57b98/677220/criteo_400_300.jpg",
            "fb_100x72": "https://seatgeek.com/images/performers-landscape/generic-baseball-8fec46/677220/fb_100x72.jpg",
            "fb_600_315": "https://seatgeek.com/images/performers-landscape/generic-baseball-5f13f7/677220/fb_600_315.jpg",
            "huge": "https://seatgeek.com/images/performers-landscape/generic-baseball-db0cd2/677220/huge.jpg",
            "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/generic-baseball-ceb899/677220/ipad_event_modal.jpg",
            "ipad_header": "https://seatgeek.com/images/performers-landscape/generic-baseball-89f845/677220/ipad_header.jpg",
            "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/generic-baseball-e71742/677220/ipad_mini_explore.jpg",
            "mongo": "https://seatgeek.com/images/performers-landscape/generic-baseball-f83ff0/677220/mongo.jpg",
            "square_mid": "https://seatgeek.com/images/performers-landscape/generic-baseball-c06ae4/677220/square_mid.jpg",
            "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/generic-baseball-e0f8e0/677220/triggit_fb_ad.jpg"
        },
        "image": "https://seatgeek.com/images/performers-landscape/generic-baseball-db0cd2/677220/huge.jpg",
        "stats": {
            "event_count": 178,
            "performer_count": 124,
            "next_event_datetime_utc": "2023-02-18T00:00:00Z"
        },
        "rank": 0,
        "last_full_index_at": "2023-02-08T12:22:43Z",
        "is_visible": true
    },
]
```



## 4. GET /events/:name Endpoint
Description: endpoint ini digunakan untuk mencari event berdasarkan nama event, tempat, atau performer

Request Headers: 
```json
{
    "access_token": "string"
}
```

Request Params: 
```json
{
    "name": "string"
}
```

Response Body: **200** - OK
```json
[
    {
        "id": 5920919,
        "type": "theater",
        "venue": {
            "state": "CA",
            "venue": "Golden Gate Theatre",
            "location": {
                "lat": 37.7825,
                "lon": -122.411
            },
            "address": "1 Taylor Street",
            "country": "US"
        },
        "title": "Mean Girls - San Francisco",
        "price": 164,
        "date": "2023-02-08",
        "performer": "Mean Girls",
        "image": "https://seatgeek.com/images/performers-landscape/mean-girls-4e8715/195817/huge.jpg"
    },
]
```


## 5. GET /hotels Endpoint
Description: endpoint ini digunakan untuk mencari hotel yang berdekatan terhadap lokasi event

Request Headers: 
```json
{
    "access_token": "string",
    "latitude": "integer",
    "longitude": "integer"
}
```

Response Body: **200** - OK
```json
[
    {
        "name": "string",
        "hotelId": "integer",
        "geoCode": {
            "latitude": "integer",
            "longitude": "integer"
        }
    }
]
```

## 6. GET /eventDetail/:id
Description: endpoint ini digunakan untuk menampilkan detail event sesuai id yang dipilih

Request Headers: 
```json
{
    "access_token": "string"
}
```

Request Params: 
```json
{
    "id": "integer"
}
```

Response Body: **200** - OK
```json
{
    "type": "string",
    "id": "integer",
    "title": "string",
    "date": "string",
    "venue": {
        "state": "string",
        "country": "string",
        "address": "string"
    },
    "performer": {
        "name": "string",
        "image": "string"
    },
    "price": "integer"
}
```


## 7. GLOBAL ERROR
Response Error: **401** - Unauthorized
```json
{
    "message": "Invalid token"
}
```

Response Error: **500** - Internal server error
```json
{
    "message": "Internal server error"
}
```


