# Task List URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/task-lists/task-list-url.html

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Test Task List"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Test Task List",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164275,
        "created_by_id": 1,
        "updated_on": 1430164275,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

**`GET /projects/1/task-lists/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Test Task List",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164275,
        "created_by_id": 1,
        "updated_on": 1430164275,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

**`GET /projects/2/task-lists/1`** → HTTP 404
