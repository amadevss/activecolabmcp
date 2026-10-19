# Templates

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/templates.html

Personas in this Story: Default, Member1, Member2, Client.

To get started, we'll check access permissions. Only members with permissions to create new projects can access and manage project templates:

**`GET /project-templates`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /project-templates`** → HTTP 404 _(como Member1)_

**`GET /project-templates`** → HTTP 200 _(como Member2)_

Respuesta:
```json
[]
```

**`GET /project-templates`** → HTTP 404 _(como Client)_

To create a template, we can send POST request to `/project-templates` resource:

**`POST /project-templates`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectTemplate",
        "url_path": "\/project-templates\/1",
        "name": "",
        "members": [],
        "created_on": 1430164517,
        "created_by_id": 1,
        "updated_on": 1430164517,
        "is_draft": true,
        "is_scheduled": false,
        "count_task_lists": 0,
        "count_tasks": 0,
        "count_subtasks": 0,
        "count_discussions": 0,
        "count_files": 0,
        "count_notes": 0
    }
}
```

Notice that there is no required fields in the previous request. That is because templates without a name are considered to be drafts. If we set a name, this template will no longer be draft:

**`PUT /project-templates/1`** → HTTP 200

Payload:
```json
{
    "name": "Design Project"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectTemplate",
        "url_path": "\/project-templates\/1",
        "name": "Design Project",
        "members": [],
        "created_on": 1430164517,
        "created_by_id": 1,
        "updated_on": 1430164517,
        "is_draft": false,
        "is_scheduled": false,
        "count_task_lists": 0,
        "count_tasks": 0,
        "count_subtasks": 0,
        "count_discussions": 0,
        "count_files": 0,
        "count_notes": 0
    }
}
```

Now, lets add a couple of elements to the template:

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
        "code": "9xWOEe5litQO9KMUtdXGDdW3FMr4i02GUEaZyl8R",
        "name": "ac.png",
        "mime_type": "image\/png",
        "size": 1927,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FgWTlLa8RrK2eQgtqRdzFGO59XUyuEHAqpzB2zyHR&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
    },
    {
        "code": "GoVgSImWMjP9TBpDc7yLslUtAfTyNJ52uaI3muDw",
        "name": "profile.png",
        "mime_type": "image\/png",
        "size": 68914,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F3LPBmyUlBHS6LDXfee9ncYUXsUMQ7IxXjbovz0H2&original_file_name=profile.png&width=--WIDTH--&height=--HEIGHT--&ver=68914&scale=--SCALE--"
    },
    {
        "code": "IHnENRGBKkYwPGjTeihhFZslJcBYyl77SiAu18Vz",
        "name": "sketch.png",
        "mime_type": "image\/png",
        "size": 616656,
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FtiucJKFMF5mXe8fEbZ4OxXFSXdJycwSkQUUppvUi&original_file_name=sketch.png&width=--WIDTH--&height=--HEIGHT--&ver=616656&scale=--SCALE--"
    }
]
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateTaskList",
    "name": "Analyze"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ProjectTemplateTaskList",
        "url_path": "\/project-templates\/1\/elements\/1",
        "name": "Analyze",
        "attachments": [],
        "body": "",
        "body_formatted": "",
        "created_on": 1430164517,
        "updated_on": 1430164517,
        "template_id": 1,
        "position": 0,
        "start_on": 0,
        "due_on": 0
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateTaskList",
    "name": "Design",
    "start_on": 2,
    "due_on": 5,
    "position": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "ProjectTemplateTaskList",
        "url_path": "\/project-templates\/1\/elements\/2",
        "name": "Design",
        "attachments": [],
        "body": "",
        "body_formatted": "",
        "created_on": 1430164518,
        "updated_on": 1430164518,
        "template_id": 1,
        "position": 1,
        "start_on": 2,
        "due_on": 5
    }
}
```

First task template has a couple of interesting properties:

1. It references a task list from the template, so it should be properly connection with a project task list,
2. Assignee ID is set, but we don't have it set as template user. This user should be auto-added to the project nevertheless,
3. It has three labels,
4. It has attachments.

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateTask",
    "name": "Analyze task",
    "labels": [
        "NEW",
        "develop"
    ],
    "task_list_id": 1,
    "assignee_id": 3,
    "due_on": 2,
    "attach_uploaded_files": [
        "9xWOEe5litQO9KMUtdXGDdW3FMr4i02GUEaZyl8R",
        "GoVgSImWMjP9TBpDc7yLslUtAfTyNJ52uaI3muDw"
    ],
    "position": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "ProjectTemplateTask",
        "url_path": "\/project-templates\/1\/elements\/3",
        "name": "Analyze task",
        "labels": [
            {
                "id": 16,
                "name": "develop",
                "color": null,
                "is_default": false,
                "is_global": false,
                "position": "12"
            },
            {
                "id": 5,
                "name": "NEW",
                "color": "#00B25C",
                "is_default": false,
                "is_global": true,
                "position": "1"
            }
        ],
        "attachments": [
            {
                "id": 1,
                "name": "ac.png",
                "mime_type": "image\/png",
                "size": 1927,
... (28 líneas más)
```

