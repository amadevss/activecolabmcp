# Announce

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/announce.html

Personas in this Story: Default, Member, Client.

ActiveCollab lets owners and technical administrators send out announcements to users. This feature is useful when you need to announce maintenance periods, some important achievements etc.

In order to see how this feature works, we have invited two users - one regular member and one technical administrator (owner has been automatically created when we installed ActiveCollab):

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
        "created_on": 1430164878,
        "created_by_id": 1,
        "updated_on": 1430164878,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164878",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (119 líneas más)
```

When we try to send out an announcement as a member, system will reject our request:

**`POST /announce`** → HTTP 404 _(como Member)_

Payload:
```json
{
    "subject": "Hohoho!",
    "announcement": "We wish you a merry christmas",
    "recipients": "user1@activecollab.com, user2@activecollab.com"
}
```

If we try to make the same request as technical administrator, or as an owner, system will make no objection and it will send out the announcement to the listed people:

**`POST /announce`** → HTTP 500 _(como TechAdministrator)_

Payload:
```json
{
    "subject": "Hohoho!",
    "announcement": "We wish you a Merry Christmas",
    "recipients": "user1@activecollab.com, user2@activecollab.com"
}
```

**`POST /announce`** → HTTP 200

Payload:
```json
{
    "subject": "Hohoho!",
    "announcement": "We wish you a Merry Christmas",
    "recipients": "user1@activecollab.com, user2@activecollab.com"
}
```

Note about recipients: you should send them in standard RFC 822 format. You can send an announcement to up to 100 recipients per request. If you need more than that, please email support@activecollab.com for details.
