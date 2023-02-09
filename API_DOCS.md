# CR-Wiki API Documentation

## Endpoints:
List of available endpoints:
1. `POST /register`
2. `POST /login`
3. `POST /login-cr`
4. `GET /cards`
5. `POST /players`

Need Authentication

6. `GET /mydeck`
7. `POST /mydeck/:id`

Need Authorization

8. `DELETE /mydeck/:id`

## 1. POST /register
Request:
- body
```json
{
    "email": "papa@pekka.com",
    "password": "11111",
}
```
_Response (201 - Created):_
```json
{
    "user": {
        "id": 11,
        "email": "papa@pekka.com",
        "password": "$2a$10$ERZEWjSPGlVVMjyTgeST3.Q6zITBCksGGdwRmfQn3g4/ihC.pB1US",
        "updatedAt": "2023-02-09T02:12:59.047Z",
        "createdAt": "2023-02-09T02:12:59.047Z"
    }
}
```
 _Response (400 - Bad Request):_
```json
{
    "errorsMessages": [
        {
            "message": "Email must be unique"
        },
        // OR
        {
            "message": "Password is required"
        },
        // OR
        {
            "message": "Password be at least 5 characters long"
        },
        // OR
        {
            "message": "Email is required"
        },
        // OR
        {
            "message": "Please insert e-mail format"
        }
    ]
}
```

## 2. POST /login
Request:
- body
```json
{
    "email": "papa@pekka.com",
    "password": "11111"
}
```

_Response (200 - OK):_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoicGFwYUBwZWtrYS5jb20iLCJpYXQiOjE2NzU5MDg4OTh9.9R3mJaUkZl2J_pT16mjl2tP1hUPDioeUBg8KAxW5EOI",
    "id": 11,
    "username": "papa@pekka.com"
}
```
_Response (401 - Unauthorized):_
```json
{
    "message": "Error invalid username or email or password"
}
```

## 3. POST /login-cr
Request:
- body
```json
{
    "Id": "20LQJPU9"
}
```

_Response (200 - OK):_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJPbGl2ZXJUamFuZHJhQG1haWwuY29tIiwiaWF0IjoxNjc1OTA5MDQ1fQ.UVOXqA4hqT6VwPmPOdry7lg8rA5FPMeSn1RwNz9qZmM",
    "id": 9,
    "email": "OliverTjandra@mail.com"
}
```
 _Response (404 - Not Found):_
```json
{

    "message": "Player not found"
}

```


## 4. GET /cards
Request:
- query
```json
{
    "sort": 1
}
```
_Response (200 - Created):_
```json
[
    {
        "id": 97,
        "name": "Mirror",
        "iconUrl": "https://api-assets.clashroyale.com/cards/300/wC6Cm9rKLEOk72zTsukVwxewKIoO4ZcMJun54zCPWvA.png",
        "elixir": 0,
        "createdAt": "2023-02-07T16:39:39.959Z",
        "updatedAt": "2023-02-07T16:39:39.959Z"
    },
    {
        "id": 32,
        "name": "Fire Spirit",
        "iconUrl": "https://api-assets.clashroyale.com/cards/300/16-BqusVvynIgYI8_Jci3LDC-r8AI_xaIYLgXqtlmS8.png",
        "elixir": 1,
        "createdAt": "2023-02-07T16:39:39.957Z",
        "updatedAt": "2023-02-07T16:39:39.957Z"
    },
    {
        "id": 107,
        "name": "Heal Spirit",
        "iconUrl": "https://api-assets.clashroyale.com/cards/300/GITl06sa2nGRLPvboyXbGEv5E3I-wAwn1Eqa5esggbc.png",
        "elixir": 1,
        "createdAt": "2023-02-07T16:39:39.959Z",
        "updatedAt": "2023-02-07T16:39:39.959Z"
    },
    ...,
]
```

## 5. POST /players
Request:
- body:
```json
{
    "tag": "229LR22C"
}
```
_Response (200 - OK):_
```json
{
    "id": 6,
    "tag": "#229LR22C",
    "name": "IWG",
    "level": 29,
    "trophies": 4308,
    "wins": 1080,
    "losses": 1018,
    "battlecount": 2353,
    "createdAt": "2023-02-08T22:13:19.382Z",
    "updatedAt": "2023-02-08T22:13:19.382Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Player not found"
}
```


