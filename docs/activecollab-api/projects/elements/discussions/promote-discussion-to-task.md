# Promote Discussion to Task

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/discussions/promote-discussion-to-task.html

ActiveCollab offers a conveniente way to convert a discussion to a task. To demonstrate, we have created one project:

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
        "created_on": 1430164071,
        "created_by_id": 1,
        "updated_on": 1430164071,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-2hbFkUc@mail.manageprojects.com",
... (15 líneas más)
```

Lets create a discussion:

**`POST /projects/1/discussions`** → HTTP 200

Payload:
```json
{
    "name": "This will be a name",
    "body": "Example disucssion body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "This will be a name",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Example disucssion body",
        "body_formatted": "Example disucssion body",
        "created_on": 1430164072,
        "created_by_id": 1,
        "updated_on": 1430164072,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

When we trigger `promote-to-task` command, we'll get a task:

**`POST /projects/1/discussions/1/promote-to-task`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "This will be a name",
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
        "body": "Example disucssion body",
        "body_formatted": "Example disucssion body",
        "created_on": 1430164072,
        "created_by_id": 1,
        "updated_on": 1430164072,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Discussion that we promoted is now gone and ActiveCollab throws proper redirection status:

**`GET /projects/1/discussions/1`** → HTTP 301
