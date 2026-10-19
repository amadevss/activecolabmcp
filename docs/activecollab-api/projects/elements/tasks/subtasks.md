# Subtasks

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/subtasks.html

For the sake of this test, we created one project and one assignee in that project. Lets check the task that we created to confirm that there are no subtasks in it yet:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
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
        "created_on": 1430164358,
        "created_by_id": 1,
        "updated_on": 1430164358,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

Lets create a subtask:

**`POST /projects/1/tasks/1/subtasks`** → HTTP 200

Payload:
```json
{
    "body": "Subtask #1",
    "assignee_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164359,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

**`POST /projects/1/tasks/1/subtasks`** → HTTP 200

Payload:
```json
{
    "body": "Subtask #2"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/2",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164359,
        "name": "Subtask #2",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

When we check our task, we'll see that these subtasks have been added to it:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
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
        "created_on": 1430164358,
        "created_by_id": 1,
        "updated_on": 1430164359,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (58 líneas más)
```

Now, lets complete one of the subtasks:

**`PUT /complete/subtask/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": 1430164359,
        "completed_by_id": 1,
        "is_completed": true,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164359,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

We can also reopen a completed subtask:

**`PUT /open/subtask/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164360,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

Now that we know how to create and update subtask, lets see how we can move them to trash:

**`DELETE /projects/1/tasks/1/subtasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": true,
        "trashed_on": 1430164360,
        "trashed_by_id": 1,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164360,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

To confirm that the subtask is actually moved to trash, we can check `is_trashed` flag:

**`GET /projects/1/tasks/1/subtasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": true,
        "trashed_on": 1430164360,
        "trashed_by_id": 1,
        "created_on": 1430164359,
        "created_by_id": 1,
        "updated_on": 1430164360,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```
