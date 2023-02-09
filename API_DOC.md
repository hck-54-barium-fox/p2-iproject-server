## 1. POST /register
Request:
```
- body:

```json
{
    "username": "string",
    "email": "string",
}
```

_Response (201 - Created)_

```json
{
    "user": {
        "id": 7,
        "username": "register2",
        "email": "register2@gmail.com",
        "password": "$2a$10$xvpFOHiK.GrankzFR34DdeuZuOVnd4vuPBVbDKVvcfLqLTD7Z/s.m",
        "phoneNumber": "08123456789",
        "address": "Ohio",
        "updatedAt": "2023-01-17T15:35:41.072Z",
        "createdAt": "2023-01-17T15:35:41.072Z",
        "role": "admin"
    }
}
```

_Response (400 - Bad Request)_

```json
[
    "email must be unique"
]
OR
{
[
    "Password length minimum is 5!"
]
}
OR
{
[
    "Your input is Not Email"
]
}
OR
{
[
    "Email Required"
]
}
OR
{
[
    "Password Required"
]
}
```


_Response (500 - Internal Server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;

## 2. POST /login

Request:
-headers:
```json
{}
```
- body:

```json
{
    "email": "string",
    "password": "string",
}
```

_Response (200 - Login)_

```json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiY2FrcmExQGdtYWlsLmNvbSIsImlhdCI6MTY3NTg4OTc2M30.bK1J6p-m9sXwmroMyZNK5AQv_HNrcSm4TnD8C13dKzI"
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "required"
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Invalid Login"
}

