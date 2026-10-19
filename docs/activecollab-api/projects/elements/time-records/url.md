# URL

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/time-records/url.html

**`POST /projects/1/time-records`** → HTTP 200

Payload:
```json
{
    "value": 1.5,
    "user_id": 1,
    "job_type_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 0
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 1.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164454,
        "created_by_id": 1,
        "updated_on": 1430164454,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`GET /projects/1/time-records/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TimeRecord",
        "url_path": "\/projects\/1\/time-records\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 1.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164454,
        "created_by_id": 1,
        "updated_on": 1430164454,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

**`GET /projects/2/time-records/1`** → HTTP 404
