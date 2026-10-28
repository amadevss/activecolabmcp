# Recurring Profiles

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/recurring-profiles/recurring-profiles.html

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
        "created_on": 1430164848,
        "created_by_id": 1,
        "updated_on": 1430164848,
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

Lets create a recurring profile:

**`POST /recurring-profiles`** → HTTP 200

Payload:
```json
{
    "name": "Test Profile",
    "start_on": "2015-04-27",
    "frequency": "daily",
    "occurrences": 2,
    "company_id": 2,
    "items": [
        {
            "description": "First itm",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second itm",
            "quantity": 250,
            "unit_cost": 13,
            "first_tax_rate_id": 1
        },
        {
            "description": "Third itm",
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
        "class": "RecurringProfile",
        "url_path": "\/recurring-profiles\/1",
        "name": "Test Profile",
        "company_id": 2,
        "company_name": "Client Company GmbH",
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
        "created_on": 1430164848,
        "created_by_id": 1,
... (98 líneas más)
```

As we can see, this profile is disabled. This means that no new invoices will be created based on it, even if we try to issue reucrring invoices that are due today:

**`POST /recurring-profiles/trigger`** → HTTP 200

Payload:
```json
{
    "date": "2015-04-27"
}
```

Respuesta:
```json
[]
```

We should enable the profile:

**`PUT /recurring-profiles/1`** → HTTP 200

Payload:
```json
{
    "is_enabled": true
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
        "created_on": 1430164848,
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
        "note": "",
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

Lets check the profile properties. Notice that triggered_number is now 1:

**`GET /recurring-profiles/1`** → HTTP 200

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
        "created_on": 1430164848,
        "created_by_id": 1,
... (100 líneas más)
```

Now, one more, but for tomorrow:

**`POST /recurring-profiles/trigger`** → HTTP 200

Payload:
```json
{
    "date": "2015-04-28"
}
```

Respuesta:
```json
[
    2
]
```

**`GET /invoices/2`** → HTTP 200

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
        "note": "",
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

**`GET /recurring-profiles/1`** → HTTP 200

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
        "created_on": 1430164848,
        "created_by_id": 1,
... (101 líneas más)
```

When recurring profile is deleted:

**`DELETE /recurring-profiles/1`** → HTTP 200

Profile should be gone, and relation with invoices that profile deleted released (invoices are not deleted):

**`GET /recurring-profiles/1`** → HTTP 404

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
        "note": "",
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

**`GET /invoices/2`** → HTTP 200

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
        "note": "",
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
