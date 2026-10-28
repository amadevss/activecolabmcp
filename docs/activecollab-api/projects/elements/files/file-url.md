# File URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/files/file-url.html

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
        "code": "CJklO2YbqL4h5xPM3nHGvCqrxL0EIvBgFNVwAXMb",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FKfYaMWld3VdtUeRMyzY22sFITFI7Pi6U76vRgyJ2&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    }
]
```

**`POST /projects/1/files`** → HTTP 200

Payload:
```json
{
    "uploaded_file_code": "CJklO2YbqL4h5xPM3nHGvCqrxL0EIvBgFNVwAXMb"
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
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FKfYaMWld3VdtUeRMyzY22sFITFI7Pi6U76vRgyJ2&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164127,
        "created_by_id": 1,
        "updated_on": 1430164127,
        "updated_by_id": 1
    }
}
```

**`GET /projects/1/files/1`** → HTTP 200

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
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 1927,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FKfYaMWld3VdtUeRMyzY22sFITFI7Pi6U76vRgyJ2&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 50,
                "height": 50
            }
        },
        "created_on": 1430164127,
        "created_by_id": 1,
        "updated_on": 1430164127,
        "updated_by_id": 1
    }
}
```

**`GET /projects/2/files/1`** → HTTP 404
