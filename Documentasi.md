### Endpoints
List of Available Endpoints:

- POST /register

- POST /login

- POST   /sendmailRegister

- GET /profile

- GET /games

- PATCH /updatePaid

- POST /generateMitransToken
 
- GET /newsTechnlogies
 
- GET /gamesData
 
- GET /newsTechnlogies/:id


#  1. POST /register

Description
- Create a register user
  
Request
- Body
```
{
    "username": String,
    "email": String,
    "password": String
}
```
Response
201 - Created
 - Body
  
```
{
    "id": 47,
    "email": "admin123@gmail.com",
    "username": "wantau"
}
```
400 - Bad Request
 - Body
```
{
    "message": "Username is required"
}
OR
{
    "message": "Email must be unique"
}
OR
{
    "message": "Email must is Format"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

# 2. POST /login

Description
- Login  user

Request
- Body
```
{
    "email": String,
    "password": String
}
```

Response
200 - OK
 - Body
  
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoid2FudGF1Lm5vZGVtYWlsZXJAZ21haWwuY29tIiwiaWF0IjoxNjc1OTA4Nzc1fQ.OAO6LWtqFmQ0JVeuNCSPL9Pn4hlOGH9QVlbTolY0ESg"
}
```

400 - Bad Request
 - Body

```
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Invalid email/password"
}
```
# 3. POST /sendmailRegister

Description
- send message after register

Request
- Body
```
{
    "email": String
}
```
Response
201 - Created
 - Body
  
```
{
    "message": "message sent <f4ee42cd-27ab-d80d-2329-fcfabc8769dd@gmail.com>"
}
```
# 4. GET /profile

Description
- get  profile by user login
 Request
- Headers
```
{
    "access_token": String
}
```
Response
200 - OK
 - Body
  
```
{
    "id": 1,
    "username": "wantau",
    "emai": "arvin.aditama@gmail.com",
    "status": "paid"
}
```

# 5. GET /games
Description
- get all games Steam
 Request
- Headers
```
{
    "access_token": String
}
```
Response
200 - OK
 - Body
  
```
[
    {
        "name": "Dota 2",
        "steam_appid": 570,
        "price": "Rp 0",
        "detailed_description": "<strong>The most-played game on Steam.</strong><br>Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.<br><br><strong>One Battlefield. Infinite Possibilities.</strong><br>When it comes to diversity of heroes, abilities, and powerful items, Dota boasts an endless array—no two games are the same. Any hero can fill multiple roles, and there's an abundance of items to help meet the needs of each game. Dota doesn't provide limitations on how to play, it empowers you to express your own style.<br><br><strong>All heroes are free.</strong><br>Competitive balance is Dota's crown jewel, and to ensure everyone is playing on an even field, the core content of the game—like the vast pool of heroes—is available to all players. Fans can collect cosmetics for heroes and fun add-ons for the world they inhabit, but everything you need to play is already included before you join your first match.<br><br><strong>Bring your friends and party up.</strong><br>Dota is deep, and constantly evolving, but it's never too late to join. <br>Learn the ropes playing co-op vs. bots. Sharpen your skills in the hero demo mode. Jump into the behavior- and skill-based matchmaking system that ensures you'll <br>be matched with the right players each game.",
        "supported_languages": "Bulgarian, Czech, Danish, Dutch, English<strong>*</strong>, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Korean<strong>*</strong>, Norwegian, Polish, Portuguese - Portugal, Portuguese - Brazil, Romanian, Russian, Simplified Chinese<strong>*</strong>, Spanish - Spain, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian, Spanish - Latin America, Vietnamese<br><strong>*</strong>languages with full audio support",
        "image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1674071345",
        "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
        }
    },
    {
        "name": "GrandChase",
        "steam_appid": 985810,
        "price": "Rp 0",
        "detailed_description": "Grand Chase is a <u>side-scrolling online action RPG</u> with anime inspired graphics.<br>Anyone can join in on the action with arrow and Z keys with unique and charming characters.<br>There are various dungeons in a fantasy setting and online real-time PvP.<br>Collect equipment and learn skills to enjoy jampacked action in dungeons and PvP.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Main.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/httpspartner.steamgames.comgfxproxygfxapps985810extrasCharacter.jpgt=1674029103.png?t=1674029189?t=1674036800\" /><h2 class=\"bb_tag\">Main Content</h2><br><strong>20 Unique Characters</strong><br>Expand the available skills through changing jobs and create your unique skill tree to differentiate your character from others.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Character.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/skilltree.jpg?t=1674036800\" /><br><br><strong>Dungeon Mode</strong><br>Party up with your friends to explore the vast lands. (Solo play also available)<br>: Normal Dungeon – Follow the stories of the characters and the world of Grand Chase.<br>: Heroic Dungeon – Clear each dungeon to obtain the best available equipment.<br>: Event Dungeon – Enjoy a different kind of fun from other dungeons.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Worldmap.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Localmap.jpg?t=1674036800\" /><br><br><strong>PvP Mode</strong><br>With your unique skill tree, play strategic matches against other players in various PvP modes.<br>Play together between 2~6 players.<br>You can play Item Match, Team Match, and Singles Match in Normal and Deathmatch modes.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/PVP.jpg?t=1674036800\" /><br><br><strong>Customization</strong><br>There are various weapons, armor set, and accessories that allow you to customize your characters to stand out in a crowd.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/CharacterShop.jpg?t=1674036800\" />",
        "supported_languages": "English<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Korean<strong>*</strong><br><strong>*</strong>languages with full audio support",
        "image": "https://cdn.akamai.steamstatic.com/steam/apps/985810/header.jpg?t=1674036800",
        "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
        }
    }
]
```

