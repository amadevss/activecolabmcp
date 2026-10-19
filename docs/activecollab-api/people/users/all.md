# All

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/all.html

All command is useful when you want to get all users, including archived and trashed ones. Here we have three users:

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
        "created_on": 1430164616,
        "created_by_id": 1,
        "updated_on": 1430164616,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164616",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (59 líneas más)
```

We'll move second to archive and third to Trash:

**`PUT /move-to-archive/user/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": true,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164618,
        "created_by_id": 1,
        "updated_on": 1430164619,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member1",
        "last_name": null,
        "display_name": "member1",
        "short_display_name": "member1",
        "email": "member1@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164619",
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

**`PUT /move-to-trash/user/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Member",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": true,
        "trashed_on": 1430164619,
        "trashed_by_id": 1,
        "created_on": 1430164618,
        "created_by_id": 1,
        "updated_on": 1430164619,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member2",
        "last_name": null,
        "display_name": "member2",
        "short_display_name": "member2",
        "email": "member2@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164619",
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

Now when we list users, we'll get only active user:

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
        "created_on": 1430164616,
        "created_by_id": 1,
        "updated_on": 1430164616,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164616",
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

To list all users, including archived and trashed ones, call /users/all:

**`GET /users/all`** → HTTP 200

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
        "created_on": 1430164616,
        "created_by_id": 1,
        "updated_on": 1430164616,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164616",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (59 líneas más)
```
