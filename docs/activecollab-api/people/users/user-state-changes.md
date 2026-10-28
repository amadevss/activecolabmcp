# User State Changes

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/user-state-changes.html

In activeCollab, objects usually have one of the three states:

1. Active - object is active and relevant,
2. Archived - we have done working with a particular object and system will try to keep it off sight as much as possible,
3. Trashed - object has been moved to Trash. Users can restore it from Trash if needed within 30 days from the time when it was moved to Trash.

> **Nota:** Some objects get archived automatically, and some need to be explicetly moved to archive by the user. For example, projects, task lists and tasks get archived when you complete them, but users, companies, job types etc don't.

## Working with Archive

All objects start as active, and than can be moved to trash or archive. Lets see how this work on an example of a person who temporaly left our company:

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164682,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Peter",
        "last_name": "Smith",
        "display_name": "Peter Smith",
        "short_display_name": "Peter S.",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164682",
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

Peter left to take care of a family matter, so we don't want to remove his account completely. Instead, we'll move it to archive to release the seat for his replacement. This is easily done by sending a PUT request to `/move-to-archive` path:

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164682,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Peter",
        "last_name": "Smith",
        "display_name": "Peter Smith",
        "short_display_name": "Peter S.",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164682",
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

A couple of months later, Peter is back. Lets restore his account from archive so he can continue where he left off by sending PUT request to `/restore-from-archive` path:

**`PUT /restore-from-archive/user/2`** → HTTP 200

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164683,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Peter",
        "last_name": "Smith",
        "display_name": "Peter Smith",
        "short_display_name": "Peter S.",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164683",
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

## Working with Trash

Today we accidentally create an account for someone who should not get invited:

**`GET /users/3`** → HTTP 200

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164682,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Accidentally-added-user",
        "last_name": null,
        "display_name": "accidentally-added-user",
        "short_display_name": "accidentally-added-user",
        "email": "accidentally-added-user@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164682",
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

To move this account to trash, we need to send a PUT request to `/move-to-trash` path:

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
        "trashed_on": 1430164683,
        "trashed_by_id": 1,
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164683,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Accidentally-added-user",
        "last_name": null,
        "display_name": "accidentally-added-user",
        "short_display_name": "accidentally-added-user",
        "email": "accidentally-added-user@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164683",
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

If we leave this account in Trash for 30 days, it will get automatically deleted by activeCollab. Still, we can restore it any time in that time frame by sending a PUT request to `/restore-from-trash` command:

**`PUT /restore-from-trash/user/3`** → HTTP 200

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164683,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Accidentally-added-user",
        "last_name": null,
        "display_name": "accidentally-added-user",
        "short_display_name": "accidentally-added-user",
        "email": "accidentally-added-user@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164683",
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

## Reactivation

There is a special command that will make sure that object is active, regardless of its current state (you don't need to check if the object is trashed, or archived, or archived and than trashed). To fully reactivate an object, send PUT request to `/reactivate` path:

**`PUT /reactivate/user/3`** → HTTP 200

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
        "created_on": 1430164682,
        "created_by_id": 1,
        "updated_on": 1430164683,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Accidentally-added-user",
        "last_name": null,
        "display_name": "accidentally-added-user",
        "short_display_name": "accidentally-added-user",
        "email": "accidentally-added-user@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164683",
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
