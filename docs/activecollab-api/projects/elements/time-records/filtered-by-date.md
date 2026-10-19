# Filtered by Date

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/time-records/filtered-by-date.html

Personas in this Story: Default, ProjectLeader, Member, Subcontractor.

This story covers a set of commands that let you filter tracked time records in a given time frame. Lets add some data so we have something to work with:

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
        "created_on": 1430164423,
        "created_by_id": 1,
        "updated_on": 1430164423,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Project-leader",
        "last_name": null,
        "display_name": "project-leader",
        "short_display_name": "project-leader",
        "email": "project-leader@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164423",
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
        "created_on": 1430164423,
        "created_by_id": 1,
        "updated_on": 1430164423,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164423",
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
        "created_on": 1430164423,
        "created_by_id": 1,
        "updated_on": 1430164423,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430164423",
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

**`POST /projects`** → HTTP 200 _(como ProjectLeader)_

Payload:
```json
{
    "name": "Test Project",
    "company_id": 2,
    "leader_id": 2,
    "members": [
        3,
        4
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
            4
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164424,
        "created_by_id": 2,
        "updated_on": 1430164424,
        "updated_by_id": 2,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 2,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (17 líneas más)
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
        "created_on": 1430164424,
        "created_by_id": 2,
        "updated_on": 1430164424,
        "updated_by_id": 2,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "value": "3:30",
    "job_type_id": 1,
    "record_date": "2014-12-06"
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
        "record_date": 1417824000,
        "summary": null,
        "user_id": 3,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164424,
        "created_by_id": 3,
        "updated_on": 1430164424,
        "updated_by_id": 3,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "value": "5:30",
    "job_type_id": 1,
    "record_date": "2014-12-08",
    "task_id": 1
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
        "value": 5.5,
        "record_date": 1417996800,
        "summary": null,
        "user_id": 3,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164424,
        "created_by_id": 3,
        "updated_on": 1430164424,
        "updated_by_id": 3,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Member)_

Payload:
```json
{
    "value": 4.5,
    "job_type_id": 1,
    "record_date": "2014-12-14",
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
        "value": 4.5,
        "record_date": 1418515200,
        "summary": null,
        "user_id": 3,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164425,
        "created_by_id": 3,
        "updated_on": 1430164425,
        "updated_by_id": 3,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Payload:
```json
{
    "value": 3,
    "job_type_id": 1,
    "record_date": "2014-12-07"
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
        "value": 3,
        "record_date": 1417910400,
        "summary": null,
        "user_id": 4,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164425,
        "created_by_id": 4,
        "updated_on": 1430164425,
        "updated_by_id": 4,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Payload:
```json
{
    "value": "1:30",
    "job_type_id": 1,
    "record_date": "2014-12-09",
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
        "value": 1.5,
        "record_date": 1418083200,
        "summary": null,
        "user_id": 4,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164425,
        "created_by_id": 4,
        "updated_on": 1430164425,
        "updated_by_id": 4,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200 _(como Subcontractor)_

Payload:
```json
{
    "value": 0.5,
    "job_type_id": 1,
    "record_date": "2014-12-15",
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
        "value": 0.5,
        "record_date": 1418601600,
        "summary": null,
        "user_id": 4,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164425,
        "created_by_id": 4,
        "updated_on": 1430164425,
        "updated_by_id": 4,
        "job_type_id": 1
    }
}
```

There are two contexts in which time records can be filtered by time frame - per project and per user. Lets see all december entires in our project, as seen by different users:

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (174 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (114 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3,
            "record_date": 1417910400,
            "summary": null,
            "user_id": 4,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
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
... (114 líneas más)
```

Lets just check the second week of December:

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (134 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (94 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3,
            "record_date": 1417910400,
            "summary": null,
            "user_id": 4,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
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
... (94 líneas más)
```

and now lets check the third week of December:

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 4.5,
            "record_date": 1418515200,
            "summary": null,
            "user_id": 3,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 3,
            "updated_on": 1430164425,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 6,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/6",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (94 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 4.5,
            "record_date": 1418515200,
            "summary": null,
            "user_id": 3,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 3,
            "updated_on": 1430164425,
            "updated_by_id": 3,
            "job_type_id": 1
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
                "name": "Test Project",
... (74 líneas más)
```

**`GET /projects/1/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

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
            "value": 0.5,
            "record_date": 1418601600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
            "updated_by_id": 4,
            "job_type_id": 1
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
                "name": "Test Project",
... (74 líneas más)
```

Great, we just learned how we can filter time records per project and how different roles see these records. Lets now check how time records are filtered per user. We'll start by fetching all december records:

**`GET /users/2/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": null,
    "related": null
}
```

**`GET /users/3/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (114 líneas más)
```

**`GET /users/4/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-01",
    "to": "2014-12-31"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3,
            "record_date": 1417910400,
            "summary": null,
            "user_id": 4,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
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
... (114 líneas más)
```

Now, lets see if records from second week of December are properly returned:

**`GET /users/2/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": null,
    "related": null
}
```

**`GET /users/3/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1417824000,
            "summary": null,
            "user_id": 3,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164424,
            "created_by_id": 3,
            "updated_on": 1430164424,
            "updated_by_id": 3,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (94 líneas más)
```

**`GET /users/4/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-06",
    "to": "2014-12-10"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 4,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/4",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3,
            "record_date": 1417910400,
            "summary": null,
            "user_id": 4,
            "parent_type": "Project",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
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
... (94 líneas más)
```

Finally, lets check third week of December:

**`GET /users/2/time-records/filtered-by-date`** → HTTP 200 _(como ProjectLeader)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

Respuesta:
```json
{
    "time_records": null,
    "related": null
}
```

**`GET /users/3/time-records/filtered-by-date`** → HTTP 200 _(como Member)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

Respuesta:
```json
{
    "time_records": [
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 4.5,
            "record_date": 1418515200,
            "summary": null,
            "user_id": 3,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 3,
            "updated_on": 1430164425,
            "updated_by_id": 3,
            "job_type_id": 1
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
                "name": "Test Project",
... (74 líneas más)
```

**`GET /users/4/time-records/filtered-by-date`** → HTTP 200 _(como Subcontractor)_

Parámetros de query:
```json
{
    "from": "2014-12-13",
    "to": "2014-12-17"
}
```

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
            "value": 0.5,
            "record_date": 1418601600,
            "summary": null,
            "user_id": 4,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164425,
            "created_by_id": 4,
            "updated_on": 1430164425,
            "updated_by_id": 4,
            "job_type_id": 1
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
                "name": "Test Project",
... (74 líneas más)
```
