# Generated by Django 4.0.3 on 2022-03-28 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_post_description_alter_post_likers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.TextField(blank=True, null=True),
        ),
    ]