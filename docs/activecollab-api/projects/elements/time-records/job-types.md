# Job Types

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/time-records/job-types.html

Not all work is the same, and cost the same. To address this, ActiveCollab has a concept of job type. Each tracked time records need to have a job type specified, and differnet job types can have different hourly rates (defined globally, per client and per project). By default, ActiveCollab ships with only one job type:

**`GET /job-types`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "JobType",
        "url_path": "\/job-types\/1",
        "name": "General",
        "is_archived": false,
        "updated_on": null,
        "is_default": true,
        "default_hourly_rate": 100
    }
]
```

Our example company is web development consultancy, so we'll rename this job type:

**`PUT /job-types/1`** → HTTP 200

Payload:
```json
{
    "name": "Programming",
    "default_hourly_rate": 150
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "JobType",
        "url_path": "\/job-types\/1",
        "name": "Programming",
        "is_archived": false,
        "updated_on": 1430164435,
        "is_default": true,
        "default_hourly_rate": 150
    }
}
```

and add a couple more:

**`POST /job-types`** → HTTP 200

Payload:
```json
{
    "name": "Design",
    "default_hourly_rate": 120
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "JobType",
        "url_path": "\/job-types\/2",
        "name": "Design",
        "is_archived": false,
        "updated_on": 1430164435,
        "is_default": false,
        "default_hourly_rate": 120
    }
}
```

**`POST /job-types`** → HTTP 200

Payload:
```json
{
    "name": "SEO",
    "default_hourly_rate": 100
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "JobType",
        "url_path": "\/job-types\/3",
        "name": "SEO",
        "is_archived": false,
        "updated_on": 1430164436,
        "is_default": false,
        "default_hourly_rate": 100
    }
}
```

**`POST /job-types`** → HTTP 200

Payload:
```json
{
    "name": "DTP",
    "default_hourly_rate": 150
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "JobType",
        "url_path": "\/job-types\/4",
        "name": "DTP",
        "is_archived": false,
        "updated_on": 1430164436,
        "is_default": false,
        "default_hourly_rate": 150
    }
}
```

## Archived Job Types

Our example company recently got out of production of printed material, so we need to archive DTP job type. It's easy as:

**`PUT /move-to-archive/job-type/4`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "JobType",
        "url_path": "\/job-types\/4",
        "name": "DTP",
        "is_archived": true,
        "updated_on": 1430164436,
        "is_default": false,
        "default_hourly_rate": 150
    }
}
```

Archived job types are saved for the reference and can't be used for new time records:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Test Project",
    "is_tracking_enabled": true
}
```

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
        "created_on": 1430164436,
        "created_by_id": 1,
        "updated_on": 1430164436,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-P4YZZIo@mail.manageprojects.com",
... (18 líneas más)
```

**`POST /projects/1/time-records`** → HTTP 500

Payload:
```json
{
    "value": 1.5,
    "user_id": 1,
    "job_type_id": 4,
    "record_date": "2014-05-14",
    "billable_status": 0
}
```

Respuesta:
```json
{
    "message": "Validation failed",
    "type": "ValidationErrors",
    "field_errors": {
        "job_type_id": [
            "Archived job types cannot be used for new time records"
        ]
    },
    "object_class": "TimeRecord",
    "object_fields": {
        "id": null,
        "parent_type": "Project",
        "parent_id": 1,
        "invoice_item_id": 0,
        "job_type_id": 4,
        "record_date": 1400025600,
        "value": 1.5,
        "user_id": 1,
        "user_name": null,
        "user_email": null,
        "summary": null,
        "billable_status": 0,
        "created_on": 1430164436,
        "created_by_id": 1,
        "created_by_name": "ilija.studen",
        "created_by_email": "ilija.studen@activecollab.com",
        "updated_on": 1430164436,
        "updated_by_id": 1,
        "updated_by_name": "ilija.studen",
        "updated_by_email": "ilija.studen@activecollab.com",
... (6 líneas más)
```

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
        "created_on": 1430164436,
        "created_by_id": 1,
        "updated_on": 1430164436,
        "updated_by_id": 1,
        "job_type_id": 1
    }
}
```

## Default Job Type

System offers you a way to specify a default job type. This job type is pre-selected by default in time tracking forms (unless user has specified job type in their user profile). When ActiveCollab is installed, first job type is set as default:

**`GET /job-types/default`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "JobType",
        "url_path": "\/job-types\/1",
        "name": "Programming",
        "is_archived": false,
        "updated_on": 1430164435,
        "is_default": true,
        "default_hourly_rate": 150
    }
}
```

Lets make `Design` our default job type:

**`PUT /job-types/default`** → HTTP 200

Payload:
```json
{
    "job_type_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "JobType",
        "url_path": "\/job-types\/2",
        "name": "Design",
        "is_archived": false,
        "updated_on": 1430164435,
        "is_default": true,
        "default_hourly_rate": 120
    }
}
```

Archived job types can't be made default:

**`PUT /job-types/default`** → HTTP 500

Payload:
```json
{
    "job_type_id": 4
}
```

Respuesta:
```json
{
    "type": "InvalidParamError",
    "message": "Archived job types cannot be set as default",
    "file": "\/var\/www\/activecollab.back\/activecollab\/current\/modules\/tracking\/models\/job_types\/JobTypes.class.php",
    "line": 198,
    "trace": "#0 \/var\/www\/activecollab.back\/activecollab\/current\/modules\/tracking\/controllers\/JobTypesController.class.php(109): JobTypes::setDefault(Object(JobType))\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): JobTypesController->set_default(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('set_default')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('job-types\/defau...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null,
    "var_name": "job_type",
    "var_value": {
        "id": 4,
        "class": "JobType",
        "url_path": "\/job-types\/4",
        "name": "DTP",
        "is_archived": true,
        "updated_on": 1430164436,
        "is_default": false,
        "default_hourly_rate": 150
    }
}
```

## Deleting Job Types

Job types that are used by time records can't be deleted. Instead, consider archiving them if you no longer need them:

**`DELETE /job-types/1`** → HTTP 404

Default job type can't be deleted as well:

**`DELETE /job-types/2`** → HTTP 404

Unused job types can be deleted:

**`DELETE /job-types/3`** → HTTP 200
