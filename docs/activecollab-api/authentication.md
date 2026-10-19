# Authentication

> Fuente: https://developers.activecollab.com/api-documentation/v1/authentication.html

Token can be obtained from the ActiveCollab interface, or programmatically, using /issue-token command. To demonstrate, lets create a new user account with a known password:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member@activecollab.com",
    "password": "Easy to remember, hard to guess"
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
        "created_on": 1430163964,
        "created_by_id": 1,
        "updated_on": 1430163964,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430163964",
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

Now, lets issue a token:

**`POST /issue-token`** → HTTP 200

Payload:
```json
{
    "username": "member@activecollab.com",
    "password": "Easy to remember, hard to guess",
    "client_name": "My Awesome App",
    "client_vendor": "ACME Inc"
}
```

Respuesta:
```json
{
    "is_ok": true,
    "token": "2-6zmW8dnKpHqPLwVk2f3LMrTfVxAiJU1DibofeCPt"
}
```

That's it, we just got a token that we can store and reuse to authenticate this user in future requests. In case of error, ActiveCollab will return error dump:

**`POST /issue-token`** → HTTP 500

Payload:
```json
{
    "username": "member@activecollab.com",
    "password": "Invalid Password",
    "client_name": "My Awesome App",
    "client_vendor": "ACME Inc"
}
```

Respuesta:
```json
{
    "type": "ApiSubscriptionError",
    "message": "Invalid password",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/api_subscriptions\/FwApiSubscriptions.class.php",
    "line": 101,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwUserSessionController.class.php(71): FwApiSubscriptions::subscribe('member@activeco...', 'Invalid Passwor...', 'My Awesome App', 'ACME Inc', false)\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwUserSessionController->issue_token(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('issue_token')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('issue-token', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null,
    "code": 3
}
```

**`POST /issue-token`** → HTTP 500

Payload:
```json
{
    "username": "unknown-user@activecollab.com",
    "password": "Easy to remember, hard to guess",
    "client_name": "My Awesome App",
    "client_vendor": "ACME Inc"
}
```

Respuesta:
```json
{
    "type": "ApiSubscriptionError",
    "message": "User does not exist",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/api_subscriptions\/FwApiSubscriptions.class.php",
    "line": 104,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwUserSessionController.class.php(71): FwApiSubscriptions::subscribe('unknown-user@ac...', 'Easy to remembe...', 'My Awesome App', 'ACME Inc', false)\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwUserSessionController->issue_token(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('issue_token')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('issue-token', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null,
    "code": 2
}
```

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
        "created_on": 1430163964,
        "created_by_id": 1,
        "updated_on": 1430163965,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member",
        "last_name": null,
        "display_name": "member",
        "short_display_name": "member",
        "email": "member@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430163965",
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

**`POST /issue-token`** → HTTP 500

Payload:
```json
{
    "username": "member@activecollab.com",
    "password": "Easy to remember, hard to guess",
    "client_name": "My Awesome App",
    "client_vendor": "ACME Inc"
}
```

Respuesta:
```json
{
    "type": "ApiSubscriptionError",
    "message": "User does not exist",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/api_subscriptions\/FwApiSubscriptions.class.php",
    "line": 104,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwUserSessionController.class.php(71): FwApiSubscriptions::subscribe('member@activeco...', 'Easy to remembe...', 'My Awesome App', 'ACME Inc', false)\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwUserSessionController->issue_token(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('issue_token')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('issue-token', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null,
    "code": 2
}
```

Following error codes are provided:

- `0` - Operation failed (general error),
- `1` - Information about client application is not set,
- `2` - User does not exist or not active,
- `3` - Password is not valid,
- `4` - Issue token not allowed for the user.
