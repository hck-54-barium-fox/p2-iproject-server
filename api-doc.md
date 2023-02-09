# NBA Stats MVP Ladder API Documentation



&nbsp;

## Models :

_User_

```
- username: string, required, unique
- email : string, required, unique
- password : string, required
- status: string, (default : 'member')
```

_Transaction_

```
- log : string, required
- paymentDate : date, required
- paymentBy : string, required
```

_Player_

```
- name : string, required
- imageUrl : string, required
- team : string, required
- position : string, required
- number : integer, required
- thirdapiId : integer, required,
- teamImageUrl : string, required,
- bio : string, required
```

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /players`

Routes below need authentication:

- `GET /profile`
- `PATCH /subscribe`
- `POST /generate-midtrans-token`


Routes below need authentication & authorization:

- `GET /players/:id`
- `GET /players//third/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "status" : "member"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "email has been taken"
}
OR
{
  "message": "username has been taken"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "username is required"
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
  "access_token": "string"
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
  "message": "Email or Password not found"
},

```

&nbsp;

## 3. GET /players

Description:
- Get all player from database

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
        "name": "Nikola Jokic",
        "imageUrl": "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
        "team": "Denver Nugget",
        "position": "Center",
        "number": 15,
        "thirdapiId": 279,
        "teamImageUrl": "https://cdn.nba.com/logos/nba/1610612743/global/D/logo.svg",
        "bio": "Denver Nuggets (2015–present) On June 26, 2014, Jokić was selected by the Denver Nuggets with the 41st overall pick in the 2014 NBA draft. 2015–16 season In the summer of 2015, Jokić joined the Denver Nuggets, one season after being drafted.",
        "createdAt": "2023-02-08T23:35:33.506Z",
        "updatedAt": "2023-02-08T23:35:33.506Z"
    },
    {
        "id": 2,
        "name": "Joel Embiid",
        "imageUrl": "https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png",
        "team": "Philadelphia 76ers",
        "position": "Center, Power Forward",
        "number": 21,
        "thirdapiId": 159,
        "teamImageUrl": "https://cdn.nba.com/logos/nba/1610612755/global/D/logo.svg",
        "bio": "Holds career averages of 16.4 points (.554% FG, .583% FT), 8.5 rebounds, 7.5 assists and 34.0 minutes in 160 games (160 starts) over 2 NBA seasons with Philadelphia",
        "createdAt": "2023-02-08T23:35:33.506Z",
        "updatedAt": "2023-02-08T23:35:33.506Z"
    },
    ...
  ]
  ```

&nbsp;

## 4. GET /profile

Description:
- Get profile whos login

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Created)_

```json
{
  {
    "id": 1,
    "status": "premium"
}
}
```


&nbsp;

## 5. PATCH /subscribe

Description:
- UPDATE STATUS TO PREMIUM

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
      "message": "testing2 has been subscribe"
    }
  ]
```

&nbsp;

## 6. POST '/generate-midtrans-token

Description:
- generate midtrans token

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
    "token": "1f13298a-f247-4a64-97c3-5b5261833dee",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/1f13298a-f247-4a64-97c3-5b5261833dee"
  }
  ```

_Response (400 - Bad Request)_

```json
{
  "message": "Already Subscribe"
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