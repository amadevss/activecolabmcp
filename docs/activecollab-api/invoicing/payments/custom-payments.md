# Custom Payments

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/payments/custom-payments.html

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
        "created_on": 1430164820,
        "created_by_id": 1,
        "updated_on": 1430164820,
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

There are no payments made for this invoice. We can double check:

**`GET /payments`** → HTTP 200

Respuesta:
```json
[]
```

By adding 6693.75 we will mark this invoice as paid:

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 1,
    "amount": 6693.75,
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
        "created_on": 1430164822,
        "created_by_id": 1,
        "updated_on": 1430164822,
        "amount": 6693.75,
        "status": "paid",
        "paid_on": 1430164822,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

Lets check if payment was properly recorded and that invoice status has been changed:

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
        "paid_amount": 6693.75,
        "balance_due": 0,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (127 líneas más)
```

On a side note, invoice that is marked as paid will no longer be available in /invoices list, but moved to archive:

**`GET /invoices`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /invoices/archive`** → HTTP 200

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
        "paid_amount": 6693.75,
        "balance_due": 0,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (19 líneas más)
```

If we update the payment, so it is not the full amount:

**`PUT /payments/1`** → HTTP 200

Payload:
```json
{
    "amount": 3693.75
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
        "created_on": 1430164822,
        "created_by_id": 1,
        "updated_on": 1430164823,
        "amount": 3693.75,
        "status": "paid",
        "paid_on": 1430092800,
        "currency_id": 1,
        "method": "custom",
        "comment": "Paid in full",
        "additional_properties": []
    }
}
```

invoice should pick up the change:

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
        "paid_amount": 3693.75,
        "balance_due": 3000,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (127 líneas más)
```

Finally, when we drop the payment:

**`DELETE /payments/1`** → HTTP 200

Respuesta:
```json
null
```

invoice should be updated accordingly:

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

Finally, lets test if payments are dropped when invoice is deleted. Lets start by adding two payments:

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 1,
    "amount": 3693.75
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
        "parent_id": 1,
        "created_on": 1430164823,
        "created_by_id": 1,
        "updated_on": 1430164823,
        "amount": 3693.75,
        "status": "paid",
        "paid_on": 1430164823,
        "currency_id": 1,
        "method": "custom",
        "comment": null,
        "additional_properties": []
    }
}
```

**`POST /payments`** → HTTP 200

Payload:
```json
{
    "parent_type": "Invoice",
    "parent_id": 1,
    "amount": 3000
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
        "parent_id": 1,
        "created_on": 1430164824,
        "created_by_id": 1,
        "updated_on": 1430164824,
        "amount": 3000,
        "status": "paid",
        "paid_on": 1430164824,
        "currency_id": 1,
        "method": "custom",
        "comment": null,
        "additional_properties": []
    }
}
```

With these two payments, we should of paid the invoice in full:

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
        "paid_amount": 6693.75,
        "balance_due": 0,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (144 líneas más)
```

Payments should return both payments:

**`GET /payments`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 3,
        "class": "Payment",
        "url_path": "\/payments\/3",
        "parent_type": "Invoice",
        "parent_id": 1,
        "created_on": 1430164824,
        "created_by_id": 1,
        "updated_on": 1430164824,
        "amount": 3000,
        "status": "paid",
        "paid_on": 1430164824,
        "currency_id": 1,
        "method": "custom",
        "comment": null,
        "additional_properties": []
    },
    {
        "id": 2,
        "class": "Payment",
        "url_path": "\/payments\/2",
        "parent_type": "Invoice",
        "parent_id": 1,
        "created_on": 1430164823,
        "created_by_id": 1,
        "updated_on": 1430164823,
        "amount": 3693.75,
        "status": "paid",
        "paid_on": 1430164823,
... (6 líneas más)
```

Now, lets cancel the invoice:

**`PUT /invoices/1/cancel`** → HTTP 200

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

and check payments again:

**`GET /payments`** → HTTP 200

Respuesta:
```json
[]
```
