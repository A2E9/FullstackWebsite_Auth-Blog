# Generated by Django 4.1.1 on 2023-03-28 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_alter_blogpost_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]