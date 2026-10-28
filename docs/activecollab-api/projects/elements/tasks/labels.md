# Labels

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/labels.html

This story shows how you can use labels to better categorise and organize tasks. A task can have an unlimited number of labels attached to it, but use of labels is optional. To make this test possible, we have created one project:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
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
        "created_on": 1430164324,
        "created_by_id": 1,
        "updated_on": 1430164324,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-fdBFHgE@mail.manageprojects.com",
... (15 líneas más)
```

Before we create a new task, lets see which labels ship with ActiveCollab by default:

**`GET /labels/task-labels`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 5,
        "class": "TaskLabel",
        "url_path": "\/labels\/5",
        "name": "NEW",
        "updated_on": null,
        "color": "#00B25C",
        "is_default": false,
        "position": 1,
        "is_global": true
    },
    {
        "id": 6,
        "class": "TaskLabel",
        "url_path": "\/labels\/6",
        "name": "CONFIRMED",
        "updated_on": null,
        "color": "#F26522",
        "is_default": false,
        "position": 2,
        "is_global": true
    },
    {
        "id": 7,
        "class": "TaskLabel",
        "url_path": "\/labels\/7",
        "name": "WORKS FOR ME",
        "updated_on": null,
        "color": "#00B25C",
... (93 líneas más)
```

Now we'll add a task with two labels, one that is already defined and one that is new:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "labels": [
        "New",
        "Deferred"
    ]
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
        "labels": [
            {
                "id": 16,
                "name": "Deferred",
                "color": null,
                "is_default": false,
                "is_global": false,
                "position": "12"
            },
            {
                "id": 5,
                "name": "NEW",
                "color": "#00B25C",
                "is_default": false,
                "is_global": true,
                "position": "1"
            }
... (33 líneas más)
```

Labels can have colors. We want to make sure that Deffered tasks are clearly visible in the list of tasks. Lets make it stand out by coloring it to red:

**`PUT /labels/16`** → HTTP 200

Payload:
```json
{
    "color": "#FF0000"
}
```

Respuesta:
```json
{
    "single": {
        "id": 16,
        "class": "TaskLabel",
        "url_path": "\/labels\/16",
        "name": "Deferred",
        "updated_on": 1430164324,
        "color": "#FF0000",
        "is_default": false,
        "position": 12,
        "is_global": false
    }
}
```

Task labels are easily updated:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "labels": []
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
        "created_on": 1430164324,
        "created_by_id": 1,
        "updated_on": 1430164325,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

and:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "labels": [
        "Canceled",
        "Wont Fix"
    ]
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
        "labels": [
            {
                "id": 17,
                "name": "Canceled",
                "color": null,
                "is_default": false,
                "is_global": false,
                "position": "13"
            },
            {
                "id": 9,
                "name": "WONT FIX",
                "color": "#00B25C",
                "is_default": false,
                "is_global": true,
                "position": "5"
            }
... (33 líneas más)
```

In the /projects/:project_id/tasks command, ActiveCollab provides the `label_ids` property. It is an array of all task labels used in active project tasks, so you don't need to iterate through tasks to see which labels are used:

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
            "labels": [
                {
                    "id": 17,
                    "name": "Canceled",
                    "color": null,
                    "is_default": false,
                    "is_global": false,
                    "position": "13"
                },
                {
                    "id": 9,
                    "name": "WONT FIX",
                    "color": "#00B25C",
                    "is_default": false,
                    "is_global": true,
                    "position": "5"
... (69 líneas más)
```

When label is deleted:

**`GET /labels/17`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 17,
        "class": "TaskLabel",
        "url_path": "\/labels\/17",
        "name": "Canceled",
        "updated_on": 1430164325,
        "color": null,
        "is_default": false,
        "position": 13,
        "is_global": false
    }
}
```

**`DELETE /labels/17`** → HTTP 200

task details are automatically updated:

**`GET /projects/1/tasks/1`** → HTTP 200

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
        "labels": [
            {
                "id": 9,
                "name": "WONT FIX",
                "color": "#00B25C",
                "is_default": false,
                "is_global": true,
                "position": "5"
            }
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
... (25 líneas más)
```
