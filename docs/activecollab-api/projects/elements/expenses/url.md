# URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/expenses/url.html

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 250,
    "user_id": 1,
    "category_id": 1,
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
        "created_on": 1430164106,
        "created_by_id": 1,
        "updated_on": 1430164106,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`GET /projects/1/expenses/1`** → HTTP 200

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
        "created_on": 1430164106,
        "created_by_id": 1,
        "updated_on": 1430164106,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`GET /projects/2/expenses/1`** → HTTP 404
