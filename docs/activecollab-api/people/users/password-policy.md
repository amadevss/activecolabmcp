# Password Policy

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/password-policy.html

Lets check the defaults:

**`GET /config-options?names=password_policy_min_length,password_policy_require_numbers,password_policy_require_mixed_case,password_policy_require_symbols`** → HTTP 200

Respuesta:
```json
{
    "password_policy_min_length": 0,
    "password_policy_require_numbers": false,
    "password_policy_require_mixed_case": false,
    "password_policy_require_symbols": false
}
```

This means that there are no password requirements set by default. If we try to create a new user account, even the shortest of passwords will work:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member1@activecollab.com",
    "password": "a",
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
        "created_on": 1430164641,
        "created_by_id": 1,
        "updated_on": 1430164641,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member1",
        "last_name": null,
        "display_name": "member1",
        "short_display_name": "member1",
        "email": "member1@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164641",
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

Lets dial up requirements a bit:

Now if we try to create a new user account with the similar request as the previous one, we'll get an error:

**`POST /users`** → HTTP 500

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "a",
    "company_id": 1
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "password": [
            "Password is too short",
            "Password requires at least one number",
            "Password requires at least one lower case and at least one upper case letter",
            "Password requires that you use at least one symbol"
        ]
    },
    "object_class": "Member",
    "object_fields": {
        "id": null,
        "type": "Member",
        "language_id": 0,
        "first_name": null,
        "last_name": null,
        "email": "member2@activecollab.com",
        "password": "Mc1XrCKVlSBXd6igzYxznV\/PM9zTAu8nlO72FCwhHUMTytGARxUWrQ==",
        "password_hashed_with": "pbkdf2",
        "password_reset_key": null,
        "password_reset_on": null,
        "avatar_location": "",
        "created_on": 1430164642,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164642,
        "updated_by_id": 1,
... (18 líneas más)
```

Lets see if we can correct the password until system lets us create a new account. First, lets correct the password lenght:

**`POST /users`** → HTTP 500

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "aaaaaaaaaa",
    "company_id": 1
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "password": [
            "Password requires at least one number",
            "Password requires at least one lower case and at least one upper case letter",
            "Password requires that you use at least one symbol"
        ]
    },
    "object_class": "Member",
    "object_fields": {
        "id": null,
        "type": "Member",
        "language_id": 0,
        "first_name": null,
        "last_name": null,
        "email": "member2@activecollab.com",
        "password": "ArlJftbIJvMU2vUBHMXD3DIZJKiaNPOASlR+XRnq99rwfxwCD5qtRw==",
        "password_hashed_with": "pbkdf2",
        "password_reset_key": null,
        "password_reset_on": null,
        "avatar_location": "",
        "created_on": 1430164642,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164642,
        "updated_by_id": 1,
        "updated_by_name": "ilija.studen",
... (17 líneas más)
```

Than lets add a couple of numbers:

**`POST /users`** → HTTP 500

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "a3a5aaa9aa",
    "company_id": 1
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "password": [
            "Password requires at least one lower case and at least one upper case letter",
            "Password requires that you use at least one symbol"
        ]
    },
    "object_class": "Member",
    "object_fields": {
        "id": null,
        "type": "Member",
        "language_id": 0,
        "first_name": null,
        "last_name": null,
        "email": "member2@activecollab.com",
        "password": "a0fl52WvFWq6QlRPaqc69yloRl3zliNNkJuHZDuMcEj9j7m+nEUtJw==",
        "password_hashed_with": "pbkdf2",
        "password_reset_key": null,
        "password_reset_on": null,
        "avatar_location": "",
        "created_on": 1430164642,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164642,
        "updated_by_id": 1,
        "updated_by_name": "ilija.studen",
        "updated_by_email": "ilija.studen@activecollab.com",
... (16 líneas más)
```

Mix case a bit:

**`POST /users`** → HTTP 500

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "A3a5aaA9aa",
    "company_id": 1
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "password": [
            "Password requires that you use at least one symbol"
        ]
    },
    "object_class": "Member",
    "object_fields": {
        "id": null,
        "type": "Member",
        "language_id": 0,
        "first_name": null,
        "last_name": null,
        "email": "member2@activecollab.com",
        "password": "BNYNbhHWBmAgv9ijEvptSGES8l855Q9D\/BQkfjzx4eCa9FTyQDyIVg==",
        "password_hashed_with": "pbkdf2",
        "password_reset_key": null,
        "password_reset_on": null,
        "avatar_location": "",
        "created_on": 1430164642,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164642,
        "updated_by_id": 1,
        "updated_by_name": "ilija.studen",
        "updated_by_email": "ilija.studen@activecollab.com",
        "is_archived": false,
... (15 líneas más)
```

And finally add some symbols:

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "member2@activecollab.com",
    "password": "A3:5aaA9a?",
    "company_id": 1
}
```

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
        "created_on": 1430164642,
        "created_by_id": 1,
        "updated_on": 1430164642,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member2",
        "last_name": null,
        "display_name": "member2",
        "short_display_name": "member2",
        "email": "member2@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430164642",
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

Password policy is enforced for password reset as well:

**`POST /password-recovery/send-code`** → HTTP 200

Payload:
```json
{
    "username": "member2@activecollab.com"
}
```

Respuesta:
```json
{
    "code_sent_to": "member2@activecollab.com"
}
```

User received an email with a code. Lets reset the password:

**`POST /password-recovery/reset-password`** → HTTP 500

Payload:
```json
{
    "user_id": 3,
    "code": "076f91da733a828adbc2",
    "password": "a"
}
```

Respuesta:
```json
{
    "type": "Angie\\Authentication\\Error\\ResetPassword",
    "message": "Invalid reset code",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/users\/FwUsers.class.php",
    "line": 1301,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwPasswordRecoveryController.class.php(52): FwUsers::finishPasswordRecovery(3, '076f91da733a828...', 'a')\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwPasswordRecoveryController->reset_password(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('reset_password')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('password-recove...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null
}
```

Notice that in this case, we got information about invalid password set as a reason of reset password error.

Lets try again:

**`POST /password-recovery/reset-password`** → HTTP 500

Payload:
```json
{
    "user_id": 3,
    "code": "076f91da733a828adbc2",
    "password": "A3:5aaA9a?"
}
```

Respuesta:
```json
{
    "type": "Angie\\Authentication\\Error\\ResetPassword",
    "message": "Invalid reset code",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/users\/FwUsers.class.php",
    "line": 1301,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwPasswordRecoveryController.class.php(52): FwUsers::finishPasswordRecovery(3, '076f91da733a828...', 'A3:5aaA9a?')\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwPasswordRecoveryController->reset_password(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('reset_password')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('password-recove...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null
}
```
