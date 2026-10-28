# Visibility

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/time-records/visibility.html

Personas in this Story: Default, ProjectLeader, Member, Subcontractor, Client.

This article covers visibility of time records. In broad strokes:

1. Only owners and project leader always see all time records in a project,
2. Members and sucontractors see only their records,
3. Client see time records only if they were given permission to access tracked time and budget information.

Lets start by inviting people. We need two employees, where first will lead projects and second will be a regular team member. We also need a client and a subcontractor, to check how their permissions work:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "project-leader@activecollab.com",
    "password": "123",
    "custom_permissions": [
        "can_manage_projects"
    ]
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
        "created_on": 1430164461,
        "created_by_id": 1,
        "updated_on": 1430164461,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Project-leader",
        "last_name": null,
        "display_name": "project-leader",
        "short_display_name": "project-leader",
        "email": "project-leader@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164461",
        "custom_permissions": [
            "can_manage_projects"
        ],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
... (3 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Member",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164461,
        "created_by_id": 1,
        "updated_on": 1430164461,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164461",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Subcontractor",
    "email": "subcontractor@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Subcontractor",
        "url_path": "\/users\/4",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164462,
        "created_by_id": 1,
        "updated_on": 1430164462,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430164462",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Client",
    "email": "client@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Client",
        "url_path": "\/users\/5",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164462,
        "created_by_id": 1,
        "updated_on": 1430164462,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=5&size=--SIZE--&timestamp=1430164462",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

Now, project leader will create a new project and invite people to join:

**`POST /projects`** → HTTP 200 _(como ProjectLeader)_

Payload:
```json
{
    "name": "Test Project",
    "company_id": 2,
    "leader_id": 2,
    "members": [
        3,
        4,
        5
    ],
    "is_tracking_enabled": true
}
```

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
            2,
            3,
            4,
            5
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164462,
        "created_by_id": 2,
        "updated_on": 1430164462,
        "updated_by_id": 2,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 2,
        "currency_id": 2,
        "template_id": 0,
... (18 líneas más)
```

**`POST /projects/1/tasks`** → HTTP 200 _(como ProjectLeader)_

Payload:
```json
{
    "name": "Task #1"
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
        "created_on": 1430164463,
        "created_by_id": 2,
        "updated_on": 1430164463,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Now member and subcontractor will track some time:

**`POST /projects/1/time-records`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "value": "3:30",
    "user_id": 3,
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
        "user_id": 3,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164463,
        "created_by_id": 3,
        "updated_on": 1430164463,
        "updated_by_id": 3,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Payload:
```json
{
    "value": "2:30",
    "user_id": 4,
    "job_type_id": 1,
    "record_date": "2014-05-14"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 2.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 4,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164464,
        "created_by_id": 4,
        "updated_on": 1430164464,
        "updated_by_id": 4,
        "job_type_id": 1
    }
}
```

One important thing to notice is that only owner and project leader can track time for other people:

**`POST /projects/1/time-records`** → HTTP 200 _(como ProjectLeader)_

Payload:
```json
{
    "value": "5:30",
    "user_id": 3,
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "task_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/3",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 5.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 3,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164465,
        "created_by_id": 2,
        "updated_on": 1430164465,
        "updated_by_id": 2,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": "1:30",
    "user_id": 4,
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "task_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/4",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 1.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 4,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164465,
        "created_by_id": 1,
        "updated_on": 1430164465,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

If member or subcontractor try to do that, value of `user_id` will be ignored and time will be tracked for their accounts instead:

**`POST /projects/1/time-records`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "value": "0:30",
    "user_id": "$subcontractor",
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "task_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/5",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 0.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 3,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164465,
        "created_by_id": 3,
        "updated_on": 1430164465,
        "updated_by_id": 3,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Payload:
```json
{
    "value": 2,
    "user_id": 3,
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "task_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 6,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/6",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 2,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 4,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164465,
        "created_by_id": 4,
        "updated_on": 1430164465,
        "updated_by_id": 4,
        "job_type_id": 1
    }
}
```

Clients can't track time:

**`POST /projects/1/time-records`** → HTTP 404 _(como Client)_

Payload:
```json
{
    "value": 2,
    "user_id": 5,
    "job_type_id": 1,
    "record_date": "2014-05-14"
}
```

Lets see who can see what. First, owner and project leader can see all records:

**`GET /projects/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (175 líneas más)
```

**`GET /projects/1/tasks/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (135 líneas más)
```

**`GET /projects/1/time-records`** → HTTP 200 _(como ProjectLeader)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (175 líneas más)
```

**`GET /projects/1/tasks/1/time-records`** → HTTP 200 _(como ProjectLeader)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (135 líneas más)
```

Members and subcontractors only see their own records:

**`GET /projects/1/time-records`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 0.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 3,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 3,
            "updated_on": 1430164465,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (115 líneas más)
```

**`GET /projects/1/tasks/1/time-records`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 0.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 3,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 3,
            "updated_on": 1430164465,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (95 líneas más)
```

**`GET /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (115 líneas más)
```

**`GET /projects/1/tasks/1/time-records`** → HTTP 200 _(como Subcontractor)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (95 líneas más)
```

Our project is configured so clients don't have access to tracking reports. When project is configured like that, these pages will be restirected for clients:

**`GET /projects/1/time-records`** → HTTP 404 _(como Client)_

**`GET /projects/1/tasks/1/time-records`** → HTTP 404 _(como Client)_

When we turn on client reporting, client will be able to see all records:

**`PUT /projects/1`** → HTTP 200 _(como ProjectLeader)_

Payload:
```json
{
    "is_client_reporting_enabled": true
}
```

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
            2,
            3,
            4,
            5
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164462,
        "created_by_id": 2,
        "updated_on": 1430164468,
        "updated_by_id": 2,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 2,
        "currency_id": 2,
        "template_id": 0,
... (18 líneas más)
```

**`GET /projects/1/time-records`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (175 líneas más)
```

**`GET /projects/1/tasks/1/time-records`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "time_records": [
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 2,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164465,
            "created_by_id": 4,
            "updated_on": 1430164465,
            "updated_by_id": 4,
            "job_type_id": 1
        },
        {
            "id": 5,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/5",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (135 líneas más)
```
