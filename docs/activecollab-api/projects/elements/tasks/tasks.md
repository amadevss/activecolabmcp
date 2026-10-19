# Tasks

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/tasks.html

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
        "created_on": 1430164414,
        "created_by_id": 1,
        "updated_on": 1430164414,
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

Lets check if there are any tasks in this project:

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
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164414,
        "created_by_id": 1,
        "updated_on": 1430164414,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
... (14 líneas más)
```

Lets add a two tasks, to check if per project task ID-s are properly set:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "assignee_id": 2,
    "is_important": true
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
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164415,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": true,
        "due_on": null,
... (17 líneas más)
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #2",
    "assignee_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
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
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164415,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Now lets check project tasks listing:

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
            "created_on": 1430164415,
            "created_by_id": 1,
            "updated_on": 1430164415,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": true,
... (85 líneas más)
```

Great, we have properly added tasks to a project and assigned them. Our company owner is busy, so lets reassign second task to the member:

**`PUT /projects/1/tasks/2`** → HTTP 200

Payload:
```json
{
    "assignee_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
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
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164416,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

Job well done, lets complete a task:

**`PUT /complete/task/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": 1430164416,
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
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164416,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

For some reason, we need to do more work on this task. Lets reopen it:

**`PUT /open/task/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
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
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164416,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

Now that we learned how to create and update tasks, lets see how we can move them to trash:

**`DELETE /projects/1/tasks/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164416,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164416,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

To confirm that the task is actually moved to trash, we can check `is_trashed` flag:

**`GET /projects/1/tasks/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164416,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164415,
        "created_by_id": 1,
        "updated_on": 1430164416,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```
