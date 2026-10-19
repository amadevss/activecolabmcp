# Search Files

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/files/search-files.html

For the purpose of this test, we have created one project:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164151,
        "created_by_id": 1,
        "updated_on": 1430164151,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-UgAqhEL@mail.manageprojects.com",
... (15 líneas más)
```

To add a file to a project, first we need to upload it:

**`POST /upload-files`** → HTTP 200

Archivos:
```json
[
    [
        "durmitor.txt",
        "text\/plain"
    ]
]
```

Respuesta:
```json
[
    {
        "code": "hyRNP6NAz2yrRN4phgk2k2WoyvXApK0x0QNKNc0D",
        "name": "durmitor.txt",
        "mime_type": "text\/plain",
        "size": 95,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Fla2OEFvpGnLjFqnaVFn041oLJEo6UdR6eHJIc6YI&original_file_name=durmitor.txt&width=--WIDTH--&height=--HEIGHT--&ver=95&scale=--SCALE--"
    }
]
```

If we try to search for a term that is in the file now, we will receive 0 records, because file is not yet added to the project:

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
```

But, when we add the file to the project:

**`POST /projects/1/files`** → HTTP 200

Payload:
```json
{
    "uploaded_file_code": "hyRNP6NAz2yrRN4phgk2k2WoyvXApK0x0QNKNc0D"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "File",
        "url_path": "\/projects\/1\/files\/1",
        "name": "durmitor.txt",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "mime_type": "text\/plain",
        "size": 95,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2Fla2OEFvpGnLjFqnaVFn041oLJEo6UdR6eHJIc6YI&original_file_name=durmitor.txt&width=--WIDTH--&height=--HEIGHT--&ver=95&scale=--SCALE--",
        "file_meta": {
            "kind": "other"
        },
        "created_on": 1430164152,
        "created_by_id": 1,
        "updated_on": 1430164152,
        "updated_by_id": 1
    }
}
```

Search will be able to find it:

**`GET /search?q=Kosanica`** → HTTP 200

Respuesta:
```json
[]
```
