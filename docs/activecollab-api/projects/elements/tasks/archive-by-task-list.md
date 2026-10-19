# Archive by Task List

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/archive-by-task-list.html

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Task List #1"
}
```

Respuesta:
```json
{
    "single": {
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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164290,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Task List #2"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Task List #2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164290,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 2,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

For the purpose of this test, we have created a project with two tasks in two task lists:

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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164290,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    },
    {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Task List #2",
        "is_trashed": false,
        "trashed_on": null,
... (16 líneas más)
```

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
            "created_on": 1430164290,
            "created_by_id": 1,
            "updated_on": 1430164290,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 1,
            "position": 1,
            "is_important": false,
... (129 líneas más)
```

To demonstrate how archive by task list works, we'll complete the first task (without closing the list), and close the second list (that will close the task).

**`PUT /complete/task/1`** → HTTP 200

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
        "completed_on": 1430164291,
        "completed_by_id": 1,
        "is_completed": true,
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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164291,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`PUT /complete/task-list/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Task List #2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": 1430164291,
        "completed_by_id": 1,
        "is_completed": true,
        "project_id": 1,
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164291,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 2,
        "open_tasks": 0,
        "completed_tasks": 1
    }
}
```

These two operations moved all two tasks in the archive:

**`GET /projects/1/tasks/archive`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": 1430164291,
        "completed_by_id": 1,
        "is_completed": true,
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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164291,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (42 líneas más)
```

To see these tasks by task list, we should trigger `completed-tasks` command of each list:

**`GET /projects/1/task-lists/1/completed-tasks`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": 1430164291,
        "completed_by_id": 1,
        "is_completed": true,
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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164291,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (7 líneas más)
```

**`GET /projects/1/task-lists/2/completed-tasks`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": 1430164291,
        "completed_by_id": 1,
        "is_completed": true,
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
        "created_on": 1430164290,
        "created_by_id": 1,
        "updated_on": 1430164291,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 2,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (7 líneas más)
```

This command is available for open and completed task lists, and it sorts tasks so newest are on the top of the page.
