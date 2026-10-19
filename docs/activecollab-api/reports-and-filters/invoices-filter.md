# Invoices Filter

> Fuente: https://developers.activecollab.com/api-documentation/v1/reports-and-filters/invoices-filter.html

Personas in this Story: Default, RegularManager, FinancialManager, Client.

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "regular-manager@activecollab.com",
    "password": "123",
    "company_id": 1,
    "custom_permissions": [
        "can_manage_projects",
        "can_manage_settings"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Member",
        "url_path": "\/users\/2",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430165058,
        "created_by_id": 1,
        "updated_on": 1430165058,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Regular-manager",
        "last_name": null,
        "display_name": "regular-manager",
        "short_display_name": "regular-manager",
        "email": "regular-manager@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430165058",
        "custom_permissions": [
            "can_manage_settings",
            "can_manage_projects"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
... (4 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Member",
    "email": "financial-manager@activecollab.com",
    "password": "123",
    "company_id": 1,
    "custom_permissions": [
        "can_manage_finances"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Member",
        "url_path": "\/users\/3",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430165059,
        "created_by_id": 1,
        "updated_on": 1430165059,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Financial-manager",
        "last_name": null,
        "display_name": "financial-manager",
        "short_display_name": "financial-manager",
        "email": "financial-manager@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430165059",
        "custom_permissions": [
            "can_manage_finances"
        ],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
... (3 líneas más)
```

**`POST /users`** → HTTP 200

Payload:
```json
{
    "type": "Client",
    "email": "client@activecollab.com",
    "password": "123",
    "company_id": 2
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Client",
        "url_path": "\/users\/4",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430165059,
        "created_by_id": 1,
        "updated_on": 1430165059,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430165059",
        "custom_permissions": [],
        "company_id": 2,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    }
... (1 líneas más)
```

For the purpose of this test, we have created three client companies:

**`GET /companies`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Company",
        "url_path": "\/companies\/1",
        "name": "Owner Company",
        "members": [
            1,
            2,
            3
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430165056,
        "created_by_id": 1,
        "updated_on": 1430165056,
        "updated_by_id": 1,
        "address": null,
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": null,
        "is_owner": true,
        "has_note": false
    },
    {
        "id": 2,
        "class": "Company",
... (66 líneas más)
```

and two projects:

**`GET /projects`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 2,
        "class": "Project",
        "url_path": "\/projects\/2",
        "name": "Second Client Project",
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
        "created_on": 1430165060,
        "created_by_id": 1,
        "updated_on": 1430165060,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 3,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-Xy4pRNw@mail.manageprojects.com",
... (46 líneas más)
```

Lets create a couple of invoices:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "project_id": 1,
    "number": "1\/2014",
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "private_note": "Client will not be able to see this"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Invoice",
        "url_path": "\/invoices\/1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 2,
        "company_name": "First Client",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "2\/2014",
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "private_note": "Client will not be able to see this"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Invoice",
        "url_path": "\/invoices\/2",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 2,
        "company_name": "First Client",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 3,
    "project_id": 2,
    "number": "3\/2014",
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "private_note": "Client will not be able to see this"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Invoice",
        "url_path": "\/invoices\/3",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 3,
        "company_name": "Second Client",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 3,
    "number": "4\/2014",
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "private_note": "Client will not be able to see this"
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Invoice",
        "url_path": "\/invoices\/4",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 3,
        "company_name": "Second Client",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 4,
    "number": "5\/2014",
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "private_note": "Client will not be able to see this"
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Invoice",
        "url_path": "\/invoices\/5",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 4,
        "company_name": "Third Client",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

We'll start by checking permissions. Owner and financial managers can access invoicing reports, while other users can't:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicesFilter"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Invoices",
        "invoices": {
            "1": {
                "id": 1,
                "number": "1\/2014",
                "company_id": 2,
                "company_name": "First Client",
                "project_id": 1,
                "currency_id": 1,
                "subtotal": 6125,
                "tax": 568.75,
                "total": 6693.75,
                "balance_due": 6693.75,
                "paid_amount": 0,
                "created_on": 1430165061,
                "issued_on": 1430092800,
                "due_on": 1430092800,
                "closed_on": null,
                "is_canceled": false,
                "name": "1\/2014",
                "project_name": "First Client Project",
                "status": "issued"
            },
            "2": {
                "id": 2,
                "number": "2\/2014",
                "company_id": 2,
                "company_name": "First Client",
... (88 líneas más)
```

**`GET /reports/run`** → HTTP 404 _(como RegularManager)_

Parámetros de query:
```json
{
    "type": "InvoicesFilter"
}
```

**`GET /reports/run`** → HTTP 200 _(como FinancialManager)_

Parámetros de query:
```json
{
    "type": "InvoicesFilter"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Invoices",
        "invoices": {
            "1": {
                "id": 1,
                "number": "1\/2014",
                "company_id": 2,
                "company_name": "First Client",
                "project_id": 1,
                "currency_id": 1,
                "subtotal": 6125,
                "tax": 568.75,
                "total": 6693.75,
                "balance_due": 6693.75,
                "paid_amount": 0,
                "created_on": 1430165061,
                "issued_on": 1430092800,
                "due_on": 1430092800,
                "closed_on": null,
                "is_canceled": false,
                "name": "1\/2014",
                "project_name": "First Client Project",
                "status": "issued"
            },
            "2": {
                "id": 2,
                "number": "2\/2014",
                "company_id": 2,
                "company_name": "First Client",
... (88 líneas más)
```

**`GET /reports/run`** → HTTP 404 _(como Client)_

Parámetros de query:
```json
{
    "type": "InvoicesFilter"
}
```

Invoicing reports support up to two levels of data grouping:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicesFilter",
    "group_by": [
        "client"
    ]
}
```

Respuesta:
```json
{
    "company-2": {
        "label": "First Client",
        "invoices": {
            "1": {
                "id": 1,
                "number": "1\/2014",
                "company_id": 2,
                "company_name": "First Client",
                "project_id": 1,
                "currency_id": 1,
                "subtotal": 6125,
                "tax": 568.75,
                "total": 6693.75,
                "balance_due": 6693.75,
                "paid_amount": 0,
                "created_on": 1430165061,
                "issued_on": 1430092800,
                "due_on": 1430092800,
                "closed_on": null,
                "is_canceled": false,
                "name": "1\/2014",
                "project_name": "First Client Project",
                "status": "issued"
            },
            "2": {
                "id": 2,
                "number": "2\/2014",
                "company_id": 2,
                "company_name": "First Client",
... (110 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicesFilter",
    "group_by": [
        "client",
        "project"
    ]
}
```

Respuesta:
```json
{
    "company-2": {
        "label": "First Client",
        "invoices": {
            "unknow-project": {
                "label": "Unknown",
                "invoices": {
                    "2": {
                        "id": 2,
                        "number": "2\/2014",
                        "company_id": 2,
                        "company_name": "First Client",
                        "project_id": null,
                        "currency_id": 1,
                        "subtotal": 6125,
                        "tax": 568.75,
                        "total": 6693.75,
                        "balance_due": 6693.75,
                        "paid_amount": 0,
                        "created_on": 1430165061,
                        "issued_on": 1430092800,
                        "due_on": 1430092800,
                        "closed_on": null,
                        "is_canceled": false,
                        "name": "2\/2014",
                        "project_name": "N\/A",
                        "status": "issued"
                    }
                },
                "total": {
... (147 líneas más)
```

Max level of grouping for invoices report is 2. If we try to set more, we'll get an error:

**`GET /reports/run`** → HTTP 500

Parámetros de query:
```json
{
    "type": "InvoicesFilter",
    "group_by": [
        "client",
        "project",
        "status"
    ]
}
```

Respuesta:
```json
{
    "type": "InvalidParamError",
    "message": "Max levels of grouping is 2",
    "file": "\/var\/www\/angie.back\/src\/Angie\/Reports\/Report\/Implementation.php",
    "line": 92,
    "trace": "#0 \/var\/www\/angie.back\/frameworks\/environment\/models\/data_filters\/FwDataFilter.php(88): BaseDataFilter->setGroupBy('client,project,...')\n#1 \/var\/www\/activecollab.back\/activecollab\/current\/modules\/invoicing\/models\/reports\/InvoicesFilter.php(587): FwDataFilter->setAttribute('group_by', 'client,project,...')\n#2 \/var\/www\/angie.back\/classes\/database\/DataObject.class.php(265): InvoicesFilter->setAttribute('group_by', 'client,project,...')\n#3 \/var\/www\/angie.back\/src\/Angie\/Reports.php(47): DataObject->setAttributes(Array)\n#4 \/var\/www\/angie.back\/frameworks\/environment\/controllers\/FwReportsController.class.php(55): Angie\\Reports::getReport('InvoicesFilter', Array, Object(Owner))\n#5 \/var\/www\/angie.back\/src\/Angie\/Controller.php(42): FwReportsController->run(Object(Owner))\n#6 \/var\/www\/angie.back\/classes\/application\/AngieApplicationAdapter.class.php(243): Angie\\Controller->executeAction('run')\n#7 \/var\/www\/angie.back\/classes\/application\/AngieApplication.class.php(839): AngieApplicationAdapter->handleHttpRequest('reports\/run', 'type=InvoicesFi...')\n#8 \/var\/www\/activecollab.back\/instance\/public\/api.php(19): AngieApplication::handleHttpRequest()\n#9 {main}",
    "previous": null,
    "var_name": "group_by",
    "var_value": [
        "client",
        "project",
        "status"
    ]
}
```

Detailed invoice reports can be exported in CSV format:

**`GET /reports/export`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicesFilter",
    "group_by": [
        "client",
        "project"
    ]
}
```

Respuesta:
```json
ID,Number,Status,Currency Name,Currency Code,Company ID,Company,Project ID,Project,Issued On,Due On,Closed On,Paid Amount,Balance Due,Total
1,1/2014,issued,Euro,EUR,2,First Client,1,First Client Project,2015-04-27 00:00:00,2015-04-27,,0,6693.75,6693.75
2,2/2014,issued,Euro,EUR,2,First Client,0,N/A,2015-04-27 00:00:00,2015-04-27,,0,6693.75,6693.75
3,3/2014,issued,Euro,EUR,3,Second Client,2,Second Client Project,2015-04-27 00:00:00,2015-04-27,,0,6693.75,6693.75
4,4/2014,issued,Euro,EUR,3,Second Client,0,N/A,2015-04-27 00:00:00,2015-04-27,,0,6693.75,6693.75
5,5/2014,issued,Euro,EUR,4,Third Client,0,N/A,2015-04-27 00:00:00,2015-04-27,,0,6693.75,6693.75
```

Note that export command does not support data grouping (system will not reject the request, as shown above, but it will not group the records).