## 6. GET /mydeck
_Request_
- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW1pQHBla2thLmNvbSIsImlhdCI6MTY3NTc5MDQ5N30.tTttaMWSqsWl7cS6fqEXg5Eh_t190mSYWp7NTCad3YA"
}
```
_Response (200 - OK):_
```json
[
    {
        "id": 2,
        "UserId": 1,
        "CardId": 2,
        "createdAt": "2023-02-08T03:03:46.093Z",
        "updatedAt": "2023-02-08T03:03:46.093Z",
        "Card": {
            "id": 2,
            "name": "Archers",
            "iconUrl": "https://api-assets.clashroyale.com/cards/300/W4Hmp8MTSdXANN8KdblbtHwtsbt0o749BbxNqmJYfA8.png",
            "elixir": 3,
            "createdAt": "2023-02-07T16:39:39.953Z",
            "updatedAt": "2023-02-07T16:39:39.953Z"
        }
    },
    {
        "id": 3,
        "UserId": 1,
        "CardId": 10,
        "createdAt": "2023-02-08T03:03:52.334Z",
        "updatedAt": "2023-02-08T03:03:52.334Z",
        "Card": {
            "id": 10,
            "name": "Golem",
            "iconUrl": "https://api-assets.clashroyale.com/cards/300/npdmCnET7jmVjJvjJQkFnNSNnDxYHDBigbvIAloFMds.png",
            "elixir": 8,
            "createdAt": "2023-02-07T16:39:39.954Z",
            "updatedAt": "2023-02-07T16:39:39.954Z"
        }
    },
    {
        "id": 15,
        "UserId": 1,
        "CardId": 103,
        "createdAt": "2023-02-08T03:25:57.087Z",
        "updatedAt": "2023-02-08T03:25:57.087Z",
        "Card": {
            "id": 103,
            "name": "Tornado",
            "iconUrl": "https://api-assets.clashroyale.com/cards/300/QJB-QK1QJHdw4hjpAwVSyZBozc2ZWAR9pQ-SMUyKaT0.png",
            "elixir": 3,
            "createdAt": "2023-02-07T16:39:39.959Z",
            "updatedAt": "2023-02-07T16:39:39.959Z"
        }
    }
    ...,
]
```

## 7. POST /mydeck/:id
_Request_
- params:
```json
{
    "id": 10
}
```
- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW1pQHBla2thLmNvbSIsImlhdCI6MTY3NTc5MDQ5N30.tTttaMWSqsWl7cS6fqEXg5Eh_t190mSYWp7NTCad3YA"
}
_Response (201 - Created):_
```json
{
    "id": 30,
    "UserId": 1,
    "CardId": 10,
    "updatedAt": "2023-02-09T02:32:22.337Z",
    "createdAt": "2023-02-09T02:32:22.337Z"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Your deck is full"
}
// OR
{
    "message": "You can only add 1 type card to your deck!"
}
```

## 8. DELETE /mydeck/:id
_Request_
- params:
```json
{
    "id": 10
}
```
- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW1pQHBla2thLmNvbSIsImlhdCI6MTY3NTc5MDQ5N30.tTttaMWSqsWl7cS6fqEXg5Eh_t190mSYWp7NTCad3YA"
}
_Response (201 - Created):_
```json
{
    "id": 30,
    "UserId": 1,
    "CardId": 10,
    "updatedAt": "2023-02-09T02:32:22.337Z",
    "createdAt": "2023-02-09T02:32:22.337Z"
}
```

_Response (200 - OK):_
```json
{
    "message": "Your deck successfully deleted"
}
```
_Response (404 - Not Found):_
```json
{
    "message": "Card not found"
}
```

## Global Error

_Response (401 - Unauthorized):_
```json
{
    "message": "Please login first"
}
```
_Response (403 - Forbidden):_
```json
{
    "message": "You are forbidden to perform this"
}
```

 _Response (500 - Internal Server Error):_
```json
{

    "message": "Interval server error"
}

```