# Estimates

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/estimates/estimates.html

We start with an empty list of estimates:

**`GET /estimates`** → HTTP 200

Respuesta:
```json
[]
```

A potential client asked us to prepare a quote for a project. Lets create it:

**`POST /estimates`** → HTTP 200

Payload:
```json
{
    "name": "CODE123",
    "company_name": "Client Company GmbH",
    "company_address": "Street Name 12\nCity",
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
    "private_note": "Client will not be able to see this private estimate note"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Estimate",
        "url_path": "\/estimates\/1",
        "name": "CODE123",
        "comments_count": 0,
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
... (94 líneas más)
```

**`GET /estimates/private-notes`** → HTTP 200

Respuesta:
```json
{
    "1": "Client will not be able to see this private estimate note"
}
```

Now that the estimate is ready, we can download a test PDF to confirm how it will look like when it gets email to the client:

**`GET /estimates/1/export`** → HTTP 200

Respuesta:
```json
(contenido binario omitido: el endpoint devuelve un archivo)
```

Lets send this invoice to the client:

**`PUT /estimates/1/send`** → HTTP 200

Payload:
```json
{
    "recipients": [
        "client1@activecollab.com",
        "client2@activecollab.com"
    ],
    "subject": "Estimate for you",
    "message": "Here's an estimate for you"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Estimate",
        "url_path": "\/estimates\/1",
        "name": "CODE123",
        "comments_count": 0,
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
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": "client1 <client1@activecollab.com>, client2 <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Estimate for you",
        "email_body": "Here's an estimate for you",
... (94 líneas más)
```

Client just let us know that they want to proceed with this project. We'll mark this estimate as won:

**`PUT /estimates/1`** → HTTP 200

Payload:
```json
{
    "status": "won"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Estimate",
        "url_path": "\/estimates\/1",
        "name": "CODE123",
        "comments_count": 0,
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
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": "client1 <client1@activecollab.com>, client2 <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Estimate for you",
        "email_body": "Here's an estimate for you",
... (94 líneas más)
```

and create a new project:

**`POST /projects`** → HTTP 200

Payload:
```json
{
    "name": "New Project",
    "company_id": 1,
    "leader_id": 1,
    "estimate_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164723,
        "created_by_id": 1,
        "updated_on": 1430164723,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": "Estimate",
        "based_on_id": 1,
        "email": "notifications+m2p-RylFCt7@mail.manageprojects.com",
... (15 líneas más)
```

Won and lost estimates are automatically moved to archive:

**`GET /estimates`** → HTTP 200

Respuesta:
```json
[]
```

**`GET /estimates/archive`** → HTTP 200

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
        "company_name": "Client Company GmbH",
        "company_address": "Street Name 12\nCity",
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
        "recipients": "client1 <client1@activecollab.com>, client2 <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Estimate for you",
        "email_body": "Here's an estimate for you",
... (10 líneas más)
```

Since we no longer need this estimate, we can delete it:

**`DELETE /estimates/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Estimate",
        "url_path": "\/estimates\/1",
        "name": "CODE123",
        "comments_count": 0,
        "is_trashed": true,
        "trashed_on": 1430164724,
        "trashed_by_id": 1,
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
        "tax": 568.75,
        "rounding_difference": 0,
        "rounded_total": 6693.75,
        "total": 6693.75,
        "paid_amount": 0,
        "balance_due": 6693.75,
        "recipients": "client1 <client1@activecollab.com>, client2 <client2@activecollab.com>",
        "email_from": 1,
        "email_subject": "Estimate for you",
        "email_body": "Here's an estimate for you",
... (94 líneas más)
```

Lets check if project that we create from this quote is "released":

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "New Project",
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "members": [
            1
        ],
        "category_id": 0,
        "label_id": 0,
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "created_on": 1430164723,
        "created_by_id": 1,
        "updated_on": 1430164723,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": "Estimate",
        "based_on_id": 1,
        "email": "notifications+m2p-RylFCt7@mail.manageprojects.com",
... (15 líneas más)
```
