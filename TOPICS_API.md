# Topics API Documentation

This document outlines the API endpoints needed for the Topics feature implementation.

## Base URL
```
${NEXT_PUBLIC_API_BASE_URL}/topics
```

## Endpoints

### 1. Get All Posts
```
GET /api/topics/posts
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Response:**
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string (optional)",
      "content": "string",
      "author": {
        "id": "string",
        "firstName": "string",
        "lastName": "string"
      },
      "createdAt": "ISO string",
      "upvotes": "number",
      "downvotes": "number",
      "replies": "Reply[]",
      "attachments": "Attachment[] (optional)",
      "userVote": "up|down|null (optional)"
    }
  ]
}
```

### 2. Create Post
```
POST /api/topics/posts
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "title": "string (optional)",
  "content": "string",
  "attachments": "Attachment[] (optional)"
}
```

**Response:**
```json
{
  "id": "string",
  "title": "string (optional)",
  "content": "string",
  "author": {
    "id": "string",
    "firstName": "string",
    "lastName": "string"
  },
  "createdAt": "ISO string",
  "upvotes": 0,
  "downvotes": 0,
  "replies": [],
  "attachments": "Attachment[] (optional)",
  "userVote": null
}
```

### 3. Create Reply
```
POST /api/topics/posts/{postId}/replies
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "content": "string",
  "parentId": "string (optional - for nested replies)",
  "attachments": "Attachment[] (optional)"
}
```

**Response:**
```json
{
  "id": "string",
  "content": "string",
  "author": {
    "id": "string",
    "firstName": "string",
    "lastName": "string"
  },
  "createdAt": "ISO string",
  "upvotes": 0,
  "downvotes": 0,
  "replies": [],
  "attachments": "Attachment[] (optional)",
  "userVote": null,
  "parentId": "string (optional)"
}
```

### 4. Vote on Post
```
POST /api/topics/posts/{postId}/vote
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "voteType": "up|down"
}
```

**Response:**
```json
{
  "id": "string",
  "upvotes": "number",
  "downvotes": "number",
  "userVote": "up|down|null"
}
```

### 5. Vote on Reply
```
POST /api/topics/replies/{replyId}/vote
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "voteType": "up|down"
}
```

**Response:**
```json
{
  "id": "string",
  "upvotes": "number",
  "downvotes": "number",
  "userVote": "up|down|null"
}
```

## Data Types

### Attachment
```json
{
  "id": "string",
  "url": "string",
  "type": "image|file",
  "name": "string"
}
```

### Reply
```json
{
  "id": "string",
  "content": "string",
  "author": {
    "id": "string",
    "firstName": "string",
    "lastName": "string"
  },
  "createdAt": "ISO string",
  "upvotes": "number",
  "downvotes": "number",
  "replies": "Reply[]",
  "attachments": "Attachment[] (optional)",
  "userVote": "up|down|null (optional)",
  "parentId": "string (optional)"
}
```

## File Upload

Files are uploaded using the existing upload endpoint:
```
POST /api/upload
```
**Headers:**
- `Authorization: Bearer <token>`

**Body:**
- `FormData` with `file` field

**Response:**
```json
{
  "id": "string",
  "url": "string"
}
```

## Notes

1. All endpoints require authentication
2. Posts and replies support nested replies (replies to replies)
3. Voting system allows users to upvote or downvote posts and replies
4. Attachments support both images and files
5. The `userVote` field indicates the current user's vote on the post/reply
6. All timestamps are in ISO format
7. The API should handle pagination for large numbers of posts (not implemented in frontend yet)
