# Move and Copy

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/move-and-copy.html

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
        "created_on": 1430164332,
        "created_by_id": 1,
        "updated_on": 1430164332,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-l9USQiK@mail.manageprojects.com",
... (46 líneas más)
```

and within the source project we created one task list and one task:

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
        "created_on": 1430164332,
        "created_by_id": 1,
        "updated_on": 1430164332,
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
            "created_on": 1430164332,
            "created_by_id": 1,
            "updated_on": 1430164332,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 1,
            "position": 1,
            "is_important": false,
... (72 líneas más)
```

Ok, lets create a copy of this task in the same project:

**`PUT /projects/1/tasks/1/move-to-project`** → HTTP 200

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
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
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
        "created_on": 1430164332,
        "created_by_id": 1,
        "updated_on": 1430164333,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

As we can see from this test, task copy got a new task ID in the source project, and task list relation got preserved. Lets move the copy to the target project:

**`PUT /projects/1/tasks/2/move-to-project`** → HTTP 200

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
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/2\/tasks\/2",
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
        "created_on": 1430164332,
        "created_by_id": 1,
        "updated_on": 1430164334,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Task copy is successfully created, and it got first available task ID in the target project (#1). task list relation got lost, because there is no matching task list in the target project.
