# Roles

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/roles.html

Personas in this Story: Default, ProjectManager, Member, Subcontractor, Client.

This story covers various permission checks when inviting users with specific roles and custom permissions. There are four user roles in ActiveCollab:

1. Owner
2. Member - employees or group members (can have extra permissions)
3. Subcontractor
4. Client

We'll start by inviting two members - one with permissions to create new projects and one with no extra permissions. Only user with permissions to create new projects will be able to invite new people to the system:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member1@activecollab.com",
    "password": "123",
    "company_id": 1,
    "custom_permissions": [
        "can_manage_projects"
    ]
}
```

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
        "created_on": 1430164673,
        "created_by_id": 1,
        "updated_on": 1430164673,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member1",
        "last_name": null,
        "display_name": "member1",
        "short_display_name": "member1",
        "email": "member1@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164673",
        "custom_permissions": [
            "can_manage_projects"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
... (3 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Member",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164674,
        "created_by_id": 1,
        "updated_on": 1430164674,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member2",
        "last_name": null,
        "display_name": "member2",
        "short_display_name": "member2",
        "email": "member2@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164674",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

Regardless of custom permissions, members can only invite members or "lower" roles. If we try to create an administrator:

**`POST /users`** → HTTP 403 _(como ProjectManager)_

Payload:
```json
{
    "type": "Owner",
    "email": "second-owner@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

or try to invite a member with custom permissions:

**`POST /users`** → HTTP 403 _(como ProjectManager)_

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "123",
    "company_id": 1,
    "custom_permissions": [
        "can_manage_projects",
        "can_manage_settings"
    ]
}
```

we'll get an error. These limitations are enforced across the system, so /users/invite also resects them:

**`POST /users/invite`** → HTTP 403 _(como ProjectManager)_

Payload:
```json
{
    "email_addresses": "first@activecollab.com",
    "role": "Owner"
}
```

**`POST /users/invite`** → HTTP 403 _(como ProjectManager)_

Payload:
```json
{
    "email_addresses": "first@activecollab.com",
    "role": "Member",
    "custom_permissions": [
        "can_manage_projects",
        "can_manage_settings"
    ]
}
```

But if we invite member with no extra permissions, all will work just fine:

**`POST /users`** → HTTP 200 _(como ProjectManager)_

Payload:
```json
{
    "type": "Member",
    "email": "member3@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Member",
        "url_path": "\/users\/4",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164675,
        "created_by_id": 2,
        "updated_on": 1430164675,
        "updated_by_id": 2,
        "language_id": 0,
        "first_name": "Member3",
        "last_name": null,
        "display_name": "member3",
        "short_display_name": "member3",
        "email": "member3@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430164675",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

Note that member without permissions to create new projects will get an error even in that case:

**`POST /users`** → HTTP 403 _(como Member)_

Payload:
```json
{
    "type": "Member",
    "email": "member4@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

Subcontractors and clients can't invite people, not even with subcontractor or client roles:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Subcontractor",
    "email": "subcontractor@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Subcontractor",
        "url_path": "\/users\/5",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164675,
        "created_by_id": 1,
        "updated_on": 1430164675,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=5&size=--SIZE--&timestamp=1430164675",
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

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Client",
    "email": "client@activecollab.com",
    "password": "123"
}
```

Respuesta:
```json
{
    "single": {
        "id": 6,
        "class": "Client",
        "url_path": "\/users\/6",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164675,
        "created_by_id": 1,
        "updated_on": 1430164675,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=6&size=--SIZE--&timestamp=1430164675",
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

**`POST /users`** → HTTP 403 _(como Subcontractor)_

Payload:
```json
{
    "type": "Client",
    "email": "client2@activecollab.com",
    "password": "123"
}
```

**`POST /users`** → HTTP 403 _(como Client)_

Payload:
```json
{
    "type": "Client",
    "email": "client2@activecollab.com",
    "password": "123"
}
```
