# User Time Records

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users-work/user-time-records.html

For this test, we have created a project, a task and recorded some time:

**`GET /projects/1/time-records`** → HTTP 200

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
            "value": 4.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164596,
            "created_by_id": 1,
            "updated_on": 1430164596,
            "updated_by_id": 1,
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
... (133 líneas más)
```

Lets see which records we have tracked for user #1:

**`GET /users/1/time-records`** → HTTP 200

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
            "value": 4.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164596,
            "created_by_id": 1,
            "updated_on": 1430164596,
            "updated_by_id": 1,
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
... (93 líneas más)
```

and which for user #2:

**`GET /users/2/time-records`** → HTTP 200

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
            "value": 2.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 2,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164595,
            "created_by_id": 1,
            "updated_on": 1430164595,
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
            "billable_status": 1,
... (93 líneas más)
```
