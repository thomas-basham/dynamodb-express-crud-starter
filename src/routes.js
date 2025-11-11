// src/routes.js
import express from "express";
import crypto from "node:crypto";

import {
  docClient,
  TABLE_NAME,
  PRIMARY_KEY,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from "./dynamoClient.js";

export const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", table: TABLE_NAME });
});

// GET /items - list all items (scan)
router.get("/items", async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const result = await docClient.send(command);

    res.json({
      count: result.Items?.length || 0,
      items: result.Items || [],
    });
  } catch (error) {
    console.error("Error scanning items:", error);
    res.status(500).json({ error: "Failed to list items" });
  }
});

// GET /items/:id - get item by primary key
router.get("/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { [PRIMARY_KEY]: id },
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      return res.status(404).json({ error: `Item not found for id: ${id}` });
    }

    res.json(result.Item);
  } catch (error) {
    console.error("Error getting item:", error);
    res.status(500).json({ error: "Failed to get item" });
  }
});

// POST /items - create new item
router.post("/items", async (req, res) => {
  try {
    const body = req.body || {};

    const id = body[PRIMARY_KEY] || crypto.randomUUID();

    const item = {
      ...body,
      [PRIMARY_KEY]: id,
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
      // optional: only create if not exists
      // ConditionExpression: `attribute_not_exists(${PRIMARY_KEY})`
    });

    await docClient.send(command);

    res.status(201).json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT /items/:id - replace / upsert item
router.put("/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const body = req.body || {};

    const item = {
      ...body,
      [PRIMARY_KEY]: id,
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });

    await docClient.send(command);

    res.json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE /items/:id - delete item
router.delete("/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { [PRIMARY_KEY]: id },
    });

    await docClient.send(command);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});
