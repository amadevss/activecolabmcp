# Invoices

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/invoices.html

Personas in this Story: Default, Client1, Client2.

System starts with an empty list of invoices:

**`GET /invoices`** → HTTP 200

Respuesta:
```json
[]
```

But we have a couple of currencies defined:

**`GET /currencies`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 3,
        "class": "Currency",
        "url_path": "\/currencies\/3",
        "name": "British Pound",
        "updated_on": null,
        "code": "GBP",
        "is_default": false,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    },
    {
        "id": 1,
        "class": "Currency",
        "url_path": "\/currencies\/1",
        "name": "Euro",
        "updated_on": null,
        "code": "EUR",
        "is_default": false,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    },
    {
        "id": 4,
        "class": "Currency",
        "url_path": "\/currencies\/4",
        "name": "Japanese Yen",
        "updated_on": null,
        "code": "JPY",
... (16 líneas más)
```

As well as a default tax rate:

**`GET /tax-rates`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/1",
        "name": "VAT",
        "percentage": 17.5,
        "is_default": false
    }
]
```

For the purpose of this test, we have a client company with two members:

**`GET /companies/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "Client Company GmbH",
        "members": [
            2,
            3
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164757,
        "created_by_id": 1,
        "updated_on": 1430164757,
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
... (1 líneas más)
```

but there's no invoices sent to that company:

**`GET /companies/2/invoices`** → HTTP 200

Respuesta:
```json
[]
```

Lets create an invoice:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
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
... (109 líneas más)
```

As we can see, invoice is created and its `status` is `issued`. There are three possible invoice statuses:

- `issued`
- `paid`
- `canceled`

This invoice is now also available under `/companies/2/invoices`:

**`GET /companies/2/invoices`** → HTTP 200

Respuesta:
```json
[
    {
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
... (19 líneas más)
```

Also note that there is no `private_note` in this response. That is because this property is protected and you need to send a separate request to get it. To fetch private notes, you will need to call `/invoices/private-notes` command and it will return a map of invoice ID-s and their private notes:

**`GET /invoices/private-notes`** → HTTP 200

Respuesta:
```json
{
    "1": "Client will not be able to see this"
}
```

To illustrate how this info is protected, lets try to fetch this info as a client:

**`GET /invoices/private-notes`** → HTTP 404 _(como Client1)_

Before sending this invoice to our client, we need to make some changes. First two items are not correct, so we will remove them (by ommiting them in the request), what is our third item now becomes second item and we need to add one item before it and two after it. Here is how we would structure that request:

**`PUT /invoices/1`** → HTTP 200

Payload:
```json
{
    "items": [
        {
            "description": "New First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "id": 3,
            "description": "Third item, old, but updated",
            "quantity": 20,
            "unit_cost": 25,
            "first_tax_rate_id": 1
        },
        {
            "description": "New Third item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "New Fourth item",
            "quantity": 15,
            "unit_cost": 35
        }
    ]
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
        "subtotal": 6025,
        "subtotal_without_discount": 6025,
        "discount": 0,
        "tax": 87.5,
        "rounding_difference": 0,
        "rounded_total": 6112.5,
        "total": 6112.5,
        "paid_amount": 0,
        "balance_due": 6112.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (137 líneas más)
```

Now that the invoice is ready, we can download a test PDF to confirm how it will look like when it gets email to the client:

**`GET /invoices/1/export`** → HTTP 200

Respuesta:
```json
(contenido binario omitido: el endpoint devuelve un archivo)
```

Lets send this invoice to the client:

**`PUT /invoices/1/send`** → HTTP 200

Payload:
```json
{
    "recipients": [
        "client1@activecollab.com",
        "client2@activecollab.com"
    ],
    "subject": "Invoice for you",
    "message": "Here's an invoice for you",
    "allow_payments": 2
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
        "subtotal": 6025,
        "subtotal_without_discount": 6025,
        "discount": 0,
        "tax": 87.5,
        "rounding_difference": 0,
        "rounded_total": 6112.5,
        "total": 6112.5,
        "paid_amount": 0,
        "balance_due": 6112.5,
        "recipients": "Peter Smith <client1@activecollab.com>, Joe Black <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Invoice for you",
        "email_body": "Here's an invoice for you",
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (137 líneas más)
```

Both clients should have received this notification:

**`GET /notifications`** → HTTP 200 _(como Client1)_

Respuesta:
```json
{
    "notifications": [
        {
            "id": 1,
            "class": "SendInvoiceNotification",
            "url_path": "\/notifications\/1",
            "parent_type": "Invoice",
            "parent_id": 1,
            "created_on": 1430164761,
            "sender_id": 1
        }
    ],
    "related": {
        "Invoice": {
            "1": {
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
                "subtotal": 6025,
                "subtotal_without_discount": 6025,
... (34 líneas más)
```

**`GET /notifications`** → HTTP 200 _(como Client2)_

Respuesta:
```json
{
    "notifications": [
        {
            "id": 1,
            "class": "SendInvoiceNotification",
            "url_path": "\/notifications\/1",
            "parent_type": "Invoice",
            "parent_id": 1,
            "created_on": 1430164761,
            "sender_id": 1
        }
    ],
    "related": {
        "Invoice": {
            "1": {
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
                "subtotal": 6025,
                "subtotal_without_discount": 6025,
... (34 líneas más)
```

Handy feature or the invoicing module is that you can easily duplicate invoices, so you can reuse the ones that you frequently send without re-entering the data:

**`POST /invoices/1/duplicate`** → HTTP 200

Payload:
```json
{
    "number": "2\/2014"
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
        "subtotal": 6025,
        "subtotal_without_discount": 6025,
        "discount": 0,
        "tax": 87.5,
        "rounding_difference": 0,
        "rounded_total": 6112.5,
        "total": 6112.5,
        "paid_amount": 0,
        "balance_due": 6112.5,
        "recipients": "Peter Smith <client1@activecollab.com>, Joe Black <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Invoice for you",
        "email_body": "Here's an invoice for you",
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (137 líneas más)
```

Lets delete the invoice:

**`DELETE /invoices/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Invoice",
        "url_path": "\/invoices\/1",
        "is_trashed": true,
        "trashed_on": 1430164765,
        "trashed_by_id": 1,
        "company_id": 2,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6025,
        "subtotal_without_discount": 6025,
        "discount": 0,
        "tax": 87.5,
        "rounding_difference": 0,
        "rounded_total": 6112.5,
        "total": 6112.5,
        "paid_amount": 0,
        "balance_due": 6112.5,
        "recipients": "Peter Smith <client1@activecollab.com>, Joe Black <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Invoice for you",
        "email_body": "Here's an invoice for you",
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (137 líneas más)
```
