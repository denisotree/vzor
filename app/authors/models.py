from django.db import models
from django.contrib.auth.models import AbstractUser
from storage.storage_backends import PublicMediaStorage
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


class Author(AbstractUser):
    avatar = models.ImageField(
        upload_to='authors/avatars',
        blank=True,
        null=True,
        storage=PublicMediaStorage()
    )

    phone = models.CharField(
        max_length=25,
        blank=True,
        null=True,
    )

    birth_date = models.DateField(
        blank=True,
        null=True,
    )

    def __init__(self, *args, **kwargs):
        super(Author, self).__init__(*args, **kwargs)
        self.init__avatar = self.avatar

    def save(self, *args, **kwargs):
        if self.avatar != self.init__avatar:
            self.avatar = self.compressImage(self.avatar)
        super(Author, self).save(*args, **kwargs)

    def compressImage(self, original):
        imageTemproary = Image.open(original)
        outputIoStream = BytesIO()
        w, h = imageTemproary.size
        new_width = 1300
        new_height = 1300
        left = (w - new_width) / 2
        top = (h - new_height) / 2
        right = (w + new_width) / 2
        bottom = (h + new_height) / 2
        imageTemproary.crop((left, top, right, bottom))
        if w > 1500 or h > 1500:
            imageTemproary = imageTemproary.resize((int(w/3), int(h/3)))
        imageTemproary.save(outputIoStream, format='JPEG', quality=80)
        outputIoStream.seek(0)
        avatar = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.jpg" % original.name.split('.')[0],
                                             'image/jpeg', sys.getsizeof(outputIoStream), None)
        return avatar

    def __str__(self):
        return self.username
