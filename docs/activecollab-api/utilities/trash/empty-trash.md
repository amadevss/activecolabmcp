# Empty Trash

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/trash/empty-trash.html

We have prepared and trashed a couple of objects:

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

Trash is emptied in waves, 100 items per wave (tested in "Empty Trash in Waves" case). Lets run one /trash request with default limit (100 items);

**`DELETE /trash`** → HTTP 200

Trash is empty with one call:

**`GET /trash`** → HTTP 200

Respuesta:
```json
[]
```
