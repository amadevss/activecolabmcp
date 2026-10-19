# Discounts

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/discounts.html

When you create a new invoice, you can sepficy a discount rate. This rate is a value between 0 and 100 and it is applied to all invoice items, priour to them being taxed. Lets create an invoice with 15% discount:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "1\/2014",
    "discount_rate": 15,
    "items": [
        {
            "description": "First item",
            "quantity": 100,
            "unit_cost": 25
        },
        {
            "description": "Second item",
            "quantity": 250,
            "unit_cost": 100,
            "first_tax_rate_id": 1
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
        "discount_rate": 15,
        "subtotal": 23375,
        "subtotal_without_discount": 27500,
        "discount": 4125,
        "tax": 3718.75,
        "rounding_difference": 0,
        "rounded_total": 27093.75,
        "total": 27093.75,
        "paid_amount": 0,
        "balance_due": 27093.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (81 líneas más)
```

If we update the discount rate, it will propagate to the items:

**`PUT /invoices/1`** → HTTP 200

Payload:
```json
{
    "discount_rate": 25
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
        "discount_rate": 25,
        "subtotal": 20625,
        "subtotal_without_discount": 27500,
        "discount": 6875,
        "tax": 3281.25,
        "rounding_difference": 0,
        "rounded_total": 23906.25,
        "total": 23906.25,
        "paid_amount": 0,
        "balance_due": 27093.75,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (81 líneas más)
```
