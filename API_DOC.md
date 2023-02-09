Endpoints
List of Available Endpoints:

GET /getNews
GET /myNews
POST /register
POST /login
POST /loginGoogle
POST /bookmarks

1. GET /getNews
   ketika end poin di jalankan akan menampilkan seluruh data news

   Status 200 - OK
   Response Body:

```json
[
  {
    "id": 1,
    "title": "Why Barbie and Oppenheimer will make the perfect cinema double bill",
    "description": "Greta Gerwig and Christopher Nolan are two modern auteurs with more in common than an upcoming summer release date... The post Why Barbie and Oppenheimer will make the perfect cinema double bill appeared first on Little White Lies.",
    "source": "https://lwlies.com/articles/why-barbie-and-oppenheimer-will-make-the-perfect-cinema-double-bill/",
    "theme": "Programmer"
  },
  {
    "id": 2,
    "title": "John Krasinski Shares Set Photos From the First Day Shooting A QUIET PLACE: DAY ONE",
    "description": "John Krasinski has shared the set photos from the first day of shooting his prequel, A Quiet Place: Day One. The movie serves as a rewind to the first film in the A Quiet Place franchise. The first two films both jumped around a bit in the apocalypse’s timeline; the first movie opens on Day 89 before jumping forward to detail the dramatic events of Day 472 and 473. Part II takes place in the days immediately after, but the film opens on Day 1.",
    "source": "https://geektyrant.com/news/john-krasinski-shares-set-photos-from-the-first-day-shooting-a-quiet-place-day-one",
    "theme": "Movies"
  },
  {
    "id": 3,
    "title": "A substandard psychological horror that still got a sequel makes a desperate dash for streaming freedom",
    "description": "Money always talks loudest at the end of the day.",
    "source": "https://wegotthiscovered.com/movies/a-substandard-psychological-horror-that-still-got-a-sequel-makes-a-desperate-dash-for-streaming-freedom/",
    "theme": "Corona"
  }
]
```

2. GET /myNews
   ketika end poin di jalankan akan menampilkan seluruh data berita yang sudah kita bookmark

   Status 200 - OK
   Response Body:

```json
[
  {
    "id": 1,
    "userId": 1,
    "newsId": 2,
    "createdAt": "2023-02-08T03:54:15.997Z",
    "updatedAt": "2023-02-08T03:54:15.997Z",
    "News": {
      "id": 2,
      "title": "Penjara bawah tanah",
      "description": "American style",
      "source": "jasgdhasvdhbashhj",
      "theme": "Movie",
      "createdAt": "2023-02-08T03:54:15.959Z",
      "updatedAt": "2023-02-08T03:54:15.959Z"
    }
  },
  {
    "id": 2,
    "userId": 1,
    "newsId": 3,
    "createdAt": "2023-02-08T06:09:40.125Z",
    "updatedAt": "2023-02-08T06:09:40.125Z",
    "News": {
      "id": 3,
      "title": "Penjara bawah air",
      "description": "American style",
      "source": "jasgdhasvdhbashhj",
      "theme": "Movie",
      "createdAt": "2023-02-08T06:09:40.094Z",
      "updatedAt": "2023-02-08T06:09:40.094Z"
    }
  },
  {
    "id": 3,
    "userId": 1,
    "newsId": 4,
    "createdAt": "2023-02-08T06:38:36.267Z",
    "updatedAt": "2023-02-08T06:38:36.267Z",
    "News": {
      "id": 4,
      "title": "Latest Sci-Fi News: Heartbreaking ‘Guardians of the Galaxy Vol. 3’ theory sends ripples through the fandom as James Gunn continues to troll ‘Superman’ stans",
      "description": "Is it the end of the line for this character?",
      "source": "https://wegotthiscovered.com/movies/latest-sci-fi-news-heartbreaking-guardians-of-the-galaxy-vol-3-theory-sends-ripples-through-the-fandom-as-james-gunn-continues-to-troll-superman-stans/",
      "theme": "Movies",
      "createdAt": "2023-02-08T06:38:36.258Z",
      "updatedAt": "2023-02-08T06:38:36.258Z"
    }
  }
]
```

3. POST /register
   ketika end poin di jalankan akan menambahkan data user

   Status 201 - OK
   Response Body:

```json
{
  "id": 12,
  "name": "ngabdi",
  "email": "ngabdi@mail.com"
}
```

Status 400 - Bad Request
Response Error:

```json
{
  "message": ["name is required"]
},
{
  "message": ["Email is required"]
},
{
  "message": ["password is required"]
},
{
  "message": ["Invalid email format"]
},
{
  "message": ["Email must be uniq"]
}
```

Status 500 - Internal Server Error
Response Error:

```json
    {
        message = `internal server error`
    }

```

4. POST /login
   ketika end poin di jalankan maka user akan mendapatkan token dan bisa masuk ke home page

   Status 200 - OK
   Response Body:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW11ZWxAbWFpbC5jb20iLCJpYXQiOjE2NzU5MDY0NzR9.3YP8QwrB09EIt8eWYnKdyFvZIQ7sWBYbslvh92HLYiY"
}
```

Status 400 - Bad Request
Response Error:

```json
{
    "message": "Email is required"
},
{
    "message": "password is required"
}

```

Status 401 - Bad Request
Response Error:

```json
{
    "message": "Invalid email/password"
},

```

Status 500 - Internal Server Error
Response Error:

```json
    {
        message = `internal server error`
    }

```

5. POST /bookmark
   ketika end poin di jalankan maka user bisa menambahkan news ke dalam bookmark nya

   Status 200 - OK
   Response Body:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW11ZWxAbWFpbC5jb20iLCJpYXQiOjE2NzU5MDY0NzR9.3YP8QwrB09EIt8eWYnKdyFvZIQ7sWBYbslvh92HLYiY"
}
```

Status 500 - Internal Server Error
Response Error:

```json
    {
        message = `internal server error`
    }
```
