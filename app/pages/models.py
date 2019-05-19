from django.db import models
from froala_editor.fields import FroalaField


class Pages(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    title = models.CharField(
        max_length=140
    )

    slug = models.SlugField(
        max_length=140,
        unique=True)

    content = FroalaField()

    menu_position = models.IntegerField(
        unique=False
    )

    created = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )

    modified = models.DateTimeField(
        auto_now=True,
        editable=False
    )

    def __str__(self):
        return self.title
