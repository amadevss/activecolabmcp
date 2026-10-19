# Team Members

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/teams/team-members.html

ActiveCollab offers several API commands for team member management. To demonstrate these commands, we invited two members

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
        "created_on": 1430164577,
        "created_by_id": 1,
        "updated_on": 1430164577,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164577",
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

and created one team, which is empty at the moment:

**`GET /teams/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Team",
        "url_path": "\/teams\/1",
        "name": "Developers",
        "members": [],
        "created_on": 1430164580,
        "created_by_id": 1,
        "updated_on": 1430164580
    }
}
```

**`GET /teams/1/members`** → HTTP 200

Respuesta:
```json
[]
```

To add members, simply send POST request to /teams/:team_id/members:

**`POST /teams/1/members`** → HTTP 200

Payload:
```json
[
    1,
    2,
    3
]
```

Respuesta:
```json
[
    1,
    2,
    3
]
```

Members can be removed with DELETE command:

**`DELETE /teams/1/members/2`** → HTTP 200

**`GET /teams/1/members`** → HTTP 200

Respuesta:
```json
[
    1,
    3
]
```
