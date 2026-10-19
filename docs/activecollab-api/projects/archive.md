# Archive

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/archive.html

For the purpose of this test, we have created a project with two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Project #1",
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
        "created_on": 1430164009,
        "created_by_id": 1,
        "updated_on": 1430164009,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-NwfCQqJ@mail.manageprojects.com",
... (46 líneas más)
```

Projects archive is empty:

**`GET /projects/archive`** → HTTP 200

Respuesta:
```json
[]
```

When we complete the projects:

**`PUT /complete/project/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Project #1",
        "completed_on": 1430164010,
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
        "created_on": 1430164009,
        "created_by_id": 1,
        "updated_on": 1430164010,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-NwfCQqJ@mail.manageprojects.com",
... (15 líneas más)
```

**`PUT /complete/project/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Project #2",
        "completed_on": 1430164011,
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
        "created_on": 1430164009,
        "created_by_id": 1,
        "updated_on": 1430164011,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-ZVXn4fh@mail.manageprojects.com",
... (15 líneas más)
```

Active projects listing will be empty:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[]
```

but we'll have these projects available in the archive (recently completed are on the top):

**`GET /projects/archive`** → HTTP 200

Parámetros de query:
```json
{
    "page": 1
}
```

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Project #2",
        "completed_on": 1430164011,
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
        "created_on": 1430164009,
        "created_by_id": 1,
        "updated_on": 1430164011,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-ZVXn4fh@mail.manageprojects.com",
... (46 líneas más)
```
