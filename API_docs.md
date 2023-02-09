# News API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /verify`
- `GET /posts`
- `GET /posts/:id`
- `POST /posts/:id/like`
- `GET /memes`
- `POST /memes`
- `POST /memes/postMeme`
- `POST /memes/memeMulter`
- `POST /memes/:memeId`

&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "message": "Register Successfully",
  "userRegisterData": {
    "status": false,
    "id": 19,
    "username": "kazama",
    "email": "kazama@gmail.com",
    "password": "$2b$10$PHeWHiomlIR97ncKuxpd0uiowBWXki.T.wzsjZtH2wlj3FEQjTKH.",
    "updatedAt": "2023-02-09T04:17:28.746Z",
    "createdAt": "2023-02-09T04:17:28.746Z",
    "verifyToken": "7765fb6e42ed459aea87"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email must be unique"
}
OR
{
    "errors": [
        {
            "message": "Email is Required"
        },
        {
            "message": "Email cannot be empty"
        },
        {
            "message": "Password is Required"
        },
        {
            "message": "Password cannot be empty"
        },
        {
            "message": "Minimum 5 characters required in password"
        }
    ]
}

```

## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized (Invalid Username / Email / Password)_

```json
{
  "message": "Invalid Email / Password"
}
```

## 3. GET /verify

Description:

- GET /verify digunakan untuk menvalidasi emmail user

Request:

- headers:

```json
{
  "access_token": "token"
}
```

_Response (200 - OK)_

```json
{ "message": "Your Email has been verified" }
```

## 3. GET /posts

Description:

- GET /posts digunakan untuk menampilkan list dari posts meme.

_Response (200 - OK)_

```json
[
  {
    "id": 11,
    "title": "me at my birthday:",
    "imgUrl": "https://i.imgflip.com/5h9ebm.jpg",
    "createdAt": "2023-02-08T15:40:03.898Z",
    "updatedAt": "2023-02-08T15:40:03.898Z",
    "UserId": 8,
    "User": {
      "id": 8,
      "username": "hamzah",
      "email": "hamzah@gmail.com",
      "status": true,
      "verifyToken": null,
      "createdAt": "2023-02-08T15:29:54.161Z",
      "updatedAt": "2023-02-08T15:35:11.970Z"
    },
    "Likes": []
  },
  {
    "id": 17,
    "title": "sada",
    "imgUrl": "https://i.imgflip.com/7aht0i.jpg",
    "createdAt": "2023-02-09T02:38:51.278Z",
    "updatedAt": "2023-02-09T02:38:51.278Z",
    "UserId": 16,
    "User": {
      "id": 16,
      "username": "afro",
      "email": "afro.hendro@gmail.com",
      "status": true,
      "verifyToken": "",
      "createdAt": "2023-02-08T16:22:29.613Z",
      "updatedAt": "2023-02-08T16:23:00.571Z"
    },
    "Likes": []
  }
]
```

## 4. GET /posts/:id

Description:

- GET /posts/:id digunakan untuk menampilkan post berdasar id yang dipilih

_Response (200 - OK)_

```json
{
  "id": 3,
  "title": "Buff Doge vs. Cheems",
  "imgUrl": "https://i.imgflip.com/6wac2a.jpg",
  "createdAt": "2023-02-08T15:40:03.898Z",
  "updatedAt": "2023-02-08T15:40:03.898Z",
  "UserId": 8
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 5. POST /posts/:id/like

Description:

- POST /posts/:id/like digunakan untuk menambahkan like pada posts
  Request:

- headers:

_Response (200 - OK)_

```json
{
  "id": 1,
  "UserId": 1,
  "PostId": 1,
  "createdAt": "2023-02-07T07:41:42.278Z",
  "updatedAt": "2023-02-07T07:41:42.278Z"
}
```

## 6. GET /memes

Description:

- GET /memes digunakan untuk menampilkan seluaruh template meme.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

Response Body:

```json
[
  {
    "id": "181913649",
    "name": "Drake Hotline Bling",
    "url": "https://i.imgflip.com/30b1gx.jpg",
    "width": 1200,
    "height": 1200,
    "box_count": 2,
    "captions": 0
  },
  {
    "id": "87743020",
    "name": "Two Buttons",
    "url": "https://i.imgflip.com/1g8my4.jpg",
    "width": 600,
    "height": 908,
    "box_count": 3,
    "captions": 0
  }
]
```

## 7. POST /memes

Description:

- POST /memes digunakan untuk melakukan Generate Meme.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "text0": "string (required)",
  "text1": "string ",
  "text2": "string ",
  "text3": "string ",
  "text4": "string ",
  "text5": "string "
}
```

_Response (200 - OK)_

```json
{
  "success": true,
  "data": {
    "url": "https://i.imgflip.com/7a92li.jpg",
    "page_url": "https://imgflip.com/i/7a92li"
  }
}
```

## 8. POST /memes/postMeme

Description:

- POST /memes/postMeme digunakan untuk menambahkan meme yang telah di generate.

Request:

- body:

```json
{
  "title": "string (require)",
  "imgUrl": "string (require)"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  {
    "id": 18,
    "title": "The funny",
    "imgUrl": "https://i.imgflip.com/4h2lhf.jpg",
    "UserId": 16,
    "updatedAt": "2023-02-09T04:35:30.781Z",
    "createdAt": "2023-02-09T04:35:30.781Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "errors": [
    {
      "message": "Title is Required"
    },
    {
      "message": "Title cannot be empty"
    },
    {
      "message": "Image is Required"
    },
    {
      "message": "Image cannot be empty"
    }
  ]
}
```

## 9. POST /memes/memeMulter

Description:

- POST /memes/memeMulte digunakan untuk mengupload Image ke database

Request:

- file:

```json
{
  "filename": "file",
  "originalname": "file"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
 {
    "title": "string",
    "imgUrl": "string",
    "UserId" : "Integer"
 }
}
```

_Response (400 - Bad Request)_

## 10. POST /memes/:memeId

Description:

- POST /memes/:memeId mendapatkan meme per id

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
    "id": "181913649",
    "name": "Drake Hotline Bling",
    "url": "https://i.imgflip.com/30b1gx.jpg",
    "width": 1200,
    "height": 1200,
    "box_count": 2,
    "captions": 0
  }
]
```

\_GLOBAL ERRROR:

_Response (500 - notVerified)_

```json
{
  "message": "Your Email Unverified, Please Verified your Email"
}
```

_Response (500 - invalid-token)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 -Internal Server Error)_

```json
{
  "message": "Fixing 500 Internal Server Error Problems on Your Own Site"
}
```
