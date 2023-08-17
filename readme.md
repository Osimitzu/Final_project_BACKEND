# E-commerce

Proyecto final academlo...

### Notas

- Tuve que comentar las relaciones (despues de hacer las migraciones y una vez que comprobe que se hicieron las relaciones correctamente en la base de datos) para poder realizar los endpoints, de lo contrario me tomaba las llaves foraneas como una columna extra en la tabla del modelo que se estuviera realizando.

- Productos con precio de 1 millon en adelante se ven raros en la base de datos.

<!-- ## Models

npx sequelize-cli model:generate --name roles --attributes role:string,description:string

npx sequelize-cli model:generate --name users --attributes username:string,email:string,password:string,avatar:string,role_id:integer,valid_user:boolean

npx sequelize-cli model:generate --name products --attributes name:string,description:string,price:real,available_qty:integer,status:boolean,user_id:integer,product_image:string

npx sequelize-cli model:generate --name cars --attributes user_id:integer,total_price:real

npx sequelize-cli model:generate --name orders --attributes user_id:integer,total_price:real,status:boolean

npx sequelize-cli model:generate --name product_in_cars --attributes car_id:integer,product_id:integer,quantity:integer,price:real,status:boolean

npx sequelize-cli model:generate --name product_in_orders --attributes order_id:integer,product_id:integer,quantity:integer,price:real -->

<!-- ### Users

{
"username": "Cervantes",
"email": "cervantes.aocc@gmail.com",
"password": "12345678"
}

{
"username": "Osimitzu",
"email": "angel_aocc@hotmail.com",
"password": "12345678"
}

{
"username": "Miocid",
"email": "osimitzuuu@gmail.com",
"password": "12345678"
}

{
"username": "Edelkhai",
"email": "angelo_aocc@outlook.com",
"password": "12345678"
} -->

<!-- ### Products

{
"name": "Product1",
"description": "Producto mamalon de alta calidad con las tres B",
"price": 39.99,
"available_qty": 120
} -->
