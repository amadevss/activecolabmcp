# Task History

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/task-history.html

For the purpose of this test, we have created one task:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Old Task Name",
        "assignee_id": 1,
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
        "created_on": 1430164374,
        "created_by_id": 1,
        "updated_on": 1430164374,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Since this is a brand new task, and there was no changes to it, history response is empty:

**`GET /history/task/1`** → HTTP 200

Respuesta:
```json
[]
```

Lets update this task:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "name": "New Task Name"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "New Task Name",
        "assignee_id": 1,
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
        "created_on": 1430164374,
        "created_by_id": 1,
        "updated_on": 1430164375,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

History:

**`GET /history/task/1`** → HTTP 200

Respuesta:
```json
[
    {
        "timestamp": 1430164375,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "modifications": {
            "name": [
                "Old Task Name",
                "New Task Name"
            ]
        }
    }
]
```

History also supports a verbose response, where each modification line will also include a short modification description:

**`GET /history/task/1?verbose=1`** → HTTP 200

Respuesta:
```json
[
    {
        "timestamp": 1430164375,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "modifications": {
            "name": [
                "Old Task Name",
                "New Task Name",
                "Name changed from <b>Old Task Name<\/b> to <b>New Task Name<\/b>"
            ]
        }
    }
]
```
