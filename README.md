# Exploding Kitten

# Database

we have a database file name kitten_game and containing table user_details

**Todo Table**

| Column   | Type    |
| -------- | ------- |
| id       | INTEGER |
| username | TEXT    |
| played   | INTEGER |
| wins     | INTEGER |

## Running the API

Clone this repository.

Install dependencies using npm install.

The API server starts automatically upon running node index.js (assuming the main script is named index.js).

## Dependencies

"cors": "^2.8.5",
"express": "^4.18.3",
"sqlite": "^5.1.1",
"sqlite3": "^5.1.7"

## Endpoints

1. Register User:

Method: POST
Endpoint: /register
Request Body: { username: "username" }
Response:
Status Code: 200 (Success): { message: "User created successfully" }
Status Code: 409 (Conflict): { message: "Username already exists. Try another name" }

2. Check Username:

Method: POST
Endpoint: /users
Request Body: { username: "username" }
Response:
Status Code: 200 (Success): { message: "User Found" }
Status Code: 400 (Bad Request): { message: "Username Not Found. If you are new to game select Yes from dropdown" }

3. Get User Details:

Method: GET
Endpoint: /details?name=username
Query Parameter: name (Username)
Response: User details object including username, played, and wins.

4. Update User Stats:

Method: PUT
Endpoint: /update
Request Body: { username: "username", played: number, wins: number }
Response:
Status Code: 200 (Success): "db updated successfully"

5. Get Leaderboard:

Method: GET
Endpoint: /leardboard
Response: An array of user objects ordered by wins (descending) and then by played games (descending).

6. Get All Users:

Method: GET
Endpoint: /get
Response: An array of user objects.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
