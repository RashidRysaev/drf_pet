from django.db import models

from userapp.models import CustomUser


class Project(models.Model):
    title = models.CharField(max_length=128, blank=False, help_text="title of the project")
    url_link = models.URLField(blank=True, help_text="link of the project")
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField(blank=True, help_text="content of the todo note")
    created = models.DateTimeField(auto_now_add=True, help_text="date and time of the note being created")
    updated = models.DateTimeField(auto_now=True, help_text="date and time of the note being updated")
    is_active = models.BooleanField(default=True, help_text="is the note active or closed")

    def __str__(self):
        return self.content
