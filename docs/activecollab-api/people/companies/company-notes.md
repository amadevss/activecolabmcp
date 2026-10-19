# Company Notes

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/companies/company-notes.html

Company notes can contain sensitive information that clients and subcontractors should not be able to see. For that reason, this info is not included in regular company responses, but as a separate request. For the purpose of this test, we create one client company and left the note field blank:

**`GET /companies/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company",
        "members": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164555,
        "created_by_id": 1,
        "updated_on": 1430164555,
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

`/companies/notes` request also returns an empty array because we have no companies with notes:

**`GET /companies/notes`** → HTTP 200

Respuesta:
```json
[]
```

Lets update our test company with a note:

**`PUT /companies/2`** → HTTP 200

Payload:
```json
{
    "note": "This is a VIP client"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company",
        "members": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164555,
        "created_by_id": 1,
        "updated_on": 1430164555,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": false,
        "has_note": true
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

Now when we check `/companies/notes` we'll see that system properly returns company note:

**`GET /companies/notes`** → HTTP 200

Respuesta:
```json
{
    "2": "This is a VIP client"
}
```
