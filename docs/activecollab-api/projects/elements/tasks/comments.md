# Comments

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/comments.html

Lets create a comment:

**`POST /comments/task/1`** → HTTP 200

Payload:
```json
{
    "body": "Comment body",
    "attach_uploaded_files": [
        "mmFavHAGsIrXiB5gDElxk5bIPdf1tIeFUKFfh7Lz"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [
            {
                "id": 1,
                "name": "ac.png",
                "mime_type": "image\/png",
                "size": 1927,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FUTdyizn8f8TpZjbAlWhWELjh9bLf6QSPyWcHkpDp&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
            }
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Comment body",
        "body_formatted": "Comment body",
        "body_plain_text": "Comment body",
        "created_on": 1430164317,
        "created_by_id": 1,
        "updated_on": 1430164317,
        "updated_by_id": 1
    }
}
```

To update a comment, we should send a PUT request to `/comments/:parent_type/:parent_id/:comment_id` URL:

**`PUT /comments/1`** → HTTP 200

Payload:
```json
{
    "body": "Updated body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [
            {
                "id": 1,
                "name": "ac.png",
                "mime_type": "image\/png",
                "size": 1927,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FUTdyizn8f8TpZjbAlWhWELjh9bLf6QSPyWcHkpDp&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
            }
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Updated body",
        "body_formatted": "Updated body",
        "body_plain_text": "Updated body",
        "created_on": 1430164317,
        "created_by_id": 1,
        "updated_on": 1430164317,
        "updated_by_id": 1
    }
}
```

Lets move the comment to trash:

**`DELETE /comments/1`** → HTTP 404
