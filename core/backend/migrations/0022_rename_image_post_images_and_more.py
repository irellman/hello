# Generated by Django 4.0.4 on 2022-04-27 17:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_recentsearch_search_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='image',
            new_name='images',
        ),
        migrations.AlterField(
            model_name='recentsearch',
            name='search_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 27, 17, 2, 52, 897014)),
        ),
    ]
