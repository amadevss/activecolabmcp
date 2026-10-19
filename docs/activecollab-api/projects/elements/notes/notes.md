# Notes

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/notes.html

To list text notes that are in a project, call `/projects/:project_id/notes`:

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[]
```

Lets create a note:

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Document Title",
    "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Document Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164197,
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

and add a subpage:

**`POST /projects/1/notes`** → HTTP 200

Payload:
```json
{
    "name": "Subpage Title",
    "body": "Subpage body",
    "note_id": 1,
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subpage Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Subpage body",
        "body_formatted": "Subpage body",
        "body_plain_text": "Subpage body",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164197,
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

When we try to list project notes, we'll only get main notes, but not subnotes:

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Document Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164197,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 1,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    }
]
```

When we fetch the first page details, we'll see that subpage is included in the result:

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Document Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164197,
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
    "subscribers": [
... (34 líneas más)
```

If we try to fetch subpage, we'll see that there is no `subnotes` property:

**`GET /projects/1/notes/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subpage Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Subpage body",
        "body_formatted": "Subpage body",
        "body_plain_text": "Subpage body",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164197,
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

This is because activeCollab supports only one level of subnotes. Notice that subpates also return `note` property with details of the parent note when accessed directly.

**`PUT /projects/1/notes/1`** → HTTP 200

Payload:
```json
{
    "name": "Updated Name",
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
        "name": "Updated Name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164198,
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
    "subscribers": [
... (34 líneas más)
```

Note that moving first note to trash:

**`DELETE /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Updated Name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164198,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164198,
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

Will not move sunotes to trash. Instead, it will make it will make the first subnote the front page of the collection, and push itself at the end of the collection:

**`GET /projects/1/notes/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subpage Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Subpage body",
        "body_formatted": "Subpage body",
        "body_plain_text": "Subpage body",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164198,
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

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Updated Name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164198,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_formatted": "<p>Document Body<\/p><ul><li>Item one<\/li><li>Item two<\/li><\/ul>",
        "body_plain_text": "Document Body\n\n* Item one\n* Item two",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164198,
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

And text notes listing should be empty again:

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Subpage Title",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Subpage body",
        "body_formatted": "Subpage body",
        "body_plain_text": "Subpage body",
        "created_on": 1430164197,
        "created_by_id": 1,
        "updated_on": 1430164198,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            1
        ]
    }
]
```