Second task is associated with the second task list and has no labels:

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateTask",
    "name": "Design task",
    "task_list_id": 2,
    "due_on": 5,
    "position": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "ProjectTemplateTask",
        "url_path": "\/project-templates\/1\/elements\/4",
        "name": "Design task",
        "labels": [],
        "attachments": [],
        "body": "",
        "body_formatted": "",
        "created_on": 1430164518,
        "updated_on": 1430164518,
        "template_id": 1,
        "position": 2,
        "task_list_id": 2,
        "assignee_id": 0,
        "job_type_id": 0,
        "estimate": 0,
        "due_on": 5,
        "is_important": false,
        "is_hidden_from_clients": false,
        "label_id": 0
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateSubtask",
    "body": "First subtask on Design task",
    "task_id": 4,
    "position": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "ProjectTemplateSubtask",
        "url_path": "\/project-templates\/1\/elements\/5",
        "name": "First subtask on Design task",
        "attachments": [],
        "body": "First subtask on Design task",
        "body_formatted": "First subtask on Design task",
        "created_on": 1430164518,
        "updated_on": 1430164518,
        "template_id": 1,
        "position": 1,
        "task_id": 4,
        "assignee_id": 0
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateSubtask",
    "body": "Second subtask on Design task",
    "task_id": 4,
    "position": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 6,
        "class": "ProjectTemplateSubtask",
        "url_path": "\/project-templates\/1\/elements\/6",
        "name": "Second subtask on Design task",
        "attachments": [],
        "body": "Second subtask on Design task",
        "body_formatted": "Second subtask on Design task",
        "created_on": 1430164518,
        "updated_on": 1430164518,
        "template_id": 1,
        "position": 2,
        "task_id": 4,
        "assignee_id": 0
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateDiscussion",
    "name": "Lets talk",
    "body": "About something"
}
```

Respuesta:
```json
{
    "single": {
        "id": 7,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/7",
        "name": "Lets talk",
        "attachments": [],
        "body": "About something",
        "body_formatted": "About something",
        "created_on": 1430164519,
        "updated_on": 1430164519,
        "template_id": 1,
        "position": 0,
        "is_hidden_from_clients": false
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateDiscussion",
    "name": "Lets talk hm",
    "body": "About something else"
}
```

Respuesta:
```json
{
    "single": {
        "id": 8,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/8",
        "name": "Lets talk hm",
        "attachments": [],
        "body": "About something else",
        "body_formatted": "About something else",
        "created_on": 1430164519,
        "updated_on": 1430164519,
        "template_id": 1,
        "position": 0,
        "is_hidden_from_clients": false
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateNote",
    "name": "Main note",
    "body": "Main note body"
}
```

Respuesta:
```json
{
    "single": {
        "id": 9,
        "class": "ProjectTemplateNote",
        "url_path": "\/project-templates\/1\/elements\/9",
        "name": "Main note",
        "attachments": [],
        "body": "Main note body",
        "body_formatted": "Main note body",
        "body_plain_text": "Main note body",
        "created_on": 1430164519,
        "updated_on": 1430164519,
        "template_id": 1,
        "position": 0,
        "note_id": 0,
        "is_hidden_from_clients": false
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateNote",
    "name": "Sub-note",
    "body": "Sub-note body",
    "note_id": 9
}
```

Respuesta:
```json
{
    "single": {
        "id": 10,
        "class": "ProjectTemplateNote",
        "url_path": "\/project-templates\/1\/elements\/10",
        "name": "Sub-note",
        "attachments": [],
        "body": "Sub-note body",
        "body_formatted": "Sub-note body",
        "body_plain_text": "Sub-note body",
        "created_on": 1430164519,
        "updated_on": 1430164519,
        "template_id": 1,
        "position": 0,
        "note_id": 9,
        "is_hidden_from_clients": false
    }
}
```

**`POST /project-templates/1/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateFile",
    "uploaded_file_code": "IHnENRGBKkYwPGjTeihhFZslJcBYyl77SiAu18Vz"
}
```

Respuesta:
```json
{
    "single": {
        "id": 11,
        "class": "ProjectTemplateFile",
        "url_path": "\/project-templates\/1\/elements\/11",
        "name": "sketch.png",
        "mime_type": "image\/png",
        "size": 616656,
        "md5": "",
        "download_url": "http:\/\/feather.dev\/project-templates\/1\/elements\/download?project_template_element_id=11",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FtiucJKFMF5mXe8fEbZ4OxXFSXdJycwSkQUUppvUi&original_file_name=sketch.png&width=--WIDTH--&height=--HEIGHT--&ver=616656&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 1800,
                "height": 400
            }
        },
        "created_on": 1430164519,
        "updated_on": 1430164519,
        "template_id": 1,
        "position": 0,
        "location": "2015-04\/tiucJKFMF5mXe8fEbZ4OxXFSXdJycwSkQUUppvUi",
        "is_hidden_from_clients": false
    }
}
```

For the purpose of this test, we'll create one more template with one extra element, to confirm that per-template filtering and reordering works properly:

**`POST /project-templates`** → HTTP 200

Payload:
```json
{
    "name": "Second Template"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "ProjectTemplate",
        "url_path": "\/project-templates\/2",
        "name": "Second Template",
        "members": [],
        "created_on": 1430164519,
        "created_by_id": 1,
        "updated_on": 1430164519,
        "is_draft": false,
        "is_scheduled": false,
        "count_task_lists": 0,
        "count_tasks": 0,
        "count_subtasks": 0,
        "count_discussions": 0,
        "count_files": 0,
        "count_notes": 0
    }
}
```

**`POST /project-templates/2/elements`** → HTTP 200

Payload:
```json
{
    "type": "ProjectTemplateDiscussion",
    "name": "Second template discussion",
    "body": "Just for the test",
    "position": 8
}
```

Respuesta:
```json
{
    "single": {
        "id": 12,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/2\/elements\/12",
        "name": "Second template discussion",
        "attachments": [],
        "body": "Just for the test",
        "body_formatted": "Just for the test",
        "created_on": 1430164520,
        "updated_on": 1430164520,
        "template_id": 2,
        "position": 8,
        "is_hidden_from_clients": false
    }
}
```

Order of discussions is not correct. Lets fix that:

**`PUT /project-templates/1/reorder`** → HTTP 200

Payload:
```json
[
    8,
    7,
    12
]
```

Respuesta:
```json
[
    8,
    7,
    12
]
```

**`GET /project-templates/1/elements/7`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 7,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/7",
        "name": "Lets talk",
        "attachments": [],
        "body": "About something",
        "body_formatted": "About something",
        "created_on": 1430164519,
        "updated_on": 1430164520,
        "template_id": 1,
        "position": 2,
        "is_hidden_from_clients": false
    }
}
```

