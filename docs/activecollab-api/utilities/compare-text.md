# Compare Text

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/compare-text.html

If you need to compare two texts in your interface, ActiveCollab offers a simple way to achieve that without implementing another diff tool:

**`POST /compare-text`** → HTTP 200

Payload:
```json
{
    "before": "Diff is using character granularity",
    "after": "Diff is using word granularity"
}
```

Respuesta:
```json
{
    "before": "Diff is using character granularity",
    "after": "Diff is using word granularity",
    "diff": "Diff is using <del>character <\/del><ins>word <\/ins>granularity"
}
```

Please note that HTML will be converted to plain text representation and than compared. Diff result is always HTML:

**`POST /compare-text`** → HTTP 200

Payload:
```json
{
    "before": "<p>The quick brown fox<\/p><p><b>jumps<\/b> over the lazy dog<\/p>",
    "after": "<p>The quick grey elephant<\/p><p>jumps over the busy snake<\/p>"
}
```

Respuesta:
```json
{
    "before": "The quick brown fox\n\nJUMPS over the lazy dog",
    "after": "The quick grey elephant\n\njumps over the busy snake",
    "diff": "The quick <del>brown fox<br>\n<br>\nJUMPS <\/del><ins>grey elephant<br>\n<br>\njumps <\/ins>over the <del>lazy dog<\/del><ins>busy snake<\/ins>"
}
```
