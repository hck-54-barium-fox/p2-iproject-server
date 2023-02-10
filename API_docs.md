# iProject Landmark Atlas API Documentation

## Endpoints
List of available endpoints in this project:
* No Restriction:
    - `POST /register`
    - `POST /login`
    - `POST /google-login`
    - `GET /weather`
    - `GET /landmarks`
    - `GET /landmarks/:id`
* Need Authentication:
    - `POST /landmarkImg`
    - `GET /bookmarks`
    - `POST /bookmarks/:LandmarkId`
* Need Authorization:
    - `DELETE /bookmarks/:id`
* Need Admin-specific Authorization:
    - `POST /landmarks`
    - `PUT /landmarks/:id`
    - `DELETE /landmarks/:id`

&nbsp;

## A. POST /register
Description: Create new user data to database as well as  generate the user's unique token, immediately log them in afterwards

Requests:
- body:
```json
{
    "email": "fahim@yahoo.com",
    "username": "Fahim Junaedi Ahmad",
    "password": "JU11JU11"
}
```

Responses:
- _201 - Created_:
```json
{
    "message": "User successfully registered. Welcome aboard, Fahmi Junaedi Ahmad!",
    "userData": {
        "token": "<generated token>", 
        "role": "Visitor"
    }
}
```

- _400 - Bad Request_:
```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Username is required"
}
OR
{
    "message": "Email already existed"
}
OR
{
    "message": "Invalid email format"
}
```

&nbsp;

## B. POST /login
Description: Create unique token by comparing user's input with available datas in database and log them in

Requests:
- body:
```json
{
    "email": "fahim@yahoo.com",
    "password": "JU11JU11"
}
```

Responses:
- _200 - Ok_:
```json
{
    "message": "Successfully logged in as Fahmi Junaedi Ahmad!",
    "userData": {
        "token": "<generated token>", 
        "role": "Visitor"
    }
}
OR
{
    "message": "Successfully logged in as Fahmi Junaedi Ahmad!",
    "userData": {
        "token": "<generated token>", 
        "role": "Admin"
    }
}
```