```

## 3. GET /product
Request:
-headers:
```json
{
    "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJyZWdpc3RlcjVAZ21haWwuY29tIiwiaWF0IjoxNjc0OTA5NjQ5fQ.Ywjp9xqPt24sfH_Pa1C4c7Mg5K_3EsM24uD3Z-iu1jA"
}
```

_Response (200 - OK)_

```json
    [
    {
        "id": 1,
        "name": "Cat Food Chicken Meat",
        "price": 200000,
        "stock": 20,
        "image": "https://s.alicdn.com/@sc04/kf/H5d2cdbac67a34d459d54b015322ed64dM.jpg_300x300.jpg",
        "description": "Natural Canned Food For Cat Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 2,
        "name": "Dog Food",
        "price": 200000,
        "stock": 20,
        "image": "https://s.alicdn.com/@sc04/kf/H0eba8a89870f4b92b696f9b9dcc6fd62e.jpg_300x300.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 3,
        "name": "Whiskas",
        "price": 200000,
        "stock": 20,
        "image": "https://asset.kompas.com/crops/bfkifZfeZH-aCzu9NocPRsnFjPg=/19x12:5634x3756/750x500/data/photo/2021/12/04/61ab16185f7b8.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 4,
        "name": "Meo Kitten",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 5,
        "name": "Whiskas Tuna",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 6,
        "name": "Pro Plan",
        "price": 200000,
        "stock": 20,
        "image": "https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 7,
        "name": "Pro Plan",
        "price": 200000,
        "stock": 20,
        "image": "https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    },
    {
        "id": 8,
        "name": "Mainan Kucing",
        "price": 200000,
        "stock": 20,
        "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/8/25/d51eaa47-7604-482d-b3ba-0e9846b1a506.jpg",
        "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
        "CategoryId": 2,
        "createdAt": "2023-02-08T16:15:08.173Z",
        "updatedAt": "2023-02-08T16:15:08.173Z"
    }
]
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;



## 4. GET /animal
Request:
-Query params:
```json
{
    "name":"bird"
}
```

_Response (200 - OK)_

```json
 {
    "data": [
        {
            "name": "Bird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves"
            },
            "locations": [
                "Africa",
                "Asia",
                "Central-America",
                "Eurasia",
                "Europe",
                "North-America",
                "Ocean",
                "Oceania",
                "South-America"
            ],
            "characteristics": {
                "main_prey": "Fruit, Spiders, Insects, Seeds",
                "distinctive_feature": "Light, feathered body and beak",
                "wingspan": "9cm - 300cm (4in - 118in)",
                "habitat": "Forests and shrub land close to water",
                "predators": "Foxes, Birds, Wild dogs",
                "diet": "Omnivore",
                "favorite_food": "Fruit",
                "type": "Bird",
                "average_clutch_size": "5",
                "slogan": "Not all birds are able to fly!",
                "color": "BrownGreyYellowRedBlueBlackWhiteOrangePink",
                "skin_type": "Feathers",
                "top_speed": "200 mph",
                "lifespan": "1 - 100 years",
                "weight": "0.002kg - 130kg (0.004lbs - 286lbs)",
                "height": "5cm - 270cm (2in - 106in)"
            }
        },
        {
            "name": "Bird Of Paradise",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Paradisaeidae"
            },
            "locations": [
                "Asia",
                "Oceania"
            ],
            "characteristics": {
                "main_prey": "Insects, Fruit, Seeds, Berries",
                "distinctive_feature": "Brightly coloured feathers and elaborate dance of males",
                "wingspan": "7.8 to 47.2 inches (20 to 120 cm)",
                "incubation_period": "16 to 22 days",
                "habitat": "Tropical forest tree tops",
                "diet": "Omnivore",
                "lifestyle": "Solitary",
                "favorite_food": "Insects",
                "type": "Bird",
                "slogan": "There are around 50 different species!",
                "nesting_location": "Forks of trees",
                "age_of_molting": "A few months to 7 years",
                "color": "BrownGreyYellowRedBlueBlackWhiteGreen",
                "skin_type": "Feathers",
                "lifespan": "5 - 8 years",
                "weight": "50g - 430g (1.8oz - 15.2oz)",
                "height": "15cm - 110cm (6in - 43in)"
            }
        },
        {
            "name": "Eastern Bluebird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Turdidae",
                "genus": "Sialia",
                "scientific_name": "Sialia sialis"
            },
            "locations": [
                "Central-America",
                "North-America"
            ],
            "characteristics": {
                "prey": "Insects, snails, spiders, beetles, earthworms, grasshoppers, katydids, crickets and other small invertebrates.",
                "estimated_population_size": "20 million",
                "biggest_threat": "Habitat destruction, invasive species, pet cats",
                "most_distinctive_feature": "The bright blue color of the male’s feathers",
                "other_name(s)": "Blue robin",
                "wingspan": "9.8 to 12.6 inches across",
                "incubation_period": "About two weeks.",
                "litter_size": "Three to seven",
                "habitat": "Habitat includes farmland, open country, parks, orchards, backyards, hedgerows",
                "predators": "Rodents, black bears, raccoons, snakes, cats, birds of prey and fire ants.",
                "diet": "Omnivore",
                "type": "Bird",
                "common_name": "Bluebird",
                "number_of_species": "8",
                "location": "North and Central America east of the Rocky Mountains",
                "average_clutch_size": "7",
                "nesting_location": "Abandoned woodpecker hole or other tree cavities a few feet from the ground.",
                "age_of_molting": "15 days",
                "migratory": "1",
                "color": "RedBlueWhiteOrange",
                "skin_type": "Feathers",
                "top_speed": "17 mph",
                "lifespan": "Six to 10 years",
                "weight": "0.95 to 1.2 ounces",
                "length": "6.3 to 8.3 inches"
            }
        },
        {
            "name": "Frigatebird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Pelecaniformes",
                "family": "Fregatidae",
                "genus": "Fregata",
                "scientific_name": "Fregata"
            },
            "locations": [
                "Ocean"
            ],
            "characteristics": {
                "main_prey": "Fish, Crab, Squid",
                "distinctive_feature": "Large wingspan and enlarged red throat of the male",
                "wingspan": "150cm - 250cm (59in - 98in)",
                "habitat": "Tropical coasts and islands",
                "predators": "Humans, Rats, Cats",
                "diet": "Carnivore",
                "lifestyle": "Colony",
                "favorite_food": "Fish",
                "type": "Bird",
                "average_clutch_size": "1",
                "slogan": "Found inhabiting tropical islands and coasts!",
                "color": "BrownRedBlackWhite",
                "skin_type": "Feathers",
                "top_speed": "9 mph",
                "lifespan": "15 - 25 years",
                "weight": "0.9kg - 1.9kg (1.9lbs - 4.2lbs)",
                "height": "65cm - 100cm (25in - 39in)"
            }
        },
        {
            "name": "Hummingbird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Apodiformes",
                "family": "Trochilidae",
                "genus": "Trochilinae"
            },
            "locations": [
                "Central-America",
                "North-America",
                "South-America"
            ],
            "characteristics": {
                "main_prey": "Nectar, Tree sap, Insects, Spiders",
                "distinctive_feature": "Long, thin beak and the ability to hover",
                "wingspan": "Three to five inches",
                "incubation_period": "15 to 18 days",
                "habitat": "Rainforest and tropical jungles",
                "predators": "Hawks, Snakes, Lizards",
                "diet": "Omnivore",
                "lifestyle": "Solitary",
                "favorite_food": "Nectar",
                "type": "Bird",
                "average_clutch_size": "2",
                "slogan": "Beat their wings up to 80 times per second!",
                "nesting_location": "Sheltered trees or shrubbery and fork of branches",
                "age_of_molting": "Four months for some species",
                "migratory": "1",
                "color": "BrownGreyRedWhiteTanGreen",
                "skin_type": "Feathers",
                "top_speed": "30 mph",
                "lifespan": "3 - 5 years",
                "weight": "2.2g - 20g (0.07oz - 0.7oz)",
                "height": "5cm - 20cm (2in - 8in)"
            }
        },
        {
            "name": "Lyrebird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Menuridae",
                "genus": "Menura"
            },
            "locations": [
                "Oceania"
            ],
            "characteristics": {
                "prey": "Invertebrates, small lizards and frogs",
                "estimated_population_size": "3500 for Albert’s lyrebird, over 10,000 for Superb lyrebird",
                "biggest_threat": "Habitat destruction, hunting, invasive species such as red foxes",
                "most_distinctive_feature": "The male bird’s skill at mimicry",
                "other_name(s)": "Bulln-bulln, weringerong, woorail for the Superb, northern lyrebird for the Albert’s",
                "wingspan": "27 to 31 inches",
                "litter_size": "1",
                "habitat": "Bushland and rainforests",
                "predators": "Birds of prey, including currawongs, foxes, cats and dogs",
                "diet": "Carnivore",
                "type": "Bird",
                "common_name": "Lyrebird",
                "number_of_species": "2",
                "location": "Australia: Victoria, Tasmania and New South Wales for the Superb lyrebird, Queensland for Albert’s lyrebird",
                "nesting_location": "On an earthen mound or among rocks",
                "age_of_molting": "Six weeks",
                "color": "BrownGrey",
                "skin_type": "Feathers",
                "top_speed": "9 mph",
                "lifespan": "Up to 30 years",
                "weight": "Superb lyrebirds weigh around 2.14 pounds, Albert’s 2.06 pounds",
                "length": "74 to 98 inches long for the Superb, 84 to 90 inches long for Albert’s"
            }
        },
        {
            "name": "Mountain Bluebird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Turdidae",
                "genus": "Sialia",
                "scientific_name": "Sialia currucoides"
            },
            "locations": [
                "Central-America",
                "North-America"
            ],
            "characteristics": {
                "prey": "Seeds, fruits, insects, and spiders",
                "estimated_population_size": "6 million mature individuals",
                "biggest_threat": "Lack of tree hollows",
                "most_distinctive_feature": "Bright blue plumage",
                "other_name(s)": "Arctic bluebirds",
                "wingspan": "11-14in",
                "incubation_period": "12-16 days",
                "habitat": "Plains and mountains",
                "predators": "Hawks, falcons, cats, raccoons, snakes, weasels, and rodents",
                "diet": "Omnivore",
                "type": "Bird",
                "common_name": "Mountain Bluebird",
                "number_of_species": "1",
                "location": "North America",
                "nesting_location": "Tree hollows",
                "migratory": "1",
                "color": "BrownGreyBlueWhite",
                "skin_type": "Feathers",
                "top_speed": "20 mph",
                "lifespan": "6-10 years",
                "weight": "0.8-1.1 ounces",
                "height": "6-7 inches"
            }
        },
        {
            "name": "Myna Bird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Sturnidae"
            },
            "locations": [
                "Africa",
                "Asia",
                "North-America",
                "Oceania"
            ],
            "characteristics": {
                "prey": "Insects, other small animals including crustaceans, rodents and fish",
                "estimated_population_size": "Depends on the species. The population of the common mynah, Acridotheres tristis is unknown, but it is abundant in its range, and its population is increasing. On the other hand, the Bali myna is critically endangered. Scientists believe that less than 100 adult birds are left in the wild.",
                "biggest_threat": "Habitat destruction, pet trade",
                "most_distinctive_feature": "The ability of some species to speak.",
                "other_name(s)": "Selarang, Teck Meng, Indian myna, Calcutta myna, Mal kawadiya, Sela lihiniya, Kampatiya, Sula magpie, talking myna, common grackle",
                "wingspan": "4.72 to 8.4 inches",
                "incubation_period": "13 to 18 days",
                "litter_size": "Four to five",
                "habitat": "Extensive, including farms, cities, forests, deserts, open forests, moist forests, mountain forests and dry woodlands, jungles, plantations and dwarf forests",
                "predators": "Crows, cats, mongooses, humans",
                "diet": "Carnivore",
                "type": "Bird",
                "common_name": "Mynah, or myna",
                "location": "Asia, including the Indian subcontinent, Oceania and North America",
                "average_clutch_size": "2",
                "nesting_location": "In a tree or in river banks",
                "age_of_molting": "22 to 24 days",
                "color": "YellowBlackWhiteDark Brown",
                "skin_type": "Feathers",
                "top_speed": "50 mph",
                "weight": "3 to 14 ounces in weight",
                "length": "9 to 19.5 inches"
            }
        },
        {
            "name": "Red-Billed Quelea Bird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Ploceidae",
                "genus": "Quelea",
                "scientific_name": "Quelea quelea"
            },
            "locations": [
                "Africa"
            ],
            "characteristics": {
                "prey": "Insects",
                "name_of_young": "Hatchling",
                "group_behavior": "Flock",
                "estimated_population_size": "Over 1 billion",
                "biggest_threat": "Humans",
                "most_distinctive_feature": "Bright red bill",
                "other_name(s)": "Weaver bird, red-billed dioch",
                "gestation_period": "10 to 12 days",
                "litter_size": "1-5",
                "habitat": "Forest, shrublands, farms",
                "predators": "Humans",
                "diet": "Omnivore",
                "type": "Bird",
                "common_name": "Quelea bird",
                "number_of_species": "1",
                "location": "Africa",
                "group": "Flock, colony",
                "color": "BrownRedPurple",
                "skin_type": "Feathers",
                "top_speed": "25 mph",
                "lifespan": "2 years",
                "weight": "1 ounce",
                "height": "2 inches",
                "length": "10 to 12 inches",
                "age_of_sexual_maturity": "1 year",
                "age_of_weaning": "10 days"
            }
        },
        {
            "name": "Red-winged blackbird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Icteridae",
                "genus": "Agelaius",
                "scientific_name": "Agelaius phoeniceus"
            },
            "locations": [
                "Central-America",
                "North-America"
            ],
            "characteristics": {
                "prey": "Seeds, grains, nuts, insects, snails, frogs",
                "estimated_population_size": "More than 200 million",
                "biggest_threat": "Habitat loss",
                "most_distinctive_feature": "The glossy back feathers and red markings of the male",
                "wingspan": "12-15 inches",
                "incubation_period": "3-11 days",
                "habitat": "Wetlands, woodlands, and grasslands",
                "predators": "Raccoons, minks, owls, and raptors",
                "diet": "Omnivore",
                "type": "Bird",
                "common_name": "Red-winged Blackbird",
                "number_of_species": "1",
                "location": "North America",
                "nesting_location": "Cattails, sedges, grasses, and other vegetation",
                "age_of_molting": "10-14 days",
                "migratory": "1",
                "color": "BrownYellowRedBlackWhite",
                "skin_type": "Feathers",
                "top_speed": "30 mph",
                "weight": "41-71g",
                "length": "8 inches on average"
            }
        },
        {
            "name": "Ruby-Throated Hummingbird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Apodiformes",
                "family": "Trochilidae",
                "genus": "Archilochus",
                "scientific_name": "Archilochus colubris"
            },
            "locations": [
                "Central-America",
                "North-America"
            ],
            "characteristics": {
                "prey": "Dragonflies, birds, snakes",
                "estimated_population_size": "7 million",
                "biggest_threat": "Habitat loss",
                "most_distinctive_feature": "Male’s ruby-red throat",
                "other_name(s)": "Eastern hummingbird",
                "wingspan": "4 – 4.75 inches",
                "incubation_period": "11-16 days",
                "litter_size": "2",
                "habitat": "Open woodlands",
                "predators": "Hawks, owls, crows, roadrunners",
                "diet": "Herbivore",
                "favorite_food": "Nectar",
                "type": "Bird",
                "common_name": "Hummingbird",
                "number_of_species": "1",
                "location": "Eastern United States and Caribbean",
                "nesting_location": "Tree or large shrub",
                "age_of_molting": "12 months",
                "migratory": "1",
                "color": "GreyWhiteGreen",
                "skin_type": "Feathers",
                "top_speed": "40 mph",
                "lifespan": "3-5 years",
                "weight": "0.11 ounces",
                "height": "3.5 inches",
                "length": "2.3 - 3.5 inches"
            }
        },
        {
            "name": "Tropicbird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Phaethontiformes",
                "family": "Phaethontidae",
                "genus": "Phaethon"
            },
            "locations": [
                "Ocean"
            ],
            "characteristics": {
                "main_prey": "Fish. Squid, Flying Fish",
                "distinctive_feature": "Long pointed beak and large body size",
                "wingspan": "94 to 112 cm",
                "incubation_period": "40 to 42 days",
                "habitat": "Tropical islands and cliffs",
                "predators": "Dogs, Cats, Stouts",
                "diet": "Carnivore",
                "lifestyle": "Flock",
                "favorite_food": "Fish",
                "type": "Bird",
                "average_clutch_size": "1",
                "slogan": "Nests on tropical islands and cliffs!",
                "nesting_location": "Ground or rocky cliffs",
                "age_of_molting": "Adult feather appear at two to three years",
                "migratory": "1",
                "color": "BrownYellowBlackWhite",
                "skin_type": "Feathers",
                "top_speed": "30 mph",
                "lifespan": "10 - 16 years",
                "weight": "0.3kg - 0.7kg (0.6lbs - 1.5lbs)",
                "length": "75cm - 100cm (30in - 40in)"
            }
        },
        {
            "name": "Umbrellabird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Cotingidae",
                "genus": "Cephalopterus",
                "scientific_name": "Cephalopterus"
            },
            "locations": [
                "Central-America",
                "South-America"
            ],
            "characteristics": {
                "prey": "Fruit, Frogs, Insects",
                "name_of_young": "Chick",
                "group_behavior": "Solitary",
                "estimated_population_size": "Declining",
                "biggest_threat": "Habitat loss",
                "distinctive_feature": "Umbrella-like crest and black feathers",
                "wingspan": "66cm - 71cm (26in - 28in)",
                "water_type": "Saltwater",
                "incubation_period": "1 month",
                "age_of_fledgling": "8 - 10 weeks",
                "habitat": "Low and high altitude rainforest",
                "diet": "Omnivore",
                "lifestyle": "Diurnal",
                "common_name": "Umbrellabird",
                "number_of_species": "3",
                "location": "Central and South America",
                "average_clutch_size": "1",
                "slogan": "Migrates up and down the mountains!",
                "group": "Bird",
                "color": "Black",
                "skin_type": "Feathers",
                "lifespan": "12 - 20 years",
                "weight": "320g - 570g (11.3oz - 20oz)",
                "height": "38cm - 50cm (15in - 20in)",
                "age_of_sexual_maturity": "2 - 4 years"
            }
        },
        {
            "name": "Weaver Bird",
            "taxonomy": {
                "kingdom": "Animalia",
                "phylum": "Chordata",
                "class": "Aves",
                "order": "Passeriformes",
                "family": "Ploceidae",
                "genus": "Ploceus",
                "scientific_name": "Ploceus cucullatus"
            },
            "locations": [
                "Africa",
                "Asia"
            ],
            "characteristics": {
                "prey": "Seeds, grains, insects, frogs, and other animals",
                "estimated_population_size": "Unknown",
                "biggest_threat": "Habitat loss",
                "most_distinctive_feature": "Some species grow bright yellow or red feathers for the breeding season",
                "other_name(s)": "Malimbes, weaver finches, and weaverbirds",
                "wingspan": "20-38cm (8-15in)",
                "incubation_period": "A few weeks",
                "habitat": "Grasslands, farmlands, and forests",
                "predators": "Lizards, snakes, crows, and birds of prey",
                "diet": "Omnivore",
                "type": "Bird",
                "common_name": "Weaver",
                "location": "Africa and Asia",
                "average_clutch_size": "5",
                "nesting_location": "Thorny trees",
                "age_of_molting": "A few weeks",
                "migratory": "1",
                "color": "BrownYellowRedBlackWhite",
                "lifespan": "10-20 years",
                "weight": "28-85g (1-3oz)",
                "height": "15-25cm (5-10in)"
            }
        }
    ],
    "image": "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png"
}
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;
## 5. GET /cat
Request:
-Query params:
```json
{
    "name":"angora"
}
```

_Response (200 - OK)_

```json
[
    {
        "length": "Medium",
        "origin": "Ankara, Turkey",
        "image_link": "https://api-ninjas.com/images/cats/turkish_angora.jpg",
        "family_friendly": 5,
        "shedding": 2,
        "general_health": 3,
        "playfulness": 5,
        "children_friendly": 3,
        "stranger_friendly": 4,
        "grooming": 4,
        "intelligence": 4,
        "other_pets_friendly": 3,
        "min_weight": 5,
        "max_weight": 9,
        "min_life_expectancy": 12,
        "max_life_expectancy": 18,
        "name": "Turkish Angora"
    }
]
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;

## 6. GET /pub/checkout
Request:
-headers:
```json
{
    "access_token":"djaslkdjlamd.a,smdlasjdklasjdlskamd.a"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 11,
        "ProductId": 2,
        "UserId": 1,
        "totalPrice": 200000,
        "status": "Paid",
        "createdAt": "2023-02-08T20:47:08.318Z",
        "updatedAt": "2023-02-08T20:49:22.693Z",
        "Product": {
            "id": 2,
            "name": "Dog Food",
            "price": 200000,
            "stock": 20,
            "image": "https://s.alicdn.com/@sc04/kf/H0eba8a89870f4b92b696f9b9dcc6fd62e.jpg_300x300.jpg",
            "description": "Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
            "CategoryId": 2,
            "createdAt": "2023-02-08T16:15:08.173Z",
            "updatedAt": "2023-02-08T16:15:08.173Z"
        }
    }
]
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;


## 7. POST /pub/buy/midtrans
Request:

Request:
-headers:
```json
{
    "access_token":"djaslkdjlamd.a,smdlasjdklasjdlskamd.a"
}
```

_Response (201 - OK)_

```json
{
    "token": "3b0c3583-b8ca-4271-8cbd-c263d35907a0",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/3b0c3583-b8ca-4271-8cbd-c263d35907a0"
}
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;

## 8. DELETE /pub/checkout/delete/:id
Request:

Request:
params:
```json
{
    "id"
}
```
-headers:
```json
{
    "access_token":"djaslkdjlamd.a,smdlasjdklasjdlskamd.a"
}
```

_Response (200 - OK)_

```json
1
```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;



```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;




## 9. GET /pub/product/buy/:id
Request:

Request:
-headers:
```json
{
    "access_token":"djaslkdjlamd.a,smdlasjdklasjdlskamd.a"
}
```

_Response (201 - OK)_

```json

  {
    "id": 12,
    "ProductId": 1,
    "UserId": 1,
    "totalPrice": 200000,
    "status": "Unpaid",
    "updatedAt": "2023-02-09T03:47:08.079Z",
    "createdAt": "2023-02-09T03:47:08.079Z"
}

```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;



```

_Response (500 - Internal server Error)_

```json
{
  "msg": "Something Happened!, try again later!"
}
```

&nbsp;



