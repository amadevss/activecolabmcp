# User and Team Tasks

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users-work/user-and-team-tasks.html

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Assigned to First Member",
    "assignee_id": 2,
    "delegated_by_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Assigned to First Member",
        "assignee_id": 2,
        "delegated_by_id": 1,
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
        "created_on": 1430164603,
        "created_by_id": 1,
        "updated_on": 1430164603,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

**`POST /projects/1/tasks/1/subtasks`** → HTTP 200

Payload:
```json
{
    "body": "Assigned to Second Member",
    "assignee_id": 3,
    "delegated_by_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 3,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164604,
        "created_by_id": 1,
        "updated_on": 1430164604,
        "name": "Assigned to Second Member",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Assigned to Second Member",
    "assignee_id": 3,
    "delegated_by_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Assigned to Second Member",
        "assignee_id": 3,
        "delegated_by_id": 1,
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
        "created_on": 1430164604,
        "created_by_id": 1,
        "updated_on": 1430164604,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

**`POST /projects/1/tasks/2/subtasks`** → HTTP 200

Payload:
```json
{
    "body": "Assigned to First Member",
    "assignee_id": 2,
    "delegated_by_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/2\/subtasks\/2",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164604,
        "created_by_id": 1,
        "updated_on": 1430164604,
        "name": "Assigned to First Member",
        "task_id": 2,
        "project_id": 1,
        "due_on": null
    }
}
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Unassigned Task"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/3",
        "name": "Unassigned Task",
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
        "created_on": 1430164604,
        "created_by_id": 1,
        "updated_on": 1430164604,
        "updated_by_id": 1,
        "task_number": 3,
        "task_list_id": 0,
        "position": 3,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /teams`** → HTTP 200

Payload:
```json
{
    "name": "Test Team",
    "members": [
        2,
        3
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Team",
        "url_path": "\/teams\/1",
        "name": "Test Team",
        "members": [
            2,
            3
        ],
        "created_on": 1430164605,
        "created_by_id": 1,
        "updated_on": 1430164605
    }
}
```

Lets check open tasks for the first memeber:

**`GET /users/2/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [
        {
            "id": 1,
            "class": "Task",
            "url_path": "\/projects\/1\/tasks\/1",
            "name": "Assigned to First Member",
            "assignee_id": 2,
            "delegated_by_id": 1,
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
            "created_on": 1430164603,
            "created_by_id": 1,
            "updated_on": 1430164604,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": false,
... (111 líneas más)
```

and for the second member:

**`GET /users/3/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [
        {
            "id": 2,
            "class": "Task",
            "url_path": "\/projects\/1\/tasks\/2",
            "name": "Assigned to Second Member",
            "assignee_id": 3,
            "delegated_by_id": 1,
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
            "created_on": 1430164604,
            "created_by_id": 1,
            "updated_on": 1430164604,
            "updated_by_id": 1,
            "task_number": 2,
            "task_list_id": 0,
            "position": 2,
            "is_important": false,
... (111 líneas más)
```

Team tasks should return all assignments for first and second member:

**`GET /teams/1/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [
        {
            "id": 1,
            "class": "Task",
            "url_path": "\/projects\/1\/tasks\/1",
            "name": "Assigned to First Member",
            "assignee_id": 2,
            "delegated_by_id": 1,
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
            "created_on": 1430164603,
            "created_by_id": 1,
            "updated_on": 1430164604,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": false,
... (201 líneas más)
```
