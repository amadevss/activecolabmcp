# Labels

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/labels.html

activeCollab ships with a set of predefined labels. You can fetch the full list of predefined labels by callging `/labels`:

**`GET /labels`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ProjectLabel",
        "url_path": "\/labels\/1",
        "name": "NEW",
        "updated_on": null,
        "color": "#FFFF00",
        "is_default": false,
        "position": 1
    },
    {
        "id": 5,
        "class": "TaskLabel",
        "url_path": "\/labels\/5",
        "name": "NEW",
        "updated_on": null,
        "color": "#00B25C",
        "is_default": false,
        "position": 1,
        "is_global": true
    },
    {
        "id": 2,
        "class": "ProjectLabel",
        "url_path": "\/labels\/2",
        "name": "INPROGRESS",
        "updated_on": null,
        "color": "#00A651",
        "is_default": false,
... (133 líneas más)
```

or you can get labels by type:

**`GET /labels/project-labels`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ProjectLabel",
        "url_path": "\/labels\/1",
        "name": "NEW",
        "updated_on": null,
        "color": "#FFFF00",
        "is_default": false,
        "position": 1
    },
    {
        "id": 2,
        "class": "ProjectLabel",
        "url_path": "\/labels\/2",
        "name": "INPROGRESS",
        "updated_on": null,
        "color": "#00A651",
        "is_default": false,
        "position": 2
    },
    {
        "id": 3,
        "class": "ProjectLabel",
        "url_path": "\/labels\/3",
        "name": "CANCELED",
        "updated_on": null,
        "color": "#FF0000",
        "is_default": false,
        "position": 3
... (12 líneas más)
```

**`GET /labels/task-labels`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 5,
        "class": "TaskLabel",
        "url_path": "\/labels\/5",
        "name": "NEW",
        "updated_on": null,
        "color": "#00B25C",
        "is_default": false,
        "position": 1,
        "is_global": true
    },
    {
        "id": 6,
        "class": "TaskLabel",
        "url_path": "\/labels\/6",
        "name": "CONFIRMED",
        "updated_on": null,
        "color": "#F26522",
        "is_default": false,
        "position": 2,
        "is_global": true
    },
    {
        "id": 7,
        "class": "TaskLabel",
        "url_path": "\/labels\/7",
        "name": "WORKS FOR ME",
        "updated_on": null,
        "color": "#00B25C",
... (93 líneas más)
```
