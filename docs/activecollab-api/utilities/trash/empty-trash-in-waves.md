# Empty Trash in Waves

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/trash/empty-trash-in-waves.html

While the best way to empty the trash is using command line, there is option to trigger that operation via API as well. When triggered via API, it works in waves, to distribute load (there can be a lot of items in trash). Lets check the content of trash:

**`GET /trash`** → HTTP 200

Respuesta:
```json
{
    "User": {
        "2": "member"
    },
    "Comment": {
        "1": "Here's a short list:  * First item * Second Item"
    },
    "Company": {
        "2": "Client Company",
        "3": "Second Client Company"
    },
    "Project": {
        "1": "Test Project"
    },
    "Discussion": {
        "1": "New Discussion"
    },
    "TaskList": {
        "1": "New Task List"
    },
    "Task": {
        "1": "Task #1",
        "2": "Task #2"
    },
    "Subtask": {
        "1": "Subtask that will be automatically trashed"
    },
    "TimeRecord": {
        "1": "Task #2 - Did an awesome job"
    }
... (1 líneas más)
```

First wave clears task lists, tasks, discussions, text documents, files and calendars:

**`DELETE /trash?delete_per_iteration=4`** → HTTP 200

**`GET /trash`** → HTTP 200

Respuesta:
```json
{
    "User": {
        "2": "member"
    },
    "Company": {
        "2": "Client Company",
        "3": "Second Client Company"
    },
    "Project": {
        "1": "Test Project"
    }
}
```

Second wave will drop comments, subtasks, time records, expenses and calendar events, but we'll skip that test because we do not have elements to test.

Third wave will drop higher level items, like projects and users:

**`DELETE /trash?delete_per_iteration=2`** → HTTP 200

**`GET /trash`** → HTTP 200

Respuesta:
```json
{
    "Company": {
        "2": "Client Company",
        "3": "Second Client Company"
    }
}
```

Fourth wave will drop companies:

**`DELETE /trash?delete_per_iteration=2`** → HTTP 200

If we check content of trash can now, we'll see that it is empty:

**`GET /trash`** → HTTP 200

Respuesta:
```json
[]
```
