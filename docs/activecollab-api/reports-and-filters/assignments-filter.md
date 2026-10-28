# Assignments Filter

> Fuente: https://developers.activecollab.com/api-documentation/v1/reports-and-filters/assignments-filter.html

Personas in this Story: Default, FirstMember, SecondMember.

**`POST /projects/1/task-lists`** → HTTP 200

Payload:
```json
{
    "name": "Task List #1"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "TaskList",
        "url_path": "\/projects\/1\/task-lists\/1",
        "name": "Task List #1",
        "is_trashed": false,
        "trashed_on": null,
        "trashed_by_id": 0,
        "completed_on": null,
        "completed_by_id": null,
        "is_completed": false,
        "project_id": 1,
        "created_on": 1430165032,
        "created_by_id": 1,
        "updated_on": 1430165032,
        "updated_by_id": 1,
        "start_on": null,
        "due_on": null,
        "position": 1,
        "open_tasks": 0,
        "completed_tasks": 0
    }
}
```

Assignments filter can be ran on the fly, simply by providing filtering parameters:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "include_subtasks": false
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Assignments",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (65 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "user_filter": "selected_2"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Assignments",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (60 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "user_filter": "selected_2,3",
    "include_subtasks": false,
    "group_by": "assignee"
}
```

Respuesta:
```json
{
    "user-2": {
        "label": "member1",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (42 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "user_filter": "selected_2,3",
    "include_subtasks": false,
    "group_by": "assignee"
}
```

Respuesta:
```json
{
    "user-2": {
        "label": "member1",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (42 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "include_subtasks": false,
    "label_filter": "selected_NEW"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Assignments",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (7 líneas más)
```

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "include_subtasks": false,
    "label_filter": "selected_NEW,CONFIRMED"
}
```

Respuesta:
```json
{
    "all": {
        "label": "All Assignments",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (37 líneas más)
```

Export works in similar fashion:

**`GET /reports/export`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "user_filter": "selected_2,3",
    "include_subtasks": false,
    "group_by": "assignee"
}
```

Respuesta:
```json
Assignment ID,Type,Project ID,Project,Assignee ID,Assignee,Is Important,Labels,Task List ID,Task List,Created On,Created By ID,Created By,Due On,Completed On,Completed By ID,Completed By,Name,Task Number
1,Task,1,Test Project,2,member1,,1,,2015-04-27 20:03:52,1,ilija.studen,2014-10-16,,,,Assigned to First Member,1
2,Task,1,Test Project,3,member2,,0,,2015-04-27 20:03:53,1,ilija.studen,,,,,Assigned to Second Member,2
```

Assignment filters can also be saved:

**`POST /data-filters`** → HTTP 200

Payload:
```json
{
    "type": "AssignmentFilter",
    "name": "Tasks by Due Date",
    "group_by": "due_on",
    "include_subtasks": true,
    "is_private": true
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "AssignmentFilter",
        "url_path": "\/data-filters\/1",
        "name": "Tasks by Due Date",
        "created_on": 1430165034,
        "created_by_id": 1,
        "group_by": [
            "due_on"
        ],
        "user_filter": "anybody",
        "created_by_filter": "anybody",
        "delegated_by_filter": "anybody",
        "label_filter": "any",
        "task_list_filter": "any",
        "created_on_filter": "any",
        "due_on_filter": "any",
        "completed_on_filter": "any",
        "completed_by_filter": "anybody",
        "project_filter": "any",
        "include_all_projects": false,
        "include_tracking_data": false,
        "include_subtasks": true,
        "is_private": true
    }
}
```

**`POST /data-filters`** → HTTP 200

Payload:
```json
{
    "type": "AssignmentFilter",
    "name": "Filter by Labels",
    "label_filter": "selected_NEW,CONFIRMED",
    "completed_by_filter": "selected_1"
}
```

Respuesta:
```json
{
    "single": {
        "id": 2,
        "class": "AssignmentFilter",
        "url_path": "\/data-filters\/2",
        "name": "Filter by Labels",
        "created_on": 1430165035,
        "created_by_id": 1,
        "group_by": [
            "dont"
        ],
        "user_filter": "anybody",
        "created_by_filter": "anybody",
        "delegated_by_filter": "anybody",
        "label_filter": "selected",
        "label_names": [
            "CONFIRMED",
            "NEW"
        ],
        "task_list_filter": "any",
        "created_on_filter": "any",
        "due_on_filter": "any",
        "completed_on_filter": "any",
        "completed_by_filter": "selected",
        "completed_by_user_ids": [
            1
        ],
        "project_filter": "any",
        "include_all_projects": false,
        "include_tracking_data": false,
... (4 líneas más)
```

Saved filters and reports can be loaded and executed if we provide filter's `id` in the GET part of the request:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "id": 1
}
```

Respuesta:
```json
{
    "1413331200": {
        "label": "Due on Oct 15. 2014",
        "assignments": {
            "2": {
                "id": 2,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 3,
                "task_list_id": 0,
                "name": "Assigned to Second Member",
                "body": null,
                "created_on": 1430165033,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": null,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "2",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member2",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (121 líneas más)
```

If we update the filter:

**`PUT /data-filters/1`** → HTTP 200

Payload:
```json
{
    "group_by": "task_list"
}
```

Respuesta:
```json
{
    "single": {
        "id": 1,
        "class": "AssignmentFilter",
        "url_path": "\/data-filters\/1",
        "name": "Tasks by Due Date",
        "created_on": 1430165034,
        "created_by_id": 1,
        "group_by": [
            "task_list"
        ],
        "user_filter": "anybody",
        "created_by_filter": "anybody",
        "delegated_by_filter": "anybody",
        "label_filter": "any",
        "task_list_filter": "any",
        "created_on_filter": "any",
        "due_on_filter": "any",
        "completed_on_filter": "any",
        "completed_by_filter": "anybody",
        "project_filter": "any",
        "include_all_projects": false,
        "include_tracking_data": false,
        "include_subtasks": true,
        "is_private": true
    }
}
```

We'll get different results:

**`GET /reports/run`** → HTTP 200

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "id": 1
}
```

Respuesta:
```json
{
    "task-list-1": {
        "label": "Test Project > Task List #1",
        "assignments": {
            "1": {
                "id": 1,
                "type": "Task",
                "project_id": 1,
                "assignee_id": 2,
                "task_list_id": 1,
                "name": "Assigned to First Member",
                "body": null,
                "created_on": 1430165032,
                "age": 0,
                "created_by_id": 1,
                "created_by_name": "ilija.studen",
                "created_by_email": "ilija.studen@activecollab.com",
                "due_on": 1413417600,
                "completed_on": null,
                "completed_by_id": null,
                "completed_by_name": null,
                "completed_by_email": null,
                "is_important": false,
                "task_number": "1",
                "project": "Test Project",
                "task_list": null,
                "assignee": "member1",
                "created_by": "ilija.studen",
                "completed_by": null,
                "labels": {
... (116 líneas más)
```

When we delete this report:

**`DELETE /data-filters/1`** → HTTP 200

It will no longer be available for filtering:

**`GET /reports/run`** → HTTP 404

Parámetros de query:
```json
{
    "type": "AssignmentFilter",
    "id": 1
}
```