**`GET /project-templates/1/elements/8`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 8,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/8",
        "name": "Lets talk hm",
        "attachments": [],
        "body": "About something else",
        "body_formatted": "About something else",
        "created_on": 1430164519,
        "updated_on": 1430164520,
        "template_id": 1,
        "position": 1,
        "is_hidden_from_clients": false
    }
}
```

**`GET /project-templates/2/elements/12`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 12,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/2\/elements\/12",
        "name": "Second template discussion",
        "attachments": [],
        "body": "Just for the test",
        "body_formatted": "Just for the test",
        "created_on": 1430164520,
        "updated_on": 1430164520,
        "template_id": 2,
        "position": 8,
        "is_hidden_from_clients": false
    }
}
```

Note: Supported element types are `ProjectTemplateTaskList`, `ProjectTemplateTask`, `ProjectTemplateSubtask`, `ProjectTemplateDiscussion` and `ProjectTemplateNote`. If we try to create an element that is not supported, system will thrown an error:

**`POST /project-templates/1/elements`** → HTTP 500

Payload:
```json
{
    "type": "ProjectTemplateSuperUser",
    "user_id": 1
}
```

Respuesta:
```json
{
    "type": "InvalidParamError",
    "message": "Value of \"type\" field is not a valid project template element class",
    "file": "\/var\/www\/activecollab.back\/activecollab\/current\/modules\/system\/models\/project_template_elements\/ProjectTemplateElements.class.php",
    "line": 150,
    "trace": "#0 \/var\/www\/activecollab.back\/activecollab\/current\/modules\/system\/controllers\/ProjectTemplateElementsController.class.php(74): ProjectTemplateElements::create(Array)\n#1 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): ProjectTemplateElementsController->add(Object(Owner))\n#2 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('add')\n#3 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('project-templat...', '')\n#4 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#5 {main}",
    "previous": null,
    "var_name": "attributes[type]",
    "var_value": {
        "type": "ProjectTemplateSuperUser",
        "user_id": 1,
        "template_id": 1
    }
}
```

