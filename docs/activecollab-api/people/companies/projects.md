# Projects

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/companies/projects.html

**`POST /companies`** → HTTP 200

Payload:
```json
{
    "name": "Client Company"
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
        "created_on": 1430164570,
        "created_by_id": 1,
        "updated_on": 1430164570,
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

**`PUT /complete/project/4`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Project",
        "url_path": "\/projects\/4",
        "name": "Completed Client Project",
        "completed_on": 1430164573,
        "completed_by_id": 1,
        "is_completed": true,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164571,
        "created_by_id": 1,
        "updated_on": 1430164573,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-44fba1A@mail.manageprojects.com",
... (15 líneas más)
```

Projects can be listed per company. To demonstrate, we have created two projects for owner company, and two projects for a client company. Second of the two client projects is completed:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Internal Project #2",
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
        "created_on": 1430164571,
        "created_by_id": 1,
        "updated_on": 1430164571,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-5C9mhXM@mail.manageprojects.com",
... (83 líneas más)
```

**`GET /projects/archive`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 4,
        "class": "Project",
        "url_path": "\/projects\/4",
        "name": "Completed Client Project",
        "completed_on": 1430164573,
        "completed_by_id": 1,
        "is_completed": true,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164571,
        "created_by_id": 1,
        "updated_on": 1430164573,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-44fba1A@mail.manageprojects.com",
... (9 líneas más)
```

Lets check internal projects:

**`GET /companies/1/projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Internal Project #2",
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
        "created_on": 1430164571,
        "created_by_id": 1,
        "updated_on": 1430164571,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-5C9mhXM@mail.manageprojects.com",
... (46 líneas más)
```

Now lets check client projects:

**`GET /companies/2/projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 4,
        "class": "Project",
        "url_path": "\/projects\/4",
        "name": "Completed Client Project",
        "completed_on": 1430164573,
        "completed_by_id": 1,
        "is_completed": true,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164571,
        "created_by_id": 1,
        "updated_on": 1430164573,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-44fba1A@mail.manageprojects.com",
... (46 líneas más)
```
