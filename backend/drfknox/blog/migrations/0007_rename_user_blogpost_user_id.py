# Generated by Django 4.1.1 on 2023-03-28 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_remove_blogpost_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='user',
            new_name='user_id',
        ),
    ]