# 6. PATCH /updatePaid

Description
- update status "unpaid" change to "paid"
 Request
- Headers
```
{
    "access_token": String
}
```
Response
200 - OK
 - Body
  
```
{
    message:'Sucess paid'
}
```


# 7. POST /generateMitransToken
Description
- Get token and Url payment Midtrans
 Request
- Headers
```
{
    "access_token": String
}
```
Response
201 - OK
 - Body
  
```
{
    "token": "a97068f2-00e4-4d32-8b5c-add9d3791ef3",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/a97068f2-00e4-4d32-8b5c-add9d3791ef3"
}
```
400-Bad Request
```
{
    "message": "Already paid"
}
```

# 8 GET /newsTechnlogies

Description
- Get all news Technlogies
 Request
- Headers
```
{
    "access_token": String
}
```
Response
200 - OK
 - Body
  
```
[
    {
        "id": 0,
        "source": "YouTube",
        "author": "anonymous",
        "title": "Baten Kaitos Ⅰ & Ⅱ HD Remaster - Nintendo Direct 2.8.2023 - Nintendo of America",
        "urlToImage": "https://i.ytimg.com/vi/TJnMc1rFK-c/maxresdefault.jpg",
        "publishedAt": "2023-02-09",
        "content": "anonymous"
    },
    {
        "id": 1,
        "source": "YouTube",
        "author": "anonymous",
        "title": "Fire Emblem Engage Expansion Pass - Nintendo Direct 2.8.23 - Nintendo of America",
        "urlToImage": "https://i.ytimg.com/vi/0R-M-DxcQ4Q/maxresdefault.jpg",
        "publishedAt": "2023-02-09",
        "content": "anonymous"
    }
]   
```

400-Bad Request
```
{
    "message": "Data Not Found"
}
```


# 9. GET /gamesData

Description
- Get all news games Data Steam
 Request
- Headers
```
{
    "access_token": String
}
```
 
Response
200 - OK
 - Body
  
