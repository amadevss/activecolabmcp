# Search

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/search.html

For the purpose of this test, we have create one text note with one sub-page:

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Montenegro Visit",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Stay in Kosanica, climb the Bobotov Kuk on Durmitor",
        "body_formatted": "Stay in Kosanica, climb the Bobotov Kuk on Durmitor",
        "body_plain_text": "Stay in Kosanica, climb the Bobotov Kuk on Durmitor",
        "created_on": 1430164234,
        "created_by_id": 1,
        "updated_on": 1430164234,
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

Lets search for a term that is in the main note:

**`GET /search?q=montenegro`** → HTTP 200

Respuesta:
```json
[]
```

Now lets search for a term that is in the sub-page:

**`GET /search?q=kathmandu`** → HTTP 200

Respuesta:
```json
[]
```
