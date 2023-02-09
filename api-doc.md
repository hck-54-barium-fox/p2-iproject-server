# Hacktiv Heroes API Documentation

### Deployed server

- https://hafood-production.up.railway.app

Silahkan lakukan register user dengan email yg belum terdaftar

&nbsp;

## Models :

_User_

```
- firstName : string, required
- lastName : string, required
- email : string, required, unique
- password : string, required
- phoneNumber : string, required
- address : string, required
```

_Favorite_

```
- title : string, required
- ingredients : string, required
- servings : string, required
- instructions : string, required
```

## Relation :

**One-to-Many**

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /favorites`
- `POST /favorites`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "isPurchased": "boolean"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "isPurchased": "boolean"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "First Name is required"
}
OR
{
  "message": "Last Name is required"
}
OR
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
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password" -done
}
```

&nbsp;

## 3. GET /favorites

Description:

- Get all favorites from database

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
        "title": "Emeril's Pizza",
        "ingredients": "1 tb Yeast|1 c Warm water (110 degrees)|1/4 c Olive oil|4 c Flour|2 ts Salt|1 lb New potatoes, thinly sliced,; blanched|1 c Julienned red onions|2 tb Extra virgin olive oil|Salt and white pepper|1/2 c Grated Parmigiano-Reggiano cheese|Drizzle of truffle oil|2 tb Chopped chives",
        "servings": "1 Servings",
        "instructions": "Preheat the oven 400 degrees. In an electric mixer, whisk the yeast, water, and oil, together, to form a paste. Using a dough hook, add the flour and salt to the paste, mix the dough until the dough comes away from the sides and crawls up the sides of the hook. Remove the dough from the bowl and turn the dough into a greased bowl, cover. Let the dough rise until double in size, about 1 hour. Turn the dough out onto a floured surface and divide into 4 (4-ounce) balls, cover. Let the dough rest for 10-15 minutes. Press each dough out into a 10-inch circle about 1/2 -1-inch thick. Lightly brush the dough with olive oil. Divide the potatoes into four portions and season with salt and pepper. Cover the each dough with the potatoes, leaving a 1-inch border. In a small mixing bowl, toss the red onions with the extra virgin olive oil. Season with salt and pepper. Place a layer of the red onions on top of the potatoes. Sprinkle each pizza with the grated cheese. Drizzle each pizza with the truffle oil. Bake for 15-20 minutes or until the crust is crispy and golden brown. Garnish the pizza with chives.",
        "UserId": 1,
        "createdAt": "2023-02-08T15:04:26.456Z",
        "updatedAt": "2023-02-08T15:04:26.456Z"
    },
  ...
]
```

&nbsp;

## 4. POST /favorites

Description:

- Add recipe to favorites

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
  "heroId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "title": "Cheesy Mexican Hot Dog",
  "ingredients": "2 Grilled hot dogs|2 Flour tortillas|Cheez Whiz",
  "servings": "2 Servings",
  "instructions": "For each sandwich, place hot dog on tortilla. Top with cheese sauce, roll up. Serve with salsa if desired. ++ Courtesy of Dale & Gail Shipp, Columbia Md. ++",
  "UserId": 1,
  "updatedAt": "2023-02-09T03:21:58.312Z",
  "createdAt": "2023-02-09T03:21:58.312Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 5. POST /generate-midtrans-token

Description:

- Get token from midtrans

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
  "token": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
}
```

&nbsp;

## 6. PATCH /payments

Description:

- Update isPurchased status to true

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
  "message": "User with id purchase status is true"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
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
