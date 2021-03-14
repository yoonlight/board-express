# Query

## create board

```json
{
  "title": "String",
  "username": "String",
  "body": "String",
  "tags": ["String"],
  "category": "String"
}
```

## add comment

```json
{
  "username": "String",
  "body": "String2"
}
```

## find all board

localhost:3001/api/board?offset=1&limit=5
