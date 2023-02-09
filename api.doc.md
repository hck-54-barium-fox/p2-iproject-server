Rifold APi documentacion 


## endpoints :

list of available endpoints :
    Endpoints:
1. user:
    - post/regsiter
    - post/login
    - post/google
2.Product:
    - get/product
    - get/product/:id
    - get/cost
    - get/province
    - get/city/:id
    - get/myproduct
    - post/generate-midtrans-token
    - post/myproduct/:id
    - delete/myproduct


# 1. POST /customer/register

## Request:

### body:

```json
{
    "usrename": "string",
    "email": "string",
    "password": "string",
    "city": "string"
}
```

## Response (201 - Created)_

```json
{
    "user": {
        "id": "integer",
        "name": "string",
        "email": "string",
        "password": "string",
        "city": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

## Response (400 - Bad Request)_

```json
{
  "message": "Email address already in use!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "password is requireed"
}
OR
```
&nbsp;

 2. POST /customer/login

## Request:

-   ## body:

```json
{
    "email": "string",
    "password": "string"
}
```

_### Response (201 - Created)_

```json
{
    "access_token": "string",
    "name": "string",
    "email": "string",
}
```

_### Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid email or password'"
}
`
## 4. GET /product

Description:

-   Get all product from database

Request:

_Response (200 - OK)_

```json
{
    "data": [
        {
            "id": "integer",
            "name": "string",
            "size": "string",
            "stock": "string",
            "description": "string",
            "price": "string",
            "imageUrl": "string",
            "CategoryId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
&nbsp;

## 5. GET /product/:id

Description:

-   Get all product by  id

Request:

-   params:

```json
{
    "id": "integer (required)"
}
```

_### Response (200 - OK)_

```json
{
        
            "id": "integer",
            "name": "string",
            "size": "string",
            "stock": "integer",
            "description": "text",
            "price": "integer",
            "imageUrl": "string",
            "CategoryId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        
    
}
```

_### Response (404 - Not Found)_

```json
{
    "message": "error not found"
}
``` 
&nbsp;

## 7. GET /cost

Description:

-   Get cost from 3 party api raja ongkir

### Request:

-   ## headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

-   ## body:

```json
{
    "origin": "501",
    "destination": "114",
    "weight": "1700",
    "courier": "jne"
}
```

## Response (200 - OK)_

```json
{
    "rajaongkir": {
        "query": {
            "origin": "501",
            "destination": "114",
            "weight": 1700,
            "courier": "jne"
        },
        "status": {
            "code": 200,
            "description": "OK"
        },
        "origin_details": {
            "city_id": "501",
            "province_id": "5",
            "province": "DI Yogyakarta",
            "type": "Kota",
            "city_name": "Yogyakarta",
            "postal_code": "55000"
        },
        "destination_details": {
            "city_id": "114",
            "province_id": "1",
            "province": "Bali",
            "type": "Kota",
            "city_name": "Denpasar",
            "postal_code": "80000"
        },
        "results": [
            {
                "code": "jne",
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "costs": [
                    {
                        "service": "OKE",
                        "description": "Ongkos Kirim Ekonomis",
                        "cost": [
                            {
                                "value": 38000,
                                "etd": "4-5",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "REG",
                        "description": "Layanan Reguler",
                        "cost": [
                            {
                                "value": 44000,
                                "etd": "2-3",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "SPS",
                        "description": "Super Speed",
                        "cost": [
                            {
                                "value": 349000,
                                "etd": "",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "YES",
                        "description": "Yakin Esok Sampai",
                        "cost": [
                            {
                                "value": 98000,
                                "etd": "1-1",
                                "note": ""
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```
&nbsp;

## 8. GET /customer/provinces

## Request:

-   ## headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

-   query:

```json
{
    "id": "integer"
}
```

## Response (200 - Ok)_

```json
{
    "rajaongkir": {
        "query": {
            "id": "12"
        },
        "status": {
            "code": 200,
            "description": "OK"
        },
        "results": {
            "province_id": "12",
            "province": "Kalimantan Barat"
        }
    }
}
```

## Response (400 - Bad Request)_

```json
{
    "rajaongkir": {
        "status": {
            "code": 400,
            "description": "Invalid key."
        }
    }
}
```
&nbsp;

## 9. GET /city/:id

Description:

-   Get all city with province id from raja ongkir

## Request:

-   ## headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

## Response (200 - OK)_

````json
{
    "data": [
        {
            "city_id": "27",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka",
            "postal_code": "33212"
        },
        {
            "city_id": "28",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Barat",
            "postal_code": "33315"
        },
        {
            "city_id": "29",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Selatan",
            "postal_code": "33719"
        },
        {
            "city_id": "30",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Tengah",
            "postal_code": "33613"
        },
        {
            "city_id": "56",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Belitung",
            "postal_code": "33419"
        },
        {
            "city_id": "57",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Belitung Timur",
            "postal_code": "33519"
        },
        {
            "city_id": "334",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kota",
            "city_name": "Pangkal Pinang",
            "postal_code": "33115"
        }
    ]
}```

&nbsp;
- Get /myproduct
 description: get all myproduct from database
        request: 
            headers:
                {
                     "access_token": "string"
                }       
        Response (200 - OK)
        [
               {
                    "id": 7,
                   "UserId" : "1"
                   "ProductId"   : "1"
                    "createdAt": "2023-01-24T13:06:13.227Z",
                    "updatedAt": "2023-01-24T13:06:13.227Z"
                },
                {
                 
                    "id": 7,
                   "USerId" : "2"
                   "ProductId"   : "1"
                    "createdAt": "2023-01-24T13:06:13.227Z",
                    "updatedAt": "2023-01-24T13:06:13.227Z"   
                },
        ]
```

 - POST/myproduct/:id
             request: 
            headers:
                {
                     "access_token": "string"
                }       
            request:
            body: 
            {
                 {
                    "id": 7,
                   "UserId" : "1"
                   "ProductId"   : "1"
                    "createdAt": "2023-01-24T13:06:13.227Z",
                    "updatedAt": "2023-01-24T13:06:13.227Z"
                },
            }
            Response : (200-Created)
            {
                "id": 7,
                    "UserId" : "1"
                   "ProductId"   : "1"
                    "createdAt": "2023-01-24T13:06:13.227Z",
                    "updatedAt": "2023-01-24T13:06:13.227Z"
            }
```
 Post /generate-midtrans-token
## Request:
### headers:
{
    "access_token": "string"
}

## Response (200 - OK)
{
    token: 'string'
}

## Response (400 - Bad request
{
    error_messages: 
    [ 
        'transaction_details.gross_amount is not a number' 
    ]
}
```
5. GET /product/:id

Description:

-   Get all product by  id

Request:

-   params:

```json
{
    "id": "integer (required)"
}
```

## Response (200 - OK)

```json
{
        
            "id": "integer",
            "UserId": "string",
            "ProductId": "string",
            "createdAt": "date",
            "updatedAt": "date"
        
    
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Myproduct not found"
}

```
```