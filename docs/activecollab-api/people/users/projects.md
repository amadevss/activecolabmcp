# Projects

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/projects.html

Personas in this Story: Default, Member, Client.

ActiveCollab offers a handy API call that can list active user's projects. To demonstrate, we have invited a member and a client:

**`GET /users/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164656,
        "created_by_id": 1,
        "updated_on": 1430164656,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164656",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`GET /users/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Client",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164656,
        "created_by_id": 1,
        "updated_on": 1430164656,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164656",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

and created three projects: one where client is not involved, one active client project and one completed client project:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Internal Project",
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
        "created_on": 1430164657,
        "created_by_id": 1,
        "updated_on": 1430164657,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

**`GET /projects/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Client Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164658,
        "created_by_id": 1,
        "updated_on": 1430164658,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (16 líneas más)
```

**`GET /projects/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Project",
        "url_path": "\/projects\/3",
        "name": "Completed Client Project",
        "completed_on": 1430164659,
        "completed_by_id": 1,
        "is_completed": true,
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
        "created_on": 1430164658,
        "created_by_id": 1,
        "updated_on": 1430164659,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (17 líneas más)
```

Lets check owner's projects:

**`GET /users/1/projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Client Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164658,
        "created_by_id": 1,
        "updated_on": 1430164658,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (48 líneas más)
```

When member tries to access the same listing, system will return only project that he shares with the owner:

**`GET /users/1/projects`** → HTTP 200 _(como Member)_

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Internal Project",
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
        "created_on": 1430164657,
        "created_by_id": 1,
        "updated_on": 1430164657,
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

Same goes for client:

**`GET /users/1/projects`** → HTTP 200 _(como Client)_

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Client Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164658,
        "created_by_id": 1,
        "updated_on": 1430164658,
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
