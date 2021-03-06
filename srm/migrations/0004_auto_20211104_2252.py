# Generated by Django 3.2.7 on 2021-11-04 22:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('srm', '0003_subject_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='teachers',
            field=models.ManyToManyField(related_name='teachers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='subject',
            name='code',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='result',
            unique_together={('student', 'exam')},
        ),
    ]