Lets see if elements are properly set. Notice that elements are grouped by type and then ordered by position value (where applicable):

**`GET /project-templates/1/elements`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 8,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/8",
        "name": "Lets talk hm",
        "attachments": [],
        "body": "About something else",
        "body_formatted": "About something else",
        "created_on": 1430164519,
        "updated_on": 1430164520,
        "template_id": 1,
        "position": 1,
        "is_hidden_from_clients": false
    },
    {
        "id": 7,
        "class": "ProjectTemplateDiscussion",
        "url_path": "\/project-templates\/1\/elements\/7",
        "name": "Lets talk",
        "attachments": [],
        "body": "About something",
        "body_formatted": "About something",
        "created_on": 1430164519,
        "updated_on": 1430164520,
        "template_id": 1,
        "position": 2,
        "is_hidden_from_clients": false
    },
    {
... (194 líneas más)
```

We'll create a project that starts on `2014-10-06`, to make all variables known. Before we do that, lets make things a bit more interesting and make a second day of the project a day off, so we can confirm that it gets properly skipped:

**`POST /day-offs`** → HTTP 200

Payload:
```json
{
    "name": "My 1st",
    "start_date": "2014-10-07",
    "end_date": "2014-10-07"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "DayOff",
        "url_path": "\/day-offs\/1",
        "name": "My 1st",
        "start_date": 1412640000,
        "end_date": 1412640000,
        "is_multi_day": false,
        "repeat_yearly": false
    }
}
```

Now, lets create a project that is based on a template:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "Project from Template",
    "leader_id": 1,
    "template_id": 1,
    "template_date_reference": "2014-10-06"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Project from Template",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 1,
        "based_on_type": null,
        "based_on_id": null,
... (64 líneas más)
```

**`GET /projects/1/task-lists/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Analyze",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    }
}
```

**`GET /projects/1/task-lists/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/2",
        "name": "Design",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "start_on": 1412726400,
        "due_on": 1413158400,
        "position": 1,
        "open_tasks": 1,
        "completed_tasks": 0
    }
}
```

