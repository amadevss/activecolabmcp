# Suggest

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/search/suggest.html

Personas in this Story: Default, Member, Client.

We have three users in the system: owner, member and a client. Owner can see all users that are in the system, while members and clients can only see users that they worked with before:

**`GET /search/suggest?q=Ed`** → HTTP 200

Respuesta:
```json
null
```

**`GET /search/suggest?q=Ed`** → HTTP 200 _(como Member)_

Respuesta:
```json
null
```

**`GET /search/suggest?q=Ed`** → HTTP 200 _(como Client)_

Respuesta:
```json
null
```

Similar rule applies to companies - owner sees all companies, but member sees only companies that he worked with before:

**`GET /search/suggest?q=ACM`** → HTTP 200

Respuesta:
```json
null
```

**`GET /search/suggest?q=ACM`** → HTTP 200 _(como Member)_

Respuesta:
```json
null
```

**`GET /search/suggest?q=ACM`** → HTTP 200 _(como Client)_

Respuesta:
```json
null
```

Lets create a couple of projects:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Cadabra",
    "leader_id": 1,
    "members": [
        2,
        3
    ],
    "company_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Cadabra",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164986,
        "created_by_id": 1,
        "updated_on": 1430164986,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 2,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (17 líneas más)
```

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Relentless.com",
    "leader_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Relentless.com",
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
        "created_on": 1430164986,
        "created_by_id": 1,
        "updated_on": 1430164986,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-2OexPWB@mail.manageprojects.com",
... (15 líneas más)
```

Now everyone work on the same project, so they can see one another (including companies that they work for):

**`GET /search/suggest?q=Ed`** → HTTP 200 _(como Member)_

Respuesta:
```json
null
```

**`GET /search/suggest?q=ACM`** → HTTP 500 _(como Member)_

**`GET /search/suggest?q=ACM`** → HTTP 200 _(como Client)_

Respuesta:
```json
null
```

They can also see the project that they are involved with:

**`GET /search/suggest?q=Cadabra`** → HTTP 200 _(como Member)_

Respuesta:
```json
null
```

**`GET /search/suggest?q=Cadabra`** → HTTP 200 _(como Client)_

Respuesta:
```json
null
```

but not the project that they are not members of:

**`GET /search/suggest?q=Relentless.com`** → HTTP 200 _(como Member)_

Respuesta:
```json
null
```

**`GET /search/suggest?q=Relentless.com`** → HTTP 200 _(como Client)_

Respuesta:
```json
null
```

Owner can see both projects:

**`GET /search/suggest?q=Cadabra`** → HTTP 200

Respuesta:
```json
null
```

**`GET /search/suggest?q=Relentless.com`** → HTTP 200

Respuesta:
```json
null
```

Lets create a couple of tasks:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164987,
        "created_by_id": 1,
        "updated_on": 1430164987,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Rare term: Durmitor, Common Term: Zabljak. Boost: Zabljak",
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Rare term: Durmitor, Common Term: Zabljak. Boost: Zabljak",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164988,
        "created_by_id": 1,
        "updated_on": 1430164988,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/discussions`** → HTTP 200

Payload:
```json
{
    "name": "Rare term: Brzece, Common Term: Zabljak; Boosted Zabljak, Zabljak"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Rare term: Brzece, Common Term: Zabljak; Boosted Zabljak, Zabljak",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164988,
        "created_by_id": 1,
        "updated_on": 1430164988,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`POST /projects/1/discussions`** → HTTP 200

Payload:
```json
{
    "name": "Rare term: Kopanik, Common Term: Zabljak",
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/2",
        "name": "Rare term: Kopanik, Common Term: Zabljak",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164988,
        "created_by_id": 1,
        "updated_on": 1430164988,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

Owner will see all three tasks that have the term `Zabljak`:

**`GET /search/suggest?q=Zablj`** → HTTP 500

Member will see only the tasks that from the first project:

**`GET /search/suggest?q=Zablj`** → HTTP 500 _(como Member)_

and client will see only the task from the first project that is not hidden from clients:

**`GET /search/suggest?q=Zablj`** → HTTP 500 _(como Client)_

When task is moved to trash, it will no longer be available in search:

**`GET /search/suggest?q=Kosan`** → HTTP 500

**`PUT /move-to-trash/task/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164989,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164987,
        "created_by_id": 1,
        "updated_on": 1430164989,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`GET /search/suggest?q=Kosan`** → HTTP 200

Respuesta:
```json
null
```

Now, lets restore the task to see how that affects the trash:

**`PUT /restore-from-trash/task/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164987,
        "created_by_id": 1,
        "updated_on": 1430164989,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`GET /search/suggest?q=Kosan`** → HTTP 500

And finally, a permanent removal:

**`PUT /move-to-trash/task/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164989,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164987,
        "created_by_id": 1,
        "updated_on": 1430164989,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`DELETE /permanently-delete/task/1`** → HTTP 200

**`GET /projects/1/tasks/1`** → HTTP 404

**`GET /search/suggest?q=Kosan`** → HTTP 200

Respuesta:
```json
null
```
