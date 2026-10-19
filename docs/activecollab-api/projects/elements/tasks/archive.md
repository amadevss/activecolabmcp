# Archive

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/archive.html

For the purpose of this test, we have created a project with two tasks:

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
            "created_on": 1430164299,
            "created_by_id": 1,
            "updated_on": 1430164299,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": false,
... (84 líneas más)
```

Tasks archive is empty:

**`GET /projects/1/tasks/archive`** → HTTP 200

Respuesta:
```json
[]
```

When we complete the tasks:

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
        "completed_on": 1430164300,
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
        "created_on": 1430164299,
        "created_by_id": 1,
        "updated_on": 1430164300,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`PUT /complete/task/2`** → HTTP 200

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
        "completed_on": 1430164301,
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
        "created_on": 1430164299,
        "created_by_id": 1,
        "updated_on": 1430164301,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Active tasks listing will be empty:

**`GET /projects/1/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [],
    "task_lists": [],
    "label_ids": [],
    "project": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
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
        "created_on": 1430164299,
        "created_by_id": 1,
        "updated_on": 1430164299,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
... (13 líneas más)
```

but we'll have these tasks available in the archive (recently completed are on the top):

**`GET /projects/1/tasks/archive`** → HTTP 200

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
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": 1430164301,
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
        "created_on": 1430164299,
        "created_by_id": 1,
        "updated_on": 1430164301,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (42 líneas más)
```
