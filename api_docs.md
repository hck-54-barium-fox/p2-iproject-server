# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /getbmi`
- `GET /listofbodypart`
- `GET /exercisebybodypart`
- `GET /listofequipment`
- `GET /exercisebyequipment`
- `GET /trainer`
- `GET /addmyexercise`
- `GET /myexercise`


&nbsp;

## 1. POST /register

Request:

- body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string",
}
```

_Response (201 - Created)_

```json
{
    "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "password": "string",
        "phoneNumber": "string",
        "address": "string",
        "updatedAt": "date",
        "createdAt": "date",
        "role": "string"
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

## 2. GET /login

Request:

- body:

```json
{
    "email": "string",
    "password": "string",
}
```

_Response (201 - Login)_

```json

   {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJyZWdpc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzM5NzAwNTZ9.QTKYInqq66eyuNypou_uVoAQycEEnxHy1jNv-Uu6mmM"
  }

```

_Response (400 - Bad Request)_

```json
{
    "error": "invalid email or password"
}
```

&nbsp;

## 3. GET /getbmi

Description:
- Find users bmi based on weight and height

Request:

- headers:

```json
{
  "access_token": "string",
}
```


_Response (200 - OK)_

```json
{
    {
    "name": "string",
    "info": {
        "bmi": "integer",
        "health": "string",
        "healthy_bmi_range": "string"
    }
}
}


&nbsp;

## 4. DELETE /listofbodypart

Description:
- Get list of all bodypart

Request:

- headers:

```json
{
  "access_token": "string",
}
```

_Response (200 - OK)_

```json
[
    "string"
]
```


&nbsp;

## 5. GET /exercisebybodypart

Description:
- Get all genre datas

Request:
- headers:
- params

```json
{
  "access_token": "string",
}
{
    "bodyPart" : "string"
}
```
_Response (200 - OK)_

```json
[
    {
         "bodyPart": "back",
        "equipment": "cable",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
        "id": "0007",
        "name": "alternate lateral pulldown",
        "target": "lats"
    }
]
```

## 6. GET /listofequipment

Request:
- headers:
- params

```json
{
  "access_token": "string",
}

_Response (201 - Created)_

```json
[
    "string"
]
```

## 7. GET /exercisebyequipment

Description:
- Get all exercise by equipment datas

Request:
- headers:
- params

```json
{
  "access_token": "string",
}
{
    "equipment" : "string"
}
```

_Response (201 - Login)_

```json

  [
    {
        "bodyPart": "chest",
        "equipment": "leverage machine",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0009.gif",
        "id": "0009",
        "name": "assisted chest dip (kneeling)",
        "target": "pectorals"
    },
  ]

```

_Response (400 - Bad Request)_

```json
{
    "error": "invalid email or password"
}
```


## 8. GET /trainer

Description:
- get trainer data

Request:
- headers:

```json
{
  "access_token": "string",
}
```


_Response (201 - Created)_

```json
{
     {
        "id": 1,
        "UserId": 1,
        "bodyPart": "back",
        "equipment": "cable",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
        "name": "lat pulldown",
        "target": "back",
        "createdAt": "2023-02-08T20:59:01.892Z",
        "updatedAt": "2023-02-08T20:59:01.892Z"
    }
}

```

## 9. POST /addmyexercise

Description:
- Remove a genre data based on given id

Request:

- headers:

```json
{
  "access_token": "string",
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
  {
    "id": 6,
    "UserId": 1,
    "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
    "name": "lat pulldown",
    "target": "back",
    "updatedAt": "2023-02-09T03:37:32.430Z",
    "createdAt": "2023-02-09T03:37:32.430Z"
}
}
```

## 10. GET /myexercise

Description:
- get my exercise data

Request:
- headers:

```json
{
  "access_token": "string",
}
```

- body:

```json
 {
        "id": 1,
        "UserId": 1,
        "bodyPart": "back",
        "equipment": "cable",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
        "name": "lat pulldown",
        "target": "back",
        "createdAt": "2023-02-08T20:59:01.892Z",
        "updatedAt": "2023-02-08T20:59:01.892Z"
    },
```

_Response (200 - OK)_

```


## 11. POST /midtrans-token

Description:
- get mid trans token

Request:
- headers:

```json
{
  "access_token": "string",
}
```

- body:

```json
{
    "status": "string"
}
```

_Response (200 - OK)_

```json
{
    "token": "3cd7f690-187f-4214-a376-449a4640c786",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/3cd7f690-187f-4214-a376-449a4640c786"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "msg": "Something went wrong, please try again"
}
```