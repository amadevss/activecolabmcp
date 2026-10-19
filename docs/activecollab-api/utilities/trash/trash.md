# Trash

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/trash/trash.html

Personas in this Story: Default, Member, Client.

Trash is empty by default:

**`GET /trash`** → HTTP 200

Respuesta:
```json
[]
```

But we have a couple of elements defined that we can move to trash:

**`PUT /move-to-trash/company/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company",
        "members": [],
        "is_trashed": true,
        "trashed_on": 1430165021,
        "trashed_by_id": 1,
        "is_archived": false,
        "created_on": 1430165018,
        "created_by_id": 1,
        "updated_on": 1430165021,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

**`PUT /move-to-trash/company/3`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Company",
        "url_path": "\/companies\/3",
        "name": "Second Client Company",
        "members": [],
        "is_trashed": true,
        "trashed_on": 1430165021,
        "trashed_by_id": 1,
        "is_archived": false,
        "created_on": 1430165018,
        "created_by_id": 1,
        "updated_on": 1430165021,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 100
    },
    "active_projects_count": 0
}
```

**`PUT /move-to-trash/user/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": true,
        "trashed_on": 1430165022,
        "trashed_by_id": 1,
        "created_on": 1430165018,
        "created_by_id": 1,
        "updated_on": 1430165022,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Member-to-be-trashed",
        "last_name": null,
        "display_name": "member-to-be-trashed",
        "short_display_name": "member-to-be-trashed",
        "email": "member-to-be-trashed@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430165022",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

**`PUT /move-to-trash/project/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Second Test Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": true,
        "trashed_on": 1430165022,
        "trashed_by_id": 1,
        "created_on": 1430165019,
        "created_by_id": 1,
        "updated_on": 1430165022,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-54HLa7i@mail.manageprojects.com",
... (15 líneas más)
```

**`PUT /move-to-trash/task/2`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/2",
        "name": "Task #2",
        "assignee_id": 1,
        "delegated_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 0,
        "attachments": [],
        "labels": [],
        "is_trashed": true,
        "trashed_on": 1430165022,
        "trashed_by_id": 3,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430165020,
        "created_by_id": 1,
        "updated_on": 1430165022,
        "updated_by_id": 3,
        "task_number": 2,
        "task_list_id": 0,
        "position": 2,
        "is_important": false,
        "due_on": null,
... (17 líneas más)
```

**`PUT /move-to-trash/discussion/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Discussion",
        "url_path": "\/projects\/1\/discussions\/1",
        "name": "New Discussion",
        "comments_count": 0,
        "attachments": [],
        "is_trashed": true,
        "trashed_on": 1430165022,
        "trashed_by_id": 1,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430165021,
        "created_by_id": 1,
        "updated_on": 1430165022,
        "updated_by_id": 1
    },
    "subscribers": [
        1
    ],
    "comments": []
}
```

**`PUT /move-to-trash/task-list/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "New Task List",
        "is_trashed": true,
        "trashed_on": 1430165022,
        "trashed_by_id": 1,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430165021,
        "created_by_id": 1,
        "updated_on": 1430165022,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

Lets check the trash now:

**`GET /trash`** → HTTP 200

Respuesta:
```json
{
    "User": {
        "2": "member-to-be-trashed"
    },
    "Comment": {
        "1": "Here's a short list:  * First item * Second Item"
    },
    "Company": {
        "2": "Client Company",
        "3": "Second Client Company"
    },
    "Project": {
        "2": "Second Test Project"
    },
    "Discussion": {
        "1": "New Discussion"
    },
    "TaskList": {
        "1": "New Task List"
    },
    "Task": {
        "2": "Task #2"
    },
    "Subtask": {
        "1": "Subtask that will be automatically trashed"
    },
    "TimeRecord": {
        "1": "Task #2 - Did an awesome job"
    }
}
```

**`GET /trash`** → HTTP 200 _(como Member)_

Respuesta:
```json
{
    "Comment": {
        "1": "Here's a short list:  * First item * Second Item"
    },
    "Discussion": {
        "1": "New Discussion"
    },
    "TaskList": {
        "1": "New Task List"
    },
    "Task": {
        "2": "Task #2"
    },
    "Subtask": {
        "1": "Subtask that will be automatically trashed"
    },
    "TimeRecord": {
        "1": "Task #2 - Did an awesome job"
    }
}
```

**`GET /trash`** → HTTP 404 _(como Client)_

To remove an individual entry, we can trigger:

**`DELETE /permanently-delete/company/3`** → HTTP 200

To confirm that we deleted this company, let's check company resource:

**`GET /companies/3`** → HTTP 404

**`GET /trash`** → HTTP 200

Respuesta:
```json
{
    "User": {
        "2": "member-to-be-trashed"
    },
    "Comment": {
        "1": "Here's a short list:  * First item * Second Item"
    },
    "Company": {
        "2": "Client Company"
    },
    "Project": {
        "2": "Second Test Project"
    },
    "Discussion": {
        "1": "New Discussion"
    },
    "TaskList": {
        "1": "New Task List"
    },
    "Task": {
        "2": "Task #2"
    },
    "Subtask": {
        "1": "Subtask that will be automatically trashed"
    },
    "TimeRecord": {
        "1": "Task #2 - Did an awesome job"
    }
}
```

Permanently deleting complex elements should delete related records as well. There's no better example than process of project deletion:

**`PUT /move-to-trash/project/1`** → HTTP 200

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
            1,
            3,
            4
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": true,
        "trashed_on": 1430165023,
        "trashed_by_id": 1,
        "created_on": 1430165019,
        "created_by_id": 1,
        "updated_on": 1430165023,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 3,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
... (17 líneas más)
```

**`DELETE /permanently-delete/project/1`** → HTTP 200

This should not just delete a project, but also all of the related objects:

**`GET /projects/1`** → HTTP 404

**`GET /categories/1`** → HTTP 404

**`GET /projects/1/task-lists/1`** → HTTP 404

**`GET /projects/1/discussions/1`** → HTTP 404

**`GET /projects/1/tasks/1`** → HTTP 404

**`GET /projects/1/tasks/2`** → HTTP 404

**`GET /comments/1`** → HTTP 404

**`GET /subtasks/1`** → HTTP 404

Respuesta:
```json
{
    "type": "RoutingError",
    "message": "String 'subtasks\/1' does not match any of mapped routes",
    "file": "\/var\/www\/angie.back\/classes\/router\/Router.class.php",
    "line": 310,
    "trace": "#0 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(212): Router::match('subtasks\/1', '')\n#1 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('subtasks\/1', '')\n#2 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#3 {main}",
    "previous": null,
    "request_string": "subtasks\/1"
}
```

**`GET /projects/1/time-records/1`** → HTTP 404
