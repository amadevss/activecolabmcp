# Move and Copy Files

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/files/move-and-copy-files.html

Files can be copied and moved between projects, just like tasks and dicussions. To test this, we created two projects ("Source Project" and "Target Project") and added one file to the Source Project:

**`GET /projects/1/files`** → HTTP 200

Respuesta:
```json
{
    "files": [
        {
            "id": 1,
            "class": "File",
            "url_path": "\/projects\/1\/files\/1",
            "name": "ac.png",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "project_id": 1,
            "is_hidden_from_clients": false,
            "mime_type": "image\/png",
            "size": 1927,
            "md5": null,
            "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
            "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Fq3ayvSYhKIKbx9hW1BIk7iuC7Q66McU36VqpCdwc&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
            "file_meta": {
                "kind": "image",
                "dimensions": {
                    "width": 50,
                    "height": 50
                }
            },
            "created_on": 1430164145,
            "created_by_id": 1,
            "updated_on": 1430164145,
            "updated_by_id": 1
        }
    ],
... (2 líneas más)
```

Lets create a copy of that file in the source project (basically, we are duplicating a file):

**`PUT /projects/1/files/1/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 1,
    "copy": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "File",
        "url_path": "\/projects\/1\/files\/2",
        "name": "ac-1.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/2\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F5dZilW09bbLMEEHAN3OEm2QJ14wbFt7IidU5cS7b&original_file_name=ac-1.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164145,
        "created_by_id": 1,
        "updated_on": 1430164145,
        "updated_by_id": 1
    }
}
```

Now, lets move the newly created file to the Target Project:

**`PUT /projects/1/files/2/move-to-project`** → HTTP 200

Payload:
```json
{
    "project_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "File",
        "url_path": "\/projects\/2\/files\/2",
        "name": "ac-1.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 2,
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/2\/files\/2\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F5dZilW09bbLMEEHAN3OEm2QJ14wbFt7IidU5cS7b&original_file_name=ac-1.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164145,
        "created_by_id": 1,
        "updated_on": 1430164145,
        "updated_by_id": 1
    }
}
```
