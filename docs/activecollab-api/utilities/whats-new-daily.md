# What's New Daily

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/whats-new-daily.html

To demonstrate how daily activity feed works, we invited two people and created a project:

**`GET /users`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Owner",
        "url_path": "\/users\/1",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164878,
        "created_by_id": 1,
        "updated_on": 1430164878,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164878",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (59 líneas más)
```

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
            1,
            2,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164881,
        "created_by_id": 1,
        "updated_on": 1430164881,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (11 líneas más)
```

Lets create two tasks and add comments with known timestamps in the past:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Visible to clients"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visible to clients",
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
        "created_on": 1430164882,
        "created_by_id": 1,
        "updated_on": 1430164882,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /comments/task/1`** → HTTP 200

Payload:
```json
{
    "body": "Comment on visible task",
    "created_on": "2014-12-31 13:00:00"
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
        "body": "Comment on visible task",
        "body_formatted": "Comment on visible task",
        "body_plain_text": "Comment on visible task",
        "created_on": 1420030800,
        "created_by_id": 1,
        "updated_on": 1430164882,
        "updated_by_id": 1
    }
}
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task hidden from clients",
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task hidden from clients",
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
        "is_hidden_from_clients": true,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164882,
        "created_by_id": 1,
        "updated_on": 1430164882,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /comments/task/2`** → HTTP 200

Payload:
```json
{
    "body": "Comment on hidden task",
    "created_on": "2015-01-01 13:00:00"
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
        "parent_id": 2,
        "body": "Comment on hidden task",
        "body_formatted": "Comment on hidden task",
        "body_plain_text": "Comment on hidden task",
        "created_on": 1420117200,
        "created_by_id": 1,
        "updated_on": 1430164883,
        "updated_by_id": 1
    }
}
```
