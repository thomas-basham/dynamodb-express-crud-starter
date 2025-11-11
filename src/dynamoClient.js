// src/dynamoClient.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const TABLE_NAME = process.env.DDB_TABLE;
const PRIMARY_KEY = process.env.DDB_PRIMARY_KEY || "id";

if (!TABLE_NAME) {
  console.error("❌ Missing DDB_TABLE in environment variables");
  process.exit(1);
}

const clientConfig = {
  region: process.env.AWS_REGION || "us-west-2",
};

if (process.env.DDB_ENDPOINT) {
  clientConfig.endpoint = process.env.DDB_ENDPOINT;
}

const rawClient = new DynamoDBClient(clientConfig);

const docClient = DynamoDBDocumentClient.from(rawClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

module.exports = {
  docClient,
  TABLE_NAME,
  PRIMARY_KEY,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
};
