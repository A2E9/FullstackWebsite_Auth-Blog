# Generated by Django 4.1.1 on 2022-10-05 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='body',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='date',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='user',
        ),
    ]
