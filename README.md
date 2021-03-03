# board express

## Framework

1. Platform: node.js

1. Web server: express.js

1. DB: mongoose

## Function

1. Board CRUD

### pacakge

초기 세팅

```shell
yarn init
yarn add express morgan express-session cookie-parser body-parser method-override
yarn add dotenv
yarn add mongoose
yarn add passport passport-jwt bcryptjs jsonwebtoken
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier
node_modules/.bin/eslint --init
```

how to use es moduel

```json
{
  "type": "module",
  "scripts": {
    "start": "nodemon --experimental-specifier-resolution=node src"
  }
}
```
