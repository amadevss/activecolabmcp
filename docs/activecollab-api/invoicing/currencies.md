# Currencies

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/currencies.html

ActiveCollab ships with following currencies predefined:

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

Default currency is pre-selected in invoice and expense forms. It can be listed and set using /currencies/default:

**`GET /currencies/default`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Currency",
        "url_path": "\/currencies\/2",
        "name": "US Dollar",
        "updated_on": null,
        "code": "USD",
        "is_default": true,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    }
}
```

**`PUT /currencies/default`** → HTTP 200

Payload:
```json
{
    "currency_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Currency",
        "url_path": "\/currencies\/1",
        "name": "Euro",
        "updated_on": 1430164713,
        "code": "EUR",
        "is_default": true,
        "decimal_spaces": 2,
        "decimal_rounding": 0
    }
}
```
