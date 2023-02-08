## 1. POST /register
Request:
```
- body:

```json
{
    "username": "string",
    "email": "string",
}
```

_Response (201 - Created)_

```json
{
    "user": {
        "id": 7,
        "username": "register2",
        "email": "register2@gmail.com",
        "password": "$2a$10$xvpFOHiK.GrankzFR34DdeuZuOVnd4vuPBVbDKVvcfLqLTD7Z/s.m",
        "phoneNumber": "08123456789",
        "address": "Ohio",
        "updatedAt": "2023-01-17T15:35:41.072Z",
        "createdAt": "2023-01-17T15:35:41.072Z",
        "role": "admin"
    }
}
```

_Response (400 - Bad Request)_

```json
[
    "email must be unique"
]
OR
{
[
    "Password length minimum is 5!"
]
}
OR
{
[
    "Your input is Not Email"
]
}
OR
{
[
    "Email Required"
]
}
OR
{
[
    "Password Required"
]
}
```


_Response (500 - Internal Server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;

## 2. POST /login

Request:
-headers:
```json
{}
```
- body:

```json
{
    "email": "string",
    "password": "string",
}
```

_Response (200 - Login)_

```json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiY2FrcmExQGdtYWlsLmNvbSIsImlhdCI6MTY3NTg4OTc2M30.bK1J6p-m9sXwmroMyZNK5AQv_HNrcSm4TnD8C13dKzI"
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "required"
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Invalid Login"
}

```

## 3. GET /product
Request:
-headers:
```json
{
    "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJyZWdpc3RlcjVAZ21haWwuY29tIiwiaWF0IjoxNjc0OTA5NjQ5fQ.Ywjp9xqPt24sfH_Pa1C4c7Mg5K_3EsM24uD3Z-iu1jA"
}
```

_Response (200 - OK)_

```json
    [
    {
        "id": 1,
        "name": "Cat Food Chicken Meat",
        "price": 200000,
        "stock": 20,
        "image": "https://s.alicdn.com/@sc04/kf/H5d2cdbac67a34d459d54b015322ed64dM.jpg_300x300.jpg",
        "description": "Natural Canned Food For Cat Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 2,
        "name": "Dog Food",
        "price": 200000,
        "stock": 20,
        "image": "https://s.alicdn.com/@sc04/kf/H0eba8a89870f4b92b696f9b9dcc6fd62e.jpg_300x300.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 3,
        "name": "Whiskas",
        "price": 200000,
        "stock": 20,
        "image": "https://asset.kompas.com/crops/bfkifZfeZH-aCzu9NocPRsnFjPg=/19x12:5634x3756/750x500/data/photo/2021/12/04/61ab16185f7b8.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 4,
        "name": "Meo Kitten",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 5,
        "name": "Whiskas Tuna",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 6,
        "name": "Pro Plan",
        "price": 200000,
        "stock": 20,
        "image": "https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 7,
        "name": "Pro Plan",
        "price": 200000,
        "stock": 20,
        "image": "https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 8,
        "name": "Mainan Kucing",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/8/25/d51eaa47-7604-482d-b3ba-0e9846b1a506.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    }
]
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;