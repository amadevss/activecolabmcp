# Collections

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/collections.html

Personas in this Story: Default, Client.

For the purpose of this test, we have created a project with 10 notes, some of the grouped, and some standing alone, some of the visible to client, and some hidden. Owner sees all top level notes, ordered as they were created (newest first):

**`GET /projects/1/notes`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 8,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/8",
        "name": "Public with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Public with Subnotes Body",
        "body_formatted": "Public with Subnotes Body",
        "body_plain_text": "Public with Subnotes Body",
        "created_on": 1430164162,
        "created_by_id": 1,
        "updated_on": 1430164162,
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
    {
... (84 líneas más)
```

On the other hand, client sees only public notes:

**`GET /projects/1/notes`** → HTTP 200 _(como Client)_

Respuesta:
```json
[
    {
        "id": 8,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/8",
        "name": "Public with Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Public with Subnotes Body",
        "body_formatted": "Public with Subnotes Body",
        "body_plain_text": "Public with Subnotes Body",
        "created_on": 1430164162,
        "created_by_id": 1,
        "updated_on": 1430164162,
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
    {
... (56 líneas más)
```

Notice that public note "bubbles-up" to the top level if it is under a private note. This is because ActiveCollab reveals all collections that have public content, while still making private part hidden.

If we try to get collection data of that public-under-private note, system will return only information about public notes in a collection:

**`GET /projects/1/notes/4/collection`** → HTTP 200 _(como Client)_

Respuesta:
```json
[
    {
        "id": 4,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/4",
        "name": "Private Public Subpage",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Private Public Subpage Body",
        "body_formatted": "Private Public Subpage Body",
        "body_plain_text": "Private Public Subpage Body",
        "created_on": 1430164161,
        "created_by_id": 1,
        "updated_on": 1430164161,
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
    {
... (28 líneas más)
```

Trying to access collection info via private page will result in Page Not Found HTTP error:

**`GET /projects/1/notes/3/collection`** → HTTP 404 _(como Client)_

Members will see all notes in a collection, of course:

**`GET /projects/1/notes/4/collection`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Private With Subnotes",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Private With Subnotes Body",
        "body_formatted": "Private With Subnotes Body",
        "body_plain_text": "Private With Subnotes Body",
        "created_on": 1430164160,
        "created_by_id": 1,
        "updated_on": 1430164162,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 4,
        "is_in_collection": true,
        "position": 2,
        "contributor_ids": [
            1
        ]
    },
    {
... (112 líneas más)
```
