# DynamoDB Express CRUD API Starter

A lightweight Express.js server that provides a simple CRUD REST API for DynamoDB.  
Developers can clone the repository, configure AWS credentials and a DynamoDB table name, and start a fully functional API within minutes.

---

## Overview

This project provides a plug-and-play Express API connected to Amazon DynamoDB. It is ideal for rapid prototyping, internal tools, or as a boilerplate for serverless applications.

**Key Features**

- Simple Express.js server (no TypeScript or build process)
- Full CRUD routes for DynamoDB
- Environment-based configuration
- Works with AWS DynamoDB or DynamoDB Local
- Includes CORS and JSON middleware
- Uses the AWS SDK v3 DocumentClient
- Automatic reload in development via Nodemon

---

## Project Structure

```dynamodb-express-crud/
│
├── package.json
├── .env.example
├── src/
│ ├── index.js
│ ├── dynamoClient.js
│ └── routes.js
└── README.md

```

---

## Prerequisites

- Node.js 18 or higher
- An existing DynamoDB table
- AWS credentials with read/write access to that table. [How to create an IAM User with access credentials](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html).

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/thomas-basham/dynamodb-express-crud-starter.git

cd dynamodb-express-crud

2. Install dependencies

npm install

3. Configure environment variables

Copy .env.example to .env:

cp .env.example .env

Then edit .env:

# AWS credentials
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=us-west-2

# DynamoDB configuration
DDB_TABLE=YourTableName
DDB_PRIMARY_KEY=id

# Optional: DynamoDB Local endpoint
# DDB_ENDPOINT=http://localhost:8000

# Express server configuration
PORT=4000

AWS credentials can also be loaded from the standard AWS CLI configuration or IAM roles.

⸻

Running the Server

Development mode (auto-reload via Nodemon):

npm run dev

Production mode:

npm start

The server will start on http://localhost:4000 by default.

⸻

API Endpoints

Base URL: http://localhost:4000/api

Method	Endpoint	Description
GET	/health	Health check
GET	/items	List all items (Scan)
GET	/items/:id	Retrieve item by ID
POST	/items	Create a new item
PUT	/items/:id	Replace or upsert an item
DELETE	/items/:id	Delete an item by ID


⸻

Example Requests

Create Item

POST /api/items

Request body:

{
  "title": "Learn DynamoDB",
  "status": "in-progress"
}

Response:

{
  "id": "4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef",
  "title": "Learn DynamoDB",
  "status": "in-progress"
}


⸻

List Items

GET /api/items

Response:

{
  "count": 2,
  "items": [
    { "id": "1", "title": "Learn Express" },
    { "id": "2", "title": "Connect DynamoDB" }
  ]
}


⸻

Retrieve Single Item

GET /api/items/4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef

Response:

{
  "id": "4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef",
  "title": "Learn DynamoDB",
  "status": "in-progress"
}


⸻

Update Item

PUT /api/items/4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef

Request body:

{
  "title": "Learn DynamoDB",
  "status": "completed"
}

Response:

{
  "id": "4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef",
  "title": "Learn DynamoDB",
  "status": "completed"
}


⸻

Delete Item

DELETE /api/items/4b33e8e4-7c42-47df-8edb-c3cbe5cb33ef

Response:

204 No Content


⸻

Testing with curl

# Health check
curl http://localhost:4000/api/health

# Create
curl -X POST http://localhost:4000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Hello DynamoDB"}'

# List
curl http://localhost:4000/api/items

# Retrieve
curl http://localhost:4000/api/items/123

# Delete
curl -X DELETE http://localhost:4000/api/items/123


⸻

Using DynamoDB Local

To run this project without AWS charges, you can use DynamoDB Local.

Start DynamoDB Local with Docker:

docker run -p 8000:8000 amazon/dynamodb-local

Add the following line to .env:

DDB_ENDPOINT=http://localhost:8000

Create a test table:

aws dynamodb create-table \
  --table-name MyTable \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000


⸻

Error Handling

Code	Meaning
200	Success
201	Created
204	Deleted (No Content)
400	Invalid Input
404	Item Not Found
500	Internal Server Error


⸻

Example Integration

Example client code using Axios:

import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000/api" });

async function createItem() {
  const res = await api.post("/items", { title: "New item" });
  console.log(res.data);
}

createItem();

```

⸻

License

This project is licensed under the MIT License. See the LICENSE￼ file for details.

⸻

Contributing

Contributions are welcome.
Please open an issue or submit a pull request for bug fixes or new features.

⸻

Quick Start Summary

```
git clone https://github.com/your-username/dynamodb-express-crud.git
cd dynamodb-express-crud
npm install
cp .env.example .env
npm run dev

```
