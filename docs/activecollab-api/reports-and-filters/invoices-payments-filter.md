# Invoices Payments Filter

> Fuente: https://developers.activecollab.com/api-documentation/v1/reports-and-filters/invoices-payments-filter.html

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
        "created_on": 1430165069,
        "created_by_id": 1,
        "updated_on": 1430165069,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Regular-manager",
        "last_name": null,
        "display_name": "regular-manager",
        "short_display_name": "regular-manager",
        "email": "regular-manager@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=2&size=--SIZE--&timestamp=1430165069",
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
        "created_on": 1430165069,
        "created_by_id": 1,
        "updated_on": 1430165069,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Financial-manager",
        "last_name": null,
        "display_name": "financial-manager",
        "short_display_name": "financial-manager",
        "email": "financial-manager@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=3&size=--SIZE--&timestamp=1430165069",
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
        "created_on": 1430165070,
        "created_by_id": 1,
        "updated_on": 1430165070,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Client",
        "last_name": null,
        "display_name": "client",
        "short_display_name": "client",
        "email": "client@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=4&size=--SIZE--&timestamp=1430165070",
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
        "created_on": 1430165067,
        "created_by_id": 1,
        "updated_on": 1430165067,
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
        "created_on": 1430165071,
        "created_by_id": 1,
        "updated_on": 1430165071,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 3,
        "leader_id": 1,
        "currency_id": 1,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-JMXVYgn@mail.manageprojects.com",
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

Now, lets mark them as paid:

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 1,
    "amount": 6693.75,
    "paid_on": "2014\/11\/11",
    "comment": "Paid in full"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Payment",
        "url_path": "\/payments\/1",
        "parent_type": "Invoice",
        "parent_id": 1,
        "created_on": 1430165073,
        "created_by_id": 1,
        "updated_on": 1430165073,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1415664000,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 2,
    "amount": 6693.75,
    "paid_on": "2014\/11\/11",
    "comment": "Paid in full"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Payment",
        "url_path": "\/payments\/2",
        "parent_type": "Invoice",
        "parent_id": 2,
        "created_on": 1430165073,
        "created_by_id": 1,
        "updated_on": 1430165073,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1415664000,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 3,
    "amount": 6693.75,
    "paid_on": "2014\/11\/11",
    "comment": "Paid in full"
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "Payment",
        "url_path": "\/payments\/3",
        "parent_type": "Invoice",
        "parent_id": 3,
        "created_on": 1430165073,
        "created_by_id": 1,
        "updated_on": 1430165073,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1415664000,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 4,
    "amount": 6693.75,
    "paid_on": "2014\/11\/11",
    "comment": "Paid in full"
}
```

Respuesta:
```json
{
    "single": {
        "id": 4,
        "class": "Payment",
        "url_path": "\/payments\/4",
        "parent_type": "Invoice",
        "parent_id": 4,
        "created_on": 1430165073,
        "created_by_id": 1,
        "updated_on": 1430165073,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1415664000,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 5,
    "paid_on": "2015\/01\/13",
    "amount": 6693.75,
    "comment": "Paid in full"
}
```

Respuesta:
```json
{
    "single": {
        "id": 5,
        "class": "Payment",
        "url_path": "\/payments\/5",
        "parent_type": "Invoice",
        "parent_id": 5,
        "created_on": 1430165073,
        "created_by_id": 1,
        "updated_on": 1430165073,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1421107200,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

We'll start by checking permissions. Owner and financial managers can access invoicing reports, while other users can't:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Payments",
        "payments": {
            "5": {
                "id": 5,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1421107200,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 5,
                "invoice_number": "5\/2014",
                "project_id": 0,
                "project_name": "",
                "company_id": 4,
                "company_name": "Third Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            },
            "1": {
                "id": 1,
... (97 líneas más)
```

**`GET /reports/run`** → HTTP 404 _(como RegularManager)_

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter"
}
```

**`GET /reports/run`** → HTTP 200 _(como FinancialManager)_

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Payments",
        "payments": {
            "5": {
                "id": 5,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1421107200,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 5,
                "invoice_number": "5\/2014",
                "project_id": 0,
                "project_name": "",
                "company_id": 4,
                "company_name": "Third Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            },
            "1": {
                "id": 1,
... (97 líneas más)
```

**`GET /reports/run`** → HTTP 404 _(como Client)_

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter"
}
```

Payments can be filtered by client company:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter",
    "company_filter": "selected_2"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Payments",
        "payments": {
            "1": {
                "id": 1,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1415664000,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 1,
                "invoice_number": "1\/2014",
                "project_id": 1,
                "project_name": "First Client Project",
                "company_id": 2,
                "company_name": "First Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            },
            "2": {
                "id": 2,
... (25 líneas más)
```

By payment date:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter",
    "paid_on_filter": "selected_range_2014\/01\/01:2014\/12\/31"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Payments",
        "payments": {
            "1": {
                "id": 1,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1415664000,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 1,
                "invoice_number": "1\/2014",
                "project_id": 1,
                "project_name": "First Client Project",
                "company_id": 2,
                "company_name": "First Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            },
            "2": {
                "id": 2,
... (73 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter",
    "paid_on_filter": "selected_range_2015\/01\/01:2015\/12\/31"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Payments",
        "payments": {
            "5": {
                "id": 5,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1421107200,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 5,
                "invoice_number": "5\/2014",
                "project_id": 0,
                "project_name": "",
                "company_id": 4,
                "company_name": "Third Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            }
        }
    }
... (1 líneas más)
```

This filter also supports one level of grouping:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter",
    "group_by": "company"
}
```

Respuesta:
```json
{
    "company-4": {
        "label": "Third Client",
        "payments": {
            "5": {
                "id": 5,
                "parent_type": "Invoice",
                "amount": 6693.75,
                "currency_id": 1,
                "status": "paid",
                "created_on": 1430165073,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "updated_on": "2015-04-27 20:04:33",
                "paid_on": 1421107200,
                "comment": "Paid in full",
                "method": "custom",
                "raw_additional_properties": null,
                "invoice_id": 5,
                "invoice_number": "5\/2014",
                "project_id": 0,
                "project_name": "",
                "company_id": 4,
                "company_name": "Third Client",
                "currency_name": "Euro",
                "currency_code": "EUR"
            }
        }
    },
... (107 líneas más)
```

Result of payments report can also be exported:

**`GET /reports/export`** → HTTP 200

Parámetros de query:
```json
{
    "type": "InvoicePaymentsFilter"
}
```

Respuesta:
```json
Payment ID,Amount,Created On,Paid On,Currency Name,Currency Code,Company ID,Company Name,Invoice ID,Invoice Number,Project ID,Project Name,Comment
5,6693.75,2015-04-27,2015-01-13,Euro,EUR,4,Third Client,5,5/2014,0,,Paid in full
1,6693.75,2015-04-27,2014-11-11,Euro,EUR,2,First Client,1,1/2014,1,First Client Project,Paid in full
2,6693.75,2015-04-27,2014-11-11,Euro,EUR,2,First Client,2,2/2014,0,,Paid in full
3,6693.75,2015-04-27,2014-11-11,Euro,EUR,3,Second Client,3,3/2014,2,Second Client Project,Paid in full
4,6693.75,2015-04-27,2014-11-11,Euro,EUR,3,Second Client,4,4/2014,0,,Paid in full
```