- _400 - Bad Request_:
```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

- _401 - Unauthorized_:
```json
{
    "message": "Invalid email/password"
}
```

&nbsp;

## C. POST /google-login
Description: Allow user to sign up or log in via Google account

Requests:
- headers:
```json
{
    "token": "<google response credential>"
}
```
Response:
- _200 - Ok_:
```json
{
    "message": "Successfully logged in as Google User",
    "data": {
        "id": 17,
        "username": "Google User",
        "email": "user@gmail.com",
        "role": "Visitor"
    },
    "token": "<generated token>"
}
```

- _201 - Created_:
```json
{
    "message": "User successfully registered",
    "data": {
        "id": 20,
        "username": "Google User",
        "email": "user@gmail.com",
        "role": "Visitor"
    },
    "token": "<generated token>"
}
OR
{
    "message": "User successfully registered",
    "data": {
        "id": 20,
        "username": "Google User",
        "email": "user@gmail.com",
        "role": "Admin"
    },
    "token": "<generated token>"
}
```

- _400 - Bad Request_:
```json
{
    "message": "Password is required"
}
```

&nbsp;

## D. GET /weather
Description: Fetch weather data for the past 1 week from Open Meteo API based on latitude and longitude via query
Requests:
- query:
```json
{
    "latitude": "43.721428",
    "longitude": "10.394096"
}
```
Response:
- _200 - Ok_:
```json
{
    "thisWeek": [
        {
            "id": 1,
            "day": "Thu",
            "weather": 0,
            "temperature": 7.9
        },
        ...,
        {
            "id": 7,
            "day": "Wed",
            "weather": 45,
            "temperature": 14
        }
    ]
}
```

&nbsp;

## E. GET /landmarks
Description: Get all available landmarks data

- Response:
```json
{
    "result": [
        {
            "id": 7,
            "latitude": "43.721428",
            "longitude": "10.394096",
            "name": "Polo Ospedaliero \"Santa Chiara\"",
            "country": "Italy",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/800px-Italy_-_Pisa_-_Leaning_Tower.jpg",
            "content": "The Leaning Tower of Pisa (Italian: torre pendente di Pisa), or simply, the Tower of Pisa (torre di Pisa [ˈtorre di ˈpiːza; ˈpiːsa]), is the campanile, or freestanding bell tower, of Pisa Cathedral. It is known for its nearly four-degree lean, the result of an unstable foundation. The tower is one of three structures in the Pisa's Cathedral Square (Piazza del Duomo), which includes the cathedral and Pisa Baptistry.\n\nThe height of the tower is 55.86 metres (183 feet 3 inches) from the ground on the low side and 56.67 m (185 ft 11 in) on the high side. The width of the walls at the base is 2.44 m (8 ft 0 in). Its weight is estimated at 14,500 tonnes (16,000 short tons). The tower has 296 or 294 steps; the seventh floor has two fewer steps on the north-facing staircase.\n\nThe tower began to lean during construction in the 12th century, due to soft ground which could not properly support the structure's weight. It worsened through the completion of construction in the 14th century. By 1990, the tilt had reached 5.5 degrees. The structure was stabilized by remedial work between 1993 and 2001, which reduced the tilt to 3.97 degrees.\n\nThere has been controversy surrounding the identity of the architect of the Leaning Tower of Pisa. For many years, the design was attributed to Guglielmo and Bonanno Pisano, a well-known 12th-century resident artist of Pisa, known for his bronze casting, particularly in the Pisa Duomo.[citation needed] Pisano left Pisa in 1185 for Monreale, Sicily, only to come back and die in his home town. A piece of cast bearing his name was discovered at the foot of the tower in 1820, but this may be related to the bronze door in the façade of the cathedral that was destroyed in 1595. A 2001 study seems to indicate Diotisalvi was the original architect, due to the time of construction and affinity with other Diotisalvi works, notably the bell tower of San Nicola and the Baptistery, both in Pisa.",
            "createdAt": "2023-02-08T07:42:57.667Z",
            "updatedAt": "2023-02-08T07:42:57.667Z"
        },
        ...
    ]
}
```

&nbsp;


## F. GET /landmarks/:id
Description: Get landmark data based on its id

Requests:
- params:
```json
{
    "id": 4
}
```

Response:
- _200 - Ok_:
```json
{
    "data": {
        "id": 4,
        "latitude": "-8.574505",
        "longitude": "119.458881",
        "name": "Komodo Island",
        "country": "Indonesia",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Komodo_Island_north_aerial.jpg",
        "content": "Komodo (Indonesian: Pulau Komodo) is one of the 17,508 islands that comprise the Republic of Indonesia. The island is particularly notable as the habitat of the Komodo dragon, the largest lizard on Earth, which is named after the island. Komodo Island has a surface area of 390 square kilometres and a human population of over two thousand. The people of the island are descendants of former convicts who were exiled to the island and who have mixed with Bugis from Sulawesi. The people are primarily adherents of Islam but there are also Christian and Hindu congregations.\nKomodo is part of the Lesser Sunda chain of islands and forms part of the Komodo National Park. In addition, the island is a popular destination for diving. Administratively, it is part of the East Nusa Tenggara province.",
        "createdAt": "2023-02-08T05:59:03.152Z",
        "updatedAt": "2023-02-08T05:59:03.152Z"
    }
}
```

- _404 - Not found_:
```json
{
    "message": "Landmark with ID 4 is not foundd"
}
```
&nbsp;

## G. POST /landmarkImg
Description: Store input image file in local server storage and upload it to ImageKit

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

- body:
```json
{
    "image": "fd.append('landmarkImg', event.target.files[0], event.target.files[0].name)"
}
```

Response:
- _201 - Created_
```json
{
    "imgPath": "https://ik.imagekit.io/ikaPFW/<image file originalname>"
}
```

&nbsp;

## H. GET /bookmarks
Description: Get all bookmarks based on the user's token

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

Response:
- _200 - ok_:
```json
{
    "result": [
        {
            "id": 1,
            "UserId": 3,
            "LandmarkId": 5,
            "createdAt": "2023-02-09T14:42:13.211Z",
            "updatedAt": "2023-02-09T14:42:13.211Z",
            "User": {
                "id": 3,
                "email": "kat@gmail.com",
                "username": "Cathy Rogers",
                "password": "$2a$10$IkQl1wUltDuZfaPxDPa3COv0rm6mLEd1Ca0wzwbhkRkXUKHXlUEy2",
                "role": "Visitor",
                "createdAt": "2023-02-09T06:28:25.461Z",
                "updatedAt": "2023-02-09T06:28:25.461Z"
            },
            "Landmark": {
                "id": 5,
                "latitude": "55.752634",
                "longitude": "37.6229",
                "name": "The Red Square",
                "country": "Russia",
                "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/1_Saint_Basils_Cathedral.jpg",
                "content": "Red Square (Russian: Красная площадь, tr. Krasnaya ploshchad', IPA: [ˈkrasnəjə ˈploɕːətʲ]) is one of the oldest and largest squares in Moscow, the capital of Russia. Owing to its historical significance and the adjacent historical buildings, it is regarded as one of the most famous squares in Europe and the world. It is located in Moscow's historic centre, in the eastern walls of the Kremlin. It is the city landmark of Moscow, with iconic buildings such as Saint Basil's Cathedral, Lenin's Mausoleum and the GUM. In addition, it has been a UNESCO World Heritage Site since 1990.\nThe Red Square has an almost rectangular shape and is 70 meters wide and 330 meters long. It extends lengthways from northwest to southeast along part of the wall of the Kremlin that forms its boundary on the southwest side. In the northeast, the square is bounded by the GUM department store building and the old district of Kitai-Gorod, in the northwest by the State Historical Museum and the Resurrection Gate and in the southeast by Saint Basil's Cathedral. Tverskaya Street begins to the northwest of the square behind the building of the State Historical Museum, and to the southeast is the so-called Basilius slope, which leads to the Moskva River, which goes down and over a bridge to the Zamoskvorechye District. Two streets branch off to the northeast from Red Square: Nikolskaya Street, which is named after the Nikolaus Tower of the Kremlin, which is directly opposite, and the Ilyinka (Ильинка), both of which have existed since the 14th century and were once important arteries of old Moscow. Today the square itself, with the exception of the access road leading through it to the Savior Gate of the Kremlin, is a pedestrian zone.\nThe main squares in Russian cities, such as those in Suzdal, Yelets, and Pereslavl-Zalessky, are frequently named Krasnaya ploshchad, or Beautiful Square. Archaically, the Russian word красная (krasnaya) meant \"beautiful\", but now means \"red\", with the current word for \"beautiful\", красивая ('krasivaya'), being derived from it.\nIn Moscow, the name Red Square originally described the small area between St. Basil's Cathedral, the Spasskaya Tower of the Kremlin, and the Lobnoye Mesto herald's platform. Tsar Alexei Mikhailovich officially extended the name to encompass the entire square, which had previously been called Pozhar, or \"burnt-out place\", reflecting that previous buildings occupying the site had burned down.",
                "createdAt": "2023-02-08T05:59:03.152Z",
                "updatedAt": "2023-02-08T05:59:03.152Z"
            }
        },
        ...
    ]
}
```

&nbsp;

## I. POST /bookmarks/:LandmarkId
Description: Add new bookmark based on landmark's ID

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

- params:
```json
{
    "id": 4
}
```

Response:
- _201 - Created_:
```json
{
    "message": "Landmark successfully bookmarked"
}
```

- _400 - Bad Request_:
```json
{
    "message": "Bookmark already exist"
}
```

- _404 - Not Found_:
```json
{
    "message": "Bookmark with ID 4 is not found"
}
```

&nbsp;

## J. DELETE /bookmarks/:id
Description: Delete bookmark based on its id

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

- params:
```json
{
    "id": 4
}
```

Response:
- _200 - Ok_:
```json
{
    "message": "Bookmark with ID 4 has been deletedd"
}
```

- _404 - Not Found_:
```json
{
    "message": "Bookmark with ID 4 is not found"
}
```

&nbsp;

## K. POST /landmarks
Description: Add new landmark (Admin privilage)

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

- body:
```json
{
    "latitude": "51.500731",
    "longitude": "-0.12461",
    "content": "The Leaning Tower of Pisa (Italian: torre pendente di Pisa), or simply, the Tower of Pisa (torre di Pisa [ˈtorre di ˈpiːza; ˈpiːsa]), is the campanile, or freestanding bell tower, of Pisa Cathedral. It is known for its nearly four-degree lean, the result of an unstable foundation. The tower is one of three structures in the Pisa's Cathedral Square (Piazza del Duomo), which includes the cathedral and Pisa Baptistry.

The height of the tower is 55.86 metres (183 feet 3 inches) from the ground on the low side and 56.67 m (185 ft 11 in) on the high side. The width of the walls at the base is 2.44 m (8 ft 0 in). Its weight is estimated at 14,500 tonnes (16,000 short tons). The tower has 296 or 294 steps; the seventh floor has two fewer steps on the north-facing staircase.

The tower began to lean during construction in the 12th century, due to soft ground which could not properly support the structure's weight. It worsened through the completion of construction in the 14th century. By 1990, the tilt had reached 5.5 degrees. The structure was stabilized by remedial work between 1993 and 2001, which reduced the tilt to 3.97 degrees.

There has been controversy surrounding the identity of the architect of the Leaning Tower of Pisa. For many years, the design was attributed to Guglielmo and Bonanno Pisano, a well-known 12th-century resident artist of Pisa, known for his bronze casting, particularly in the Pisa Duomo.[citation needed] Pisano left Pisa in 1185 for Monreale, Sicily, only to come back and die in his home town. A piece of cast bearing his name was discovered at the foot of the tower in 1820, but this may be related to the bronze door in the façade of the cathedral that was destroyed in 1595. A 2001 study seems to indicate Diotisalvi was the original architect, due to the time of construction and affinity with other Diotisalvi works, notably the bell tower of San Nicola and the Baptistery, both in Pisa."
}
```

Response:
- _201 - Created_:
```json
{
    "message": "Successfully create mark for landmark Polo Ospedaliero \"Santa Chiara\""
}
```

- _400 - Bad Request_:
```json
{
    "message": "Latitude is required"
}
OR
{
    "message": "Longitude is required"
}
OR
{
    "message": "Image URL is required"
}
OR
{
    "message": "Location already exist in database"
}
OR
{
    "message": "No valid name found for this location"
}
```

&nbsp;

## L. PUT /landmarks/:id
Description: Add new landmark (Admin privilage)

Requests:
- headers:
```json
{
    "access_token": "<your access token>"
}
```

- params:
```json
{
    "id": 5
}
```

- body:
```json
{
    "latitude": "51.500731",
    "longitude": "-0.12461",
    "content": "Simplified explanation of Leaning Tower of Pisa"
}
```

Response:
- _200 - Ok_:
```json
{
    "message": "Successfully updated data for landmark with ID 5"
}
```

- _400 - Bad Request_:
```json
{
    "message": "Latitude is required"
}
OR
{
    "message": "Longitude is required"
}
OR
{
    "message": "Image URL is required"
}
OR
{
    "message": "Location already exist in database"
}
OR
{
    "message": "No valid name found for this location"
}
OR
{
    "message": "Landmark with ID 5 is not found"
}
```

&nbsp;

## M. DELETE /landmarks/:id
Description: Delete landmark data based on its id

- headers:
```json
{
    "access_token": "<your access token>"
}
```

- params:
```json
{
    "id": 5
}
```

Response:
- _200 - Ok_:
```json
{
    "message": "Landmark with ID 5 has been deleted"
}
```

- _404 - Not Found_:
```json
{
    "message": "Landmark with ID 5 is not found"
}
```

&nbsp;

## Global Error
- _403 - Forbidden_:
```json
{
    "message": "You are not authorize"
}
```

- _401 - Unauthorized_:
```json
{
    "message": "Invalid Token"
}
```

- _500 - Internal Server Error_:
```json
{
    "message": "Internal server error"
}
```