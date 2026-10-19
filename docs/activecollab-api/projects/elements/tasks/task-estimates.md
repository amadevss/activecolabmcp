# Task Estimates

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/task-estimates.html

All activeCollab tasks can have an estimate set. This is a number of hours that teams expects to spend on a task in order to complete it. To set an estimate for a task, you need to set `job_type_id` and `estimate` values. Lets see which job types we have defined:

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

Ok, we have one job type and it's name is "General". Lets create a task that we expect will take 8 and a half hours of work:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "job_type_id": 1,
    "estimate": "8:30"
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
        "created_on": 1430164367,
        "created_by_id": 1,
        "updated_on": 1430164367,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Estimate value can be provided in decimal format (8.5) or in HH:MM format (8:30). activeCollab will detect the format and do the conversion in the background. Now lets remove the estimate:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "job_type_id": 0,
    "estimate": 0
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
        "created_on": 1430164367,
        "created_by_id": 1,
        "updated_on": 1430164367,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Changes to job type and estimate fields should be correctly recorded in task history:

**`GET /history/task/1`** → HTTP 200

Respuesta:
```json
[
    {
        "timestamp": 1430164367,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "modifications": {
            "estimate": [
                8.5,
                0
            ],
            "job_type_id": [
                1,
                0
            ]
        }
    }
]
```
