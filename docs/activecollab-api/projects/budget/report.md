# Report

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/budget/report.html

Project budget report shows several important bits of information: budget that we set, cost so far, billable hours etc. To demonstrate, we start with three job types, all with the same default hourly rate:

**`GET /job-types`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 3,
        "class": "JobType",
        "url_path": "\/job-types\/3",
        "name": "Architecture",
        "is_archived": false,
        "updated_on": 1430164029,
        "is_default": false,
        "default_hourly_rate": 100
    },
    {
        "id": 1,
        "class": "JobType",
        "url_path": "\/job-types\/1",
        "name": "General",
        "is_archived": false,
        "updated_on": null,
        "is_default": true,
        "default_hourly_rate": 100
    },
    {
        "id": 2,
        "class": "JobType",
        "url_path": "\/job-types\/2",
        "name": "Programming",
        "is_archived": false,
        "updated_on": 1430164028,
        "is_default": false,
        "default_hourly_rate": 100
... (2 líneas más)
```

For this project, we'll configure different hourly rates:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "hourly_rates": {
        "1": 150,
        "2": 250,
        "3": 300
    }
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Budget test",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164028,
        "created_by_id": 1,
        "updated_on": 1430164029,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-C3tBbN3@mail.manageprojects.com",
... (17 líneas más)
```

Now lets track some billable and non-billable time and expenses:

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 2,
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2014-05-14",
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
        "value": 2,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164029,
        "created_by_id": 1,
        "updated_on": 1430164029,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 3,
    "user_id": 1,
    "job_type_id": 2,
    "record_date": "2014-05-14",
    "billable_status": 1
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
        "value": 3,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164029,
        "created_by_id": 1,
        "updated_on": 1430164029,
        "updated_by_id": 1,
        "job_type_id": 2
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 1.5,
    "user_id": 1,
    "job_type_id": 3,
    "record_date": "2014-05-14",
    "billable_status": 1
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
        "value": 1.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164029,
        "created_by_id": 1,
        "updated_on": 1430164029,
        "updated_by_id": 1,
        "job_type_id": 3
    }
}
```

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 5,
    "user_id": 1,
    "job_type_id": 3,
    "record_date": "2014-05-14",
    "billable_status": 0
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
        "billable_status": 0,
        "value": 5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164030,
        "created_by_id": 1,
        "updated_on": 1430164030,
        "updated_by_id": 1,
        "job_type_id": 3
    }
}
```

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 250,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 250,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164030,
        "created_by_id": 1,
        "updated_on": 1430164030,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 450,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 3
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 3,
        "value": 450,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164030,
        "created_by_id": 1,
        "updated_on": 1430164030,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 100,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 0
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/3",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 100,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164030,
        "created_by_id": 1,
        "updated_on": 1430164030,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

When we run the report, we'll see a nicely summed up report with a lot o details:

1. `budget` - Budget that we defined,
2. `cost_so_far` - Total cost so far (time + expenses)
3. `billable_cost_so_far` - Billable cost so far,
4. `non_billable_cost_so_far` - Non-billable cost so far,
5. `cost_by_job_type` - Cost broken by job type

**`GET /projects/1/budget`** → HTTP 200

Respuesta:
```json
{
    "budget": 2500,
    "cost_so_far": 3800,
    "billable_cost_so_far": 2200,
    "non_billable_cost_so_far": 1600,
    "cost_by_job_type": [
        {
            "id": 1,
            "rate": 150,
            "hours": 2,
            "value": 300,
            "non_billable_hours": 0,
            "non_billable_value": 0
        },
        {
            "id": 2,
            "rate": 250,
            "hours": 3,
            "value": 750,
            "non_billable_hours": 0,
            "non_billable_value": 0
        },
        {
            "id": 3,
            "rate": 300,
            "hours": 1.5,
            "value": 450,
            "non_billable_hours": 5,
            "non_billable_value": 1500
        }
... (4 líneas más)
```
