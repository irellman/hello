# Generated by Django 4.0.3 on 2022-03-28 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_alter_user_saved'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='saved',
            field=models.ManyToManyField(blank=True, to='backend.post'),
        ),
    ]
