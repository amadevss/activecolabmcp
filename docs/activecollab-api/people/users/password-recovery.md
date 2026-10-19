# Password Recovery

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/password-recovery.html

NOTE: Instructions on this page assume that you are using default authentication provider. If you are using custom authentication provider, double check its documentation to see if password recovery is supported and what bit of information is considered to be user's username.

To initiate password recovery, send POST request to `/password-recovery/send-code` command with valid email address:

**`POST /password-recovery/send-code`** → HTTP 200

Payload:
```json
{
    "username": "member@activecollab.com"
}
```

Respuesta:
```json
{
    "code_sent_to": "member@activecollab.com"
}
```

This works for user's alaternative addresses as well. Note that in that case, password recovery instructions are sent to user's primary email address:

**`POST /password-recovery/send-code`** → HTTP 200

Payload:
```json
{
    "username": "additional-address-for-member@activecollab.com"
}
```

Respuesta:
```json
{
    "code_sent_to": "member@activecollab.com"
}
```

User received an email with a code. Lets reset the password:

**`POST /password-recovery/reset-password`** → HTTP 500

Payload:
```json
{
    "user_id": 2,
    "code": "076f91da733a828adbc2",
    "password": "1234"
}
```

Respuesta:
```json
{
    "type": "Angie\\Authentication\\Error\\ResetPassword",
    "message": "Invalid reset code",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/users\/FwUsers.class.php",
    "line": 1301,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwPasswordRecoveryController.class.php(52): FwUsers::finishPasswordRecovery(2, '076f91da733a828...', '1234')\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwPasswordRecoveryController->reset_password(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('reset_password')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('password-recove...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null
}
```

We'll recevie an error if we try to reset password for an invalid user:

**`POST /password-recovery/reset-password`** → HTTP 500

Payload:
```json
{
    "user_id": 15,
    "code": "076f91da733a828adbc2",
    "password": "1234"
}
```

Respuesta:
```json
{
    "type": "Angie\\Authentication\\Error\\ResetPassword",
    "message": "Account not active",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/users\/FwUsers.class.php",
    "line": 1304,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwPasswordRecoveryController.class.php(52): FwUsers::finishPasswordRecovery(15, '076f91da733a828...', '1234')\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwPasswordRecoveryController->reset_password(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('reset_password')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('password-recove...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null
}
```

or with an invalid code:

**`POST /password-recovery/reset-password`** → HTTP 500

Payload:
```json
{
    "user_id": 2,
    "code": "XYZ",
    "password": "1234"
}
```

Respuesta:
```json
{
    "type": "Angie\\Authentication\\Error\\ResetPassword",
    "message": "Invalid reset code",
    "file": "\/var\/www\/angie.back\/frameworks\/authentication\/models\/users\/FwUsers.class.php",
    "line": 1301,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/authentication\/controllers\/FwPasswordRecoveryController.class.php(52): FwUsers::finishPasswordRecovery(2, 'XYZ', '1234')\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwPasswordRecoveryController->reset_password(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('reset_password')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('password-recove...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null
}
```

NOTE: Reset password error is also thrown if you try to set a password that does not metch system's password requirements. Please check "Password Policy" test for details.

When this tool is triggered for invalid email address (address that is not in the system, or address for an account that has been archived or trashed), system will return Bad Request response:

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
        "created_on": 1430164649,
        "created_by_id": 1,
        "updated_on": 1430164650,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Peter",
        "last_name": "Smith",
        "display_name": "Peter Smith",
        "short_display_name": "Peter S.",
        "email": "member@activecollab.com",
        "additional_email_addresses": [
            "additional-address-for-member@activecollab.com"
        ],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430164650",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
... (3 líneas más)
```

**`POST /password-recovery/send-code`** → HTTP 400

Payload:
```json
{
    "username": "member@activecollab.com"
}
```

**`POST /password-recovery/send-code`** → HTTP 400

Payload:
```json
{
    "username": "unknown-member@activecollab.com"
}
```
