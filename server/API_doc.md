# Movie API Documentation

## Endpoints :

List of available endpoints:

-   `POST /register`
-   `POST /login`
-   `GET /planets`
-   `GET /apod`
-   `GET /planets/:id`
-   `PATCH /subscribe`
-   `post /transaction`

&nbsp;

## 1. POST /register

-   body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "updatedAt": "date",
    "createdAt": "date",
    "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        {
            "message": "Email is required"
        }
    ]
}
```

&nbsp;

## 2. POST /login

Request:

-   body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "token": "string",
    "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /planets

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
   {
        "id": 6,
        "name": "Saturn",
        "description": "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.",
        "img": {
            "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
            "imgDescription": "Pictured in natural color approaching equinox, photographed by Cassini in July 2008; the dot in the bottom left corner is Titan."
        },
        "keyId": "45l1h8dab43b"
    },
   {
        "id": 5,
        "name": "Jupiter",
        "description": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.",
        "img": {
            "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
            "imgDescription": "Full disk view in natural colour, taken by the Hubble Space Telescope in April 2014"
        },
        "keyId": "75oii1s99r6e"
    }
  ...,
]
```

## 4. GET /planets/:id

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
    "id": 5,
    "name": "Jupiter",
    "description": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.",
    "img": {
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
        "imgDescription": "Full disk view in natural colour, taken by the Hubble Space Telescope in April 2014"
    },
    "keyId": "75oii1s99r6e"
}
```

## 5. GET /apod

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "copyright": "Mike SelbyMark HansonNatalia LewandowskaSUNY Oswego",
    "date": "2023-02-08",
    "explanation": "Imagine traveling to a star about 100 times as massive as our Sun, a million times more luminous, and with 30 times the surface temperature. Such stars exist, and some are known as Wolf Rayet (WR) stars, named after French astronomers Charles Wolf and Georges Rayet. The central star in this image is WR 40 which is located toward the constellation of Carina. Stars like WR 40 live fast and die young in comparison with the Sun. They quickly exhaust their core hydrogen supply, move on to fusing heavier core elements, and expand while ejecting their outer layers via high stellar winds. In this case, the central star WR 40 ejects the atmosphere at a speed of nearly 100 kilometers per second, and these outer layers have become the expanding oval-shaped nebula RCW 58.   Almost Hyperspace: Random APOD Generator",
    "hdurl": "https://apod.nasa.gov/apod/image/2302/Rcw58_Selby_4326.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Stellar Wind-Shaped Nebula RCW 58",
    "url": "https://apod.nasa.gov/apod/image/2302/Rcw58_Selby_960.jpg"
}
```

&nbsp;

## 6. patch /subscribe

Description:

-   Get all histories from database

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (201 - created)_

```json
{
    "message": "user with email daffa@gmail.com success subscribe"
}
```

&nbsp;

## 7. POST /transaction


Request:
-   headers:

```json
{
    "access_token": "string"
}
```
_Response (201 - Created)_

```json
{
    "token": "string",
    "redirect_url": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        {
            "message": "Email is required"
        }
    ]
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```
