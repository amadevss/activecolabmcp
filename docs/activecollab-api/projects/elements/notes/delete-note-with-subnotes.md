# Delete Note with Subnotes

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/delete-note-with-subnotes.html

For the purpose of this test, we'll create a note and two subnotes:

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Note with Subnotes",
    "body": "Note with Subnotes Body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Note with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Note with Subnotes Body",
        "body_formatted": "Note with Subnotes Body",
        "body_plain_text": "Note with Subnotes Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164170,
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
    "name": "Subnote #1",
    "body": "Subnote #1 Body",
    "note_id": 1
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
        "body": "Subnote #1 Body",
        "body_formatted": "Subnote #1 Body",
        "body_plain_text": "Subnote #1 Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164170,
        "updated_by_id": 1,
        "note_id": 1,
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
    "name": "Subnote #2",
    "body": "Subnote #2 Body",
    "note_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/3",
        "name": "Subnote #2",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Subnote #2 Body",
        "body_formatted": "Subnote #2 Body",
        "body_plain_text": "Subnote #2 Body",
        "created_on": 1430164171,
        "created_by_id": 1,
        "updated_on": 1430164171,
        "updated_by_id": 1,
        "note_id": 1,
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
    "name": "Note without Subnotes",
    "body": "Note without Subnotes Body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/4",
        "name": "Note without Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Note without Subnotes Body",
        "body_formatted": "Note without Subnotes Body",
        "body_plain_text": "Note without Subnotes Body",
        "created_on": 1430164171,
        "created_by_id": 1,
        "updated_on": 1430164171,
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

When we delete a note:

**`DELETE /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Note with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164171,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Note with Subnotes Body",
        "body_formatted": "Note with Subnotes Body",
        "body_plain_text": "Note with Subnotes Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164171,
        "updated_by_id": 1,
        "note_id": 2,
        "is_subnote": true,
        "subnotes_count": 0,
        "is_in_collection": true,
        "position": 3,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (32 líneas más)
```

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Note with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164171,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Note with Subnotes Body",
        "body_formatted": "Note with Subnotes Body",
        "body_plain_text": "Note with Subnotes Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164171,
        "updated_by_id": 1,
        "note_id": 2,
        "is_subnote": true,
        "subnotes_count": 0,
        "is_in_collection": true,
        "position": 3,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (32 líneas más)
```

**`GET /projects/1/notes/2`** → HTTP 200

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
        "body": "Subnote #1 Body",
        "body_formatted": "Subnote #1 Body",
        "body_plain_text": "Subnote #1 Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164171,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 1,
        "is_in_collection": true,
        "position": 1,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```

**`GET /projects/1/notes/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/3",
        "name": "Subnote #2",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Subnote #2 Body",
        "body_formatted": "Subnote #2 Body",
        "body_plain_text": "Subnote #2 Body",
        "created_on": 1430164171,
        "created_by_id": 1,
        "updated_on": 1430164171,
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

**`DELETE /permanently-delete/note/1`** → HTTP 200

**`GET /projects/1/notes/1`** → HTTP 404

First subnote became primary note and inherited old note's position:

**`GET /projects/1/notes/2`** → HTTP 200

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
        "body": "Subnote #1 Body",
        "body_formatted": "Subnote #1 Body",
        "body_plain_text": "Subnote #1 Body",
        "created_on": 1430164170,
        "created_by_id": 1,
        "updated_on": 1430164171,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 1,
        "is_in_collection": true,
        "position": 1,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```

Second page remained a subpage, but it is now attached to the new main page:

**`GET /projects/1/notes/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/3",
        "name": "Subnote #2",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Subnote #2 Body",
        "body_formatted": "Subnote #2 Body",
        "body_plain_text": "Subnote #2 Body",
        "created_on": 1430164171,
        "created_by_id": 1,
        "updated_on": 1430164171,
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
