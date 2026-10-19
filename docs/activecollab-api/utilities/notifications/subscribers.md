# Subscribers

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/notifications/subscribers.html

When we were preparing this article, we have added two members (there is an owner in the database already):

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
        "created_on": 1430164943,
        "created_by_id": 1,
        "updated_on": 1430164943,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164943",
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

and created a project:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164945,
        "created_by_id": 1,
        "updated_on": 1430164945,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (11 líneas más)
```

To start, we'll create a task and make sure that we subscribe everyone, as well as a couple of anonynous users (people who don't have an account in your activeCollab, but still need to be kept in the loop):

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "assignee_id": 2,
    "subscribers": [
        3,
        [
            "Someone Anonymous",
            "anon1@activecollab.com"
        ],
        "anon2@activecollab.com"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
        "assignee_id": 2,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164946,
        "created_by_id": 1,
        "updated_on": 1430164946,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (26 líneas más)
```

We can also load subscriptions of any object without loading the full object:

**`GET /subscribers/task/1`** → HTTP 200

Respuesta:
```json
[
    [
        "Someone Anonymous",
        "anon1@activecollab.com"
    ],
    [
        "anon2",
        "anon2@activecollab.com"
    ],
    1,
    2,
    3
]
```

Lets add more subscribers (payload key is ignored, value is all that matters):

**`POST /subscribers/task/1`** → HTTP 200

Payload:
```json
{
    "s1": "anon3@activecollab.com",
    "s2": [
        "Another Anonymous",
        "anon4@activecollab.com"
    ]
}
```

Respuesta:
```json
[
    [
        "Someone Anonymous",
        "anon1@activecollab.com"
    ],
    [
        "anon2",
        "anon2@activecollab.com"
    ],
    1,
    2,
    3,
    [
        "anon3",
        "anon3@activecollab.com"
    ],
    [
        "Another Anonymous",
        "anon4@activecollab.com"
    ]
]
```

We don't like how this list turned out. Lets replace the whole set just with task assignee, person who delegated the task and a client who requested the task to be done:

**`PUT /subscribers/task/1`** → HTTP 200

Payload:
```json
{
    "s1": 1,
    "s2": 2,
    "s3": [
        "Someone Anonymous",
        "anon1@activecollab.com"
    ]
}
```

Respuesta:
```json
[
    1,
    2,
    [
        "Someone Anonymous",
        "anon1@activecollab.com"
    ]
]
```

To clear subscribers, we should send DELETE command:

**`DELETE /subscribers/task/1`** → HTTP 200

Respuesta:
```json
[]
```

Known users (with user accounts) can also be subscribed and unsubscribed individually:

**`POST /subscribers/task/1/users/1`** → HTTP 200

Respuesta:
```json
[
    1
]
```

**`POST /subscribers/task/1/users/2`** → HTTP 200

Respuesta:
```json
[
    1,
    2
]
```

**`DELETE /subscribers/task/1/users/1`** → HTTP 200

Respuesta:
```json
[
    2
]
```
