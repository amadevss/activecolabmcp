# Initial

> Fuente: https://developers.activecollab.com/api-documentation/v1/initial.html

Personas in this Story: Default, Client.

`initial` command bundles up a lot of data that you might need when you are starting, in a single command. These collections and settings are not personalised, but global and don't change frequently. Collection itself is etagged, so it is recommended for your client to cache it and check for modifications:

**`GET /initial`** → HTTP 200

Respuesta:
```json
{
    "settings": {
        "identity_name": "Application",
        "on_demand": false,
        "built_in_language": {
            "id": 1,
            "class": "Language",
            "url_path": "\/languages\/1",
            "name": "English",
            "updated_on": 1430163976,
            "locale": "en_US.UTF-8",
            "is_default": true
        },
        "default_currency_id": 2,
        "default_labels_name_max_length": 30,
        "gd_loaded": true,
        "wallpaper_url": "http:\/\/feather.dev\/wallpapers\/--WALLPAPER--",
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=--USER-ID--&size=--SIZE--&timestamp=--UPDATED-ON--",
        "show_visual_editor_toolbar": false,
        "timezone": "UTC",
        "gmt_offset": 0,
        "invoicing_default_due": 15,
        "default_project_label_id": null,
        "on_invoice_based_on": "keep_records_as_separate_invoice_items",
        "notes_and_tasks_as_discussions_enabled": false,
        "default_tax_rate_id": null,
        "default_expense_category_id": 1,
        "invoice_second_tax_is_compound": false,
        "invoice_second_tax_is_enabled": false,
        "show_project_id": false,
... (240 líneas más)
```

**`GET /initial`** → HTTP 200

Respuesta:
```json
{
    "settings": {
        "identity_name": "Application",
        "on_demand": false,
        "built_in_language": {
            "id": 1,
            "class": "Language",
            "url_path": "\/languages\/1",
            "name": "English",
            "updated_on": 1430163976,
            "locale": "en_US.UTF-8",
            "is_default": true
        },
        "default_currency_id": 2,
        "default_labels_name_max_length": 30,
        "gd_loaded": true,
        "wallpaper_url": "http:\/\/feather.dev\/wallpapers\/--WALLPAPER--",
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=--USER-ID--&size=--SIZE--&timestamp=--UPDATED-ON--",
        "show_visual_editor_toolbar": false,
        "timezone": "UTC",
        "gmt_offset": 0,
        "invoicing_default_due": 15,
        "default_project_label_id": null,
        "on_invoice_based_on": "keep_records_as_separate_invoice_items",
        "notes_and_tasks_as_discussions_enabled": false,
        "default_tax_rate_id": null,
        "default_expense_category_id": 1,
        "invoice_second_tax_is_compound": false,
        "invoice_second_tax_is_enabled": false,
        "show_project_id": false,
... (240 líneas más)
```

If we change one of the properties, like rename an expense category:

**`PUT /expense-categories/1`** → HTTP 200

Payload:
```json
{
    "name": "Renamed Category"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "ExpenseCategory",
        "url_path": "\/expense-categories\/1",
        "name": "Renamed Category",
        "is_default": true
    }
}
```

Whole response should be timestamped differently:

**`GET /initial`** → HTTP 200

Respuesta:
```json
{
    "settings": {
        "identity_name": "Application",
        "on_demand": false,
        "built_in_language": {
            "id": 1,
            "class": "Language",
            "url_path": "\/languages\/1",
            "name": "English",
            "updated_on": 1430163976,
            "locale": "en_US.UTF-8",
            "is_default": true
        },
        "default_currency_id": 2,
        "default_labels_name_max_length": 30,
        "gd_loaded": true,
        "wallpaper_url": "http:\/\/feather.dev\/wallpapers\/--WALLPAPER--",
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=--USER-ID--&size=--SIZE--&timestamp=--UPDATED-ON--",
        "show_visual_editor_toolbar": false,
        "timezone": "UTC",
        "gmt_offset": 0,
        "invoicing_default_due": 15,
        "default_project_label_id": null,
        "on_invoice_based_on": "keep_records_as_separate_invoice_items",
        "notes_and_tasks_as_discussions_enabled": false,
        "default_tax_rate_id": null,
        "default_expense_category_id": 1,
        "invoice_second_tax_is_compound": false,
        "invoice_second_tax_is_enabled": false,
        "show_project_id": false,
... (240 líneas más)
```

