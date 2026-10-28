# Filtering by Access

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/search/filtering-by-access.html

Personas in this Story: Default, Member, Client.

Lets start with user visibility. We have three users in the system: owner, member and a client. Owner can see all users that are in the system, while members and clients can only see users that they worked with before:

**`GET /search?q=Edwin`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /search?q=Peter`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /search?q=Edwin`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=Peter`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=Edwin`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

**`GET /search?q=Peter`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

Similar rule applies to companies - owner sees all companies, but member sees only companies that he worked with before:

**`GET /search?q=ACME`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /search?q=ACME`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=ACME`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
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
        "created_on": 1430164974,
        "created_by_id": 1,
        "updated_on": 1430164974,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
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
        "created_on": 1430164974,
        "created_by_id": 1,
        "updated_on": 1430164974,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-qryWJTb@mail.manageprojects.com",
... (15 líneas más)
```

Now everyone work on the same project, so they can see one another (including companies that they work for):

**`GET /search?q=Peter`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=Edwin`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

**`GET /search?q=ACME`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=ACME`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

They can also see the project that they are involved with:

**`GET /search?q=Cadabra`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=Cadabra`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

but not the project that they are not members of:

**`GET /search?q=Relentless.com`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=Relentless.com`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

Owner can see both projects:

**`GET /search?q=Cadabra`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /search?q=Relentless.com`** → HTTP 200

Respuesta:
```json
[]
```

Lets create a couple of tasks:

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Visible to all project members",
    "body": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visible to all project members",
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
        "body": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "body_formatted": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "created_on": 1430164975,
        "created_by_id": 1,
        "updated_on": 1430164975,
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
    "name": "Hidden from client",
    "body": "Rare term: Durmitor, Common Term: Zabljak. Boost: Zabljak, Nebitno, Nebitno",
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
        "name": "Hidden from client",
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
        "body": "Rare term: Durmitor, Common Term: Zabljak. Boost: Zabljak, Nebitno, Nebitno",
        "body_formatted": "Rare term: Durmitor, Common Term: Zabljak. Boost: Zabljak, Nebitno, Nebitno",
        "created_on": 1430164976,
        "created_by_id": 1,
        "updated_on": 1430164976,
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
    "name": "Visible to all project members",
    "body": "Rare term: Brzece, Common Term: Zabljak; Boost: Zabljak, Zabljak, Nebitno"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Visible to all project members",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Rare term: Brzece, Common Term: Zabljak; Boost: Zabljak, Zabljak, Nebitno",
        "body_formatted": "Rare term: Brzece, Common Term: Zabljak; Boost: Zabljak, Zabljak, Nebitno",
        "created_on": 1430164976,
        "created_by_id": 1,
        "updated_on": 1430164976,
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
    "name": "Hidden from client",
    "body": "Rare term: Kopanik, Common Term: Zabljak; Boost: Nebitno, Nebitno, Nebitno",
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
        "name": "Hidden from client",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Rare term: Kopanik, Common Term: Zabljak; Boost: Nebitno, Nebitno, Nebitno",
        "body_formatted": "Rare term: Kopanik, Common Term: Zabljak; Boost: Nebitno, Nebitno, Nebitno",
        "created_on": 1430164976,
        "created_by_id": 1,
        "updated_on": 1430164976,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

Owner will see all three tasks that have the term `Zabljak`:

**`GET /search?q=Zabljak`** → HTTP 200

Respuesta:
```json
[]
```

Member will see only the tasks that from the first project:

**`GET /search?q=Zabljak`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

and client will see only the task from the first project that is not hidden from clients:

**`GET /search?q=Zabljak`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

When task is moved to trash, it will no longer be available in search:

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
```

**`PUT /move-to-trash/task/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visible to all project members",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164977,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "body_formatted": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "created_on": 1430164975,
        "created_by_id": 1,
        "updated_on": 1430164977,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
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
        "name": "Visible to all project members",
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
        "body": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "body_formatted": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "created_on": 1430164975,
        "created_by_id": 1,
        "updated_on": 1430164977,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
```

And finally, a permanent removal:

**`PUT /move-to-trash/task/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visible to all project members",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430164978,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "body_formatted": "Rare term: Kosanica, Common Term: Zabljak. Boost: Zabljak, Zabljak, Zabljak",
        "created_on": 1430164975,
        "created_by_id": 1,
        "updated_on": 1430164978,
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

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
```
