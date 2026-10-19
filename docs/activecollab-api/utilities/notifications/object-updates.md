# Object Updates

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/notifications/object-updates.html

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

Now, a member came and created a task and posted two comments:

**`POST /projects/1/tasks`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "name": "One hundred push ups",
    "body": "<span class=\"new_mention\" data-user-id=\"1\">@Owner<\/span> please do some push-ups"
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
        "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "created_on": 1430164935,
        "created_by_id": 2,
        "updated_on": 1430164935,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

**`POST /comments/task/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "body": "First comment"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "First comment",
        "body_formatted": "First comment",
        "body_plain_text": "First comment",
        "created_on": 1430164936,
        "created_by_id": 2,
        "updated_on": 1430164936,
        "updated_by_id": 2
    }
}
```

**`POST /comments/task/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "body": "Second comment"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Comment",
        "url_path": "\/comments\/2",
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Second comment",
        "body_formatted": "Second comment",
        "body_plain_text": "Second comment",
        "created_on": 1430164936,
        "created_by_id": 2,
        "updated_on": 1430164936,
        "updated_by_id": 2
    }
}
```

**`POST /projects/1/tasks`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "name": "Two hundred push ups",
    "subscribers": [
        1
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Two hundred push ups",
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
        "created_on": 1430164936,
        "created_by_id": 2,
        "updated_on": 1430164936,
        "updated_by_id": 2,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

When we check our notifications stream, we'll see these notifications:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 5,
            "class": "NewTaskNotification",
            "url_path": "\/notifications\/5",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164936,
            "sender_id": 2
        },
        {
            "id": 4,
            "class": "NewCommentNotification",
            "url_path": "\/notifications\/4",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164936,
            "sender_id": 2,
            "comment_id": 2
        },
        {
            "id": 3,
            "class": "NewCommentNotification",
            "url_path": "\/notifications\/3",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164936,
            "sender_id": 2,
            "comment_id": 1
... (164 líneas más)
```

Another type of notification response that we can get are aggregated notifications by an updated object. In our scenario, we have two updated objects (tasks), where for first task we got new subscription and two new comments, and for the second task we just got notification about new subscription:

**`GET /notifications/object-updates`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 2,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/2",
                "name": "Two hundred push ups",
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
                "created_on": 1430164936,
                "created_by_id": 2,
                "updated_on": 1430164936,
                "updated_by_id": 2,
                "task_number": 2,
                "task_list_id": 0,
                "position": 2,
... (141 líneas más)
```

Special case of object updates response are recent notification updates. Unlike regular object updates collection that is paginated and returns 30 objects per page, recent returns only top 5 and indication how many other unseen objects are there in the stream:

**`GET /notifications/object-updates/recent`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 2,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/2",
                "name": "Two hundred push ups",
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
                "created_on": 1430164936,
                "created_by_id": 2,
                "updated_on": 1430164936,
                "updated_by_id": 2,
                "task_number": 2,
                "task_list_id": 0,
                "position": 2,
... (141 líneas más)
```

Object updates response returns unseen updates, so if we visit the task:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "One hundred push ups",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 2,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "created_on": 1430164935,
        "created_by_id": 2,
        "updated_on": 1430164936,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (54 líneas más)
```

response will still include this task, but update counters will be removed because user saw them:

**`GET /notifications/object-updates`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 2,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/2",
                "name": "Two hundred push ups",
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
                "created_on": 1430164936,
                "created_by_id": 2,
                "updated_on": 1430164936,
                "updated_by_id": 2,
                "task_number": 2,
                "task_list_id": 0,
                "position": 2,
... (137 líneas más)
```

**`GET /notifications/object-updates/recent`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 2,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/2",
                "name": "Two hundred push ups",
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
                "created_on": 1430164936,
                "created_by_id": 2,
                "updated_on": 1430164936,
                "updated_by_id": 2,
                "task_number": 2,
                "task_list_id": 0,
                "position": 2,
... (137 líneas más)
```

Lets try how things work when task gets reassigned multiple times:

**`PUT /projects/1/tasks/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
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
        "comments_count": 2,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "created_on": 1430164935,
        "created_by_id": 2,
        "updated_on": 1430164938,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (54 líneas más)
```

**`PUT /projects/1/tasks/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "assignee_id": 0
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
        "assignee_id": 0,
        "delegated_by_id": 2,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 2,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "created_on": 1430164935,
        "created_by_id": 2,
        "updated_on": 1430164938,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (54 líneas más)
```

**`PUT /projects/1/tasks/1`** → HTTP 200 _(como Member)_

Payload:
```json
{
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
        "comments_count": 2,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
        "created_on": 1430164935,
        "created_by_id": 2,
        "updated_on": 1430164938,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (54 líneas más)
```

We'll get this info in /notifications/object-updates response:

**`GET /notifications/object-updates`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 2,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": false,
                "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
                "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
                "created_on": 1430164935,
                "created_by_id": 2,
                "updated_on": 1430164938,
                "updated_by_id": 2,
                "task_number": 1,
                "task_list_id": 0,
                "position": 1,
... (139 líneas más)
```

**`GET /notifications/object-updates/recent`** → HTTP 200

Respuesta:
```json
{
    "objects_and_updates": [
        {
            "object": {
                "id": 1,
                "class": "Task",
                "url_path": "\/projects\/1\/tasks\/1",
                "name": "One hundred push ups",
                "assignee_id": 1,
                "delegated_by_id": 2,
                "completed_on": null,
                "completed_by_id": null,
                "is_completed": false,
                "comments_count": 2,
                "attachments": [],
                "labels": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": false,
                "body": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
                "body_formatted": "<span class=\"mention\">@Owner<\/span> please do some push-ups",
                "created_on": 1430164935,
                "created_by_id": 2,
                "updated_on": 1430164938,
                "updated_by_id": 2,
                "task_number": 1,
                "task_list_id": 0,
                "position": 1,
... (139 líneas más)
```
