# Archive

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/task-lists/archive.html

For the purpose of this test, we have created a project with two task lists:

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
        "created_on": 1430164257,
        "created_by_id": 1,
        "updated_on": 1430164257,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
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

Tasks archive is empty:

**`GET /projects/1/task-lists/archive`** → HTTP 200

Respuesta:
```json
[]
```

When we complete the task lists:

**`PUT /complete/task-list/1`** → HTTP 200

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
        "completed_on": 1430164258,
        "completed_by_id": 1,
        "is_completed": true,
        "project_id": 1,
        "created_on": 1430164257,
        "created_by_id": 1,
        "updated_on": 1430164258,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
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
        "completed_on": 1430164259,
        "completed_by_id": 1,
        "is_completed": true,
        "project_id": 1,
        "created_on": 1430164258,
        "created_by_id": 1,
        "updated_on": 1430164259,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 2,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

Active task lists listing will be empty:

**`GET /projects/1/task-lists`** → HTTP 200

Respuesta:
```json
[]
```

but we'll have these task lists available in the archive (recently completed are on the top):

**`GET /projects/1/task-lists/archive`** → HTTP 200

Parámetros de query:
```json
{
    "page": 1
}
```

Respuesta:
```json
[
    {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Task List #2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": 1430164259,
        "completed_by_id": 1,
        "is_completed": true,
        "project_id": 1,
        "created_on": 1430164258,
        "created_by_id": 1,
        "updated_on": 1430164259,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 2,
        "open_tasks": 0,
        "completed_tasks": 0
    },
    {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Task List #1",
        "is_trashed": false,
        "trashed_on": null,
... (16 líneas más)
```
