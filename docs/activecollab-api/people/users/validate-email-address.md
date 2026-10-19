# Validate Email Address

> Fuente: https://developers.activecollab.com/api-documentation/v1/people/users/validate-email-address.html

For the purpose of this test, we have created tree use accounts:

1. User #2 with member2@activecollab.com address - Active account
2. User #3 with member3@activecollab.com address - Archived account
3. User #4 with member4@activecollab.com address - Trashed account

To check if a given email address is available for new user accounts (handy when inviting new users), we can use `/users/check-email` command. Response of this command is an object with three fields:

1. valid_address - True if format of the input address is valid,
2. in_use - false when address is not in use. When in use, this can have one of the following `active`, `achived`, `invited` and `trashed`,
3. user_id - ID of an account that is using this address (NULL when there is no such account).

First, lets check for invalid email address:

**`GET /users/check-email?email=invalid-address`** → HTTP 200

Respuesta:
```json
{
    "valid_address": false,
    "in_use": false,
    "user_id": null
}
```

Good. Lets check for an active user account:

**`GET /users/check-email?email=member2@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": "active",
    "user_id": 2
}
```

via additional address:

**`GET /users/check-email?email=additional-address-for-member2@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": "active",
    "user_id": 2
}
```

Invite user:

**`GET /users/check-email?email=member3@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": "invited",
    "user_id": 3
}
```

Now lets check an archived user account:

**`GET /users/check-email?email=member4@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": "archived",
    "user_id": 4
}
```

And trashed account:

**`GET /users/check-email?email=member5@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": "trashed",
    "user_id": 5
}
```

Finally, lets check for an address that is not in use:

**`GET /users/check-email?email=not-in-use@activecollab.com`** → HTTP 200

Respuesta:
```json
{
    "valid_address": true,
    "in_use": false,
    "user_id": null
}
```
