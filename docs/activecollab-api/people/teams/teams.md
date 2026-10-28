# Teams

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/teams/teams.html

Teams are used to group people. By default, activeCollab ships with no teams:

**`GET /teams`** → HTTP 200

Respuesta:
```json
[]
```

To create a team, we should send a POST request to `/teams` path and include team's name and members:

**`POST /teams`** → HTTP 200

Payload:
```json
{
    "name": "Developers",
    "members": [
        1,
        2
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Team",
        "url_path": "\/teams\/1",
        "name": "Developers",
        "members": [
            1,
            2
        ],
        "created_on": 1430164587,
        "created_by_id": 1,
        "updated_on": 1430164587
    }
}
```

To show details of an existing team, simply GET `/teams/:team_id`:

**`GET /teams/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Team",
        "url_path": "\/teams\/1",
        "name": "Developers",
        "members": [
            1,
            2
        ],
        "created_on": 1430164587,
        "created_by_id": 1,
        "updated_on": 1430164587
    }
}
```

This have changed and our CEO (user #1) decided to stop programming and focus more on the business side. Also, we hired a replacement. Lets update the team:

**`PUT /teams/1`** → HTTP 200

Payload:
```json
{
    "members": [
        2,
        3
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Team",
        "url_path": "\/teams\/1",
        "name": "Developers",
        "members": [
            2,
            3
        ],
        "created_on": 1430164587,
        "created_by_id": 1,
        "updated_on": 1430164588
    }
}
```

We no longer need this team, so lets delete it:

**`DELETE /teams/1`** → HTTP 200

Respuesta:
```json
null
```

Note that deleting a team does not delete users:

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
        "created_on": 1430164587,
        "created_by_id": 1,
        "updated_on": 1430164587,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member1",
        "last_name": null,
        "display_name": "member1",
        "short_display_name": "member1",
        "email": "member1@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164587",
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
        "created_on": 1430164587,
        "created_by_id": 1,
        "updated_on": 1430164587,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member2",
        "last_name": null,
        "display_name": "member2",
        "short_display_name": "member2",
        "email": "member2@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164587",
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
