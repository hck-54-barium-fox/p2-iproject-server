# Iproject API Documentation

## Models:

_User_
```
- email : string, required, unique
- password : string, required
```

_Weapon_
```
- name : string, required
- category: string, required
- imageUrl : string, required
- tagline : string, required
- price : integer, required
```

_myWeapon_
```
- UserId: integer, required
- WeaponId : integer, required (id penerima)
- status : string (default: Unplayed, kalau sudah dicheckout maka jadi Played)
```

## Relationship :

>### **Many-to-Many**
relasi antara `User`, `Weapon`, dan `myWeapon` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/master/manual/advanced-many-to-many.html).

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`

Routes below need authentication:

- `GET /weapons`
- `POST /weapons/:id`
- `GET /myWeapons`
- `POST /midtransToken/:id`
- `POST /myWeapons/:weaponId`
- `PATCH /myWeapons/:id`
- `DELETE /myWeapons/:id`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
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
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /vouchers

Description:
- Fetch all weapons from database

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
        "name": "CLASSIC",
        "category": "sidearms",
        "imageUrl": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt25bf56ede3e3c57c/5eb281c42278aa3e8d0ba7fa/classic.png",
        "tagline": "Lightweight and versatile, the default weapon for all is an instant classic.",
        "price": 150000
    },
  {
    "id": 2,
        "name": "SHORTY",
        "category": "sidearms",
        "imageUrl": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt7b13117b3a4912a7/5eb281ca5e05b51483afd6bc/shorty.png",
        "tagline": "Surprise your enemy up close for max effectiveness.",
        "price": 250000
  },
  ...,
]
```

&nbsp;

## 4. GET /weapons/:id

Description:
- Fetch Weapon detail by id

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
  "": "integer"
}
```
_Response (200 - OK)_
```json
{
        "id": 1,
        "name": "CLASSIC",
        "category": "sidearms",
        "imageUrl": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt25bf56ede3e3c57c/5eb281c42278aa3e8d0ba7fa/classic.png",
        "tagline": "Lightweight and versatile, the default weapon for all is an instant classic.",
        "price": 150000
}

```

&nbsp;

## 5. GET /myWeapons

Description:
- Fetch all list of my weapon

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
        "id": 30,
        "UserId": 2,
        "WeaponId": 13,
        "status": "Unplayed",
        "Weapon": {
            "id": 13,
            "name": "VANDAL",
            "category": "rifles",
            "imageUrl": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt323df4a0d8210605/5eb281cb3b09c042ddca13a5/vandal.png",
            "tagline": "This accurate powerhouse is ferocious in small bursts.",
            "price": 150000
        }
    },
    {
        "id": 35,
        "UserId": 2,
        "WeaponId": 10,
        "status": "Unplayed",
        "Weapon": {
            "id": 10,
            "name": "BULLDOG",
            "category": "rifles",
            "imageUrl": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltd4a396bf5a06e6b4/5eb281c4edfeb076e2050387/bulldog.png",
            "tagline": "Some kind of happiness is measured out in taking down enemies with the Bulldog",
            "price": 150000
        }
    }
]
```

&nbsp;

## 6. post /myWeapons/midtransToken/:id

Description:
- get token mitrans for payment

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
  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
}
```


## 7. POST /myWeapons/weaponId

Description:
- Post myWeapons with Weapon id

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
  "weaponId": "integer"
}
```

_Response (201 - CREATED)_

```json
{
    "id": 1,
    "UserId": 2,
    "WeaponId": 1,
    "status": "Unplayed",
    "updatedAt": "2023-02-09T03:34:31.599Z",
    "createdAt": "2023-02-09T03:34:31.599Z"
}
```
&nbsp;

## 8. PATCH /myWeapons/:id

Description:
- Update status myWeapons with id

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

_Response (201 - CREATED)_

```json
{
    "message": "Weapon has been played"
}
```

&nbsp;

## 9. DELETE /myWeapons/:id

Description:
- Destroy myWeapons with id

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

_Response (201 - CREATED)_

```json
{
    "message": "Remove Weapon"
}
```

_Response (404 - NOT_FOUND)_
```json
{
    "message": "Weapon Not Found"
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