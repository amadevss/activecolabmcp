# Projects

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/projects.html

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

**`POST /companies`** → HTTP 200

Payload:
```json
{
    "name": "Client Company",
    "currency_id": 1
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
        "created_on": 1430164507,
        "created_by_id": 1,
        "updated_on": 1430164507,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": 1,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

In order to list all active projects that authenticated user can see, we can simply send a GET request to `/projects` resource:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[]
```

As you can see, this request returns an empty array because we have no projects defined yet. Lets create one:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "New projct",
    "company_id": 2,
    "leader_id": 1,
    "members": [
        1,
        2
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New projct",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164507,
        "created_by_id": 1,
        "updated_on": 1430164507,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

Great, now we have a project created. Lets see if `/projects` listing is properly updated:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New projct",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164507,
        "created_by_id": 1,
        "updated_on": 1430164507,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (10 líneas más)
```

Hm, it looks like we have mistyped the project name. Lets correct this:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "name": "New Project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164507,
        "created_by_id": 1,
        "updated_on": 1430164508,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Wizardry"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Wizardry",
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
        "created_on": 1430164509,
        "created_by_id": 1,
        "updated_on": 1430164509,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-tBzzYHM@mail.manageprojects.com",
... (15 líneas más)
```

and lets see if it goes to the top of the list:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Wizardry",
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
        "created_on": 1430164509,
        "created_by_id": 1,
        "updated_on": 1430164509,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-tBzzYHM@mail.manageprojects.com",
... (47 líneas más)
```

Another way to sort projects is by name:

**`GET /projects`** → HTTP 200

Parámetros de query:
```json
{
    "sort_by_name": true
}
```

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164507,
        "created_by_id": 1,
        "updated_on": 1430164508,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (47 líneas más)
```
