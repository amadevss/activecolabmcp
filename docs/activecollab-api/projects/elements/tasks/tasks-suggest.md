# Tasks Suggest

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/tasks-suggest.html

Personas in this Story: Default, Member, Client.

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Visible task in client project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visible task in client project",
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
        "created_on": 1430164407,
        "created_by_id": 1,
        "updated_on": 1430164407,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Hidden task",
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
        "name": "Hidden task",
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
        "created_on": 1430164407,
        "created_by_id": 1,
        "updated_on": 1430164407,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/2/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Visible task in internal project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Task",
        "url_path": "\/projects\/2\/tasks\/3",
        "name": "Visible task in internal project",
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
        "project_id": 2,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164407,
        "created_by_id": 1,
        "updated_on": 1430164407,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Owner can see both #1 tasks:

**`GET /search/suggest`** → HTTP 500

Parámetros de query:
```json
{
    "q": "#1"
}
```

Member can see only task in a project that he is involved with:

**`GET /search/suggest`** → HTTP 500 _(como Member)_

Parámetros de query:
```json
{
    "q": "#1"
}
```

So does client:

**`GET /search/suggest`** → HTTP 500 _(como Client)_

Parámetros de query:
```json
{
    "q": "#1"
}
```

Owner can see task #2:

**`GET /search/suggest`** → HTTP 500

Parámetros de query:
```json
{
    "q": "#2"
}
```

Member can see it as well:

**`GET /search/suggest`** → HTTP 500 _(como Member)_

Parámetros de query:
```json
{
    "q": "#2"
}
```

But client can't:

**`GET /search/suggest`** → HTTP 200 _(como Client)_

Parámetros de query:
```json
{
    "q": "#2"
}
```

Respuesta:
```json
null
```
