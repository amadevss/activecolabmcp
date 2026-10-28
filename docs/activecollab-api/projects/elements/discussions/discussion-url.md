# Discussion URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/discussions/discussion-url.html

**`POST /projects/1/discussions`** → HTTP 200

Payload:
```json
{
    "name": "Test Discussion",
    "body": "Discuss"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Test Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Discuss",
        "body_formatted": "Discuss",
        "created_on": 1430164045,
        "created_by_id": 1,
        "updated_on": 1430164045,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`GET /projects/1/discussions/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Test Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Discuss",
        "body_formatted": "Discuss",
        "created_on": 1430164045,
        "created_by_id": 1,
        "updated_on": 1430164045,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`GET /projects/2/discussions/1`** → HTTP 404
