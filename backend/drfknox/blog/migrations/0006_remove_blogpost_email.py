# Generated by Django 4.1.1 on 2023-03-28 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_blogpost_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='email',
        ),
    ]
