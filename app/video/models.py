from django.db import models
from authors.models import Author
from .validators import validate_file_extension
from storage.storage_backends import PublicMediaStorage
from categories.models import Categories
from tags.models import Tags
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


def source_file_name(instance, filename):
    return f'video/{instance.author}/source/{filename}'


def preview_file_name(instance, filename):
    return f'video/{instance.author}/preview/{filename}'


def thumbnail_file_name(instance, filename):
    return f'video/{instance.author}/thumbnail/{filename}'


class Video(models.Model):
    STATUS = (
        ('published', 'published'),
        ('suggested', 'suggested')
    )
    title = models.CharField(
        max_length=140
    )

    slug = models.CharField(
        max_length=140,
        default="#",
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    source = models.FileField(
        upload_to=source_file_name,
        validators=[validate_file_extension],
        blank=True,
        storage=PublicMediaStorage()
    )

    preview = models.FileField(
        upload_to=preview_file_name,
        validators=[validate_file_extension],
        blank=True,
        storage=PublicMediaStorage()
    )

    thumbnail = models.ImageField(
        upload_to=thumbnail_file_name,
        blank=True,
        storage=PublicMediaStorage()
    )

    duration = models.CharField(
        max_length=64,
        null=True,
        blank=True
    )

    category = models.ForeignKey(
        Categories,
        on_delete=models.CASCADE
    )

    tags = models.ManyToManyField(
        Tags,
        blank=True
    )

    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        limit_choices_to={'is_staff': False},
    )

    status = models.CharField(
        choices=STATUS,
        default='suggested',
        max_length=50
    )

    created = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )

    modified = models.DateTimeField(
        auto_now=True,
        editable=False
    )

    def save(self, *args, **kwargs):
        if self.thumbnail:
            self.thumbnail = self.compressImage(self.thumbnail)
        super(Video, self).save(*args, **kwargs)

    def compressImage(self, thumbnail):
        imageTemproary = Image.open(thumbnail)
        outputIoStream = BytesIO()
        w, h = imageTemproary.size
        if w > 1500 or h > 1500:
            imageTemproary = imageTemproary.resize((int(w/3), int(h/3)))
        imageTemproary.save(outputIoStream, format='JPEG', quality=80)
        outputIoStream.seek(0)
        thumbnail = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.jpg" % thumbnail.name.split('.')[0],
                                             'image/jpeg', sys.getsizeof(outputIoStream), None)
        return thumbnail

    def __str__(self):
        return self.title
