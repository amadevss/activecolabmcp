# Labels

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/labels.html

activeCollab ships with a couple of predefined project labels:

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

For the sake of this test, lets assume that company who is useding the system does not find these defaults good for their workflow, and that they would like to implement something like this for their projects:

IDEA -> CONFIRMED or CANCELED -> INPROGRESS or PAUSED -> DONE or CANCELED

What we need to do is:

1. Rename a NEW label to IDEA
2. Add CONFRIEMD and DONE labels
3. Reorder labels so they are in the sequence that works for the proposed workflow:

- IDEA (1)
- CONFIRMED (will be 16)
- INPROGRESS (2)
- PAUSED (4)
- DONE (will be 17)
- CANCELED (3)

Lets start by renaming an existing label:

**`PUT /labels/1`** → HTTP 200

Payload:
```json
{
    "name": "Idea"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectLabel",
        "url_path": "\/labels\/1",
        "name": "IDEA",
        "updated_on": 1430164484,
        "color": "#FFFF00",
        "is_default": false,
        "position": 1
    }
}
```

Now, we need to add the new labels:

**`POST /labels`** → HTTP 200

Payload:
```json
{
    "type": "ProjectLabel",
    "name": "Confirmed"
}
```

Respuesta:
```json
{
    "single": {
        "id": 16,
        "class": "ProjectLabel",
        "url_path": "\/labels\/16",
        "name": "CONFIRMED",
        "updated_on": 1430164484,
        "color": null,
        "is_default": false,
        "position": 5
    }
}
```

**`POST /labels`** → HTTP 200

Payload:
```json
{
    "type": "ProjectLabel",
    "name": "Done"
}
```

Respuesta:
```json
{
    "single": {
        "id": 17,
        "class": "ProjectLabel",
        "url_path": "\/labels\/17",
        "name": "DONE",
        "updated_on": 1430164484,
        "color": null,
        "is_default": false,
        "position": 6
    }
}
```

Finally, lets reorder the labels:

**`PUT /labels/reorder`** → HTTP 200

Payload:
```json
[
    1,
    16,
    2,
    3,
    17,
    3
]
```

Respuesta:
```json
[
    1,
    16,
    2,
    3,
    17,
    3
]
```

**`GET /labels/project-labels`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ProjectLabel",
        "url_path": "\/labels\/1",
        "name": "IDEA",
        "updated_on": 1430164484,
        "color": "#FFFF00",
        "is_default": false,
        "position": 1
    },
    {
        "id": 16,
        "class": "ProjectLabel",
        "url_path": "\/labels\/16",
        "name": "CONFIRMED",
        "updated_on": 1430164484,
        "color": null,
        "is_default": false,
        "position": 2
    },
    {
        "id": 2,
        "class": "ProjectLabel",
        "url_path": "\/labels\/2",
        "name": "INPROGRESS",
        "updated_on": 1430164484,
        "color": "#00A651",
        "is_default": false,
        "position": 3
... (32 líneas más)
```

If we ever wish to drop a label, we can simply send a DELETE request to labels URL:

**`DELETE /labels/3`** → HTTP 200
