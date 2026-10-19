# Comments

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/search/comments.html

We have prepared on project and one task for this test:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
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
        "created_on": 1430164963,
        "created_by_id": 1,
        "updated_on": 1430164964,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-qhEW5wP@mail.manageprojects.com",
... (15 líneas más)
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visiting Novi Sad",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164964,
        "created_by_id": 1,
        "updated_on": 1430164964,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Lets try to find a term that does not exist:

**`GET /search?q=petrovaradin`** → HTTP 200

Respuesta:
```json
[]
```

Nothing? Hm, lets comment:

**`POST /comments/task/1`** → HTTP 200

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
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Novi Sad is the second largest city in Serbia",
        "body_formatted": "Novi Sad is the second largest city in Serbia",
        "body_plain_text": "Novi Sad is the second largest city in Serbia",
        "created_on": 1430164965,
        "created_by_id": 1,
        "updated_on": 1430164965,
        "updated_by_id": 1
    }
}
```

and search:

**`GET /search?q=petrovaradin`** → HTTP 200

Respuesta:
```json
[]
```

Still nothing? If we create a comment with that term:

**`POST /comments/task/1`** → HTTP 200

Payload:
```json
{
    "body": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city"
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
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "body_formatted": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "body_plain_text": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "created_on": 1430164965,
        "created_by_id": 1,
        "updated_on": 1430164965,
        "updated_by_id": 1
    }
}
```

search will return our task:

**`GET /search?q=petrovaradin`** → HTTP 200

Respuesta:
```json
[]
```

If we remove the second comment:

Search will stop returing our task for `petrovaradin` term:

**`PUT /move-to-trash/comment/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Comment",
        "url_path": "\/comments\/2",
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164965,
        "trashed_by_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "body_formatted": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "body_plain_text": "Novi Sad and Petrovaradin are really close, so much that some people feel that Petrovaradin is part of the city",
        "created_on": 1430164965,
        "created_by_id": 1,
        "updated_on": 1430164965,
        "updated_by_id": 1
    }
}
```

**`GET /search?q=petrovaradin`** → HTTP 200

Respuesta:
```json
[]
```
