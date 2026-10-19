# Expenses Filter

> Fuente: https://developers.activecollab.com/api-documentation/v1/reports-and-filters/expenses-filter.html

**`GET /currencies`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 3,
        "class": "Currency",
        "url_path": "\/currencies\/3",
        "name": "British Pound",
        "updated_on": null,
        "code": "GBP",
        "is_default": false,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    },
    {
        "id": 1,
        "class": "Currency",
        "url_path": "\/currencies\/1",
        "name": "Euro",
        "updated_on": null,
        "code": "EUR",
        "is_default": false,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    },
    {
        "id": 4,
        "class": "Currency",
        "url_path": "\/currencies\/4",
        "name": "Japanese Yen",
        "updated_on": null,
        "code": "JPY",
... (16 líneas más)
```

We'll use this simple scenario to check how tracking report can be used to filter and report on project expenses. To make this test possible, we have created one two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Project in Default Currency",
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
        "created_on": 1430165049,
        "created_by_id": 1,
        "updated_on": 1430165050,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-gtx1FpU@mail.manageprojects.com",
... (46 líneas más)
```

and two tasks in the first project:

**`GET /projects/1/tasks`** → HTTP 200

Respuesta:
```json
{
    "tasks": [
        {
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
            "created_on": 1430165050,
            "created_by_id": 1,
            "updated_on": 1430165050,
            "updated_by_id": 1,
            "task_number": 1,
            "task_list_id": 0,
            "position": 1,
            "is_important": false,
... (84 líneas más)
```

We also have one expense category defined:

**`GET /expense-categories`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/1",
        "name": "General",
        "is_default": true
    }
]
```

Now, lets start adding expenses:

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 250,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2015-04-27"
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
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430165051,
        "created_by_id": 1,
        "updated_on": 1430165051,
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
    "task_id": 1,
    "value": 350,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2015-04-27"
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
        "billable_status": 1,
        "value": 350,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430165051,
        "created_by_id": 1,
        "updated_on": 1430165051,
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
    "task_id": 2,
    "value": 450,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2015-04-27"
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
        "billable_status": 1,
        "value": 450,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 2,
        "created_on": 1430165051,
        "created_by_id": 1,
        "updated_on": 1430165051,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`POST /projects/2/expenses`** → HTTP 200

Payload:
```json
{
    "value": 550,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2015-04-27"
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Expense",
        "url_path": "\/projects\/2\/expenses\/4",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 550,
        "record_date": 1430092800,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 2,
        "created_on": 1430165051,
        "created_by_id": 1,
        "updated_on": 1430165051,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 1
    }
}
```

Now we'll throw in one time record, to make sure that our filter is properly filtering out the data that we do not need:

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
        "created_on": 1430165052,
        "created_by_id": 1,
        "updated_on": 1430165052,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

Lets run a general report:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "TrackingReport"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Records",
        "records": [
            {
                "id": 1,
                "type": "TimeRecord",
                "parent_type": "Project",
                "parent_id": 1,
                "group_id": 1,
                "record_date": 1400025600,
                "user_id": 1,
                "user_name": "ilija.studen",
                "user_email": null,
                "summary": null,
                "value": 1.5,
                "billable_status": 0,
                "project_id": 1,
                "project_name": "Project in Default Currency",
                "project_url": "http:\/\/feather.dev\/projects\/1",
                "client_id": 1,
                "client_name": "Owner Company",
                "currency_id": 2,
                "parent_name": "Project in Default Currency",
                "parent_url": "http:\/\/feather.dev\/projects\/1",
                "group_name": "General"
            },
            {
                "id": 1,
                "type": "Expense",
... (112 líneas más)
```

As we can see, it will mix tracked time and expenses. To make sure that we only get expenses, we should set `type_filter` to `expenses`:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "TrackingReport",
    "type_filter": "expenses"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Records",
        "records": [
            {
                "id": 1,
                "type": "Expense",
                "parent_type": "Project",
                "parent_id": 1,
                "group_id": 1,
                "record_date": 1430092800,
                "user_id": 1,
                "user_name": "ilija.studen",
                "user_email": null,
                "summary": null,
                "value": 250,
                "billable_status": 1,
                "project_id": 1,
                "project_name": "Project in Default Currency",
                "project_url": "http:\/\/feather.dev\/projects\/1",
                "client_id": 1,
                "client_name": "Owner Company",
                "currency_id": 2,
                "parent_name": "Project in Default Currency",
                "parent_url": "http:\/\/feather.dev\/projects\/1",
                "group_name": "General"
            },
            {
                "id": 2,
                "type": "Expense",
... (89 líneas más)
```

Lets group the result by project, to see how that affected summarized expenses:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "TrackingReport",
    "type_filter": "expenses",
    "group_by": "project"
}
```

Respuesta:
```json
{
    "project-2": {
        "label": "Project for EU Customer",
        "records": [
            {
                "id": 4,
                "type": "Expense",
                "parent_type": "Project",
                "parent_id": 2,
                "group_id": 1,
                "record_date": 1430092800,
                "user_id": 1,
                "user_name": "ilija.studen",
                "user_email": null,
                "summary": null,
                "value": 550,
                "billable_status": 1,
                "project_id": 2,
                "project_name": "Project for EU Customer",
                "project_url": "http:\/\/feather.dev\/projects\/2",
                "client_id": 1,
                "client_name": "Owner Company",
                "currency_id": 1,
                "parent_name": "Project for EU Customer",
                "parent_url": "http:\/\/feather.dev\/projects\/2",
                "group_name": "General"
            }
        ],
        "total_time": 0,
        "total_expenses": {
... (114 líneas más)
```
