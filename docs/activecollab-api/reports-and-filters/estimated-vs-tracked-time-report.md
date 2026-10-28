# Estimated vs Tracked Time Report

> Fuente: https://developers.activecollab.com/api-documentation/v1/reports-and-filters/estimated-vs-tracked-time-report.html

With this test, we'll explain how you can quickly get Estimated vs Tracked time report using ActiveCollab's assignments filter. First, lets create a task:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task with an estimate",
    "job_type_id": 1,
    "estimate": 8
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task with an estimate",
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
        "created_on": 1430165042,
        "created_by_id": 1,
        "updated_on": 1430165042,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

and then lets track some time (one record on project level, which should be included in our report, and two records on the task level):

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": "2:30",
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2015-04-27"
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
        "value": 2.5,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430165042,
        "created_by_id": 1,
        "updated_on": 1430165042,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "task_id": 1,
    "value": 2,
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2015-04-27"
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
        "value": 2,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430165043,
        "created_by_id": 1,
        "updated_on": 1430165043,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "task_id": 1,
    "value": 4,
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2015-04-27"
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
        "value": 4,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430165043,
        "created_by_id": 1,
        "updated_on": 1430165043,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

At this point, we can run a report. Notice that we said to filter to `include_tracking_data` (query time records and estimated). This switch is off by default, so we have to turn it on. We are turning off subtasks for perforance reasons - they will not return any useful info in this scenario anyway:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "include_tracking_data": true,
    "include_subtasks": false
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Assignments",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 0,
                "task_list_id": 0,
                "name": "Task with an estimate",
                "body": null,
                "created_on": 1430165042,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": null,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "estimated_time": 8,
                "estimated_job_type_id": 1,
                "project": "Test Project",
                "task_list": null,
                "assignee": null,
                "created_by": "ilija.studen",
... (8 líneas más)
```

It's as easy as that. All other assignment filter and grouping options are available and you will get the data in `estimated_time`, `estimated_job_type_id` and `tracked_time` columns.