```
[
    {
        "name": "Dota 2",
        "steam_appid": 570,
        "price": "Rp 0",
        "detailed_description": "<strong>The most-played game on Steam.</strong><br>Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.<br><br><strong>One Battlefield. Infinite Possibilities.</strong><br>When it comes to diversity of heroes, abilities, and powerful items, Dota boasts an endless array—no two games are the same. Any hero can fill multiple roles, and there's an abundance of items to help meet the needs of each game. Dota doesn't provide limitations on how to play, it empowers you to express your own style.<br><br><strong>All heroes are free.</strong><br>Competitive balance is Dota's crown jewel, and to ensure everyone is playing on an even field, the core content of the game—like the vast pool of heroes—is available to all players. Fans can collect cosmetics for heroes and fun add-ons for the world they inhabit, but everything you need to play is already included before you join your first match.<br><br><strong>Bring your friends and party up.</strong><br>Dota is deep, and constantly evolving, but it's never too late to join. <br>Learn the ropes playing co-op vs. bots. Sharpen your skills in the hero demo mode. Jump into the behavior- and skill-based matchmaking system that ensures you'll <br>be matched with the right players each game.",
        "supported_languages": "Bulgarian, Czech, Danish, Dutch, English<strong>*</strong>, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Korean<strong>*</strong>, Norwegian, Polish, Portuguese - Portugal, Portuguese - Brazil, Romanian, Russian, Simplified Chinese<strong>*</strong>, Spanish - Spain, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian, Spanish - Latin America, Vietnamese<br><strong>*</strong>languages with full audio support",
        "image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1675905833",
        "platforms": {
            "windows": true,
            "mac": true,
            "linux": true
        }
    },
    {
        "name": "GrandChase",
        "steam_appid": 985810,
        "price": "Rp 0",
        "detailed_description": "Grand Chase is a <u>side-scrolling online action RPG</u> with anime inspired graphics.<br>Anyone can join in on the action with arrow and Z keys with unique and charming characters.<br>There are various dungeons in a fantasy setting and online real-time PvP.<br>Collect equipment and learn skills to enjoy jampacked action in dungeons and PvP.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Main.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/httpspartner.steamgames.comgfxproxygfxapps985810extrasCharacter.jpgt=1674029103.png?t=1674029189?t=1674036800\" /><h2 class=\"bb_tag\">Main Content</h2><br><strong>20 Unique Characters</strong><br>Expand the available skills through changing jobs and create your unique skill tree to differentiate your character from others.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Character.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/skilltree.jpg?t=1674036800\" /><br><br><strong>Dungeon Mode</strong><br>Party up with your friends to explore the vast lands. (Solo play also available)<br>: Normal Dungeon – Follow the stories of the characters and the world of Grand Chase.<br>: Heroic Dungeon – Clear each dungeon to obtain the best available equipment.<br>: Event Dungeon – Enjoy a different kind of fun from other dungeons.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Worldmap.jpg?t=1674036800\" /><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/Localmap.jpg?t=1674036800\" /><br><br><strong>PvP Mode</strong><br>With your unique skill tree, play strategic matches against other players in various PvP modes.<br>Play together between 2~6 players.<br>You can play Item Match, Team Match, and Singles Match in Normal and Deathmatch modes.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/PVP.jpg?t=1674036800\" /><br><br><strong>Customization</strong><br>There are various weapons, armor set, and accessories that allow you to customize your characters to stand out in a crowd.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/985810/extras/CharacterShop.jpg?t=1674036800\" />",
        "supported_languages": "English<strong>*</strong>, Portuguese - Brazil<strong>*</strong>, Korean<strong>*</strong><br><strong>*</strong>languages with full audio support",
        "image": "https://cdn.akamai.steamstatic.com/steam/apps/985810/header.jpg?t=1674036800",
        "platforms": {
            "windows": true,
            "mac": false,
            "linux": false
        }
    }
]   
```


# 10. GET /newsTechnlogies/:id

Description
- Get all news games Data Steam
 Request
- Headers
```
{
    "access_token": String
}
```
- Params
```
{
    "id":"id"
}
```

Response
200 - OK
 - Body
```
{
    "id": 2,
    "source": "YouTube",
    "author": "anonymous",
    "title": "Omega Strikers - Launch Trailer - Nintendo Switch - Nintendo of America",
    "urlToImage": "https://i.ytimg.com/vi/Rely2ajQV7g/maxresdefault.jpg",
    "publishedAt": "2023-02-09",
    "content": "anonymous"
}
```

# 11. GET /newsTechnlogies/:id

Description
- Get all news games Data Steam
 Request
- Headers
```
{
    "access_token": String
}
```
- Params
```
{
    "id":"steam_appid"
}
```

Response
200 - OK
 - Body
```
{
    "name": "Dota 2",
    "steam_appid": 570,
    "price": "Rp 0",
    "detailed_description": "<strong>The most-played game on Steam.</strong><br>Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.<br><br><strong>One Battlefield. Infinite Possibilities.</strong><br>When it comes to diversity of heroes, abilities, and powerful items, Dota boasts an endless array—no two games are the same. Any hero can fill multiple roles, and there's an abundance of items to help meet the needs of each game. Dota doesn't provide limitations on how to play, it empowers you to express your own style.<br><br><strong>All heroes are free.</strong><br>Competitive balance is Dota's crown jewel, and to ensure everyone is playing on an even field, the core content of the game—like the vast pool of heroes—is available to all players. Fans can collect cosmetics for heroes and fun add-ons for the world they inhabit, but everything you need to play is already included before you join your first match.<br><br><strong>Bring your friends and party up.</strong><br>Dota is deep, and constantly evolving, but it's never too late to join. <br>Learn the ropes playing co-op vs. bots. Sharpen your skills in the hero demo mode. Jump into the behavior- and skill-based matchmaking system that ensures you'll <br>be matched with the right players each game.",
    "supported_languages": "Bulgarian, Czech, Danish, Dutch, English<strong>*</strong>, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Korean<strong>*</strong>, Norwegian, Polish, Portuguese - Portugal, Portuguese - Brazil, Romanian, Russian, Simplified Chinese<strong>*</strong>, Spanish - Spain, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian, Spanish - Latin America, Vietnamese<br><strong>*</strong>languages with full audio support",
    "image": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1675905833",
    "platforms": {
        "windows": true,
        "mac": true,
        "linux": true
    }
}
```

# Global Error

Response
- 401 - authentication
- Body
  ```
  {
     "message": "Invalid token"}
  }
  ```

- 500 - Internal Server Error
- Body
  ```
  {
     "message": "Internal server eror" }
  }
  ```