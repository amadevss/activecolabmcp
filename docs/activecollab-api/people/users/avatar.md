# Avatar

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/avatar.html

By default, users start with the default avatar if no avatar is provided:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member@activecollab.com"
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
        "created_on": 1430164626,
        "created_by_id": 1,
        "updated_on": 1430164626,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164626",
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

We can upload the avatar:

**`POST /upload-files`** → HTTP 200

Archivos:
```json
[
    [
        "ac.png",
        "image\/png"
    ]
]
```

Respuesta:
```json
[
    {
        "code": "Six0mE9rh6oKwnCptG6eXcJwercf7k0OtvMG1JX8",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FUt5nga7B2ebEqdh0eN89CC045gdPVqiFKbTRbOh4&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

And then set it:

**`PUT /users/2`** → HTTP 200

Payload:
```json
{
    "uploaded_avatar_code": "Six0mE9rh6oKwnCptG6eXcJwercf7k0OtvMG1JX8"
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
        "created_on": 1430164626,
        "created_by_id": 1,
        "updated_on": 1430164626,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164626",
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

To clear user's avatar, send DELETE to /users/:user_id/clear-avatar command:

**`DELETE /users/2/clear-avatar`** → HTTP 200

When removed, avatar will revert to the default one:

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
        "created_on": 1430164626,
        "created_by_id": 1,
        "updated_on": 1430164626,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164626",
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
