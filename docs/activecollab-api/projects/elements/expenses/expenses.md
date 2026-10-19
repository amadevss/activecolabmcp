# Expenses

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/elements/expenses/expenses.html

For the purpose of this article, we create one test project. Lets check if there are any expenses tracked in it:

**`GET /projects/1/expenses`** → HTTP 200

Respuesta:
```json
{
    "expenses": null,
    "related": null
}
```

Good, it's empty. Before we can add new records, we need to see which expense categories we have defined. We can get a list by requesting data from `/expense-categories` command:

**`GET /expense-categories`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/1",
        "name": "General",
        "is_default": true
    }
]
```

Now that we know that we have a valid job type that we can use, lets add two expenses, one attached directly to the project (we simply ommit `task_id` value) and one added to a task:

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "value": 250,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2014-05-14"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 250,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164097,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task #1",
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
        "created_on": 1430164096,
        "created_by_id": 1,
        "updated_on": 1430164096,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

**`POST /projects/1/expenses`** → HTTP 200

Payload:
```json
{
    "task_id": 1,
    "value": 380.5,
    "user_id": 1,
    "category_id": 1,
    "record_date": "2014-05-14",
    "billable_status": 0
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 380.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164097,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Test Task #1",
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
        "created_on": 1430164096,
        "created_by_id": 1,
        "updated_on": 1430164097,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (16 líneas más)
```

Project's `/expenses` request should return all records that are tracked on that projects, including project's tasks:

**`GET /projects/1/expenses`** → HTTP 200

Respuesta:
```json
{
    "expenses": [
        {
            "id": 2,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
            "value": 380.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164097,
            "created_by_id": 1,
            "updated_on": 1430164097,
            "updated_by_id": 1,
            "category_id": 1,
            "currency_id": 2
        },
        {
            "id": 1,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/1",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
... (94 líneas más)
```

If we run the same request on task level, we should get only expeses tracked for that task:

**`GET /projects/1/tasks/1/expenses`** → HTTP 200

Respuesta:
```json
{
    "expenses": [
        {
            "id": 2,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
            "value": 380.5,
            "record_date": 1400025600,
            "summary": null,
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164097,
            "created_by_id": 1,
            "updated_on": 1430164097,
            "updated_by_id": 1,
            "category_id": 1,
            "currency_id": 2
        }
    ],
    "related": {
        "Project": {
            "1": {
                "id": 1,
                "class": "Project",
                "url_path": "\/projects\/1",
... (73 líneas más)
```

In order to alter this value, we can send PUT request:

**`PUT /projects/1/expenses/1`** → HTTP 200

Payload:
```json
{
    "value": 123.45,
    "billable_status": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 1,
        "value": 123.45,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164098,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

We just realized that task expense that we added is logged for the incorrect task. Note that sending PUT request with `project_id` or `task_id` will note move the record:

**`PUT /projects/1/expenses/2`** → HTTP 200

Payload:
```json
{
    "project_id": 2,
    "task_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 380.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164098,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

For move to work, we need to call `/projects/:project_id/expenses/:expense_id/move`:

**`PUT /projects/1/expenses/2/move`** → HTTP 200

Payload:
```json
{
    "task_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 380.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Task",
        "parent_id": 2,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164098,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

To move the expens on project level, send an empty value for `task_id` and `project_id` values:

**`PUT /projects/1/expenses/2/move`** → HTTP 200

Payload:
```json
{
    "project_id": 2,
    "task_id": 0
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Expense",
        "url_path": "\/projects\/2\/expenses\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "billable_status": 0,
        "value": 380.5,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 2,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164099,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

Finally, lets move the newly created expense to trash:

**`DELETE /projects/1/expenses/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/1",
        "is_trashed": true,
        "trashed_on": 1430164099,
        "trashed_by_id": 1,
        "billable_status": 1,
        "value": 123.45,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164099,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```

Confirmation that the record was deleted:

**`GET /projects/1/expenses/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Expense",
        "url_path": "\/projects\/1\/expenses\/1",
        "is_trashed": true,
        "trashed_on": 1430164099,
        "trashed_by_id": 1,
        "billable_status": 1,
        "value": 123.45,
        "record_date": 1400025600,
        "summary": null,
        "user_id": 1,
        "parent_type": "Project",
        "parent_id": 1,
        "created_on": 1430164097,
        "created_by_id": 1,
        "updated_on": 1430164099,
        "updated_by_id": 1,
        "category_id": 1,
        "currency_id": 2
    }
}
```
