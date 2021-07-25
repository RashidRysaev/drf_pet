# Generated by Django 3.2.5 on 2021-07-25 10:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(help_text="title of the project", max_length=128)),
                ("url_link", models.URLField(blank=True, help_text="link of the project")),
                ("users", models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="Todo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("content", models.TextField(blank=True, help_text="content of the todo note")),
                (
                    "created",
                    models.DateTimeField(auto_now_add=True, help_text="date and time of the note being created"),
                ),
                ("updated", models.DateTimeField(auto_now=True, help_text="date and time of the note being updated")),
                ("is_active", models.BooleanField(default=True, help_text="is the note active or closed")),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="todoapp.project")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]