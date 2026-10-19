# All

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/companies/all.html

All command is useful when you want to get all companies, including archived and trashed ones. Here we have three companies:

**`GET /companies`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Company",
        "url_path": "\/companies\/1",
        "name": "Owner Company",
        "members": [
            1
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164537,
        "created_by_id": 1,
        "updated_on": 1430164537,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": true,
        "has_note": false
    },
    {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Company to be Archived",
... (40 líneas más)
```

We'll move second to archive and third to Trash:

**`PUT /move-to-archive/company/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Company to be Archived",
        "members": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": true,
        "created_on": 1430164539,
        "created_by_id": 1,
        "updated_on": 1430164540,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

**`PUT /move-to-trash/company/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Company",
        "url_path": "\/companies\/3",
        "name": "Company to be Trashed",
        "members": [],
        "is_trashed": true,
        "trashed_on": 1430164540,
        "trashed_by_id": 1,
        "is_archived": false,
        "created_on": 1430164539,
        "created_by_id": 1,
        "updated_on": 1430164540,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

Now when we list companies, we'll get only active company:

**`GET /companies`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Company",
        "url_path": "\/companies\/1",
        "name": "Owner Company",
        "members": [
            1
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164537,
        "created_by_id": 1,
        "updated_on": 1430164537,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": true,
        "has_note": false
    }
]
```

To list all companies, including archived and trashed ones, call /companies/all:

**`GET /companies/all`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Company",
        "url_path": "\/companies\/1",
        "name": "Owner Company",
        "members": [
            1
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164537,
        "created_by_id": 1,
        "updated_on": 1430164537,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": true,
        "has_note": false
    },
    {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Company to be Archived",
... (40 líneas más)
```
