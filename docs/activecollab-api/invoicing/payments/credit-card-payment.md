# Credit Card Payment

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/payments/credit-card-payment.html

Personas in this Story: Default, Client.

For the purpose of this test, we have configured ActiveCollab to accept credit card payments via Stripe:

**`GET /payment-gateways`** → HTTP 200

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 1,
        "class": "StripeGateway",
        "url_path": "#",
        "is_live": false,
        "api_key": "sk_test_REDACTED"
    }
}
```

To test payments, first we need to create an invoice:

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

Recipients will get an email with a link that will laed them to public invoice page where they can make a payment:

**`GET /s/invoice`** → HTTP 200 _(como Client)_

Parámetros de query:
```json
{
    "number": "1\/2014",
    "hash": "$first_invoice_hash"
}
```

Respuesta:
```json
{
    "invoice": {
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
... (186 líneas más)
```

Lets try to make a partial payment:

**`PUT /s/invoice`** → HTTP 400 _(como Client)_

Parámetros de query:
```json
{
    "number": "1\/2014",
    "hash": "$first_invoice_hash"
}
```

Payload:
```json
{
    "amount": 123.4,
    "card_number": "4242 4242 4242 4242",
    "name_on_card": "John Doe",
    "expiration_month": 12,
    "expiration_year": 2014,
    "security_code": 123
}
```

That request is rejected because system does not allow partial payments. Lets try the full payment:

**`PUT /s/invoice`** → HTTP 200 _(como Client)_

Parámetros de query:
```json
{
    "number": "1\/2014",
    "hash": "$first_invoice_hash"
}
```

Payload:
```json
{
    "amount": 6693.75,
    "name_on_card": "John Doe",
    "card_number": "4242 4242 4242 4242",
    "expiration_month": 12,
    "expiration_year": 2020,
    "security_code": 123
}
```

Respuesta:
```json
{
    "invoice": {
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
... (206 líneas más)
```

To download the invoice that we just paid, send download query variable:

**`GET /s/invoice`** → HTTP 200 _(como Client)_

Parámetros de query:
```json
{
    "number": "1\/2014",
    "hash": "$first_invoice_hash",
    "download": true
}
```

Respuesta:
```json
(contenido binario omitido: el endpoint devuelve un archivo)
```
