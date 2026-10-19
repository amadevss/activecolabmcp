# Task Lists

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/task-lists/task-lists.html

Here we have a sample project with two users involved:

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
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164282,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (10 líneas más)
```

Lets check if there are any task lists in this project:

**`GET /projects/1/task-lists`** → HTTP 200

Respuesta:
```json
[]
```

This project has no task lists yet, so lets create one:

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Task List #1",
    "start_on": "2014-05-16",
    "due_on": "2014-05-18"
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
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164282,
        "updated_by_id": 1,
        "start_on": 1400198400,
        "due_on": 1400371200,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

Now lets check project task lists listing:

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
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164282,
        "updated_by_id": 1,
        "start_on": 1400198400,
        "due_on": 1400371200,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
]
```

To change task list properties, simply send a PUT request to `/projects/:project_id/task-lists/:task_list_id` path:

**`PUT /projects/1/task-lists/1`** → HTTP 200

Payload:
```json
{
    "name": "Updated Task List Name"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Updated Task List Name",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164282,
        "updated_by_id": 1,
        "start_on": 1400198400,
        "due_on": 1400371200,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

Tasks are added task lists via `task_list_id` parameter:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "task_list_id": 1
}
```

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
        "created_on": 1430164283,
        "created_by_id": 1,
        "updated_on": 1430164283,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

To release a task and unhook it from a list, set `task_list_id` to an empty value:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "task_list_id": null
}
```

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
        "created_on": 1430164283,
        "created_by_id": 1,
        "updated_on": 1430164283,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Now that we learned how to create and update ilestones, lets see how we can move them to trash:

**`DELETE /projects/1/task-lists/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Updated Task List Name",
        "is_trashed": true,
        "trashed_on": 1430164283,
        "trashed_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164283,
        "updated_by_id": 1,
        "start_on": 1400198400,
        "due_on": 1400371200,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

To confirm that the task list is actually moved to trash, we can check `is_trashed` flag:

**`GET /projects/1/task-lists/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Updated Task List Name",
        "is_trashed": true,
        "trashed_on": 1430164283,
        "trashed_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164282,
        "created_by_id": 1,
        "updated_on": 1430164283,
        "updated_by_id": 1,
        "start_on": 1400198400,
        "due_on": 1400371200,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```
