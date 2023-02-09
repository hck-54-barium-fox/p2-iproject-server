# iProject API Documentation 

## Endpoints :

List of available endpoints:

- post 'users/register'
- post 'users/login' 
- get 'users/'
- patch 'users/status'
- get 'users/midtrans'
- post 'users/spotify'

- get 'items/compactDisc'
- get 'items/tShirt'



## 1. post 'users/register'

- Description:
used to add a new user.

Response Status: 201 - Created

Request body:

```json
{
    "username": "yana",
    "email": "yana@mail.com",
    "password": "123456",
}
```
Response body:

```json
{
    "id": 1,
    "username": "yana",
    "email": "yana@mail.com",
    "password": "vgvyv776t56drcZa3213wserchgjvjhbz323zqweewre22ethjtnkjuh88gudtrtserfxfch",
    "role": "User",
    "updatedAt": "2022-01-17T11:10:17.976Z",
    "createdAt": "2022-01-17T11:10:17.976Z"
}
```

Response: 400 - Bad Request

```json
{
    "message": "Username must be unique"
}
or
{
    "message": "Email must be unique"
}
or
{
    "errors": [
        {
            "message": "Username is required"
        },
        {
            "message": "Invalid email format"
        },
        {
            "message": "Email is required"
        }
    ]
}

```
&nbsp;

## 2. POST `users/login`

Description:
- used to access the /home endpoint

Response Status: 200 - OK

Request body:

```json
{
    "username": "yana",
    "email": "yana@mail.com",
    "password": "123456"
}
```

Response Body:

```json
{
    "access_token": "....",
    "user": "yana"
}
```

Response Error: 401 - Unauthorized (Invalid Username / Email / Password) 

```json
{
  "message": "email or password error"
}
OR
{
  "message": "you are not logged in"
}
```
Response Error: 500 - Internal Server Error

```json
{
  "message": "error on the internal server"
}
```
&nbsp;

## 3. get 'users/'

Description:
- Get all user from database

Request:

- headers: 

```json
{
  "access_token": "....."
}
```

_Response (200 - OK)_

```json
[
    {
        "username": "user1",
        "email": "user1@mail.com",
        "password": "123456"
    },
    {
        "username": "user2",
        "email": "user2@mail.com",
        "password": "123456"
    }
]
```
_Response (404 - Not Found)_

```js
{
  "message": "not found the merchandise"
}
```
&nbsp;

## 4. patch 'users/status'

Description: 

- Change non-member status to become a member fan

Request:

- headers: 

```json
{
  "access_token": "....."
}

```

Response: 200 - OK

```json
{
    "message": "Updated"
}

Response: Error 401 

```json
{
  "message": "Invalid token"
}
```
&nbsp;


## 5. get 'users/midtrans'

Description:

-functions as a payment controller


Request headers: 

```json
{
  "access_token": "....."
}
```

Response 200 - OK

```json

