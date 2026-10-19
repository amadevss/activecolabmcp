# Move and Copy Discussions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/discussions/move-and-copy-discussions.html

For the purpose of this test, we have created two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Source Project",
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
        "created_on": 1430164063,
        "created_by_id": 1,
        "updated_on": 1430164064,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-13qyFMV@mail.manageprojects.com",
... (46 líneas más)
```

and within the source project we created one discussion:

**`GET /projects/1/discussions`** → HTTP 200

Respuesta:
```json
{
    "discussions": [
        {
            "id": 1,
            "class": "Discussion",
            "url_path": "\/projects\/1\/discussions\/1",
            "name": "Test Discussion",
            "comments_count": 0,
            "attachments": [],
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": false,
            "body": "Just for Testing",
            "body_formatted": "Just for Testing",
            "created_on": 1430164064,
            "created_by_id": 1,
            "updated_on": 1430164064,
            "updated_by_id": 1
        }
    ],
    "comments": []
}
```

Ok, lets create a copy of this disucssion in the same project:

**`PUT /projects/1/discussions/1/move-to-project`** → HTTP 200

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
        "id": 2,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/2",
        "name": "Test Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Just for Testing",
        "body_formatted": "Just for Testing",
        "created_on": 1430164064,
        "created_by_id": 1,
        "updated_on": 1430164064,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

Lets move the copy to the target project:

**`PUT /projects/1/discussions/2/move-to-project`** → HTTP 200

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
        "id": 2,
        "class": "Discussion",
        "url_path": "\/projects\/2\/discussions\/2",
        "name": "Test Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 2,
        "is_hidden_from_clients": false,
        "body": "Just for Testing",
        "body_formatted": "Just for Testing",
        "created_on": 1430164064,
        "created_by_id": 1,
        "updated_on": 1430164065,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```
