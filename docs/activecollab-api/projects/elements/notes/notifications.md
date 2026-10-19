# Notifications

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/notes/notifications.html

Personas in this Story: Default, member.

First, we'll check default settings for our notifications filter:

**`GET /personalized-config-options?names=notification_new_note,notification_note_name_body_update`** → HTTP 200

Respuesta:
```json
{
    "notification_new_note": true,
    "notification_note_name_body_update": false
}
```

Lets create a new note:

**`POST /projects/1/notes`** → HTTP 200 _(como member)_

Payload:
```json
{
    "name": "Etiam Sit Sem Nullam Consectetur",
    "body": "Donec sed odio dui.",
    "subscribers": [
        1
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Etiam Sit Sem Nullam Consectetur",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Donec sed odio dui.",
        "body_formatted": "Donec sed odio dui.",
        "body_plain_text": "Donec sed odio dui.",
        "created_on": 1430164206,
        "created_by_id": 2,
        "updated_on": 1430164206,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            2
        ]
    },
    "subscribers": [
... (6 líneas más)
```

and we'll see this notification in our notifications stream:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewNoteNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Note",
            "parent_id": 1,
            "created_on": 1430164206,
            "sender_id": 2
        }
    ],
    "related": {
        "Note": {
            "1": {
                "id": 1,
                "class": "Note",
                "url_path": "\/projects\/1\/notes\/1",
                "name": "Etiam Sit Sem Nullam Consectetur",
                "comments_count": 0,
                "attachments": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": false,
                "body": "Donec sed odio dui.",
                "body_formatted": "Donec sed odio dui.",
                "body_plain_text": "Donec sed odio dui.",
                "created_on": 1430164206,
... (15 líneas más)
```

As things work by default, when member updates the note it will not notify the owner because owner has this type of notification turned off:

**`PUT /projects/1/notes/1`** → HTTP 200 _(como member)_

Payload:
```json
{
    "name": "Lorem Euismod Commodo Condimentum",
    "body": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus."
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Lorem Euismod Commodo Condimentum",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
        "body_formatted": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
        "body_plain_text": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
        "created_on": 1430164206,
        "created_by_id": 2,
        "updated_on": 1430164207,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            2
        ]
    },
    "subscribers": [
... (6 líneas más)
```

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewNoteNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Note",
            "parent_id": 1,
            "created_on": 1430164206,
            "sender_id": 2
        }
    ],
    "related": {
        "Note": {
            "1": {
                "id": 1,
                "class": "Note",
                "url_path": "\/projects\/1\/notes\/1",
                "name": "Lorem Euismod Commodo Condimentum",
                "comments_count": 0,
                "attachments": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": false,
                "body": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
                "body_formatted": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
                "body_plain_text": "Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.",
                "created_on": 1430164206,
... (15 líneas más)
```

Users can change this setting at any time:

**`PUT /personalized-config-options`** → HTTP 200

Payload:
```json
{
    "notification_note_name_body_update": true
}
```

Respuesta:
```json
{
    "notification_note_name_body_update": true
}
```

Now, when the note gets updated, owner will recieve a notification about this change:

**`PUT /projects/1/notes/1`** → HTTP 200 _(como member)_

Payload:
```json
{
    "name": "Cras Consectetur Pellentesque Quam Inceptos",
    "body": "Nullam id dolor id nibh ultricies vehicula ut id elit."
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Cras Consectetur Pellentesque Quam Inceptos",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "body_formatted": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "body_plain_text": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "created_on": 1430164206,
        "created_by_id": 2,
        "updated_on": 1430164208,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            2
        ]
    },
    "subscribers": [
... (6 líneas más)
```

Now we received the notification:

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewNoteNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Note",
            "parent_id": 1,
            "created_on": 1430164206,
            "sender_id": 2
        }
    ],
    "related": {
        "Note": {
            "1": {
                "id": 1,
                "class": "Note",
                "url_path": "\/projects\/1\/notes\/1",
                "name": "Cras Consectetur Pellentesque Quam Inceptos",
                "comments_count": 0,
                "attachments": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": false,
                "body": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "body_formatted": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "body_plain_text": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "created_on": 1430164206,
... (15 líneas más)
```

Note that update notification is sent only if note `name` or `body` are changed:

**`PUT /projects/1/notes/1`** → HTTP 200 _(como member)_

Payload:
```json
{
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Cras Consectetur Pellentesque Quam Inceptos",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "body_formatted": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "body_plain_text": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        "created_on": 1430164206,
        "created_by_id": 2,
        "updated_on": 1430164208,
        "updated_by_id": 2,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 0,
        "is_in_collection": false,
        "position": 0,
        "contributor_ids": [
            2
        ]
    },
    "subscribers": [
... (6 líneas más)
```

**`GET /notifications`** → HTTP 200

Respuesta:
```json
{
    "notifications": [
        {
            "id": 2,
            "class": "NewNoteNotification",
            "url_path": "\/notifications\/2",
            "parent_type": "Note",
            "parent_id": 1,
            "created_on": 1430164206,
            "sender_id": 2
        }
    ],
    "related": {
        "Note": {
            "1": {
                "id": 1,
                "class": "Note",
                "url_path": "\/projects\/1\/notes\/1",
                "name": "Cras Consectetur Pellentesque Quam Inceptos",
                "comments_count": 0,
                "attachments": [],
                "is_trashed": false,
                "trashed_on": null,
                "trashed_by_id": 0,
                "project_id": 1,
                "is_hidden_from_clients": true,
                "body": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "body_formatted": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "body_plain_text": "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                "created_on": 1430164206,
... (15 líneas más)
```
