# Permissions

> Fuente: https://developers.activecollab.com/api-documentation/v1/projects/budget/permissions.html

Personas in this Story: Default, Member, ProjectManager, FinancialManager, Client.

Project budget can be set per project when time and expense tracking is enabled on that project. When enabled, ActiveCollab will provide a nice budget report which shows how much time and expenses is tracked, and how these numbers stand against set budget. In order to demonstrate how this works, we have one project defined:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Budget test",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164019,
        "created_by_id": 1,
        "updated_on": 1430164020,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
... (19 líneas más)
```

Because time and expense tracking is not enabled for this project, nobody can access the budget report:

**`GET /projects/1/budget`** → HTTP 404

**`GET /projects/1/budget`** → HTTP 404 _(como Member)_

**`GET /projects/1/budget`** → HTTP 404 _(como ProjectManager)_

**`GET /projects/1/budget`** → HTTP 404 _(como FinancialManager)_

**`GET /projects/1/budget`** → HTTP 404 _(como Client)_

Lets enable time tracking and set a budget for this project:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "budget": 1000,
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
        "name": "Budget test",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164019,
        "created_by_id": 1,
        "updated_on": 1430164021,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
... (19 líneas más)
```

When we run /projects/:project_id/budget, we'll get a nice budget report:

**`GET /projects/1/budget`** → HTTP 200

Respuesta:
```json
{
    "budget": 1000,
    "cost_so_far": 0,
    "billable_cost_so_far": 0,
    "non_billable_cost_so_far": 0,
    "cost_by_job_type": [
        {
            "id": 1,
            "rate": 100,
            "hours": 0,
            "value": 0,
            "non_billable_hours": 0,
            "non_billable_value": 0
        }
    ],
    "expenses": 0,
    "non_billable_expenses": 0
}
```

**`GET /projects/1/budget`** → HTTP 404 _(como Member)_

**`GET /projects/1/budget`** → HTTP 200 _(como ProjectManager)_

Respuesta:
```json
{
    "budget": 1000,
    "cost_so_far": 0,
    "billable_cost_so_far": 0,
    "non_billable_cost_so_far": 0,
    "cost_by_job_type": [
        {
            "id": 1,
            "rate": 100,
            "hours": 0,
            "value": 0,
            "non_billable_hours": 0,
            "non_billable_value": 0
        }
    ],
    "expenses": 0,
    "non_billable_expenses": 0
}
```

**`GET /projects/1/budget`** → HTTP 200 _(como FinancialManager)_

Respuesta:
```json
{
    "budget": 1000,
    "cost_so_far": 0,
    "billable_cost_so_far": 0,
    "non_billable_cost_so_far": 0,
    "cost_by_job_type": [
        {
            "id": 1,
            "rate": 100,
            "hours": 0,
            "value": 0,
            "non_billable_hours": 0,
            "non_billable_value": 0
        }
    ],
    "expenses": 0,
    "non_billable_expenses": 0
}
```

**`GET /projects/1/budget`** → HTTP 404 _(como Client)_

Note that member and client still get `404`. This is because members don't have access to project budgets unless they have permissions to create new projects or manage finances. Clients will be able to see this report only when client reporting is enabled for the projects. Lets do that now:

**`PUT /projects/1`** → HTTP 200

Payload:
```json
{
    "is_client_reporting_enabled": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Budget test",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1,
            2,
            3,
            4,
            5
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164019,
        "created_by_id": 1,
        "updated_on": 1430164021,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 0,
        "currency_id": 2,
... (19 líneas más)
```

**`GET /projects/1/budget`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "budget": 1000,
    "cost_so_far": 0,
    "billable_cost_so_far": 0,
    "non_billable_cost_so_far": 0,
    "cost_by_job_type": [
        {
            "id": 1,
            "rate": 100,
            "hours": 0,
            "value": 0,
            "non_billable_hours": 0,
            "non_billable_value": 0
        }
    ],
    "expenses": 0,
    "non_billable_expenses": 0
}
```
