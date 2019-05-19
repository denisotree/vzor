import sys
from django.db import models
from storage.storage_backends import PublicMediaStorage
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile


class Categories(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    title = models.CharField(
        max_length=140
    )

    slug = models.SlugField(
        max_length=140,
        unique=True)

    description = models.TextField(
        blank=True,
        null=True,
    )

    thumbnail = models.ImageField(
        upload_to='categories/thumbnails/',
        blank=True,
        storage=PublicMediaStorage()
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
        super(Categories, self).save(*args, **kwargs)

    def compressImage(self, thumbnail):
        imageTemproary = Image.open(thumbnail)
        outputIoStream = BytesIO()
        w, h = imageTemproary.size
        imageTemproaryResized = imageTemproary.resize((int(w/3), int(h/3)))
        imageTemproaryResized.save(outputIoStream, format='JPEG', quality=80)
        outputIoStream.seek(0)
        thumbnail = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.jpg" % thumbnail.name.split('.')[0],
                                             'image/jpeg', sys.getsizeof(outputIoStream), None)
        return thumbnail

    def __str__(self):
        return self.title