[
    {
        "id": 6,
        "username": "rival",
        "email": "rival@mail.com",
        "password": "$2a$10$MntgnRb4cw8zuo1FtxKFMeee2H5IQpSRn/MN4muyYEfztWDfzpVwO",
        "payment": "Member",
        "createdAt": "2023-02-08T13:30:49.130Z",
        "updatedAt": "2023-02-08T13:31:42.704Z"
    }
]
```
Response Error: 500 - Internal Server Error

```json
{
  "message": "error on the internal server"
}
```


&nbsp;

## 6. get 'items/compactDisc'

Request:

- headers: 

```json
{
  "access_token": "...."
}
```

```js
[
    {
        "id": 4,
        "name": "Hey, Makan Tuh Gitar! - CD",
        "stock": 2,
        "price": 50000,
        "itemUrl": "https://morfemband.files.wordpress.com/2011/01/hmtgblog.jpg",
        "UserId": 2,
        "description": "Hey, Makan Tuh Gitar! '\\n' released March 2013 '\\n' MRFM/Demajors records '\\n' Produced by Jimi Multhazam & Pandu Fuzztoni '\\n' Mixed By Barlian Yoga '\\n' Mastered by Barlian Yoga '\\n' Recorded at Almos Studio 2012 '\\n' Artwork by Jimi Multhazam '\\n' Photograph by Agung Hartamurti Wirawan",
        "CategoryId": 2,
        "createdAt": "2023-02-08T11:12:25.540Z",
        "updatedAt": "2023-02-08T11:12:25.540Z",
        "Category": {
            "id": 2,
            "name": "Compact Disc",
            "createdAt": "2023-02-08T11:12:25.528Z",
            "updatedAt": "2023-02-08T11:12:25.528Z"
        }
    },
    {
        "id": 5,
        "name": "Morfem Sleeve Artwork - CD",
        "stock": 3,
        "price": 50000,
        "itemUrl": "https://morfemband.files.wordpress.com/2011/01/sekaingusmu.jpg",
        "UserId": 2,
        "description": "Seka Ingusmu! '\\n' 2nd Anniversary Freedownload Single '\\n' Recorded Live Overdub at The Radiant '\\n' Produced by Morfem '\\n' Mixed by Wahyu HW '\\n' Enginered By Wahyu HW '\\n' Art Work by Jimi Multhazam '\\n' Band Photo by Agung Hartamurti Wirawan '\\n'",
        "CategoryId": 2,
        "createdAt": "2023-02-08T11:12:25.540Z",
        "updatedAt": "2023-02-08T11:12:25.540Z",
        "Category": {
            "id": 2,
            "name": "Compact Disc",
            "createdAt": "2023-02-08T11:12:25.528Z",
            "updatedAt": "2023-02-08T11:12:25.528Z"
        }
    }
]
```

_Response (404 - Not Found)_

```js
{
  "message": "not found the merchandise"
}
```
&nbsp;

## 7. get 'items/tShirt'


Description:

- reads all the data from the category with the name of the compact disc

Request:

- headers: 

```json
{
  "access_token": "...."
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Sleeve Artwork - T-Shirt",
        "stock": 5,
        "price": 185000,
        "itemUrl": "https://morfemband.files.wordpress.com/2013/07/kaos-sleeve.jpg",
        "UserId": 1,
        "description": "(harga belum termasuk Ongkos Kirim) Available size : S, M, L, XL Klik photo untuk detail desain",
        "CategoryId": 1,
        "createdAt": "2023-02-08T11:12:25.540Z",
        "updatedAt": "2023-02-08T11:12:25.540Z",
        "Category": {
            "id": 1,
            "name": "T-Shirt",
            "createdAt": "2023-02-08T11:12:25.528Z",
            "updatedAt": "2023-02-08T11:12:25.528Z"
        }
    }
]
```
_Response (404 - Not Found)_

```js
{
  "message": "not found the merchandise"
}
```
&nbsp;

## 7 get 'categories/'

Description: 

- read all categories from database

Response 200 OK ()

```json
[
    {
        "id": 1,
        "name": "T-Shirt",
        "createdAt": "2023-02-08T11:12:25.528Z",
        "updatedAt": "2023-02-08T11:12:25.528Z"
    }
]
```

_Response (404 - Not Found)_

```js
{
  "message": "not found the merchandise"
}
```
&nbsp;

## 8 GET 'users/spotify'

Description: 

- get new song from spotify 

Response 200 - OK

```json
[
    {
        "data": {
            "uri": "spotify:track:13HWccwFz8rjJTYtWz5UrY",
            "id": "13HWccwFz8rjJTYtWz5UrY",
            "name": "Megah Diterima",
            "albumOfTrack": {
                "uri": "spotify:album:5BgMDPxS3zWjzUsEfCo0zb",
                "name": "Megah Diterima",
                "coverArt": {
                    "sources": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e028176e11795b318c2f98b2609",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048518176e11795b318c2f98b2609",
                            "width": 64,
                            "height": 64
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2738176e11795b318c2f98b2609",
                            "width": 640,
                            "height": 640
                        }
                    ]
                },
                "id": "5BgMDPxS3zWjzUsEfCo0zb",
                "sharingInfo": {
                    "shareUrl": "https://open.spotify.com/album/5BgMDPxS3zWjzUsEfCo0zb?si=Wj6tiqDqQee77S9OiwcgLg"
                }
            },
            "artists": {
                "items": [
                    {
                        "uri": "spotify:artist:3JoyBiTkzGqZCWwq07no59",
                        "profile": {
                            "name": "Morfem"
                        }
                    }
                ]
            },
            "contentRating": {
                "label": "NONE"
            },
            "duration": {
                "totalMilliseconds": 243596
            },
            "playability": {
                "playable": true
            }
        }
    }
    .......
```
1
Response Error: 500 - Internal Server Error

```json
{
  "message": "error on the internal server"
}
```