# What's New

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/whats-new.html

Purpose of this story is to create a pretty common project scenario and test if all details that we need for What's New are present. Lets start by creating a new project:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164530,
        "created_by_id": 1,
        "updated_on": 1430164530,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164530",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "New projct",
    "company_id": 2,
    "leader_id": 1,
    "members": [
        1,
        2
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New projct",
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
        "created_on": 1430164530,
        "created_by_id": 1,
        "updated_on": 1430164530,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

We made a spelling error there, so lets correct it:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "name": "New Project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New Project",
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
        "created_on": 1430164530,
        "created_by_id": 1,
        "updated_on": 1430164530,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

Now, we'll create a a couple of task lists:

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "First task list"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "First task list",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164530,
        "created_by_id": 1,
        "updated_on": 1430164530,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Second task list"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Second task list",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164531,
        "created_by_id": 1,
        "updated_on": 1430164531,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 2,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

and a task with one commend and one subtask:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Test Task",
    "task_list_id": 1
}
```

Respuesta:
```json
{
    "single": {
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
        "created_on": 1430164531,
        "created_by_id": 1,
        "updated_on": 1430164531,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (37 líneas más)
```

**`PUT /projects/1/tasks/1`** → HTTP 200

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
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task",
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
        "created_on": 1430164531,
        "created_by_id": 1,
        "updated_on": 1430164531,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 1,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (38 líneas más)
```

**`POST /projects/1/tasks/1/subtasks`** → HTTP 200

Payload:
```json
{
    "body": "Subtask #1"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Subtask",
        "url_path": "\/projects\/1\/tasks\/1\/subtasks\/1",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164531,
        "created_by_id": 1,
        "updated_on": 1430164531,
        "name": "Subtask #1",
        "task_id": 1,
        "project_id": 1,
        "due_on": null
    }
}
```

**`POST /comments/task/1`** → HTTP 200

Payload:
```json
{
    "body": "Comment body"
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
        "body": "Comment body",
        "body_formatted": "Comment body",
        "body_plain_text": "Comment body",
        "created_on": 1430164532,
        "created_by_id": 1,
        "updated_on": 1430164532,
        "updated_by_id": 1
    }
}
```

Now we'll upload a file:

**`POST /upload-files`** → HTTP 200

Archivos:
```json
[
    [
        "ac.png",
        "image\/png"
    ]
]
```

Respuesta:
```json
[
    {
        "code": "uaPlmVk5sPa7zHoYOKJQoQRRB0LhGkCH1BSbl36D",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FtwXPqC6rQPCfPlHW0SHEhOVGtzhwVbPhbCWr5QIK&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

**`POST /projects/1/files`** → HTTP 200

Payload:
```json
{
    "uploaded_file_code": "uaPlmVk5sPa7zHoYOKJQoQRRB0LhGkCH1BSbl36D"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "File",
        "url_path": "\/projects\/1\/files\/1",
        "name": "ac.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FtwXPqC6rQPCfPlHW0SHEhOVGtzhwVbPhbCWr5QIK&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164532,
        "created_by_id": 1,
        "updated_on": 1430164532,
        "updated_by_id": 1
    }
}
```

Finally, lets track some time, and make a correction:

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": "3:30",
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2014-05-14"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 3.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164532,
        "created_by_id": 1,
        "updated_on": 1430164532,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`PUT /projects/1/time-records/1`** → HTTP 200

Payload:
```json
{
    "value": 4
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 4,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164532,
        "created_by_id": 1,
        "updated_on": 1430164533,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Lets check What's New (Timeline) page for the project. It should return all activities in reverse chronological order, plus all related objects:

**`GET /projects/1/whats-new`** → HTTP 200

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 12,
            "class": "TrackingObjectUpdatedActivityLog",
            "url_path": "\/activity-logs\/12",
            "parent_type": "TimeRecord",
            "parent_id": 1,
            "created_on": 1430164533,
            "created_by_id": 1,
            "updated_on": 1430164533,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/time-records\/1",
            "modifications": {
                "value": [
                    3.5,
                    4
                ]
            }
        },
        {
            "id": 11,
            "class": "TrackingObjectCreatedActivityLog",
            "url_path": "\/activity-logs\/11",
            "parent_type": "TimeRecord",
            "parent_id": 1,
            "created_on": 1430164532,
            "created_by_id": 1,
            "updated_on": 1430164532,
... (386 líneas más)
```
