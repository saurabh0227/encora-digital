## Getting Started

### Installation

1. install the dependencies using `npm install` or `npm i`

2. Rename the file `.env.example` to `.env`, then you need to configure the file `config.js` located in `src/config`

3. Start the app using `npm start` on production

4. Start the app using `npm run dev` on local

### Directory Structure

```
├── src
│   ├── apiV1
│   │   ├── auth
│   │   │   ├── controller.js
|   |   ├── notes
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   ├── users
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   └── index.js
│   ├── config
│   │   ├── config.js
│   │   └── db.js
│   ├── swagger
│   │   ├── route.js
│   │   ├── swagger.json
│   └── index.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
```

### Available routes

| Method   | Resource                                | Description                                                                                                                                         |
| :------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------------------------------------- | --- |
| `POST`   | `/v1/users/signup`                      | Create a new user in the DB. You need to specify in the body the following attributes: role, username & password.                                   |
| `POST`   | `/v1/users/login`                       | Sign in with the username & password. If it's successful, then generates a token                                                                    |
| `POST`   | `/v1/notes/create`                      | To insert note in db for a particular user                                                                                                          | DB  | You need to specify the token in the header with the following format: `authorization: your-token` | DB. |
| `GET`    | `/v1/notes/fetchAll?page=1&limit=10`    | It returns the list all active notes. You need to specify the token in the header with the following format: `authorization: your-token`            | DB  |
| `GET`    | `/v1/notes/fetchByUser?page=1&limit=10` | It returns the list notes for a particular user. You need to specify the token in the header with the following format: `authorization: your-token` | DB  |
| `PUT`    | `/v1/notes/update/:noteId`              | To update a particular note. You need to specify the token in the header with the following format: `authorization: your-token`                     | DB  |
| `DELETE` | `/v1/notes/remove/:noteId`              | To remove a particular note. You need to specify the token in the header with the following format: `authorization: your-token`                     | DB  |

### Potman collection URL

https://www.getpostman.com/collections/6558a85671034cd43569

### Swagger documentation link

http://localhost:3000/api-docs/
