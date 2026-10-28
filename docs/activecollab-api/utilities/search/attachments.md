# Attachments

> Fuente: https://developers.activecollab.com/api-documentation/v1/utilities/search/attachments.html

For this test, we have prepared a project with one task and one attachment:

**`GET /projects/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Project",
        "url_path": "\/projects\/1",
        "name": "Test Project",
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
        "created_on": 1430164954,
        "created_by_id": 1,
        "updated_on": 1430164954,
        "updated_by_id": 1,
        "body": null,
        "body_formatted": "",
        "company_id": 1,
        "leader_id": 1,
        "currency_id": 2,
        "template_id": 0,
        "based_on_type": null,
        "based_on_id": null,
        "email": "notifications+m2p-FbhcEwH@mail.manageprojects.com",
... (15 líneas más)
```

**`GET /projects/1/tasks/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visiting Montenegro",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 1,
        "attachments": [],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
        "created_on": 1430164954,
        "created_by_id": 1,
        "updated_on": 1430164954,
        "updated_by_id": 1,
        "task_number": 1,
        "task_list_id": 0,
        "position": 1,
        "is_important": false,
        "due_on": null,
... (35 líneas más)
```

Lets search a bit. First term that we'll search for will find the task because we have it in the task name:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "montenegro"
}
```

Respuesta:
```json
[]
```

Second search will search for a file name of one of the uploaded files:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "durmitor.txt"
}
```

Respuesta:
```json
[]
```

Third and fourth requests will search for a term that is mentioned in the files:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "kosanica"
}
```

Respuesta:
```json
[]
```

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "elastica"
}
```

Respuesta:
```json
[]
```

As we can see, two terms that are mentioned in the uploaded files are not found. Reason why is because we did not attach them to elements that search indexes. Lets do that now:

**`PUT /projects/1/tasks/1`** → HTTP 200

Payload:
```json
{
    "attach_uploaded_files": [
        "vkdr4y5vwG2tzmh0cCROlnFOEgQaUbkXsclmxITn"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Task",
        "url_path": "\/projects\/1\/tasks\/1",
        "name": "Visiting Montenegro",
        "assignee_id": 0,
        "delegated_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "comments_count": 1,
        "attachments": [
            {
                "id": 1,
                "name": "durmitor.txt",
                "mime_type": "text\/plain",
                "size": 95,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FqsnpVUKobtOA7SvND0MF94wYJ2ub8pPmH3CrMcGN&original_file_name=durmitor.txt&width=--WIDTH--&height=--HEIGHT--&ver=95&scale=--SCALE--"
            }
        ],
        "labels": [],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "project_id": 1,
        "is_hidden_from_clients": false,
        "body": "",
        "body_formatted": "",
... (44 líneas más)
```

**`PUT /comments/1`** → HTTP 200

Payload:
```json
{
    "attach_uploaded_files": [
        "Mrz5fT26W15Nh6OMunZ8OicHG4aE1mfgLmt2gfQS"
    ]
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [
            {
                "id": 2,
                "name": "result-item.txt",
                "mime_type": "text\/plain",
                "size": 58,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FhA0fDBeChSOunrZu9Zd02rbbEzJmNAuczzG1D08l&original_file_name=result-item.txt&width=--WIDTH--&height=--HEIGHT--&ver=58&scale=--SCALE--"
            }
        ],
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Comment body",
        "body_formatted": "Comment body",
        "body_plain_text": "Comment body",
        "created_on": 1430164954,
        "created_by_id": 1,
        "updated_on": 1430164956,
        "updated_by_id": 1
    }
}
```

First one will hit the task because we have a word `montenegro` in the task name:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "montenegro"
}
```

Respuesta:
```json
[]
```

Second one will hit the task because we have a file named `durmitor.txt` attached to the task:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "durmitor.txt"
}
```

Respuesta:
```json
[]
```

Third one will hit the task because there is a word `Kosanica` mentioned in the file:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "kosanica"
}
```

Respuesta:
```json
[]
```

Fourth search returns the task because it has a comment with an attachment that has the word mentioned in its content:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "elastica"
}
```

Respuesta:
```json
[]
```

Just to confirm that search is not always hitting our task:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "abracadabra"
}
```

Respuesta:
```json
[]
```

If we delete a comment (and all of its attachments), that should affect the seach. First, move comment to the trash:

**`PUT /move-to-trash/comment/1`** → HTTP 200

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "Comment",
        "url_path": "\/comments\/1",
        "attachments": [
            {
                "id": 2,
                "name": "result-item.txt",
                "mime_type": "text\/plain",
                "size": 58,
                "disposition": "attachment",
                "thumbnail_url": "http:\/\/feather.dev\/proxy.php?proxy=forward_thumbnail&module=system&v=current&b=DEV&context=upload&name=2015-04%2FhA0fDBeChSOunrZu9Zd02rbbEzJmNAuczzG1D08l&original_file_name=result-item.txt&width=--WIDTH--&height=--HEIGHT--&ver=58&scale=--SCALE--"
            }
        ],
        "is_trashed": true,
        "trashed_on": 1430164957,
        "trashed_by_id": 1,
        "parent_type": "Task",
        "parent_id": 1,
        "body": "Comment body",
        "body_formatted": "Comment body",
        "body_plain_text": "Comment body",
        "created_on": 1430164954,
        "created_by_id": 1,
        "updated_on": 1430164957,
        "updated_by_id": 1
    }
}
```

Now, we check if index is correct (by pulling the task using a search term that still hits it):

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "montenegro"
}
```

Respuesta:
```json
[]
```

And finally, we'll have a miss if we try to search for content that was in that attachment:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "elastica"
}
```

Respuesta:
```json
[]
```

Another scenario that we should test is removing an attachment. Here we go:

**`DELETE /attachments/1`** → HTTP 200

As in the previous test, we first test the data with a query that we know will return the task:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "montenegro"
}
```

Respuesta:
```json
[]
```

Now we search for a term that was in the attachment that we just deleted:

**`GET /search`** → HTTP 200

Parámetros de query:
```json
{
    "q": "kosanica"
}
```

Respuesta:
```json
[]
```
