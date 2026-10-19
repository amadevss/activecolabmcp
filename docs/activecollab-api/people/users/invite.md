# Invite

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/invite.html

In this scenario, we'll invite two people to a project and one of them will accept the invitation. First step is to create a project:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "New project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New project",
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
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-8D4Ijb0@mail.manageprojects.com",
... (15 líneas más)
```

Next, we'll send two invitations:

**`POST /users/invite`** → HTTP 200

Payload:
```json
{
    "email_addresses": [
        "first@activecollab.com",
        "Peter Smith <peter@activecollab.com>"
    ],
    "role": "Member",
    "project_ids": [
        1
    ]
}
```

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "First",
        "last_name": null,
        "display_name": "first",
        "short_display_name": "first",
        "email": "first@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": true,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164633",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (30 líneas más)
```

Note that `email_addresses` is an array of addresses. It can also be a RFC822 compatible string:

**`POST /users/invite`** → HTTP 200

Payload:
```json
{
    "email_addresses": "santino@activecollab.com, Vito Corleone <vito@activecollab.com>",
    "role": "Member"
}
```

Respuesta:
```json
[
    {
        "id": 4,
        "class": "Member",
        "url_path": "\/users\/4",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Santino",
        "last_name": null,
        "display_name": "santino",
        "short_display_name": "santino",
        "email": "santino@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": true,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430164633",
        "custom_permissions": [],
        "company_id": 0,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (30 líneas más)
```

Now that we demonstrated how `email_addresses` can be used, lets move these accounts to the trash:

**`DELETE /users/4`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Member",
        "url_path": "\/users\/4",
        "is_archived": false,
        "is_trashed": true,
        "trashed_on": 1430164633,
        "trashed_by_id": 1,
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Santino",
        "last_name": null,
        "display_name": "santino",
        "short_display_name": "santino",
        "email": "santino@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430164633",
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

**`DELETE /users/5`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Member",
        "url_path": "\/users\/5",
        "is_archived": false,
        "is_trashed": true,
        "trashed_on": 1430164634,
        "trashed_by_id": 1,
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164634,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Vito",
        "last_name": "Corleone",
        "display_name": "Vito Corleone",
        "short_display_name": "Vito C.",
        "email": "vito@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=5&size=--SIZE--&timestamp=1430164634",
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

Back to the original group of invitees. Lets check that they are added to the project:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New project",
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
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
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

Since /users/invite does not return actual invitation objects, we can't check whether accept invitation page works, unless we resend the invitation:

**`PUT /users/2/resend-invitation`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "UserInvitation",
        "url_path": "#",
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164633,
        "code": "JFXupA0wtObxmpM43hqB"
    },
    "invited_to": {
        "id": 1,
        "class": "Project",
        "name": "New project"
    }
}
```

Now, lets check accept invitation page:

**`GET /accept-invitation`** → HTTP 200

Parámetros de query:
```json
{
    "user_id": 2,
    "code": "$invitation_code"
}
```

Respuesta:
```json
{
    "status": "acceptable",
    "user": {
        "id": 2,
        "email": "first@activecollab.com",
        "first_name": null,
        "last_name": null
    },
    "invited_by": {
        "id": 1,
        "full_name": "ilija.studen",
        "first_name": null,
        "last_name": null
    },
    "invited_to": {
        "id": 1,
        "class": "Project",
        "name": "New project"
    }
}
```

This response tells us a couple of things: who was invited, where, by whome and what is the status of the invitation. There are two possible statuses of an invitation:

1. `acceptable` - All green, show the form and let user accept the invitation
2. `already_accepted` - User already logged in, so they are already familiar with the system.

To accept an invitation, we need to send POST request to the /accept-invitation command. Four parameters are accepted:

1. `first_name`, required
2. `last_name`, required
3. `password`, required
4. `language_id`, optional (default language will be used when this parameter is not provided)
5. `uploaded_avatar_code`, optional (file code returned by /upload-files command that was used to upload a user avatar)

Here we go, lets accept the invitation. On successful invitation, ActiveCollab will automatically log the user in:

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
        "code": "GWd9hPxqlYkFHSOkw6gQmQeNfDoi7fLC2Oz0sXpD",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Ffj2alOdpzd6LBwMAiHA5uUHiNPr8trJzAAzMdC3C&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

**`POST /accept-invitation`** → HTTP 200

Parámetros de query:
```json
{
    "user_id": 2,
    "code": "$invitation_code"
}
```

Payload:
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "password": "1234567890",
    "uploaded_avatar_code": "GWd9hPxqlYkFHSOkw6gQmQeNfDoi7fLC2Oz0sXpD"
}
```

Respuesta:
```json
{
    "logged_user_id": 2,
    "settings": {
        "login_policy": {
            "username_format": "email",
            "remember_extends_session": true,
            "password_change_enabled": true,
            "password_recovery_enabled": true,
            "external_login_url": null,
            "external_logout_url": null,
            "external_change_password_url": null,
            "external_update_profile_url": null
        },
        "password_policy": {
            "min_length": 0,
            "require_numbers": false,
            "require_mixed_case": false,
            "require_symbols": false
        },
        "homepage": null,
        "wallpaper": "wallpaper.jpg",
        "format_date": "%b %e. %Y",
        "format_time": "%I:%M %p",
        "time_first_week_day": 0,
        "timezone": "UTC",
        "gmt_offset": 0,
        "display_mode_projects": "grid",
        "display_mode_project_files": "grid",
        "display_mode_project_time": "list",
        "display_mode_invoices": "grid",
... (239 líneas más)
```

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
        "created_on": 1430164633,
        "created_by_id": 1,
        "updated_on": 1430164634,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "John",
        "last_name": "Doe",
        "display_name": "John Doe",
        "short_display_name": "John D.",
        "email": "first@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164634",
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

Once invitation is accepted, it is released:

**`GET /accept-invitation`** → HTTP 404

Parámetros de query:
```json
{
    "user_id": 2,
    "code": "$invitation_code"
}
```
