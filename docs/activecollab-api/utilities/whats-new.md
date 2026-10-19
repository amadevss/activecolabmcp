# What's New

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/whats-new.html

Personas in this Story: Default, Member, Client.

For the purpose of this test, we have created a couple of objects and there are listed here:

**`GET /whats-new`** → HTTP 200

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 10,
            "class": "CommentCreatedActivityLog",
            "url_path": "\/activity-logs\/10",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164873,
            "created_by_id": 1,
            "updated_on": 1430164873,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/tasks\/2",
            "comment_id": 2
        },
        {
            "id": 9,
            "class": "SubtaskCreatedActivityLog",
            "url_path": "\/activity-logs\/9",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164872,
            "created_by_id": 2,
            "updated_on": 1430164872,
            "created_by_name": "member",
            "created_by_email": "member@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/tasks\/2",
            "subtask_id": 2
        },
... (387 líneas más)
```

When client accesses activity logs, they will less records:

**`GET /whats-new`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 7,
            "class": "CommentCreatedActivityLog",
            "url_path": "\/activity-logs\/7",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164872,
            "created_by_id": 1,
            "updated_on": 1430164872,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "comment_id": 1
        },
        {
            "id": 6,
            "class": "SubtaskCreatedActivityLog",
            "url_path": "\/activity-logs\/6",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164871,
            "created_by_id": 1,
            "updated_on": 1430164871,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "subtask_id": 1
        },
... (273 líneas más)
```

Lets check activities done by the member:

**`GET /users/2/activities`** → HTTP 200

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 9,
            "class": "SubtaskCreatedActivityLog",
            "url_path": "\/activity-logs\/9",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164872,
            "created_by_id": 2,
            "updated_on": 1430164872,
            "created_by_name": "member",
            "created_by_email": "member@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/tasks\/2",
            "subtask_id": 2
        },
        {
            "id": 5,
            "class": "InstanceUpdatedActivityLog",
            "url_path": "\/activity-logs\/5",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164871,
            "created_by_id": 2,
            "updated_on": 1430164871,
            "created_by_name": "member",
            "created_by_email": "member@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "modifications": {
                "estimate": [
... (160 líneas más)
```

**`GET /users/2/activities`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 5,
            "class": "InstanceUpdatedActivityLog",
            "url_path": "\/activity-logs\/5",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164871,
            "created_by_id": 2,
            "updated_on": 1430164871,
            "created_by_name": "member",
            "created_by_email": "member@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "modifications": {
                "estimate": [
                    0,
                    4
                ],
                "job_type_id": [
                    0,
                    1
                ]
            }
        }
    ],
    "related": {
        "Task": {
            "1": {
                "id": 1,
... (89 líneas más)
```

And now on project level:

**`GET /projects/1/whats-new`** → HTTP 200

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 10,
            "class": "CommentCreatedActivityLog",
            "url_path": "\/activity-logs\/10",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164873,
            "created_by_id": 1,
            "updated_on": 1430164873,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/tasks\/2",
            "comment_id": 2
        },
        {
            "id": 9,
            "class": "SubtaskCreatedActivityLog",
            "url_path": "\/activity-logs\/9",
            "parent_type": "Task",
            "parent_id": 2,
            "created_on": 1430164872,
            "created_by_id": 2,
            "updated_on": 1430164872,
            "created_by_name": "member",
            "created_by_email": "member@activecollab.com",
            "parent_path": "projects\/1\/hidden-from-clients\/tasks\/2",
            "subtask_id": 2
        },
... (299 líneas más)
```

**`GET /projects/1/whats-new`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "activity_logs": [
        {
            "id": 7,
            "class": "CommentCreatedActivityLog",
            "url_path": "\/activity-logs\/7",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164872,
            "created_by_id": 1,
            "updated_on": 1430164872,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "comment_id": 1
        },
        {
            "id": 6,
            "class": "SubtaskCreatedActivityLog",
            "url_path": "\/activity-logs\/6",
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164871,
            "created_by_id": 1,
            "updated_on": 1430164871,
            "created_by_name": "ilija.studen",
            "created_by_email": "ilija.studen@activecollab.com",
            "parent_path": "projects\/1\/visible-to-clients\/tasks\/1",
            "subtask_id": 1
        },
... (185 líneas más)
```
