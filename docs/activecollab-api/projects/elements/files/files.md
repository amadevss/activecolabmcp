# Files

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/files/files.html

To add a file to a project, first we need to upload it:

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
        "code": "4N6RJUa0v9kNCrDYNxwgZ6vba8BxktfI1aHk9RYA",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FAS5i3kyuNDrRY7ZuAM9lrFh1vw6JDCI5kBbbLAwo&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

Now that we have uploaded a file, and got file's code, lets add it to the project:

**`POST /projects/1/files`** → HTTP 200

Payload:
```json
{
    "uploaded_file_code": "4N6RJUa0v9kNCrDYNxwgZ6vba8BxktfI1aHk9RYA",
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "File",
        "url_path": "\/projects\/1\/files\/1",
        "name": "ac.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FAS5i3kyuNDrRY7ZuAM9lrFh1vw6JDCI5kBbbLAwo&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164134,
        "created_by_id": 1,
        "updated_on": 1430164134,
        "updated_by_id": 1
    }
}
```

Lets check if we got everything uploaded properly:

**`GET /projects/1/files/1/download`** → HTTP 200

Respuesta:
```json
(contenido binario omitido: el endpoint devuelve un archivo)
```

There is also a way to upload a batch of files. First, lets upload them:

**`POST /upload-files`** → HTTP 200

Archivos:
```json
[
    [
        "ac.png",
        "image\/png"
    ],
    [
        "profile.png",
        "image\/png"
    ],
    [
        "sketch.png",
        "image\/png"
    ]
]
```

Respuesta:
```json
[
    {
        "code": "wMRRbvIbm9FllQmfvLPAlHzMAbB7GMris0kO9SPk",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Fs41bOyN4v2gGvAPsGQnzE0okb6PyJfL30B4NZGFk&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    },
    {
        "code": "OwmXxivAFZ0EKPVtFPeo2s9cxHXzsPdP21c0kCEA",
        "name": "profile.png",
        "mime_type": "image\/png",
        "size": 68914,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FQkv22I8liMMuia7IcxEJ0VRqU26RJJ2oUmfKUcV4&original_file_name=profile.png&width=--WIDTH--&height=--HEIGHT--&ver=68914&scale=--SCALE--"
    },
    {
        "code": "WmPFHVbqimdknRpnEVRrShMTr1uY5K6PXJkttlKB",
        "name": "sketch.png",
        "mime_type": "image\/png",
        "size": 616656,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F9JeS3Kx2OLS8IUufGUxkXcbNeYGDX8BvbjnMGeqh&original_file_name=sketch.png&width=--WIDTH--&height=--HEIGHT--&ver=616656&scale=--SCALE--"
    }
]
```

Now that we have uploaded files and have their codes, we can add them by sending a POST request to `/projects/:project_id/files/batch` path:

**`POST /projects/1/files/batch`** → HTTP 200

Payload:
```json
{
    "file_1": "wMRRbvIbm9FllQmfvLPAlHzMAbB7GMris0kO9SPk",
    "file_2": "OwmXxivAFZ0EKPVtFPeo2s9cxHXzsPdP21c0kCEA",
    "file_3": "WmPFHVbqimdknRpnEVRrShMTr1uY5K6PXJkttlKB",
    "is_hidden_from_clients": true
}
```

Respuesta:
```json
[
    {
        "id": 2,
        "class": "File",
        "url_path": "\/projects\/1\/files\/2",
        "name": "ac-1.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/2\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Fs41bOyN4v2gGvAPsGQnzE0okb6PyJfL30B4NZGFk&original_file_name=ac-1.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164135,
        "created_by_id": 1,
        "updated_on": 1430164135,
        "updated_by_id": 1
    },
    {
        "id": 3,
... (53 líneas más)
```

Lets check project files listing now:

**`GET /projects/1/files`** → HTTP 200

Respuesta:
```json
{
    "files": [
        {
            "id": 4,
            "class": "File",
            "url_path": "\/projects\/1\/files\/4",
            "name": "sketch.png",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": true,
            "mime_type": "image\/png",
            "size": 616656,
            "md5": null,
            "download_url": "http:\/\/feather.dev\/projects\/1\/files\/4\/download",
            "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F9JeS3Kx2OLS8IUufGUxkXcbNeYGDX8BvbjnMGeqh&original_file_name=sketch.png&width=--WIDTH--&height=--HEIGHT--&ver=616656&scale=--SCALE--",
            "file_meta": {
                "kind": "image",
                "dimensions": {
                    "width": 1800,
                    "height": 400
                }
            },
            "created_on": 1430164135,
            "created_by_id": 1,
            "updated_on": 1430164135,
            "updated_by_id": 1
        },
        {
... (83 líneas más)
```

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
        "code": "KiX0qxzqvDMAqCApHv7MrbDEPhTCPGcXsbdQAua5",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FazXr4uAVM5dXLyiLBa9dveX2af7Re7f3n0lOTYHX&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

and attach it to a task:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "attach_uploaded_files": [
        "KiX0qxzqvDMAqCApHv7MrbDEPhTCPGcXsbdQAua5"
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
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FazXr4uAVM5dXLyiLBa9dveX2af7Re7f3n0lOTYHX&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
            }
        ],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "body": "",
        "body_formatted": "",
... (25 líneas más)
```

Now when we try to load project files, we will see that attachment that we just uploaded is listed:

**`GET /projects/1/files`** → HTTP 200

Respuesta:
```json
{
    "files": [
        {
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
            "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FazXr4uAVM5dXLyiLBa9dveX2af7Re7f3n0lOTYHX&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
            "file_meta": {
                "kind": "image",
                "dimensions": {
                    "width": 50,
                    "height": 50
                }
            },
            "created_on": 1430164136,
            "created_by_id": 1,
            "disposition": "attachment",
            "project_id": 1,
            "is_hidden_from_clients": true
        },
        {
            "id": 4,
            "class": "File",
... (155 líneas más)
```

System allows update of file's visibility, but other properties are lcoked. If we try to updated them, we will get Bad Request error:

**`PUT /projects/1/files/1`** → HTTP 400

Payload:
```json
{
    "name": "New Name 123"
}
```

But update of visibility flag will work just fine:

**`PUT /projects/1/files/1`** → HTTP 200

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
        "class": "File",
        "url_path": "\/projects\/1\/files\/1",
        "name": "ac.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": true,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FAS5i3kyuNDrRY7ZuAM9lrFh1vw6JDCI5kBbbLAwo&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164134,
        "created_by_id": 1,
        "updated_on": 1430164137,
        "updated_by_id": 1
    }
}
```

Lets move a file to trash:

**`DELETE /projects/1/files/1`** → HTTP 200
