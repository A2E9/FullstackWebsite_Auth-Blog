# Generated by Django 4.1.1 on 2022-10-05 05:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_blogpost_body_remove_blogpost_date_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BlogPost',
        ),
    ]
