# **REST API Documentation**

## **POST /users/register**
This endpoint is to register a new user to the app.
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string"
}
```

### **Response Status**
```
Success
=======
201 Created

Error
=======
400 Bad Request (Sequelize Validation Error / Sequelize Unique Constraint Error)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    id: integer,
    username: "string",
    email: "string"
}
```
<br>

## **POST /users/login**
This endpoint is to login using an existing user's account registered in this app.
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
{
    "email": "string"
    "password": "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request ( Sequelize Validation Error || Sequelize Unique Constraint Error )
401 Unauthorized (Email / Password incorrect)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    "access_token": "string"
}
```
<br>

## **POST /users/google-login**
This endpoint is to login using a google login button service from google.
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
None
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    "access_token": "string"
}
```
<br>

## **GET /users/spotify-request-auth**
This endpoint is to request authorization key to use Spotify API.
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
None
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    "url" : "string"
}
```
<br>

## **POST /users/spotify-user-auth** 
This endpoint is one of the steps in spotify login sequence. It is to request user token after the user gave the concent for this app to use it's user priviledge / information
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
Sample:
===========
{
    "code" : "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
  "access_token": "string"
  "token_type": "string",
  "expires_in": integer,
  "refresh_token": "string"
 "scope": "string"
}
```

<br>

## **POST /users/me**
This endpoint is to request logged in user's information such as username, email, etc. Spotify access token from /spotify-user-auth endpoint is the required body
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
{
    "code" : "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
  country: "string",
  display_name: "string",
  email: "string",
  explicit_content: { Object },
  external_urls: {
    spotify: "string"
  },
  followers: { Object },
  href: "string",
  id: "string",
  images: [ Array ],
  product: "string",
  type: "string",
  uri: "string"
} 
```
<br>

## **POST /users/loginOrRegister**
This endpoint is to find or register an account to this app using information provided by /me endpoint.
<br>

### **Required Request Header**
```
None
```

### **Required Request Body**
```
{
    username: "string",
    email: "string",
    role: "string"
}
```

### **Response Status**
```
Success
=======
201 OK

Error
=======
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    "access_token": "string"
}
```
<br>

## **POST /main/weather**
This endpoint is to detect current weather based on current latitude and longitude. It uses Openweather API
<br>

### **Required Request Header**
```
{
    "access_token": "string"
}
```

### **Required Request Body**
```
{
    "latitude": integer,
    "longitude": integer,
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    nearest_station: "string",
    weather: { Object },
    temp: "string"
}
```
<br>

## **POST /main/suggestAI**
This endpoint is to generate a query using AI model. It uses Open AI API
<br>

### **Required Request Header**
```
{
    "access_token": "string"
}
```

### **Required Request Body**
```
{
    "searchQuery" : "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
{
    "response": "string"
}
```
<br>


## **POST /main/playlist**
This endpoint is to fetch playlists from spotify using AI generated seearch query from /suggestAI endpoint.
<br>

### **Required Request Header**
```
{
    "access_token": "string"
}
```

### **Required Request Body**
```
{
    "searchQuery" : "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
[
    {
        "playlist_title": "string",
        "playlist_owner": "string",
        "playlist_tracks": "string",
        "playlist_link": "string",
        "playlist_image": "string"
    }, ...
]
```
<br>

## **POST /tracks**
This endpoint is to list five track samples from perticular playlist.
It uses playlist link obtained from /playlist endpoint.
<br>

### **Required Request Header**
```
{
    "access_token": "string"
}
```

### **Required Request Body**
```
{
    "url" : "string"
}
```

### **Response Status**
```
Success
=======
200 OK

Error
=======
400 Bad Request
401 Unauthorized (Invalid Token)
500 Internal Server Error
```

### **Response Body**
```
Successful sample:
====================
[
    {
        "track_name": "string",
        "track_artist": "string",
        "track_link": "string",
        "artist_link": "string",
        "album_image": "string"
    }, ...
]
```
<br>
