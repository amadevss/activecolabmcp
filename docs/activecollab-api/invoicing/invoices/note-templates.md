# Note Templates

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/invoices/note-templates.html

Invoice note templates are useful when you frequently include the same or similar note in your invoices (payment instructions, tax specific details etc). By default, ActiveCollab will not provide any template:

**`GET /invoice-note-templates`** → HTTP 200

Respuesta:
```json
[]
```

You can defined them like this:

**`POST /invoice-note-templates`** → HTTP 200

Payload:
```json
{
    "name": "Payment instructions",
    "content": "Please make payment to this account: ABC"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "InvoiceNoteTemplate",
        "url_path": "\/invoice-note-templates\/1",
        "name": "Payment instructions",
        "content": "Please make payment to this account: ABC",
        "is_default": false
    }
}
```

To update a template, simply send PUT command:

**`PUT /invoice-note-templates/1`** → HTTP 200

Payload:
```json
{
    "content": "Please make payment to this account: XYZ"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "InvoiceNoteTemplate",
        "url_path": "\/invoice-note-templates\/1",
        "name": "Payment instructions",
        "content": "Please make payment to this account: XYZ",
        "is_default": false
    }
}
```

## Default Note Template

ActiveCollab lets you set up a default note template. Default note template can save you time by automatically adding a note to all your new templates. By default, there is no default note template:

**`GET /invoice-note-templates/default`** → HTTP 404

**`PUT /invoice-note-templates/default`** → HTTP 200

Payload:
```json
{
    "invoice_note_template_id": 1
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "InvoiceNoteTemplate",
        "url_path": "\/invoice-note-templates\/1",
        "name": "Payment instructions",
        "content": "Please make payment to this account: XYZ",
        "is_default": true
    }
}
```

To unset default note template, simply send DELETE request:

**`DELETE /invoice-note-templates/default`** → HTTP 200

## Deleting a Note Template

To delete a note template, send DELETE command to /invoice-note-templates/:invoice_note_template_id:

**`DELETE /invoice-note-templates/1`** → HTTP 200
