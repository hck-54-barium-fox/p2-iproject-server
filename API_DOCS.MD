# SOMETHING TO SAY API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/google-login`
Routes below need authentication
- `GET /randomqute`
- `DELETE /poetry/cleanletter`
- `GET /find/:search`
- `POST /payment/:letterId`
- `GET /poetry/myletter`
- `GET /poetry/letterbyid/:letterId`
- `PATCH /poetry/okaypayment/:letterId`
Routes below need authorization
- `POST /sendemail/:id`
- `POST /poetry/upload-image/:letterId`

## 1.  POST /google-login

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
  "role": "staff"
}


