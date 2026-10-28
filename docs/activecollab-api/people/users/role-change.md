# Role Change

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/role-change.html

Personas in this Story: Default, Member.

In this story, we'll see how owner can change user's role. First, lets create one member and one subcontractor. We'll use member account to check whether permissions are blocked for members who are not owners, and we'll use subcontractor account to change its role:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member@activecollab.com",
    "password": "123",
    "company_id": 1
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
        "created_on": 1430164666,
        "created_by_id": 1,
        "updated_on": 1430164666,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164666",
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

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Subcontractor",
    "email": "subcontractor@activecollab.com",
    "password": "123",
    "company_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Subcontractor",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164666,
        "created_by_id": 1,
        "updated_on": 1430164666,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164666",
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

If member tries to change the role, system will reject the request:

**`PUT /users/3/change-role`** → HTTP 403 _(como Member)_

Payload:
```json
{
    "role": "Member",
    "custom_permissions": [
        "can_manage_projects"
    ]
}
```

Owner on the other hand will be able to change subcontractor's role to member, and set custom permissions:

**`PUT /users/3/change-role`** → HTTP 200

Payload:
```json
{
    "role": "Member",
    "custom_permissions": [
        "can_manage_projects"
    ]
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
        "created_on": 1430164666,
        "created_by_id": 1,
        "updated_on": 1430164667,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164667",
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

Member's custom permissions can be changed without role change:

**`PUT /users/3/change-role`** → HTTP 200

Payload:
```json
{
    "role": "Member",
    "custom_permissions": [
        "can_manage_settings"
    ]
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
        "created_on": 1430164666,
        "created_by_id": 1,
        "updated_on": 1430164667,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Subcontractor",
        "last_name": null,
        "display_name": "subcontractor",
        "short_display_name": "subcontractor",
        "email": "subcontractor@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164667",
        "custom_permissions": [
            "can_manage_settings"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
... (3 líneas más)
```
