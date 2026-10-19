# Config Options

> Fuente: https://developers.activecollab.com/api-documentation/v1/config-options.html

To get a list of options and their default values, simply send GET request to /config-options path and provide a comma separated list of option names:

**`GET /config-options`** → HTTP 200

Parámetros de query:
```json
{
    "names": "notifications_user_send_morning_paper,morning_paper_last_activity"
}
```

Respuesta:
```json
{
    "notifications_user_send_morning_paper": true
}
```

Notice that options that are not available via API are not listed. Only options that can be accessed via API will be returned.

To update default values, you can PUT new values:

**`PUT /config-options`** → HTTP 200

Payload:
```json
{
    "notifications_user_send_morning_paper": false,
    "morning_paper_last_activity": false
}
```

Respuesta:
```json
{
    "notifications_user_send_morning_paper": false
}
```

Protected options (like morning_paper_last_activity are ignored).

To get user specific values, send GET request to /personalized-config-options:

**`GET /personalized-config-options`** → HTTP 200

Parámetros de query:
```json
{
    "names": "notifications_user_send_morning_paper"
}
```

Respuesta:
```json
{
    "notifications_user_send_morning_paper": false
}
```

In this request, we got default value. Lets save a value just for us:

**`PUT /personalized-config-options`** → HTTP 200

Payload:
```json
{
    "notifications_user_send_morning_paper": true
}
```

Respuesta:
```json
{
    "notifications_user_send_morning_paper": true
}
```

Now, lets confirm that the default value remained the same:

**`GET /config-options`** → HTTP 200

Parámetros de query:
```json
{
    "names": "notifications_user_send_morning_paper"
}
```

Respuesta:
```json
{
    "notifications_user_send_morning_paper": false
}
```
