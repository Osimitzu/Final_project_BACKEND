# E-commerce

Proyecto final academlo...

### Notas

- Crear un modelo

  > En la terminal usamos el comando:

  ```
  npx sequelize-cli model:generate...

  -- name (nombre del modelo)
  -- name user
  -- attributes attr1:type,attr2:type,...,attrN:type

  npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

  ```

- **_Migrations_**
  Para migrar todo se usa el comando:

  > npx sequelize-cli db:migrate

  Para desmigrar todo se usa el comando:

  > npx sequelize-cli db:migrate:undo:all

  Para desmigrar un solo archivo se usa el comando:

  > npx sequelize-cli db:migrate:undo:all --to nombre-del-archivo.js

- **_Seeders_**
  Para generar una nueva seed

  > npx sequelize-cli seed:generate --name tableName

  Para meter información de las "seeds" a las tablas en la base de datos

  > npx sequelize-cli db:seed:all

  Para sacar información de las tablas en la base de datos

  > npx sequelize-cli db:seed:undo
