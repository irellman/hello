# Generated by Django 4.0.4 on 2022-04-19 13:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_comment_answer_to'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Answer',
        ),
    ]