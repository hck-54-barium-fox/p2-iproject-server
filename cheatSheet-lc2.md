# CheatSheet LC Ni Buos!!

## SERVER
### Sequelize Setup
0. create folder sever
1. npm init -y
2. npm i bcryptjs jsonwebtoken pg express sequelize cors
3. npm i -D sequelize-cli nodemon
4. touch .gitignore `node_modules`
5. npx sequelize-cli init
6. config/config.json setup `development environtment`
7. npx sequelize-cli db:create
8. npx sequelize-cli model:create --name PascalCase --attributes name:string, ...
#### Migration and Model, Association and Constraint/Validate
1. setup migrations/ and model/
2. if have UserId `this.belongsTo(models.Name>>Singular, pascalcase), User.hasMany(models.Grocery) `, di migration setup jg reference{ model dan key}
3. if unique, setup in migration too
4. validate and constraint reference: https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
5. seeder optional, direct create at DBeaver
``npx sequelize-cli seed:generate --name demo-user`
`npx sequelize-cli db:seed:all`
5. hashing password: using hooks in model/, references: https://www.npmjs.com/package/bcryptjs and https://sequelize.org/docs/v6/other-topics/hooks/
6. npx sequelize-cli db:migrate

### Express Setup
1. touch app.js
2. setup app.js reference: https://expressjs.com/en/starter/hello-world.html
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
3. setup bodyparser, cors, json body (optional)

### Logic Server
### 1. Register
try:
- req body 
- await user create
- send status 201, json user
- User.addHook('beforeCreate', (user, option) => {
    user.password = hashPass(user.password)
  })

catch:
- error message copy from instruction

### 2. Login
try:
- req body
- await user findone
- if user not found, throw 401
- compare password with bcryptjs reference: https://www.npmjs.com/package/bcryptjs
- if password invalid, throw 401
- create access token using jwt sign, (payload, and secret message), reference: https://www.npmjs.com/package/jsonwebtoken
- send status 200, and json access_token
createToken({
id: user.id,
email: user.email
})
catch:
- error message copy from instruction

### 3. Get Food
try:
- await food findall, include if needed
- send status 200 and json foodData

### 4. Post Food
try:
- req body
- await food create
- send status 201 and json foodData


### 5. Get FoodById
try:
- await food findone with where req params id
- if not found, throw error 404
- send status 200 and json foodData

### 6. Delete Food
try:
- create variable deletedFood
- await food findone, set deletedFood with foodData.name
- await food destroy where req params id
- send status 200 and message

### 7. Put Food 
try:
- req body
- await food and user findone
- await food update, where req params id, with req body
- if food not found, throw error 404
- send status 200 and message json

### 8. Patch Food
try:
- req body
- await food findone
- food update by req params
- if food not found, throw error 404
- send status 200 and message json


### 9. Authentication
try:
- get access token from req headers
- if access_token not found, throw error 401
- decode access_token with jwt verify (payload, secret), reference: https://www.npmjs.com/package/jsonwebtoken
- await user find where access_token.id
- if user not found, throw error 401
- set request user with user data

### 10. Authorization
try:
- await food findbypk with req params id
- if food not found, throw error 404
- if condition not met to perform action, throw error 403

## CLIENT
### Vue Setup
1. npm init vue@latest
- add vue router > yes
- add pinia > Yes
2. migrate from template folder to client/index.html
3. check main.js
4. check App.vue, delete all execpt routerview,
5. check index.js on route, empty it, check view folder, empty it
6. siapkan semua template page dan component


### Logic Client
0. npm i axios
### 1. submitLogin 
try:
di form page :
- buat v model pada input
- @submit panggil function
- method tanpa S data
di store:
- await post login with data from v-model form
- set access_token etc to localstorage
- set page to home and login true

### 3. submitRegister
try: 
- await axios post with data from v-model form
- set page to login or home

### 4. fetchFood/fetchCategory
di counter
- await axios get food, with header or not
- set dataFood to with data from axios
await axios({method, url, params}), this.datalist =data dari axios
di homepage
- panggil fungsi di mapAction
- panggil hasil fetchingan dari counter ke home dengan mapState
- saat computed panggil fungsi
- saat created memanggil fungsi fetch

### 5. postFood
try:
- await axios post food with data from v-model form
- set page to listfood

references vue: https://vuejs.org/guide/essentials/conditional.html

