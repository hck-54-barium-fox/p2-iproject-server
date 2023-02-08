# Hacktiv Heroes API Documentation

### Deployed server

- https://p2-livecode2-third.up.railway.app/

Silahkan lakukan register user dengan email yg belum terdaftar

&nbsp;

## Models :

_User_

```
- email : string, required, unique
- password : string, required
```

_Hero_

```
- name : string, required
- imageUrl : string, required
- typeUrl : string, required
```

_MyHero_

```
- UserId : integer, required
- HeroId : integer, required
- status : string, (default: "Unplayed")
```

## Relation :

> ### **Many-to-Many**
>
> Perhatikan relasi antara `User`, `MyHero`, dan `Hero` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/).

## Endpoints :

List of available endpoints:

- `POST /register` -done
- `POST /login` -done

Routes below need authentication:

- `GET /heroes` -done
- `POST /myheroes/:heroId` -done
- `GET /myheroes` -done

Routes below need authentication & authorization:

- `PATCH /myheroes/:id` -done

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string", -done
  "password": "string" -done
}
```

_Response (201 - Created)_

```json
{
  "id": "integer", -done
  "email": "string" -done
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required" -done
}
OR
{
  "message": "Invalid email format" -done
}
OR
{
  "message": "Email must be unique" -done
}
OR
{
  "message": "Password is required" -done
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string", -done
  "password": "string" -done
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string" -done
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required" -done
}
OR
{
  "message": "Password is required" -done
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password" -done
}
```

&nbsp;

## 3. GET /heroes

Description:

- Get all hero from database

Request:

- headers:

```json
{
  "access_token": "string" -done
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Abaddon",
    "imageUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png",
    "typeUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
  },
  {
    "id": 2,
    "name": "Arc Warden",
    "imageUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/arc_warden.png",
    "typeUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"
  },
  ...
] -done
```

&nbsp;

## 4. POST /myheroes/:heroId

Description:

- Add hero to my heroes

Request:

- headers:

```json
{
  "access_token": "string" -done
}
```

- params:

```json
{
  "heroId": "integer" -done
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "UserId": 1,
  "HeroId": 2,
  "status": "Unplayed"
} -done
```

_Response (404 - Not Found)_

```json
{
  "message": "Hero not found"
} -done
```

&nbsp;

## 5. GET /myheroes

Description:

- Get all my heroes from user

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
    "id": 2,
    "UserId": 1,
    "HeroId": 7,
    "status": "Unplayed",
    "Hero": {
      "name": "Meepo",
      "imageUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/meepo.png",
      "typeUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"
    }
  },
  {
    "id": 1,
    "UserId": 1,
    "HeroId": 6,
    "status": "Played",
    "Hero": {
      "name": "Io",
      "imageUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/wisp.png",
      "typeUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
    }
  }, -done
  ...
]
```

&nbsp;

## 6. PATCH /myheroes/:id

Description:

- Update hero status to Played

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
  "message": "Hero has been played"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Hero not found"
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
