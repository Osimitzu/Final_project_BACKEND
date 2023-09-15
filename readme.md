# E-commerce // Proyecto - Final Node JS

Objetivo general: Aplicar todos los conocimientos vistos en clase para levantar esta API desde 0, mas consideraciones de seguridad y para lanzar a producción en render. El proyecto debe cumplir con los siguientes puntos:

- Conectarse a una base de datos
- Se deben crear los siguientes modelos:
  - User (id, username, email, password, avatar)
  - Product (id, name, description, price, availableQty, status, **~~`userId`~~**, productImage)
  - Car (id, userId, totalPrice)
  - ProductInCart (id, carId, productId, quantity, price, status)
  - Order (id, totalPrice, userId, status) // si completada pendiente
  - ProductInOrder (id, orderId, productId, quantity, price)
- Establecer las siguientes relaciones:
  - ~~`Un usuario puede tener muchos productos, y un producto le pertenece a un usuario`~~
  - Un usuario solo puede tener un carrito, y un carrito le pertenece a un usuario ( al crear un usuario se debe crear su carrito )
  - Un usuario puede crear muchas ordenes y una orden le pertenece a un usuario
  - más las que consideres necesarias
- Las funciones de los modelos ProductInCart y ProductInOrder, son para ser tablas intermediaras (pivotes ) , para que se almacenen la información de los productos y de las ordenes y los carritos
  - Un ProductInCart puede tener uno o muchos producto y pertenece a un carrito
  - Un carrito tiene muchos ProductInCart
  - Una orden tiene muchos ProductInOrder
  - Un ProductInOrder tiene uno o muchos producto y pertenece a una orden
- Debe contener los siguientes puntos:
  - Crear usuarios y encriptar sus contraseñas con Bcrypt
  - Iniciar sesión y generar JWT
  - Editar un usuario ( username y avatar )
  - Crear la validaciones pertinentes para cada endpoint ( express validator)
  - Crear un nuevo producto, incluyendo una imagen
  - Poder editar la descripción de un producto
  - Obtener todos los productos que su cantidad sea mayor que 0~~**`, debe incluir el nombre del usuario quien esta vendiendo el producto`**~~
  - Agregar un producto al carrito
  - Mostrar todos los productos que el usuario tiene hasta el momento en su carrito
  - Realizar una compra, la orden se marca como comprada y el carrito debe vaciarse cambiando el estado del producto a purchased
  - Ver todas las ordenes del usuario
- Mandar un correo cuando un usuario crea una cuenta y cuando realiza una compra
- `~~// no hay~~` verificación de email
- Tu api debe tener una página de documentación con los endpoints que usas y que se pueda probar, incluyendo los campos requeridos para las peticiones y una sección para incluir el token de autenticación si es necesario. ( swwager)
- Enviar en class center link del repositorio y enlace de tu api desplegada (railway, render)

### Reto opcional

Generar un endpoint para recuperar contraseña.

<aside>
💡 Tip: Para recuperar una contraseña un usuario llena un formulario con donde solamente manda su correo electrónico. 
Posteriomente llega un mensaje a su correo electronico con un enlace que incluye un token. 
Este enlace lo lleva a una pagina que tiene un formulario para reestablecer la contraseña. 
Cuando da enviar, envia la contraseña nueva y el token del enlace.
</aside>

### Notas

- Algunas cosas de las especificaciones originales fueron modificadas, se agregaron algunas cosas extras y se quitaron otras. Originalmente estaba pensado que fuera un marketplace donde los usuarios registrados pudieran vender y comprar productos, pero la base de datos y los endpoints se modificaron para que fuera un e-commerce personalizado donde solo los administradores controlaban que productos se vendian y manejaban las ordenes de los usuarios.

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
