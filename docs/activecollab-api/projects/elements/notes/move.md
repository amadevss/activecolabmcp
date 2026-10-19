# Move

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/move.html

For the purpose of this test, we have create a project and we'll add following pages to it:

1. Note without subnotes,
2. Note with a couple of subnotes,
3. Note where we'll move the first two notes.

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Single Source Note",
    "body": "Single Source Note Body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Single Source Note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Single Source Note Body",
        "body_formatted": "Single Source Note Body",
        "body_plain_text": "Single Source Note Body",
        "created_on": 1430164188,
        "created_by_id": 1,
        "updated_on": 1430164188,
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

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Source Note with Subnotes",
    "body": "Source Note with Subnotes Body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Source Note with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Source Note with Subnotes Body",
        "body_formatted": "Source Note with Subnotes Body",
        "body_plain_text": "Source Note with Subnotes Body",
        "created_on": 1430164188,
        "created_by_id": 1,
        "updated_on": 1430164188,
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

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Source Subnote #1",
    "body": "Source Subnote #1 Body",
    "note_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/3",
        "name": "Source Subnote #1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Source Subnote #1 Body",
        "body_formatted": "Source Subnote #1 Body",
        "body_plain_text": "Source Subnote #1 Body",
        "created_on": 1430164188,
        "created_by_id": 1,
        "updated_on": 1430164188,
        "updated_by_id": 1,
        "note_id": 2,
        "is_subnote": true,
        "subnotes_count": 0,
        "is_in_collection": true,
        "position": 1,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (32 líneas más)
```

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Source Subnote #2",
    "body": "Source Subnote #2 Body",
    "note_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/4",
        "name": "Source Subnote #2",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Source Subnote #2 Body",
        "body_formatted": "Source Subnote #2 Body",
        "body_plain_text": "Source Subnote #2 Body",
        "created_on": 1430164189,
        "created_by_id": 1,
        "updated_on": 1430164189,
        "updated_by_id": 1,
        "note_id": 2,
        "is_subnote": true,
        "subnotes_count": 0,
        "is_in_collection": true,
        "position": 2,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (32 líneas más)
```

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Target Note",
    "body": "Target Note Body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/5",
        "name": "Target Note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Target Note Body",
        "body_formatted": "Target Note Body",
        "body_plain_text": "Target Note Body",
        "created_on": 1430164189,
        "created_by_id": 1,
        "updated_on": 1430164189,
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

If we try to move a note to another note simply by updating its `note_id` value, system will ignore your request:

**`PUT /projects/1/notes/1`** → HTTP 200

Payload:
```json
{
    "note_id": 5
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Single Source Note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Single Source Note Body",
        "body_formatted": "Single Source Note Body",
        "body_plain_text": "Single Source Note Body",
        "created_on": 1430164188,
        "created_by_id": 1,
        "updated_on": 1430164189,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 2,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (5 líneas más)
```

To move a note, you need to call `/move-to-note` command:

**`PUT /projects/1/notes/1/move-to-note`** → HTTP 200

Payload:
```json
{
    "note_id": 5
}
```

Respuesta:
```json
[
    {
        "id": 5,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/5",
        "name": "Target Note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Target Note Body",
        "body_formatted": "Target Note Body",
        "body_plain_text": "Target Note Body",
        "created_on": 1430164189,
        "created_by_id": 1,
        "updated_on": 1430164189,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 1,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    {
... (28 líneas más)
```

As a result, you will get the full collection of the target note and all of the attached subnotes.

Note with subnotes can also be moved:

**`PUT /projects/1/notes/2/move-to-note`** → HTTP 200

Payload:
```json
{
    "note_id": 5
}
```

Respuesta:
```json
[
    {
        "id": 5,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/5",
        "name": "Target Note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Target Note Body",
        "body_formatted": "Target Note Body",
        "body_plain_text": "Target Note Body",
        "created_on": 1430164189,
        "created_by_id": 1,
        "updated_on": 1430164190,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 4,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    {
... (112 líneas más)
```

All notes will be added at the end of the target note's collection.
