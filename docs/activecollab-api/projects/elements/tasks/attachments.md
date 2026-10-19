# Attachments

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/attachments.html

**`POST /upload-files`** → HTTP 200

Archivos:
```json
[
    [
        "ac.png",
        "image\/png"
    ]
]
```

Respuesta:
```json
[
    {
        "code": "FVz6RyPOo4mwh4NUVxoPLjg0tcHuBQt8AS2ggGVv",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FECHioEl3EL0fLzz7V92nIhpQqN3VE6o7Bxj7Iazj&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

**`POST /projects/1/tasks`** → HTTP 200

Payload:
```json
{
    "name": "Task #1",
    "attach_uploaded_files": [
        "FVz6RyPOo4mwh4NUVxoPLjg0tcHuBQt8AS2ggGVv"
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
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [
            {
                "id": 1,
                "name": "ac.png",
                "mime_type": "image\/png",
                "size": 1927,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FECHioEl3EL0fLzz7V92nIhpQqN3VE6o7Bxj7Iazj&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
            }
        ],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
... (25 líneas más)
```

**`GET /attachments/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Attachment",
        "url_path": "\/attachments\/1",
        "name": "ac.png",
        "parent_type": "Task",
        "parent_id": 1,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": "1e3cd308a17a60b22c61493dcb3af0b0",
        "download_url": "http:\/\/feather.dev\/attachments\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FECHioEl3EL0fLzz7V92nIhpQqN3VE6o7Bxj7Iazj&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164308,
        "created_by_id": 1,
        "disposition": "attachment",
        "project_id": 1,
        "is_hidden_from_clients": false
    },
    "parent": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
... (41 líneas más)
```

Lets download the content:

**`GET /attachments/1/download`** → HTTP 200

Respuesta:
```json
(contenido binario omitido: el endpoint devuelve un archivo)
```

In order to delete an individual attachment, we can send a DELETE request to the attachment URL:

**`DELETE /attachments/1`** → HTTP 200

Here's a confirmation that the attachment was actually deleted:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Task #1",
        "assignee_id": 0,
        "delegated_by_id": 0,
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
        "created_on": 1430164308,
        "created_by_id": 1,
        "updated_on": 1430164309,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```
