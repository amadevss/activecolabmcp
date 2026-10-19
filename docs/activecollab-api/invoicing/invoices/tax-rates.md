# Tax Rates

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/tax-rates.html

Tax rates are used to specify taxes that will be used when creating invoices. By default, ActiveCollab ships an example tax rate:

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

The rate is not good, so we'll adjust it:

**`PUT /tax-rates/1`** → HTTP 200

Payload:
```json
{
    "percentage": 22
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/1",
        "name": "VAT",
        "percentage": 22,
        "is_default": false
    }
}
```

Lets add two more tax rates:

**`POST /tax-rates`** → HTTP 200

Payload:
```json
{
    "name": "ADD1",
    "percentage": 5
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/2",
        "name": "ADD1",
        "percentage": 5,
        "is_default": false
    }
}
```

**`POST /tax-rates`** → HTTP 200

Payload:
```json
{
    "name": "ADD2",
    "percentage": 4.5
}
```

Respuesta:
```json
{
    "single": {
        "id": 3,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/3",
        "name": "ADD2",
        "percentage": 4.5,
        "is_default": false
    }
}
```

Now we'll create a new invoice and use `VAT`, to demonstrate that used tax rates can't be updated or deleted:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 0,
    "company_name": "Client Company GmbH",
    "company_address": "Street Name 12\nCity",
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
            "first_tax_rate_id": 2
        },
        {
            "description": "Third item",
            "quantity": 15,
            "unit_cost": 25
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
        "company_id": 0,
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 0,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 6125,
        "subtotal_without_discount": 6125,
        "discount": 0,
        "tax": 162.5,
        "rounding_difference": 0,
        "rounded_total": 6287.5,
        "total": 6287.5,
        "paid_amount": 0,
        "balance_due": 6287.5,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

Note that rate of a tax that is already used in an invoice can't be changed:

**`PUT /tax-rates/2`** → HTTP 200

Payload:
```json
{
    "percentage": 18
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/2",
        "name": "ADD1",
        "percentage": 5,
        "is_default": false
    }
}
```

ActiveCollab will not throw an error, but it will ignore the change. We recommend that you add a new tax record.

## Default Tax Rate

ActiveCollab lets you set up a tax rate that will be set as invoice it's tax rate by default. This feature is off by default:

**`GET /tax-rates/default`** → HTTP 404

**`PUT /tax-rates/default`** → HTTP 200

Payload:
```json
{
    "tax_rate_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/1",
        "name": "VAT",
        "percentage": 22,
        "is_default": true
    }
}
```

To unset default tax rate, simply send DELETE request:

**`DELETE /tax-rates/default`** → HTTP 200

## Deleting a Tax Rate

To delete a tax rate, send DELETE command to /tax-rates/:tax_rate_id. Note that default tax rate can't be deleted:

**`PUT /tax-rates/default`** → HTTP 200

Payload:
```json
{
    "tax_rate_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaxRate",
        "url_path": "\/tax-rates\/1",
        "name": "VAT",
        "percentage": 22,
        "is_default": true
    }
}
```

**`DELETE /tax-rates/1`** → HTTP 404

Tax rates that are used in invoices can't be deleted:

**`DELETE /tax-rates/2`** → HTTP 404

Unused tax rates can be deleted:

**`DELETE /tax-rates/3`** → HTTP 200
