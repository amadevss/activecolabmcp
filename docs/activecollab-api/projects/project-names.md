# Project Names

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/project-names.html

Personas in this Story: Default, Member.

ActiveCollab offers a quick API command that can list only project names, mapped by their ID-s. This data is useful if you need to present project picker, but don't want to load the entire data set (active projects collection is paged to 100 records per request). To demonstrate, we have created three projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "First project",
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
        "created_on": 1430164499,
        "created_by_id": 1,
        "updated_on": 1430164499,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-d9XXuqg@mail.manageprojects.com",
... (84 líneas más)
```

We also have one completed project in the archive, to demonstrate that /projects/names only shows active projects:

**`GET /projects/archive`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 4,
        "class": "Project",
        "url_path": "\/projects\/4",
        "name": "Fourh project",
        "completed_on": 1430164500,
        "completed_by_id": 1,
        "is_completed": true,
        "members": [
            1,
            2
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164499,
        "created_by_id": 1,
        "updated_on": 1430164500,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (10 líneas más)
```

When owner tries to access the collection, all active projects will be presented:

**`GET /projects/names`** → HTTP 200

Respuesta:
```json
{
    "1": "First project",
    "2": "Second project",
    "3": "Third project"
}
```

Member will see only active projects that they are assigned to:

**`GET /projects/names`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "2": "Second project"
}
```
