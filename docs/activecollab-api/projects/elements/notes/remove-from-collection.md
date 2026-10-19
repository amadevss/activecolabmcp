# Remove from Collection

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/remove-from-collection.html

For the purpose of this test, we have created one note in a project, and added two subnotes to it:

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "On project level",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "This note is on project level",
        "body_formatted": "This note is on project level",
        "body_plain_text": "This note is on project level",
        "created_on": 1430164215,
        "created_by_id": 1,
        "updated_on": 1430164216,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 2,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    }
]
```

Lets move subpage #1 to the project level:

**`PUT /projects/1/notes/2/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subnote #1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "This note is the first subnote",
        "body_formatted": "This note is the first subnote",
        "body_plain_text": "This note is the first subnote",
        "created_on": 1430164215,
        "created_by_id": 1,
        "updated_on": 1430164216,
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

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subnote #1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "This note is the first subnote",
        "body_formatted": "This note is the first subnote",
        "body_plain_text": "This note is the first subnote",
        "created_on": 1430164215,
        "created_by_id": 1,
        "updated_on": 1430164216,
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
    {
... (28 líneas más)
```
