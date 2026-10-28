# Reodering

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/reodering.html

Lets reorder notes in the first project:

**`PUT /projects/1/notes/reorder`** → HTTP 200

Payload:
```json
[
    2,
    1
]
```

Now, lets reorder sub-notes in the first note:

**`PUT /projects/1/notes/1/reorder`** → HTTP 200

Payload:
```json
[
    1,
    4,
    3
]
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
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
        "created_on": 1430164223,
        "created_by_id": 1,
        "updated_on": 1430164224,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 2,
        "is_in_collection": true,
        "position": 2,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```

In this example, we only reordered sub-notes. If we reorder subpages in such a way that main page is no longer first in the list, one of the subpages will be promoted to the main page, and main page will be converted to a subpage:

**`PUT /projects/1/notes/1/reorder`** → HTTP 200

Payload:
```json
[
    4,
    3,
    1
]
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/4",
        "name": "Second Subpage",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Second subpage",
        "body_formatted": "Second subpage",
        "body_plain_text": "Second subpage",
        "created_on": 1430164224,
        "created_by_id": 1,
        "updated_on": 1430164226,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 2,
        "is_in_collection": true,
        "position": 2,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (62 líneas más)
```
