# Variables

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/recurring-profiles/variables.html

For the purpose of this test, we have a client company:

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
        "created_on": 1430164861,
        "created_by_id": 1,
        "updated_on": 1430164861,
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
        "1": 100
    },
    "active_projects_count": 0
}
```

ActiveCollab allows following variables to be used in recurring profile items and notes:

- {day}
- {month}
- {next_month}
- {previous_month}
- {quarter}
- {next_quarter}
- {previous_quarter}
- {year}
- {next_year}
- {previous_year}

**`POST /recurring-profiles`** → HTTP 200

Payload:
```json
{
    "name": "Test Profile",
    "start_on": "2015-04-27",
    "frequency": "daily",
    "occurrences": 1,
    "is_enabled": true,
    "company_id": 2,
    "items": [
        {
            "description": "Quarter of year: {quarter}\/{year}",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Month: {month}",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Today: {day}",
            "quantity": 15,
            "unit_cost": 25
        }
    ],
    "note": "Variables can be used in notes as well. This is previous year: {previous_year}",
    "private_note": "And this is next year: {next_year}"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "RecurringProfile",
        "url_path": "\/recurring-profiles\/1",
        "name": "Test Profile",
        "company_id": 2,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": "Variables can be used in notes as well. This is previous year: {previous_year}",
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
        "created_on": 1430164861,
        "created_by_id": 1,
... (98 líneas más)
```

Now when we trigger the profile, it will create one invoice:

**`POST /recurring-profiles/trigger`** → HTTP 200

Payload:
```json
{
    "date": "2015-04-27"
}
```

Respuesta:
```json
[
    1
]
```

**`GET /invoices/1`** → HTTP 200

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
        "note": "Variables can be used in notes as well. This is previous year: 2014",
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

**`GET /invoices/private-notes`** → HTTP 200

Respuesta:
```json
{
    "1": "And this is next year: 2016"
}
```
