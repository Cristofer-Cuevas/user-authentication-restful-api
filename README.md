# User Authentication RESTful API

Every time I want to create a new project I have to implement user authentication from scratch, this project will help to skip that part.

## Getting Started

Execute with node `createKeyPair.js`, this will create in the root directory root, two keys `id_rsa_priv.pem` and `id_rsa_pub.pem` for encrypting and decrypting JWTs.

## END-POINTS:

### For authentication using username and password.

| Method | End-point | Data Format/example                      |
| ------ | --------- | ---------------------------------------- |
| Post   | `/signin` | { "username": "Jhon", "password": "123"} |
| Post   | `/signup` | {"username": "Jhon", "password": "123"}  |

### For authentication using email and password.

| Method | End-point       | Data Format/example                                                                   |
| ------ | --------------- | ------------------------------------------------------------------------------------- |
| Post   | `/email-signin` | { "name": "Jhon", "lastName": "Doe", "email": "jhondoe@gmail.com", "password": "123"} |
| Post   | `/email-signup` | { "email": "jhondoe@gmail.com", "password": "123"}                                    |

### For authentication access

| Method | End-point    | Request Header                    |
| ------ | ------------ | --------------------------------- |
| Get    | `/protected` | "Authorization": `*Bearer token*` |
