# Search

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/search.html

Personas in this Story: Default, FinancialManager, Member, Client.

For the purpose of this test, we have a couple of users (owner, financial manager, regular member and a client) and a client company:

**`GET /users`** → HTTP 200

Respuesta:
```json
[
    {
        "id": 1,
        "class": "Owner",
        "url_path": "\/users\/1",
        "is_archived": false,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164786,
        "created_by_id": 1,
        "updated_on": 1430164786,
        "updated_by_id": 1,
        "language_id": 0,
        "first_name": "Ilija.studen",
        "last_name": null,
        "display_name": "ilija.studen",
        "short_display_name": "ilija.studen",
        "email": "ilija.studen@activecollab.com",
        "additional_email_addresses": [],
        "is_pending_activation": false,
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=1&size=--SIZE--&timestamp=1430164786",
        "custom_permissions": [],
        "company_id": 1,
        "title": null,
        "phone": null,
        "im_type": null,
        "im_handle": null,
        "note": null
    },
... (90 líneas más)
```

**`GET /companies/2`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "Company",
        "url_path": "\/companies\/2",
        "name": "ACME Inc",
        "members": [
            4
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "is_archived": false,
        "created_on": 1430164788,
        "created_by_id": 1,
        "updated_on": 1430164788,
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

Lets create an invoice:

**`POST /invoices`** → HTTP 200

Payload:
```json
{
    "company_id": 2,
    "number": "1\/2014",
    "items": [
        {
            "description": "Managing Humans: Biting and Humorous Tales of a Software Engineering Manager",
            "quantity": 1,
            "unit_cost": 17.91
        },
        {
            "description": "Hyperion (Hyperion Cantos)",
            "quantity": 1,
            "unit_cost": 4.83
        },
        {
            "description": "I'm Feeling Lucky: The Confessions of Google Employee Number 59",
            "quantity": 1,
            "unit_cost": 6.38
        }
    ],
    "private_note": "Comlog, a rare term used in the private note"
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
        "company_name": "ACME Inc",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 29.12,
        "subtotal_without_discount": 29.12,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 29.12,
        "total": 29.12,
        "paid_amount": 0,
        "balance_due": 29.12,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (109 líneas más)
```

Search should return the invoice when serched for client details:

**`GET /search?q=ACME`** → HTTP 200

Respuesta:
```json
[]
```

A term from the notes:

**`GET /search?q=comlog`** → HTTP 200

Respuesta:
```json
[]
```

Or a term from the items:

**`GET /search?q=hyperion`** → HTTP 200

Respuesta:
```json
[]
```

Financial manager will also be able to find this invoice using the search:

**`GET /search?q=hyperion`** → HTTP 200 _(como FinancialManager)_

Respuesta:
```json
[]
```

but member (who does not have permissions to manage finances) and client will not be able to access it:

**`GET /search?q=hyperion`** → HTTP 200 _(como Member)_

Respuesta:
```json
[]
```

**`GET /search?q=hyperion`** → HTTP 200 _(como Client)_

Respuesta:
```json
[]
```

By mistake, we added the wrong book to the invoice. Here are corrections:

**`PUT /invoices/1`** → HTTP 200

Payload:
```json
{
    "items": [
        {
            "id": 1,
            "description": "Managing Humans: Biting and Humorous Tales of a Software Engineering Manager",
            "quantity": 1,
            "unit_cost": 17.91
        },
        {
            "id": 2,
            "description": "The Rise of Endymion (Hyperion)",
            "quantity": 1,
            "unit_cost": 7.19
        },
        {
            "id": 3,
            "description": "I'm Feeling Lucky: The Confessions of Google Employee Number 59",
            "quantity": 1,
            "unit_cost": 6.38
        },
        {
            "description": "Endymion (Hyperion Cantos, Bk. 3)",
            "quantity": 1,
            "unit_cost": 7.19
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
        "company_name": "ACME Inc",
        "company_address": "Street Name 12\nCity",
        "note": null,
        "currency_id": 1,
        "language_id": 0,
        "discount_rate": 0,
        "subtotal": 38.67,
        "subtotal_without_discount": 38.67,
        "discount": 0,
        "tax": 0,
        "rounding_difference": 0,
        "rounded_total": 38.67,
        "total": 38.67,
        "paid_amount": 0,
        "balance_due": 38.67,
        "recipients": null,
        "email_from": null,
        "email_subject": null,
        "email_body": null,
        "second_tax_is_enabled": false,
        "second_tax_is_compound": false,
... (137 líneas más)
```

Search index should work just fine even after this update, even for terms that we just added:

**`GET /search?q=endymion`** → HTTP 200

Respuesta:
```json
[]
```
