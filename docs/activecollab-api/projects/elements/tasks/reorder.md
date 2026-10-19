# Reorder

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/reorder.html

This story shows how tasks can be reordered and moved between lists. To demonstrate how this API feautre works, we have one project with two lists:

**`GET /projects/1/task-lists`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Task List #1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164348,
        "created_by_id": 1,
        "updated_on": 1430164348,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 3,
        "completed_tasks": 0
    },
    {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Task List #1",
        "is_trashed": false,
        "trashed_on": null,
... (16 líneas más)
```

and four tasks, three in the first list and one in the second list:

**`GET /projects/1/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [
        {
            "id": 1,
            "class": "Task",
            "url_path": "\/projects\/1\/tasks\/1",
            "name": "Task #1",
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
            "created_on": 1430164349,
            "created_by_id": 1,
            "updated_on": 1430164349,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 1,
            "position": 1,
            "is_important": false,
... (199 líneas más)
```

Lets reorder tasks in the first list:

**`PUT /projects/1/tasks/reorder`** → HTTP 200

Payload:
```json
{
    "task_ids": [
        3,
        2,
        1
    ],
    "task_list_id": 1
}
```

Respuesta:
```json
[
    3,
    2,
    1
]
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164350,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 3,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`GET /projects/1/tasks/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164350,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 1,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`GET /projects/1/tasks/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/3",
        "name": "Task #3",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164350,
        "updated_by_id": 1,
        "task_number": 3,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

Now lets reorder and move tasks in one go:

**`PUT /projects/1/tasks/reorder`** → HTTP 200

Payload:
```json
{
    "task_ids": [
        4,
        2,
        1
    ],
    "task_list_id": 2
}
```

Respuesta:
```json
[
    4,
    2,
    1
]
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164351,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 2,
        "position": 3,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`GET /projects/1/tasks/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164351,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 2,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`GET /projects/1/tasks/4`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/4",
        "name": "Task #4",
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
        "created_on": 1430164349,
        "created_by_id": 1,
        "updated_on": 1430164351,
        "updated_by_id": 1,
        "task_number": 4,
        "task_list_id": 2,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```
