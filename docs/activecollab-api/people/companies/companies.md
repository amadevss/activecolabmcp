# Companies

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/companies/companies.html

activeCollab always ships with at least one company: owner company. That is primary company and all other companies are either client or subcontractor companies, depending on users who belong to them. Lets confirm that we have one company already:

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
        "created_on": 1430164544,
        "created_by_id": 1,
        "updated_on": 1430164544,
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

Lets create a client company and invite one client:

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
        "created_on": 1430164546,
        "created_by_id": 1,
        "updated_on": 1430164546,
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

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Client",
    "company_id": 2,
    "email": "client@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Client",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164547,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164547",
        "custom_permissions": [],
        "company_id": 2,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Open Client Project",
    "company_id": 2,
    "leader_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Open Client Project",
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
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164547,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-og2yhUB@mail.manageprojects.com",
... (15 líneas más)
```

When we move company to archive, system will automatically archive all company users and complete any open projects:

**`PUT /move-to-archive/company/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company",
        "members": [
            2
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": true,
        "created_on": 1430164546,
        "created_by_id": 1,
        "updated_on": 1430164547,
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

Lets check if company users were moved to the archive:

**`GET /users/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Client",
        "url_path": "\/users\/2",
        "is_archived": true,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164547,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164547",
        "custom_permissions": [],
        "company_id": 2,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

Now, lets confirm that all open projects got completed as well:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Open Client Project",
        "completed_on": 1430164547,
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
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164547,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-og2yhUB@mail.manageprojects.com",
... (15 líneas más)
```

When we move company to trash, all company users will be moved to trash as well, but projects will remain untrashed:

**`PUT /move-to-trash/company/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company",
        "members": [
            2
        ],
        "is_trashed": true,
        "trashed_on": 1430164548,
        "trashed_by_id": 1,
        "is_archived": true,
        "created_on": 1430164546,
        "created_by_id": 1,
        "updated_on": 1430164548,
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

Lets check if company users were moved to trash as well:

**`GET /users/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Client",
        "url_path": "\/users\/2",
        "is_archived": true,
        "is_trashed": true,
        "trashed_on": 1430164548,
        "trashed_by_id": 1,
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164548,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164548",
        "custom_permissions": [],
        "company_id": 2,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

Company projects should not be moved to trash, because projects are history data and they should be preserved whenever possible:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Open Client Project",
        "completed_on": 1430164547,
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
        "created_on": 1430164547,
        "created_by_id": 1,
        "updated_on": 1430164547,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-og2yhUB@mail.manageprojects.com",
... (15 líneas más)
```
