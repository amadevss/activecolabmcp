# Invoice From Time and Expenses

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/invoice-from-time-and-expenses.html

For the purpose of this test, we have created a project and tracked some time on it (4 billable and 3 unbillable hours):

**`GET /projects/1/time-records`** → HTTP 200

Respuesta:
```json
{
    "time_records": [
        {
            "id": 3,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
            "value": 3,
            "record_date": 1400198400,
            "summary": "Non-billable task time record",
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164747,
            "created_by_id": 1,
            "updated_on": 1430164747,
            "updated_by_id": 1,
            "job_type_id": 1
        },
        {
            "id": 2,
            "class": "TimeRecord",
            "url_path": "\/projects\/1\/time-records\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 1,
... (112 líneas más)
```

at rate of US$150 per hour that we have for this client:

**`GET /companies/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company GmbH",
        "members": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164746,
        "created_by_id": 1,
        "updated_on": 1430164746,
        "updated_by_id": 1,
        "address": "Street Name 12\nCity",
        "phone": null,
        "homepage_url": null,
        "tax_id": null,
        "currency_id": 1,
        "is_owner": false,
        "has_note": false
    },
    "hourly_rates": {
        "1": 150
    },
    "active_projects_count": 1
}
```

we expect to make US$600.

We also tracked some project expenses that are not time related (US$630.50 in billable and US$125.25 in unbillable expenses):

**`GET /projects/1/expenses`** → HTTP 200

Respuesta:
```json
{
    "expenses": [
        {
            "id": 3,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/3",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
            "billable_status": 0,
            "value": 125.25,
            "record_date": 1400198400,
            "summary": "Non-billable task expense",
            "user_id": 1,
            "parent_type": "Task",
            "parent_id": 1,
            "created_on": 1430164748,
            "created_by_id": 1,
            "updated_on": 1430164748,
            "updated_by_id": 1,
            "category_id": 1,
            "currency_id": 1
        },
        {
            "id": 2,
            "class": "Expense",
            "url_path": "\/projects\/1\/expenses\/2",
            "is_trashed": false,
            "trashed_on": null,
            "trashed_by_id": 0,
... (115 líneas más)
```

To create an invoice based on tracked time and expenses, we send POST request to `/invoices` resources with `items_from_tracked_data` properly set:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "1\/2014",
    "items_from_tracked_data": {
        "project_ids": [
            1
        ],
        "include_time_records": true
    }
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
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 600,
        "subtotal_without_discount": 600,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 600,
        "total": 600,
        "paid_amount": 0,
        "balance_due": 600,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (126 líneas más)
```

Lets release time records from this invoice, so we can use them for a new invoice:

**`DELETE /invoices/1/related-records`** → HTTP 200

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
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 600,
        "subtotal_without_discount": 600,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 600,
        "total": 600,
        "paid_amount": 0,
        "balance_due": 600,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (85 líneas más)
```

Lets create an invoice with expenses included:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "2\/2014",
    "items_from_tracked_data": {
        "project_ids": [
            1
        ],
        "include_time_records": true,
        "include_expenses": true
    }
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
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 1230.5,
        "subtotal_without_discount": 1230.5,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 1230.5,
        "total": 1230.5,
        "paid_amount": 0,
        "balance_due": 1230.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (229 líneas más)
```

We will release related records again, in order to test project grouping:

**`DELETE /invoices/2/related-records`** → HTTP 200

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
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 1230.5,
        "subtotal_without_discount": 1230.5,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 1230.5,
        "total": 1230.5,
        "paid_amount": 0,
        "balance_due": 1230.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (145 líneas más)
```

This invoice will be created with records grouped by project.

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "3\/2014",
    "items_from_tracked_data": {
        "project_ids": [
            1
        ],
        "include_time_records": true,
        "include_expenses": true,
        "sum_by": "sum_all_by_project"
    }
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
        "company_id": 2,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 1230.5,
        "subtotal_without_discount": 1230.5,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 1230.5,
        "total": 1230.5,
        "paid_amount": 0,
        "balance_due": 1230.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (171 líneas más)
```

Please notice `sum_by` parameter in the previous request. This parameter can have one of the following values:

- `sum_all` - Sum all records as a single invoice item,
- `sum_all_by_project` - Sum all records and as them groupe by project,
- `sum_all_by_task` - Sum all records based on their tasks. Non-task related records are grouped per project,
- `sum_records_by_job_type` - Sum time records based on their job type. Expenses go as a separate line item,
- `keep_records_as_separate_invoice_items` - Each time record and expense will have their own line item.

Lets try group by task option. Before that, we need to release time records and expenses:

**`DELETE /invoices/3/related-records`** → HTTP 200

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
        "company_id": 2,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 1230.5,
        "subtotal_without_discount": 1230.5,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 1230.5,
        "total": 1230.5,
        "paid_amount": 0,
        "balance_due": 1230.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (87 líneas más)
```

Now we'll set `sum_by` to `sum_all_by_task` and create a new invoice:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "4\/2014",
    "items_from_tracked_data": {
        "project_ids": [
            1
        ],
        "include_time_records": true,
        "include_expenses": true,
        "sum_by": "sum_all_by_task"
    }
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
        "company_id": 2,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 1230.5,
        "subtotal_without_discount": 1230.5,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 1230.5,
        "total": 1230.5,
        "paid_amount": 0,
        "balance_due": 1230.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (200 líneas más)
```
