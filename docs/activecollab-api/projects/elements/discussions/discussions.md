# Discussions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/discussions/discussions.html

To list all discussions in a project, send GET request to `/projects/:project_id/discussions` path:

**`GET /projects/1/discussions`** → HTTP 200

Respuesta:
```json
{
    "discussions": [],
    "comments": []
}
```

As we can see, there are no discussions in this projects. To create a new discussions, send POST request to `/projects/:project_id/discussions` path:

**`POST /projects/1/discussions`** → HTTP 200

Payload:
```json
{
    "name": "New Discussion"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "New Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164053,
        "created_by_id": 1,
        "updated_on": 1430164053,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

If we execute `/projects/:project_id/discussions` again, we'll see that we have successfully added a discussion:

**`GET /projects/1/discussions`** → HTTP 200

Respuesta:
```json
{
    "discussions": [
        {
            "id": 1,
            "class": "Discussion",
            "url_path": "\/projects\/1\/discussions\/1",
            "name": "New Discussion",
            "comments_count": 0,
            "attachments": [],
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": false,
            "body": "",
            "body_formatted": "",
            "created_on": 1430164053,
            "created_by_id": 1,
            "updated_on": 1430164053,
            "updated_by_id": 1
        }
    ],
    "comments": []
}
```

We can also check out individual discussion details:

**`GET /projects/1/discussions/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "New Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164053,
        "created_by_id": 1,
        "updated_on": 1430164053,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

What is interesting about discussions is that they also list all of the other project elements that are discussed (tasks, files, and notes). Lets check:

This task will not be part of the discussions response because it is not yet discussed:

**`GET /projects/1/discussions`** → HTTP 200

Respuesta:
```json
{
    "discussions": [
        {
            "id": 1,
            "class": "Discussion",
            "url_path": "\/projects\/1\/discussions\/1",
            "name": "New Discussion",
            "comments_count": 0,
            "attachments": [],
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": false,
            "body": "",
            "body_formatted": "",
            "created_on": 1430164053,
            "created_by_id": 1,
            "updated_on": 1430164053,
            "updated_by_id": 1
        }
    ],
    "comments": []
}
```

**`POST /comments/task/1`** → HTTP 200

Payload:
```json
{
    "body": "Comment body"
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
        "body": "Comment body",
        "body_formatted": "Comment body",
        "body_plain_text": "Comment body",
        "created_on": 1430164056,
        "created_by_id": 1,
        "updated_on": 1430164056,
        "updated_by_id": 1
    }
}
```

**`GET /projects/1/discussions`** → HTTP 200

Respuesta:
```json
{
    "discussions": [
        {
            "id": 1,
            "class": "Task",
            "url_path": "\/projects\/1\/tasks\/1",
            "name": "New Task",
            "assignee_id": 0,
            "delegated_by_id": 0,
            "completed_on": null,
            "completed_by_id": null,
            "is_completed": false,
            "comments_count": "1",
            "attachments": [],
            "labels": [],
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": false,
            "body": "",
            "body_formatted": "",
            "created_on": 1430164054,
            "created_by_id": 1,
            "updated_on": 1430164056,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": false,
... (43 líneas más)
```

To update a discussion, we need to send a PUT request to the discussion URL:

**`PUT /projects/1/discussions/1`** → HTTP 200

Payload:
```json
{
    "name": "Updated Discussion Name",
    "body": "<p>We should talk about something<\/p>"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Updated Discussion Name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<p>We should talk about something<\/p>",
        "body_formatted": "<p>We should talk about something<\/p>",
        "created_on": 1430164053,
        "created_by_id": 1,
        "updated_on": 1430164056,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

To move the disucssion to trash, we need to send DELETE request to the discussion URL:

**`DELETE /projects/1/discussions/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Updated Discussion Name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430164056,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<p>We should talk about something<\/p>",
        "body_formatted": "<p>We should talk about something<\/p>",
        "created_on": 1430164053,
        "created_by_id": 1,
        "updated_on": 1430164056,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```
