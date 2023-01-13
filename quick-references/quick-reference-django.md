# Access DB Console
From terminal run `docker-compose run --rm django ./manage.py shell`

Note: 

# Access Models from DB Console
You need to import the model before it is accessible, this follows the pattern:
`from miqa.core.models import <Model>`

For example:
`from miqa.core.models import Project`

# Save an Object to a Model
Follows the form:
`<variable> = <Model>.objects.create(<fields/values>)`

For example:
`setting = Setting.objects.create(key="flow_artifact")`

# Get Primary Key for an Object
Since MIQA uses UUIDs for the primary key it isn't a simple matter to figure out what an object's primary key is. You can create and then get the primary key for an object like so:

`setting = Setting.objects.create(key="flow_artifact")`
`setting.pk`

If you don't have the object you can fetch it using filter and the value of one of it's fields:

```python
settings = Setting.objects.filter(key="Artifacts")
for setting in settings:
    print(setting.pk)
```

# Delete an Object
You can call the delete method on an object you've just created:

`<variable>.delete()`

For example:

`setting.delete()`

# Create a relationship between objects
You can setting a foreign key on an object so that it has a relationship with another object. For example:

`setting = Setting.objects.create(key="truncation_artifact', type=Setting.objects.get(pk='246d7d1c-a378-464b-84fe-e9c4cdb78651'))`

Also:

`setting = Setting.objects.create(key="T1", value="MIQAMix-0", type=Setting.objects.get(pk='32bb77ec-935b-4691-ae23-880d090c7ee6'), group=SettingsGroup.objects.get(pk="5dc63f2d-b40e-4b03-bfda-adc0a8bfd229"))`

# Perform a Bulk Update
The following would update all Setting objects to have the FK for group set to the one specified below:
`Setting.objects.update(group='4807c3eb-7cb9-41b7-a7ac-115ab3be913f')`


# Import/Export Data for Model from/to MIQA
NOTE: The app name is not `miqa` or `miqa.core` but `core`. You can verify this by executing `Project._meta.app_label` in the Django shell.

## Export
`docker-compose run --rm django ./manage.py dumpdata core.Setting > setting.json`

NOTE: Review the file once the export is done to ensure no extra text was included by the dump. Also recommend using a JSON prettifier to make the export readable.

## Import
`docker-compose run --rm django ./manage.py loaddata setting.json`

# Compare Default vs Current Django Settings
`python manage.py diffsettings`