First task should be properly connected with the first task list, properly assigned to one of the members and fall on Oct 8th (because 7th was set as a day off):

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Analyze task",
        "assignee_id": 3,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [
            {
                "id": 3,
                "name": "ac.png",
                "mime_type": "image\/png",
                "size": 1927,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2F9tobXuF0ikhzmwxwGWH3BbOQEluTPy0MRnNEIiCQ&original_file_name=ac.png&width=--WIDTH--&height=--HEIGHT--&ver=1927&scale=--SCALE--"
            },
            {
                "id": 4,
                "name": "profile.png",
                "mime_type": "image\/png",
                "size": 68914,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FtKeG8C3CnzuPA0u5kPNZcMBUZdoxmQcGphclK6OY&original_file_name=profile.png&width=--WIDTH--&height=--HEIGHT--&ver=68914&scale=--SCALE--"
            }
        ],
... (72 líneas más)
```

**`GET /projects/1/tasks/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Design task",
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
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "task_number": 2,
        "task_list_id": 2,
        "position": 2,
        "is_important": false,
        "due_on": 1413158400,
... (78 líneas más)
```

To confirm that discussions are properly created, we'll get their details:

**`GET /projects/1/discussions/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "Lets talk hm",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "About something else",
        "body_formatted": "About something else",
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`GET /projects/1/discussions/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/2",
        "name": "Lets talk",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "About something",
        "body_formatted": "About something",
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

We'll do the same for notes:

**`GET /projects/1/notes/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/1",
        "name": "Main note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Main note body",
        "body_formatted": "Main note body",
        "body_plain_text": "Main note body",
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "note_id": 0,
        "is_subnote": false,
        "subnotes_count": 1,
        "is_in_collection": true,
        "position": 0,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (34 líneas más)
```

**`GET /projects/1/notes/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Note",
        "url_path": "\/projects\/1\/notes\/2",
        "name": "Sub-note",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "Sub-note body",
        "body_formatted": "Sub-note body",
        "body_plain_text": "Sub-note body",
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1,
        "note_id": 1,
        "is_subnote": true,
        "subnotes_count": 0,
        "is_in_collection": true,
        "position": 1,
        "contributor_ids": [
            1
        ]
    },
    "subscribers": [
... (32 líneas más)
```

and files:

**`GET /projects/1/files/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "File",
        "url_path": "\/projects\/1\/files\/1",
        "name": "sketch.png",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "mime_type": "image\/png",
        "size": 616656,
        "md5": null,
        "download_url": "http:\/\/feather.dev\/projects\/1\/files\/1\/download",
        "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FEtIolhnVhOxVmgHhcENXHvi0pGHtU2PnkmBvuOgB&original_file_name=sketch.png&width=--WIDTH--&height=--HEIGHT--&ver=616656&scale=--SCALE--",
        "file_meta": {
            "kind": "image",
            "dimensions": {
                "width": 1800,
                "height": 400
            }
        },
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164521,
        "updated_by_id": 1
    }
}
```

Project templates can be easily duplicated, to save you time:

**`POST /project-templates/1/duplicate`** → HTTP 200

Payload:
```json
{
    "name": "Design Project Copy"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "ProjectTemplate",
        "url_path": "\/project-templates\/3",
        "name": "Design Project Copy",
        "members": [],
        "created_on": 1430164517,
        "created_by_id": 1,
        "updated_on": 1430164523,
        "is_draft": false,
        "is_scheduled": false,
        "count_task_lists": 0,
        "count_tasks": 0,
        "count_subtasks": 0,
        "count_discussions": 0,
        "count_files": 0,
        "count_notes": 0
    }
}
```

When project template gets dropped:

**`DELETE /project-templates/1`** → HTTP 200

projects created based on it should have their `template_id` flags updated:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Project from Template",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            3
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164521,
        "created_by_id": 1,
        "updated_on": 1430164523,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
... (64 líneas más)
```
