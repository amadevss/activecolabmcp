# Time Records

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/time-records/time-records.html

Personas in this Story: Default, Member.

Lets see if we have time records in the target project

**`GET /projects/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": null,
    "related": null
}
```

There are no time records tracked on this project yet. Before we can add new records, we need to see which job types are defined. We can get a list by requesting data from `/job-types` command:

**`GET /job-types`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "JobType",
        "url_path": "\/job-types\/1",
        "name": "General",
        "is_archived": false,
        "updated_on": null,
        "is_default": true,
        "default_hourly_rate": 100
    }
]
```

Now that we know that we have a valid job type that we can use, lets add two time records, one attached directly to the project (we simply ommit `task_id` value) and one added to a task:

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 1.5,
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 0
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
        "billable_status": 0,
        "value": 1.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164445,
        "created_by_id": 1,
        "updated_on": 1430164445,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task #1",
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
        "created_on": 1430164444,
        "created_by_id": 1,
        "updated_on": 1430164444,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "task_id": 1,
    "value": "2:30",
    "user_id": 1,
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
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164446,
        "created_by_id": 1,
        "updated_on": 1430164446,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task #1",
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
        "created_on": 1430164444,
        "created_by_id": 1,
        "updated_on": 1430164446,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Track time in the second project:

**`POST /projects/2/time-records`** → HTTP 200

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
        "id": 3,
        "class": "TimeRecord",
        "url_path": "\/projects\/2\/time-records\/3",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 3.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 2,
        "created_on": 1430164446,
        "created_by_id": 1,
        "updated_on": 1430164446,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Project's `/time-records` request should return all records that are tracked on that projects, including project's tasks:

**`GET /projects/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
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
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164446,
            "created_by_id": 1,
            "updated_on": 1430164446,
            "updated_by_id": 1,
            "job_type_id": 1
        },
        {
            "id": 1,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
... (93 líneas más)
```

If we run the same request on task level, we should get only time records tracked for that task:

**`GET /projects/1/tasks/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
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
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164446,
            "created_by_id": 1,
            "updated_on": 1430164446,
            "updated_by_id": 1,
            "job_type_id": 1
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
                "name": "First Project",
... (73 líneas más)
```

In order to alter this value, we can send PUT request:

**`PUT /projects/1/time-records/1`** → HTTP 200

Payload:
```json
{
    "value": "3:15",
    "billable_status": 1
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
        "value": 3.25,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164445,
        "created_by_id": 1,
        "updated_on": 1430164446,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

We just realized that task time record that we added is logged for the incorrect task. Note that sending PUT request with `project_id` or `task_id` will note move the record:

**`PUT /projects/1/time-records/2`** → HTTP 200

Payload:
```json
{
    "project_id": 2,
    "task_id": 2
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
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164446,
        "created_by_id": 1,
        "updated_on": 1430164447,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

For move to work, we need to call `/projects/:project_id/time-records/:time_record_id/move`:

**`PUT /projects/1/time-records/2/move`** → HTTP 200

Payload:
```json
{
    "task_id": 2
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
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 2,
        "created_on": 1430164446,
        "created_by_id": 1,
        "updated_on": 1430164447,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

To move the time record on project level, send an empty value for `task_id` and `project_id` values:

**`PUT /projects/1/time-records/2/move`** → HTTP 200

Payload:
```json
{
    "project_id": 2,
    "task_id": 0
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TimeRecord",
        "url_path": "\/projects\/2\/time-records\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 2.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 2,
        "created_on": 1430164446,
        "created_by_id": 1,
        "updated_on": 1430164447,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Finally, lets move the newly created time record to trash:

**`DELETE /projects/1/time-records/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": true,
        "trashed_on": 1430164447,
        "trashed_by_id": 1,
        "billable_status": 1,
        "value": 3.25,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164445,
        "created_by_id": 1,
        "updated_on": 1430164447,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Confirmation that the record was deleted:

**`GET /projects/1/time-records/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": true,
        "trashed_on": 1430164447,
        "trashed_by_id": 1,
        "billable_status": 1,
        "value": 3.25,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164445,
        "created_by_id": 1,
        "updated_on": 1430164447,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Lets check if user time records returns a proper list of records (cross-project):

**`GET /users/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/2\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
            "value": 3.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 1,
            "parent_type": "Project",
            "parent_id": 2,
            "created_on": 1430164446,
            "created_by_id": 1,
            "updated_on": 1430164446,
            "updated_by_id": 1,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/2\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (56 líneas más)
```
