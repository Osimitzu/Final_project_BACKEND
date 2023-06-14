# E-commerce

Proyecto final academlo...

## Models

npx sequelize-cli model:generate --name roles --attributes role:string,description:string

npx sequelize-cli model:generate --name users --attributes username:string,email:string,password:string,avatar:string,role_id:integer,valid_user:boolean

npx sequelize-cli model:generate --name products --attributes name:string,description:string,price:real,available_qty:integer,status:boolean,user_id:integer,product_image:string

npx sequelize-cli model:generate --name cars --attributes user_id:integer,total_price:real

npx sequelize-cli model:generate --name orders --attributes user_id:integer,total_price:real,status:boolean

npx sequelize-cli model:generate --name product_in_cars --attributes car_id:integer,product_id:integer,quantity:integer,price:real,status:boolean

npx sequelize-cli model:generate --name product_in_orders --attributes order_id:integer,product_id:integer,quantity:integer,price:real

### Notas

- **_Seeders_**
  Para generar una nueva seed

  > npx sequelize-cli seed:generate --name tableName

  Para meter información de las "seeds" a las tablas en la base de datos

  > npx sequelize-cli db:seed:all

  Para sacar información de las tablas en la base de datos

  > npx sequelize-cli db:seed:undo:all
