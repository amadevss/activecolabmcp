# Company Addresses

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/company-addresses.html

ActiveCollab offers a simple API that lets you implement auto-complete for invoice, estimate or recurring profile client. This API will provide all companies defined in the People section (except owner company), plus all companies previously used in invoices, estimates and recurring profiles that are not saved in People section.

To demonstrate this, we have created several invoices, estimate and a recurring profile for different companies:

**`GET /invoices`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 3,
        "class": "Invoice",
        "url_path": "\/invoices\/3",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 0,
        "company_name": "Microsoft Corporation",
        "company_address": "15010 Northeast 36th Street\nRedmond, WA",
        "note": null,
        "currency_id": 0,
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
... (113 líneas más)
```

**`GET /estimates`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Estimate",
        "url_path": "\/estimates\/1",
        "name": "CODE123",
        "comments_count": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "company_id": 0,
        "company_name": "Apple Inc",
        "company_address": "1 Infinite Loop\nCupertino, CA",
        "note": null,
        "currency_id": 0,
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
... (10 líneas más)
```

**`GET /recurring-profiles`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "RecurringProfile",
        "url_path": "\/recurring-profiles\/1",
        "name": "Repeating Invoice",
        "company_id": 0,
        "company_name": "Google Inc",
        "company_address": "1600 Amphitheatre Parkway\nMountain View, CA",
        "note": null,
        "currency_id": 0,
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
        "created_on": 1430164706,
        "created_by_id": 1,
... (16 líneas más)
```

Company addresses that we used can now be accessed using /companies/addresses-for-invoicing:

**`GET /companies/addresses-for-invoicing`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 0,
        "name": "Apple Inc",
        "address": "1 Infinite Loop\nCupertino, CA",
        "timestamp": 1430164706
    },
    {
        "id": 0,
        "name": "Google Inc",
        "address": "1600 Amphitheatre Parkway\nMountain View, CA",
        "timestamp": 1430164706
    },
    {
        "id": 2,
        "name": "Honeydukes",
        "address": "7 High Street\nHogsmeade,UK",
        "timestamp": 1430164704
    },
    {
        "id": 0,
        "name": "Microsoft Corporation",
        "address": "15010 Northeast 36th Street\nRedmond, WA",
        "timestamp": 1430164706
    }
]
```

Notice that system used the latest known address for companies that have multiple invoices, estimates or recurring profiles sent to them (in our example, it was Google Inc, that started in a garage, and now has a global HQ in Mountain View, CA).
