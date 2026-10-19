# URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/url.html

Purpose of this test is to check that notes can't be acccess with URL modifications (invalid project ID). To test, we need a note:

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Test Document",
    "body": "Text"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Test Document",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Text",
        "body_formatted": "Text",
        "body_plain_text": "Text",
        "created_on": 1430164242,
        "created_by_id": 1,
        "updated_on": 1430164242,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (5 líneas más)
```

It is accessible through the valid project URL:

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Test Document",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Text",
        "body_formatted": "Text",
        "body_plain_text": "Text",
        "created_on": 1430164242,
        "created_by_id": 1,
        "updated_on": 1430164242,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (5 líneas más)
```

But not if we insert an incorrect project ID in the URL:

**`GET /projects/2/notes/1`** → HTTP 404
