# People

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/people.html

For the purpose of this test, we have create a client company with two members and a test project that includes two members of our team and two clients:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164492,
        "created_by_id": 1,
        "updated_on": 1430164492,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
... (18 líneas más)
```

By revoking client access, system will remove all clients from the project and mark project as internal (owner company is the client in that case):

**`PUT /projects/1/revoke-client-access`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
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
        "created_on": 1430164492,
        "created_by_id": 1,
        "updated_on": 1430164492,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```
