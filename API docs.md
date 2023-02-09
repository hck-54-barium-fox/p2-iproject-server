# RestOPhone API Documentation



## Models :

_User_

```
- email : string, required, unique
- password : string, required
- phoneNumber : string, required
- image : string, required
- noIdentity : string, required
```

_Smartphone_

```
- brand : string, required
- name : string, required
- imageUrl : string, required
- description : text, required
- price : integer, required
```

_MyHero_

```
- status : string, (default: "Unpaid")
- SmartphoneId : integer, required
- UserId : integer, required
```


## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /googleSignIn`
- `GET /smartphones`
- `GET /smartphones/:id`

Routes below need authentication:

- `GET /transactions`
- `PATCH /transactions/:id`
- `POST /transactions/:smartphone`
- `POST /createMidtransToken/:price`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "image": "string",
  "noIdentity": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 3. GET /smartphones

Description:
- Get all smartphones from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "brand": "Apple",
        "name": "Iphone 14 Pro Max",
        "imageUrl": "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png",
        "description": "iPhone 14 Pro Max memiliki layar Super Retina XDR menyeluruh 6,7 inci1. Bagian belakangnya terbuat dari kaca matte premium dan terdapat lapisan baja tahan karat dengan tepian rata di sekeliling rangka. Tombol samping berada di sisi kanan perangkat. Terdapat tiga kamera di bagian belakang: Ultra Lebar, Utama, dan Telefoto.",
        "price": 1350000,
        "createdAt": "2023-02-08T18:49:41.063Z",
        "updatedAt": "2023-02-08T18:49:41.063Z"
    },
    {
        "id": 2,
        "brand": "Apple",
        "name": "Iphone 14 Pro",
        "imageUrl": "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-colors.png",
        "description": "iPhone 14 Pro memiliki layar Super Retina XDR menyeluruh 6,1 inci1. Bagian belakangnya terbuat dari kaca matte premium dan terdapat lapisan baja tahan karat dengan tepian rata di sekeliling rangka. Tombol samping berada di sisi kanan perangkat. Terdapat tiga kamera di bagian belakang: Ultra Lebar, Utama, dan Telefoto.",
        "price": 1300000,
        "createdAt": "2023-02-08T18:49:41.063Z",
        "updatedAt": "2023-02-08T18:49:41.063Z"
    },
  ...
]
```

&nbsp;

## 4. GET /smartphones/:id

Description:
- Get detail smartphone by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "brand": "Apple",
    "name": "Iphone 14 Pro Max",
    "imageUrl": "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png",
    "description": "iPhone 14 Pro Max memiliki layar Super Retina XDR menyeluruh 6,7 inci1. Bagian belakangnya terbuat dari kaca matte premium dan terdapat lapisan baja tahan karat dengan tepian rata di sekeliling rangka. Tombol samping berada di sisi kanan perangkat. Terdapat tiga kamera di bagian belakang: Ultra Lebar, Utama, dan Telefoto.",
    "price": 1350000,
    "createdAt": "2023-02-08T18:49:41.063Z",
    "updatedAt": "2023-02-08T18:49:41.063Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. GET /transactions

Description:
- Get all data transaction 

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string"
}
```

&nbsp;

## 6. PATCH /transactions/:id

Description:
- Update hero status to Paid

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "success payment"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 6. POST /transactions/:smartphone

Description:
- Add a new transaction

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "smartphone": "integer"
}
```

_Response (200 - OK)_

```json
{
    "transaction": {
        "data": {
            "id": 1,
            "UserId": 1,
            "SmartphoneId": 1,
            "updatedAt": "2023-02-08T15:30:39.379Z",
            "createdAt": "2023-02-08T15:30:39.379Z",
            "status": "Unpaid"
        },
        "smartphone": {
            "id": 1,
            "brand": "Apple",
            "name": "Iphone 14 Pro Max",
            "imageUrl": "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png",
            "description": "iPhone 14 Pro Max memiliki layar Super Retina XDR menyeluruh 6,7 inci1. Bagian belakangnya terbuat dari kaca matte premium dan terdapat lapisan baja tahan karat dengan tepian rata di sekeliling rangka. Tombol samping berada di sisi kanan perangkat. Terdapat tiga kamera di bagian belakang: Ultra Lebar, Utama, dan Telefoto.",
            "price": 100000,
            "createdAt": "2023-02-08T10:50:37.607Z",
            "updatedAt": "2023-02-08T10:50:37.607Z"
        }
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Login First"
}
```


_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```