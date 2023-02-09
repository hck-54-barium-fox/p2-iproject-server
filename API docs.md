## Shoes Dealer - API Documentation

### Endpoints:

List of available route:

- `POST /register`
- `POST /login`
- `GET /shoes`
- `GET /mycart`
- `POST /mycart/:shoeId`
- `PATCH /mycart/:cartId`
- `POST /checkOngkir`
- `POST /generate-midtrans-token`

### 1. POST /register

Description

- Customer do register in website

Request:

- body :

```json
{
    "email": "string",
    "password": "string",
    "name": "string"
}
```

Response (201 - Created)

```json
{
    "id": "integer",
    "email": "string"
}
```

Response (400 - Bad Request)

```json
{
    "error": "Invalid email format"
}
OR
{
    "error": "Email must be unique"
}
OR
{
    "error": "Email can't be empty"
}
OR
{
    "error": "Password can't be empty"
}
```

### 2. POST /login

Description

- Customer login attempt

Request:

- body :

```json
{
    "email": "string",
    "password": "string"
}
```

Response (200 - OK):

```json
{
    "access_token:": integer
}
```

Response (400 - Bad Request)

```json
{
    "error": "Email is required"
}
OR
{
    "error": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
    "error": "Invalid email/password"
}
```

### 3. GET /shoes

Description

- Showing all shoes

Response (200 - OK):

```json
[
    {
        "id": integer,
        "name": string,
        "imageUrl": string,
        "price": integer
    },
    ...
]
```

### 4. GET /mycart

Description

- Get all the shoes in my cart

Request Headers

```json
{
    "access_token": "..."
}
```

Response (200 - OK):

```json
[
    {
        "id": integer,
        "CustomerId": integer,
        "ShoeId": integer,
        "quantity": integer,
        "totalPrice": integer,
        "Shoe": {
            "id": integer,
            "name": string,
            "imageUrl": string,
            "price": integer
        }
    },
    ...
]
```

### 5. POST /mycart/:shoeId

Description

- Adding new shoe into my cart

Request Params

```json
{
    "shoeId": integer
}
```

Request Headers

```json
{
    "access_token": "..."
}
```

Response (201 - Created):

```json
{
    "message": "Success add to cart!"
}
```

Response (404 - Not Found)

```json
{
    "error": "Shoe not found"
}
```

### 6. PATCH /mycart/:cartId

Description

- Reduce quantity or remove shoes in my cart

Request Headers

```json
{
    "access_token": "..."
}
```

Request Params

```json
{
    "cartId": integer
}
```

Response (200 - OK):

```json
{
    "message": "Item reduced from cart"
}
OR
{
    "message": "Item removed from cart"
}
```

Response (404 - Not Found)

```json
{
    "error": "Cart not found"
}
```

### 7. POST /checkOngkir

Description

- Check ongkir to 3rd party API Raja Ongkir

Request Body:

```json
{
    "origin": integer,
    "destination": integer,
    "weight": integer,
    "courier": string
}
```

Request Headers:

```json
{
    "key": API key
}
```

Response (200 - OK):

```json
{
    "rajaongkir": {
        "query": {...},
        "status": {...},
        "origin_details": {...},
        "destination_details": {...},
        "results": [{...},{...}]
    }
}
```

Response (400 - Bad Request)

```json
{
    "error": ""
}
OR
{
    "error": ""
}
```

Response (401 - Unauthorized)

```json
{
    "error": ""
}
```


### 9. Global Error

Response Error: 401 - Invalid Token
```json
{
    "message": "Authentication Error"
}
```

Response Error: 403 - Unauthorized
```json
{
    "message": "Authorization Error / Not Allowed"
}
```

Response Error: 404 - Not Found
```json
{
    "message": "Shoe Not Found"
}
OR
{
    "message": "Cart Not Found"
}
```

Response Error: 500 - Internal Server Error
```json
{
    "message": "Internal Server Error"
}
```
