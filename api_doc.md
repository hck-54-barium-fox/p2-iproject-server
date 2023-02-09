## Carbon Footprint API Documentation

## Endpoints : 

List of available endpoints :

- POST /register
- POST /login
- POST /carbon/tobacco
- POST /carbon/vehicle
- GET /products
- POST /product/payment/:id 


## 1. POST /register

Description :
- Create a new user

Request :

- body :

```json
{
  "username": "string",
  "email": "string",
}
```

_Response(201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
}
```

_Resoponse(400 - Bad Request)_

```json
{
    "messsage" : "Email address already in use!" 
}
OR
{
    "messsage" : "Email is required"
}
OR
{
     "messsage" : "Email Format is required"
}
OR
{
     "messsage" : "Password is required"
}
```

## 2. POST /login

Description :
- Log in into website

Request :

- body :

```json
{
  "email": "string",
  "password": "string",
}
```

_Response(200 - OK)_

```json
{
  "access_token" 
}
```

_Resoponse(404 - Bad Request)_

```json
{
    "message" : "Bad Request"
}
```


_Response(401 - Unauthorized)_
```json
{
    "message": "Invalid email or password" 
}
```

## 3. POST /carbon/tobbaco
-Description: get result of carbon footprint from cigarretes price and time to plant a tree in month

Request :

- body :

```json
{
  "price": "integer",
}
```

_Response(200 - OK)_

```json
{
  "co2e":"integer",
  "time" : "integer" 
}
```

_Resoponse(404 - Bad Request)_

```json
{
    "message" : "Bad Request"
}
```

## 4. POST /carbon/vehicle
-Description: get result of carbon footprint from distance in km and time to plant a tree in month

Request :

- body :

```json
{
  "distance": "integer",
}
```

_Response(200 - OK)_

```json
{
  "co2e":"integer",
  "time" : "integer" 
}
```

_Resoponse(404 - Bad Request)_

```json
{
    "message" : "Bad Request"
}
```

## 5. GET /products

Description :
- get all product 
```json
[
    {
         "id": 1,
        "name": "Mahoni Tree",
        "imgUrl": "https://i.pinimg.com/564x/25/24/3f/25243fea81803e0f376cdb9a20625520.jpg",
        "description": "We are super excited to announce that starting in 1st of May 2023, we are planting trees when you shop from us!",
        "price": 125000,
    }
    ...,
]
```

## 6 POST /product/payment/:id
 Description :
 Create payment for buying products by id


_Response(201 - OK)_

```json
{
  "token" : "string",
  "redicrect_url" : "string" 
}
```

_Resoponse(404 - Bad Request)_

```json
{
    "message" : "Bad Request"
}
```












## Global Error

_Response(401 - Unauthorized)_
```json
{
    "message": "Invalid Token" 
}
``

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

