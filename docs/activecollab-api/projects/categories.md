# Categories

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/categories.html

System ships with no categories:

**`GET /projects/categories`** → HTTP 200

Respuesta:
```json
[]
```

Lets create a new project category:

**`POST /categories`** → HTTP 200

Payload:
```json
{
    "type": "ProjectCategory",
    "name": "Marketing"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectCategory",
        "url_path": "\/categories\/1",
        "name": "Marketing",
        "parent_id": null,
        "parent_type": null,
        "created_on": 1430164037,
        "created_by_id": 1,
        "updated_on": 1430164037
    }
}
```

Lets rename a category:

**`PUT /categories/1`** → HTTP 200

Payload:
```json
{
    "type": "ProjectCategory",
    "name": "Marketing Efforts"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectCategory",
        "url_path": "\/categories\/1",
        "name": "Marketing Efforts",
        "parent_id": null,
        "parent_type": null,
        "created_on": 1430164037,
        "created_by_id": 1,
        "updated_on": 1430164037
    }
}
```

Lets check the /categories listing now:

**`GET /projects/categories`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ProjectCategory",
        "url_path": "\/categories\/1",
        "name": "Marketing Efforts",
        "parent_id": null,
        "parent_type": null,
        "created_on": 1430164037,
        "created_by_id": 1,
        "updated_on": 1430164037
    }
]
```

Now, we can create a project:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "New project",
    "category_id": 1,
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
        "name": "New project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 1,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164038,
        "created_by_id": 1,
        "updated_on": 1430164038,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-yojwC9J@mail.manageprojects.com",
... (25 líneas más)
```

When we remove a category:

**`DELETE /categories/1`** → HTTP 200

Project's category_id value should be reverted to 0:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New project",
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
        "created_on": 1430164038,
        "created_by_id": 1,
        "updated_on": 1430164038,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-yojwC9J@mail.manageprojects.com",
... (15 líneas más)
```
