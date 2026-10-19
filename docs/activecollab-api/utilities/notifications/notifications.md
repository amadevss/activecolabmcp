# Notifications

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/notifications/notifications.html

Personas in this Story: Default, Member.

When we check our notifications stream, we'll see that is empty:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [],
    "related": []
}
```

Now, a member came and created a task for us:

**`POST /projects/1/tasks`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "name": "One hundred push ups",
    "assignee_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "One hundred push ups",
        "assignee_id": 1,
        "delegated_by_id": 2,
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
        "created_on": 1430164927,
        "created_by_id": 2,
        "updated_on": 1430164927,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

and we'll see this notification in our notifications stream:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewTaskNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164927,
            "sender_id": 2
        }
    ],
    "related": {
        "Task": {
            "1": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 0,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
... (62 líneas más)
```

This response shows user notifications:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewTaskNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164927,
            "sender_id": 2
        }
    ],
    "related": {
        "Task": {
            "1": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 0,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
... (62 líneas más)
```

and this one shows notifications that are not yet seen by the user:

**`GET /notifications/unread`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewTaskNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164927,
            "sender_id": 2
        }
    ],
    "related": {
        "Task": {
            "1": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 0,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
... (62 líneas más)
```

After we visit the task:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "One hundred push ups",
        "assignee_id": 1,
        "delegated_by_id": 2,
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
        "created_on": 1430164927,
        "created_by_id": 2,
        "updated_on": 1430164927,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

Regular /notifications listing will remain the same:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewTaskNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164927,
            "sender_id": 2
        }
    ],
    "related": {
        "Task": {
            "1": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 0,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
... (62 líneas más)
```

but /notifications/unread will become empty:

**`GET /notifications/unread`** → HTTP 200

Respuesta:
```json
{
    "notifications": [],
    "related": []
}
```
