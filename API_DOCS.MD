# SOMETHING TO SAY API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/google-login`
  Routes below need authentication
- `GET /randomquote`
- `GET /find/:search`
- `POST /payment/:letterId`
- `GET /poetry/myletter`
- `GET /poetry/letterbyid/:letterId`
  Routes below need authorization
- `POST /sendemail/:id`
- `POST /poetry/upload-image/:letterId`

## 1. POST /google-login

description:
-Option for client to login through google

\_Request:

-header:

```json
{
  "google_token": "google token string"
}
```

_Response (200 -OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…Dg1fQ.InnUKmmEDyyys5SbX_boAH74aJtehJDS5HsFyW7YBeo",
  "username": "Rahady",
  "email": "rahadyindra16juni@gmail.com"
}
```

## 2. GET /randomquote

description:
-get random quote

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

_Response (200 -OK)_

```json
[
  "quotes" : "strings",
  "quotes" : "strings",
  "quotes" : "strings"
]

```

## 3. GET /find/:search

description:
-get random poem

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

_Response (201 -Created)_

```json
{
  "id" : "integer"
  "content" : "string"
}

```

## 4. POST /payment/:

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

-params:

```json
{
  "id": "integer"
}
```

_Response (200 -OK)_

```json
{
  "data": "string" // link to payment
}
```

## 5.GET /poetry/myletter

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

_Response (200 -OK)_

```json
[
  {
    "poem": "string"
  },
  {
    "poem": "string"
  },
  {
    "poem": "string"
  }
]
```

## 6. GET /poetry/letterbyid/:letterId

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

-params

```json
{
  "letterId": "integer"
}
```

_Response (200 -OK)_

```json

  {
    "poem": "string"
  },


```

## 7.POST /sendemail/:id

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0"
}
```

-params

```json
{
  "id": "integer"
}
```

_Response (200 -OK)_

```json

  {
    "message": "email has been sent"
  },


```

## 8. POST /poetry/upload-image/:letterId

\_Request:

-headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGx5QHJvY2tldG1haWwuY29tIiwiaWQiOjMsImlhdCI6MTY3Mzk1NzY3Mn0.f8GyuFNqJP2W7JddrXweofgUiH8z2It9-2o8or1m0D0",
  "accept": "application/json",
  "Accept-Language": "en-US,en;q=0.8",
  "Content-Type": `multipart/form-data`
}
```

-params

```json
{
  "letterId": "integer"
}
```

-form data

```json

{
  "image" : "image file jpg or png"
}

\_GLOBAL ERRROR:

-error that could occur to all of the end point due to external factors

_Response (500 -Internal Server Error)_

```json
{
  "msg": "Something is wrong with the server"
}
```

_Response (401 -Invalid token or JsonWebTokenError)_

```json
{
  "msg": "invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "msg": "You don't have permission to do this action"
}
```
