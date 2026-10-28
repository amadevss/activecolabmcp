# Search Discussions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/discussions/search-discussions.html

For the purpose of this test, we have created two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164079,
        "created_by_id": 1,
        "updated_on": 1430164079,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-wzjI5pF@mail.manageprojects.com",
... (46 líneas más)
```

To get started, we will create a couple of discussions and comments:

**`POST /projects/2/discussions`** → HTTP 200

Payload:
```json
{
    "name": "Belgrade trip",
    "body": "Plan the trip. Common term: Serbia"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Discussion",
        "url_path": "\/projects\/2\/discussions\/2",
        "name": "Belgrade trip",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 2,
        "is_hidden_from_clients": false,
        "body": "Plan the trip. Common term: Serbia",
        "body_formatted": "Plan the trip. Common term: Serbia",
        "created_on": 1430164080,
        "created_by_id": 1,
        "updated_on": 1430164080,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`POST /comments/discussion/1`** → HTTP 200

Payload:
```json
{
    "body": "Novi Sad is the second largest city in Serbia"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Discussion",
        "parent_id": 1,
        "body": "Novi Sad is the second largest city in Serbia",
        "body_formatted": "Novi Sad is the second largest city in Serbia",
        "body_plain_text": "Novi Sad is the second largest city in Serbia",
        "created_on": 1430164080,
        "created_by_id": 1,
        "updated_on": 1430164080,
        "updated_by_id": 1
    }
}
```

**`POST /comments/discussion/2`** → HTTP 200

Payload:
```json
{
    "body": "Belgrade is capital of Serbia"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Comment",
        "url_path": "\/comments\/2",
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Discussion",
        "parent_id": 2,
        "body": "Belgrade is capital of Serbia",
        "body_formatted": "Belgrade is capital of Serbia",
        "body_plain_text": "Belgrade is capital of Serbia",
        "created_on": 1430164081,
        "created_by_id": 1,
        "updated_on": 1430164081,
        "updated_by_id": 1
    }
}
```

Lets search for a common term:

**`GET /search?q=serbia`** → HTTP 200

Respuesta:
```json
[]
```

Now lets limit the search on just one project:

**`GET /search?q=serbia&project_id=1`** → HTTP 200

Respuesta:
```json
[]
```

Lets search for a less common term:

**`GET /search?q=capital`** → HTTP 200

Respuesta:
```json
[]
```
