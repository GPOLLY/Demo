# Generated by Django 2.0 on 2019-07-18 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student_info',
            name='admin_no',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
