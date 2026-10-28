# API Subscriptions

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/api-subscriptions.html

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
        "created_on": 1430164611,
        "created_by_id": 1,
        "updated_on": 1430164611,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164611",
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

List API subscriptions:

**`GET /users/2/api-subscriptions`** → HTTP 200

Respuesta:
```json
[]
```

Create a new subscription:

**`POST /users/2/api-subscriptions`** → HTTP 200

Payload:
```json
{
    "client_vendor": "activeCollab",
    "client_name": "Narrative"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "ApiSubscription",
        "url_path": "\/users\/2\/api-subscriptions\/2",
        "created_on": 1430164612,
        "user_id": 2,
        "client_name": "Narrative",
        "client_vendor": "activeCollab",
        "token": "2-JwEBpVEPmyzxghnvGD07HUEBxBln0NGI0oVD583s",
        "last_used_on": null
    }
}
```

If we try to change any of the subscription properties, system will throw Bad Request error:

**`PUT /users/2/api-subscriptions/2`** → HTTP 404

Payload:
```json
{
    "token": "12"
}
```

Lets delete a subscription:

**`DELETE /users/2/api-subscriptions/2`** → HTTP 200

Confirmation that subscription has been deleted:

**`GET /users/2/api-subscriptions/2`** → HTTP 404
