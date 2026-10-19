# Move and Copy

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/task-lists/move-and-copy.html

For the purpose of this test, we have created two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Source Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164266,
        "created_by_id": 1,
        "updated_on": 1430164267,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-GFB9lYI@mail.manageprojects.com",
... (46 líneas más)
```

and within the source project we created one task list and a task within it:

**`GET /projects/1/task-lists`** → HTTP 200

Respuesta:
```json
[
    {
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
        "created_on": 1430164266,
        "created_by_id": 1,
        "updated_on": 1430164266,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    }
]
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
            "name": "Test Task",
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
            "created_on": 1430164267,
            "created_by_id": 1,
            "updated_on": 1430164267,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 1,
            "position": 1,
            "is_important": false,
... (72 líneas más)
```

Ok, lets move the test task list to the target project:

**`PUT /projects/1/task-lists/1/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/2\/task-lists\/1",
        "name": "Test Task List",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 2,
        "created_on": 1430164266,
        "created_by_id": 1,
        "updated_on": 1430164267,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    }
}
```

Moving task list a different project should also move all task list tasks as well. Lets confirm that our test task was moved as well:

**`GET /projects/1/tasks/1`** → HTTP 404

**`GET /projects/2/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/2\/tasks\/1",
        "name": "Test Task",
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
        "created_on": 1430164267,
        "created_by_id": 1,
        "updated_on": 1430164267,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

Project manager just let us know that he needs the task list that we moved in source module. Lets create a copy:

**`PUT /projects/2/task-lists/1/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 1,
    "copy": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Test Task List",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164266,
        "created_by_id": 1,
        "updated_on": 1430164267,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    }
}
```
