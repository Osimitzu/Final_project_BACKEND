# E-commerce

Proyecto final Academlo...

### Notas

- Productos con precio de 1 millon en adelante se ven raros en la base de datos.

### Pending

- Correo con detalles de compra y reseteo de contraseña no se han personalisado.
- Faltan la mayoría de pruebas unitarias.
- Actualizar ruta de update user role para quitar el 'deprecated'

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
