# Task Reminders

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/tasks/task-reminders.html

Personas in this Story: Default, Member.

For the purpose of this test we have created one project and one task, and invited one company member to collaborate with us. When we check task's reminders, the list will be empty:

**`GET /reminders/task/1`** → HTTP 200

Respuesta:
```json
[]
```

**`POST /reminders/task/1`** → HTTP 200

Payload:
```json
{
    "send_on": "2014\/11\/03",
    "comment": "Happy birthday"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "CustomReminder",
        "url_path": "\/reminders\/1",
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164391,
        "created_by_id": 1,
        "comment": "Happy birthday",
        "send_on": 1414972800,
        "subscribers": []
    },
    "subscribers": []
}
```

When we try to fetch reminders now, system will return proper result:

**`GET /reminders/task/1`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "CustomReminder",
        "url_path": "\/reminders\/1",
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164391,
        "created_by_id": 1,
        "comment": "Happy birthday",
        "send_on": 1414972800,
        "subscribers": []
    }
]
```

Note that system returns only reminders that current user created. Reminders of other users will not be visible, and therefore Member will not be able to see the reminder created by the Owner:

**`GET /reminders/task/1`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

To quickly check whether task has reminders or not (and save one unneded request), simpy check `reminders` property in /projects/:project_slug/tasks/:task_id response:

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task",
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
        "created_on": 1430164389,
        "created_by_id": 1,
        "updated_on": 1430164391,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (18 líneas más)
```

Reminders can only be deleted, but not updated. Because of that, we'll get 404 if we try to update a reminder:

**`PUT /reminders/1`** → HTTP 404

Respuesta:
```json
{
    "type": "Angie\\Controller\\Error\\ActionForMethodNotFound",
    "message": "Controller action reminders::delete() is not available for PUT method",
    "file": "\/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php",
    "line": 235,
    "trace": "#0 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('reminders\/1', '')\n#1 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#2 {main}",
    "previous": null,
    "controller": "reminders",
    "action": "delete",
    "method": "PUT"
}
```

but correct result when we try to delete it:

**`DELETE /reminders/1`** → HTTP 200
