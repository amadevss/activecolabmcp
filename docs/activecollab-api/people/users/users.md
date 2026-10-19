# Users

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/users.html

## Working with Custom Permission

activeCollab supports following extra permissions for users with Member role:

- `can_manage_projects` - User is a project manager and has all permissions in projects that they are working on
- `can_manage_finances` - User can create, send and manage invoices
- `can_manage_settings` - User has access to Settings area of the application and permissions to change various administrative settings

Lets create a user with a couple of extra permissions:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member-with-custom-permissions@activecollab.com",
    "password": "123",
    "company_id": 1,
    "custom_permissions": [
        "can_manage_projects",
        "can_manage_settings"
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
        "created_on": 1430164689,
        "created_by_id": 1,
        "updated_on": 1430164689,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member-with-custom-permissions",
        "last_name": null,
        "display_name": "member-with-custom-permissions",
        "short_display_name": "member-with-custom-permissions",
        "email": "member-with-custom-permissions@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164689",
        "custom_permissions": [
            "can_manage_settings",
            "can_manage_projects"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
... (4 líneas más)
```

Now we need to revoke tech administration permissions, but give permissions to manage finances to this user:

**`PUT /users/2`** → HTTP 200

Payload:
```json
{
    "custom_permissions": [
        "can_manage_projects",
        "can_manage_finances"
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
        "created_on": 1430164689,
        "created_by_id": 1,
        "updated_on": 1430164690,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member-with-custom-permissions",
        "last_name": null,
        "display_name": "member-with-custom-permissions",
        "short_display_name": "member-with-custom-permissions",
        "email": "member-with-custom-permissions@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164690",
        "custom_permissions": [
            "can_manage_projects",
            "can_manage_finances"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
... (4 líneas más)
```
