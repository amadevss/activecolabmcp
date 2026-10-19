# Days Off

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/days-off.html

System starts with no off days defined:

**`GET /day-offs`** → HTTP 200

Respuesta:
```json
[]
```

But we can add single or multi day events:

**`POST /day-offs`** → HTTP 200

Payload:
```json
{
    "name": "Christmas",
    "start_date": "2014-12-25",
    "end_date": "2014-12-25",
    "repeat_yearly": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "DayOff",
        "url_path": "\/day-offs\/1",
        "name": "Christmas",
        "start_date": 1419465600,
        "end_date": 1419465600,
        "is_multi_day": false,
        "repeat_yearly": true
    }
}
```

**`POST /day-offs`** → HTTP 200

Payload:
```json
{
    "name": "My 1st",
    "start_date": "2014-05-01",
    "end_date": "2014-05-03",
    "repeat_yearly": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "DayOff",
        "url_path": "\/day-offs\/2",
        "name": "My 1st",
        "start_date": 1398902400,
        "end_date": 1399075200,
        "is_multi_day": true,
        "repeat_yearly": true
    }
}
```

To update a record, simply send a PUT request, like we did in case of the spelling error for the second event that we added:

**`PUT /day-offs/2`** → HTTP 200

Payload:
```json
{
    "name": "May 1st"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "DayOff",
        "url_path": "\/day-offs\/2",
        "name": "May 1st",
        "start_date": 1398902400,
        "end_date": 1399075200,
        "is_multi_day": true,
        "repeat_yearly": true
    }
}
```

Now we can check `/day-offs` collection:

**`GET /day-offs`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "DayOff",
        "url_path": "\/day-offs\/2",
        "name": "May 1st",
        "start_date": 1398902400,
        "end_date": 1399075200,
        "is_multi_day": true,
        "repeat_yearly": true
    },
    {
        "id": 1,
        "class": "DayOff",
        "url_path": "\/day-offs\/1",
        "name": "Christmas",
        "start_date": 1419465600,
        "end_date": 1419465600,
        "is_multi_day": false,
        "repeat_yearly": true
    }
]
```

Dropping records is easy - just send a DELETE request:

**`DELETE /day-offs/2`** → HTTP 200
