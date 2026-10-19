# Versions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/versions.html

Personas in this Story: Default, Member.

First version of the note that name "Version 1" and body "Vrsion 1 is awesome":

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Version 1",
    "body": "Vrsion 1 is awesome"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Version 1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Vrsion 1 is awesome",
        "body_formatted": "Vrsion 1 is awesome",
        "body_plain_text": "Vrsion 1 is awesome",
        "created_on": 1430164249,
        "created_by_id": 1,
        "updated_on": 1430164249,
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

Oh, we made a mistake here. Lets correct it:

**`PUT /projects/1/notes/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "body": "Version 1 is awesome"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Version 1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Version 1 is awesome",
        "body_formatted": "Version 1 is awesome",
        "body_plain_text": "Version 1 is awesome",
        "created_on": 1430164249,
        "created_by_id": 1,
        "updated_on": 1430164250,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1,
            2
        ]
    },
... (6 líneas más)
```

This will make version two look like this: name "Version 1", body: "Version 1 is awesome". Lets do one update that will create a history entry, but that will not create a new version:

**`PUT /projects/1/notes/1`** → HTTP 200

Payload:
```json
{
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Version 1",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Version 1 is awesome",
        "body_formatted": "Version 1 is awesome",
        "body_plain_text": "Version 1 is awesome",
        "created_on": 1430164249,
        "created_by_id": 1,
        "updated_on": 1430164250,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1,
            2
        ]
    },
... (6 líneas más)
```

Lets create a version #3:

**`PUT /projects/1/notes/1`** → HTTP 200

Payload:
```json
{
    "name": "Version 3",
    "body": "Version 3 is much better"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Version 3",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Version 3 is much better",
        "body_formatted": "Version 3 is much better",
        "body_plain_text": "Version 3 is much better",
        "created_on": 1430164249,
        "created_by_id": 1,
        "updated_on": 1430164250,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1,
            2
        ]
    },
... (6 líneas más)
```

and v4 that does not update both fields:

**`PUT /projects/1/notes/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "name": "Maybe we should go with v4?"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Maybe we should go with v4?",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Version 3 is much better",
        "body_formatted": "Version 3 is much better",
        "body_plain_text": "Version 3 is much better",
        "created_on": 1430164249,
        "created_by_id": 1,
        "updated_on": 1430164250,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1,
            2
        ]
    },
... (6 líneas más)
```

Lets check how this looks like:

**`GET /projects/1/notes/1/versions`** → HTTP 200

Respuesta:
```json
{
    "1": {
        "created_on": 1430164249,
        "created_by_id": 1,
        "name": "Version 1",
        "body": "Vrsion 1 is awesome",
        "modification_id": 0
    },
    "2": {
        "created_on": 1430164250,
        "created_by_id": 2,
        "name": "Version 1",
        "body": "Version 1 is awesome",
        "modification_id": 1
    },
    "3": {
        "created_on": 1430164250,
        "created_by_id": 1,
        "name": "Version 3",
        "body": "Version 3 is much better",
        "modification_id": 3
    },
    "4": {
        "created_on": 1430164250,
        "created_by_id": 2,
        "name": "Maybe we should go with v4?",
        "body": "Version 3 is much better",
        "modification_id": 4
    }
}
```
