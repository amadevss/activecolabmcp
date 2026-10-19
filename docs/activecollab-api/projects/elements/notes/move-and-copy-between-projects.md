# Move and Copy between Projects

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/move-and-copy-between-projects.html

Lets create a copy of the note:

**`PUT /projects/1/notes/1/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 1,
    "copy": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/4",
        "name": "First Document",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "First document",
        "body_formatted": "First document",
        "body_plain_text": "First document",
        "created_on": 1430164179,
        "created_by_id": 1,
        "updated_on": 1430164181,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 2,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```

Now, lets move this copy to a target project:

**`PUT /projects/1/notes/4/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/2\/notes\/4",
        "name": "First Document",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 2,
        "is_hidden_from_clients": false,
        "body": "First document",
        "body_formatted": "First document",
        "body_plain_text": "First document",
        "created_on": 1430164179,
        "created_by_id": 1,
        "updated_on": 1430164181,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 2,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```