Whole response should be timestamped differently:

**`GET /initial`** → HTTP 200

Respuesta:
```json
{
    "settings": {
        "identity_name": "My Awesome Projects",
        "on_demand": false,
        "built_in_language": {
            "id": 1,
            "class": "Language",
            "url_path": "\/languages\/1",
            "name": "English",
            "updated_on": 1430163976,
            "locale": "en_US.UTF-8",
            "is_default": true
        },
        "default_currency_id": 2,
        "default_labels_name_max_length": 30,
        "gd_loaded": true,
        "wallpaper_url": "http:\/\/feather.dev\/wallpapers\/--WALLPAPER--",
        "avatar_url": "http:\/\/feather.dev\/proxy.php?proxy=avatar&module=system&v=current&b=DEV&user_id=--USER-ID--&size=--SIZE--&timestamp=--UPDATED-ON--",
        "show_visual_editor_toolbar": false,
        "timezone": "UTC",
        "gmt_offset": 0,
        "invoicing_default_due": 15,
        "default_project_label_id": null,
        "on_invoice_based_on": "keep_records_as_separate_invoice_items",
        "notes_and_tasks_as_discussions_enabled": false,
        "default_tax_rate_id": null,
        "default_expense_category_id": 1,
        "invoice_second_tax_is_compound": false,
        "invoice_second_tax_is_enabled": false,
        "show_project_id": false,
... (240 líneas más)
```

Personalised settings and collections can be checked with `/user-session` command. This command will tell you more about logged in user (if user is logged in), as well as return some of the settings and collections. Use this command to check if user is logged in a quickly grab a lot of initial data in a single request:

**`GET /user-session`** → HTTP 200

Respuesta:
```json
{
    "logged_user_id": 1,
    "settings": {
        "login_policy": {
            "username_format": "email",
            "remember_extends_session": true,
            "password_change_enabled": true,
            "password_recovery_enabled": true,
            "external_login_url": null,
            "external_logout_url": null,
            "external_change_password_url": null,
            "external_update_profile_url": null
        },
        "password_policy": {
            "min_length": 0,
            "require_numbers": false,
            "require_mixed_case": false,
            "require_symbols": false
        },
        "homepage": null,
        "wallpaper": "wallpaper.jpg",
        "format_date": "%b %e. %Y",
        "format_time": "%I:%M %p",
        "time_first_week_day": 0,
        "timezone": "UTC",
        "gmt_offset": 0,
        "display_mode_projects": "grid",
        "display_mode_project_files": "grid",
        "display_mode_project_time": "list",
        "display_mode_invoices": "grid",
... (270 líneas más)
```

When executed as client, `/user-session` will return a bit different result:

**`GET /user-session`** → HTTP 200 _(como Client)_

Respuesta:
```json
{
    "logged_user_id": 3,
    "settings": {
        "login_policy": {
            "username_format": "email",
            "remember_extends_session": true,
            "password_change_enabled": true,
            "password_recovery_enabled": true,
            "external_login_url": null,
            "external_logout_url": null,
            "external_change_password_url": null,
            "external_update_profile_url": null
        },
        "password_policy": {
            "min_length": 0,
            "require_numbers": false,
            "require_mixed_case": false,
            "require_symbols": false
        },
        "homepage": null,
        "wallpaper": "wallpaper.jpg",
        "format_date": "%b %e. %Y",
        "format_time": "%I:%M %p",
        "time_first_week_day": 0,
        "timezone": "UTC",
        "gmt_offset": 0,
        "display_mode_projects": "grid",
        "display_mode_project_files": "grid",
        "display_mode_project_time": "list",
        "display_mode_invoices": "grid",
... (176 líneas más)
```
