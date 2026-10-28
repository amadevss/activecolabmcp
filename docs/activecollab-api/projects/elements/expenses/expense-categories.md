# Expense Categories

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/expenses/expense-categories.html

Expense categories are used for sorting project expenses. When installed, ActiveCollab will set up one expense category and make it default:

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

Lets rename it to something that makes more sense to us:

**`PUT /expense-categories/1`** → HTTP 200

Payload:
```json
{
    "name": "Gas"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/1",
        "name": "Gas",
        "is_default": true
    }
}
```

Now lets define new categories:

**`POST /expense-categories`** → HTTP 200

Payload:
```json
{
    "name": "Travel"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/2",
        "name": "Travel",
        "is_default": false
    }
}
```

**`POST /expense-categories`** → HTTP 200

Payload:
```json
{
    "name": "Gear Rent"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/3",
        "name": "Gear Rent",
        "is_default": false
    }
}
```

And track one `Gear Rent` expense:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Test Project",
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
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164088,
        "created_by_id": 1,
        "updated_on": 1430164088,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-cXx6z4g@mail.manageprojects.com",
... (15 líneas más)
```

**`POST /projects/1/time-records`** → HTTP 500

Payload:
```json
{
    "value": 1.5,
    "user_id": 1,
    "job_type_id": 4,
    "record_date": "2014-05-14",
    "billable_status": 0
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "job_type_id": [
            "Value of job_type_id field is required"
        ]
    },
    "object_class": "TimeRecord",
    "object_fields": {
        "id": null,
        "parent_type": "Project",
        "parent_id": 1,
        "invoice_item_id": 0,
        "job_type_id": 4,
        "record_date": 1400025600,
        "value": 1.5,
        "user_id": 1,
        "user_name": null,
        "user_email": null,
        "summary": null,
        "billable_status": 0,
        "created_on": 1430164088,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164088,
        "updated_by_id": 1,
        "updated_by_name": "ilija.studen",
        "updated_by_email": "ilija.studen@activecollab.com",
... (6 líneas más)
```

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 250,
    "user_id": 1,
    "category_id": 3,
    "record_date": "2014-05-14"
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
        "created_on": 1430164089,
        "created_by_id": 1,
        "updated_on": 1430164089,
        "updated_by_id": 1,
        "category_id": 3,
        "currency_id": 2
    }
}
```

## Default Category

Default expense category is pre-selected in expense tracking forms:

**`GET /expense-categories/default`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/1",
        "name": "Gas",
        "is_default": true
    }
}
```

We would like our `Travel` category to be the default one:

**`PUT /expense-categories/default`** → HTTP 200

Payload:
```json
{
    "expense_category_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/2",
        "name": "Travel",
        "is_default": true
    }
}
```

## Deleting a Category

Categories that have expenses tracked can't be deleted:

**`DELETE /expense-categories/3`** → HTTP 404

Default category can't be deleted as well:

**`DELETE /expense-categories/2`** → HTTP 404

Only unused categories can be deleted:

**`DELETE /expense-categories/1`** → HTTP 200
