# Custom Hourly Rates

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/companies/custom-hourly-rates.html

activeCollab lets you specify custom hourly rates on client and on project level. For the purpose of this test, we have one client, one client project and one job type (with hourly rate). Lets see the data:

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
        "created_on": 1430164561,
        "created_by_id": 1,
        "updated_on": 1430164561,
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
    "active_projects_count": 1
}
```

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Client Project",
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
        "created_on": 1430164562,
        "created_by_id": 1,
        "updated_on": 1430164562,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-mZXTG9V@mail.manageprojects.com",
... (15 líneas más)
```

Lets set a custom company hourly rate and check if it propagates to the project:

**`PUT /companies/2`** → HTTP 200

Payload:
```json
{
    "hourly_rates": {
        "1": 150
    }
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
        "created_on": 1430164561,
        "created_by_id": 1,
        "updated_on": 1430164562,
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
        "1": 150
    },
    "active_projects_count": 1
}
```

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Client Project",
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
        "created_on": 1430164562,
        "created_by_id": 1,
        "updated_on": 1430164562,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-mZXTG9V@mail.manageprojects.com",
... (15 líneas más)
```

Now, lets set it on a project level and confirm that it did not affect the client company rate:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "hourly_rates": {
        "1": 250
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
        "name": "Client Project",
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
        "created_on": 1430164562,
        "created_by_id": 1,
        "updated_on": 1430164563,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-mZXTG9V@mail.manageprojects.com",
... (15 líneas más)
```

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
        "created_on": 1430164561,
        "created_by_id": 1,
        "updated_on": 1430164562,
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
        "1": 150
    },
    "active_projects_count": 1
}
```

Just to confirm that custom rate on project level remains custom even when we remove custom rate from company level:

**`PUT /companies/2`** → HTTP 200

Payload:
```json
{
    "hourly_rates": {
        "1": 0
    }
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
        "created_on": 1430164561,
        "created_by_id": 1,
        "updated_on": 1430164563,
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
    "active_projects_count": 1
}
```

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Client Project",
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
        "created_on": 1430164562,
        "created_by_id": 1,
        "updated_on": 1430164563,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-mZXTG9V@mail.manageprojects.com",
... (15 líneas más)
```

## Setting Hourly Rates When Creating Companies and Projects

Additionally, custom hourly rates can be specified when you create a new company or a project:
