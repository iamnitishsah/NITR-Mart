# Generated by Django 5.2.3 on 2025-06-18 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_wp_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='wp_number',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
