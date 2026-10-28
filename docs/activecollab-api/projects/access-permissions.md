# Access Permissions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/access-permissions.html

Personas in this Story: Default, SecondOwner, TechAdmin, MemberPlus, Member, Subcontractor, Client.

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Only First Owner Invited"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Only First Owner Invited",
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
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-r9mS1mM@mail.manageprojects.com",
... (15 líneas más)
```

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Everyone Invited",
    "members": [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

Access to projects in ActiveCollab is controlled by user's role and their involvment in a project:

1. Users with role Owner can access all projects,
2. Users with other roles can access only projects that they are invited to.

To demonstrate, we have created X accounts:

**`GET /users`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Owner",
        "url_path": "\/users\/1",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430163996,
        "created_by_id": 1,
        "updated_on": 1430163996,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430163996",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (179 líneas más)
```

and created two projects, one that only first owner is invited to and another one where everyone's invited to:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Only First Owner Invited",
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
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-r9mS1mM@mail.manageprojects.com",
... (52 líneas más)
```

Access to the first project is granted only to users with Owner role:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Only First Owner Invited",
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
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-r9mS1mM@mail.manageprojects.com",
... (15 líneas más)
```

**`GET /projects/1`** → HTTP 200 _(como SecondOwner)_

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Only First Owner Invited",
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
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-r9mS1mM@mail.manageprojects.com",
... (15 líneas más)
```

**`GET /projects/1`** → HTTP 403 _(como TechAdmin)_

**`GET /projects/1`** → HTTP 403 _(como MemberPlus)_

**`GET /projects/1`** → HTTP 403 _(como Member)_

**`GET /projects/1`** → HTTP 403 _(como Subcontractor)_

**`GET /projects/1`** → HTTP 403 _(como Client)_

Access to the second project is granted to everyone, because everyone's invited:

**`GET /projects/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como SecondOwner)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como TechAdmin)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como MemberPlus)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como Subcontractor)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```

**`GET /projects/2`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Everyone Invited",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164000,
        "created_by_id": 1,
        "updated_on": 1430164000,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
... (21 líneas más)
```
