# Supported Currency

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/payments/supported-currency.html

Personas in this Story: Default, Client.

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "BrainTreeGateway",
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "456"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 1,
        "class": "BrainTreeGateway",
        "url_path": "#",
        "is_live": false,
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "456"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "paypal": {
        "type": "PaypalExpressCheckoutGateway",
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

Respuesta:
```json
{
    "paypal": {
        "id": 2,
        "class": "PaypalExpressCheckoutGateway",
        "url_path": "#",
        "is_live": false,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    },
    "credit_card": {
        "id": 1,
        "class": "BrainTreeGateway",
        "url_path": "#",
        "is_live": false,
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "456"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

For the purpose of this test, we have configured ActiveCollab to accept credit card payments via Stripe:

**`GET /payment-gateways`** → HTTP 200

Respuesta:
```json
{
    "paypal": {
        "id": 2,
        "class": "PaypalExpressCheckoutGateway",
        "url_path": "#",
        "is_live": false,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    },
    "credit_card": {
        "id": 1,
        "class": "BrainTreeGateway",
        "url_path": "#",
        "is_live": false,
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "456"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

To test payments, first we need to create an invoice:

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

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "currency_id": 1,
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

If we update the invoice to use USD instead of EUR:

**`PUT /invoices/1`** → HTTP 200

Payload:
```json
{
    "currency_id": 2
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
        "currency_id": 2,
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

System should properly enable credit card payments because our gateway can accept them:

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
        "currency_id": 2,
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

If we disable PayPal gateway:

**`DELETE /payment-gateways/clear-paypal`** → HTTP 200

system will also disable payments via PayPal:

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
        "currency_id": 2,
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
