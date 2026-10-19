# Preview Invoice Items

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/preview-invoice-items.html

For the purpose of this test, we have created a project and tracked some time on it (4 billable and 3 unbillable hours):

**`GET /projects/1/time-records`** → HTTP 200

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
            "billable_status": 0,
            "value": 3,
            "record_date": 1400198400,
            "summary": "Non-billable task time record",
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164780,
            "created_by_id": 1,
            "updated_on": 1430164780,
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
... (112 líneas más)
```

at rate of US$150 per hour that we have for this client:

**`GET /companies/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company GmbH",
        "members": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164779,
        "created_by_id": 1,
        "updated_on": 1430164779,
        "updated_by_id": 1,
        "address": "Street Name 12\nCity",
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": 1,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 150
    },
    "active_projects_count": 1
}
```

we expect to make US$600.

We also tracked some project expenses that are not time related (US$630.50 in billable and US$125.25 in unbillable expenses):

**`GET /projects/1/expenses`** → HTTP 200

Respuesta:
```json
{
    "expenses": [
        {
            "id": 3,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
            "value": 125.25,
            "record_date": 1400198400,
            "summary": "Non-billable task expense",
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164781,
            "created_by_id": 1,
            "updated_on": 1430164781,
            "updated_by_id": 1,
            "category_id": 1,
            "currency_id": 1
        },
        {
            "id": 2,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
... (115 líneas más)
```

To prepare and preview invoice items, we can call `/invoices/preview-items` command:

**`GET /invoices/preview-items`** → HTTP 200

Parámetros de query:
```json
{
    "project_ids": [
        1
    ],
    "include_time_records": true
}
```

Respuesta:
```json
[
    {
        "description": "#1: Test Task: Billable task time record (May 15. 2014)",
        "unit_cost": 150,
        "quantity": 2.5,
        "first_tax_rate_id": null,
        "second_tax_rate_id": null,
        "time_record_ids": [
            2
        ],
        "expense_ids": []
    },
    {
        "description": "Test Project: Billable project time record (May 14. 2014)",
        "unit_cost": 150,
        "quantity": 1.5,
        "first_tax_rate_id": null,
        "second_tax_rate_id": null,
        "time_record_ids": [
            1
        ],
        "expense_ids": []
    }
]
```

Date filter is also available:

**`GET /invoices/preview-items`** → HTTP 200

Parámetros de query:
```json
{
    "project_ids": [
        1
    ],
    "include_time_records": true,
    "date_filter_from": "2014-01-01",
    "date_filter_to": "2014-12-31"
}
```

Respuesta:
```json
[
    {
        "description": "#1: Test Task: Billable task time record (May 15. 2014)",
        "unit_cost": 150,
        "quantity": 2.5,
        "first_tax_rate_id": null,
        "second_tax_rate_id": null,
        "time_record_ids": [
            2
        ],
        "expense_ids": []
    },
    {
        "description": "Test Project: Billable project time record (May 14. 2014)",
        "unit_cost": 150,
        "quantity": 1.5,
        "first_tax_rate_id": null,
        "second_tax_rate_id": null,
        "time_record_ids": [
            1
        ],
        "expense_ids": []
    }
]
```

**`GET /invoices/preview-items`** → HTTP 200

Parámetros de query:
```json
{
    "project_ids": [
        1
    ],
    "include_time_records": true,
    "date_filter_from": "2013-01-01",
    "date_filter_to": "2013-12-31"
}
```

Respuesta:
```json
[]
```
