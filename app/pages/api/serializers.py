from rest_framework import serializers

from pages.models import Pages


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pages
        fields = ('id', 'title', 'slug', 'content', 'created', 'modified', 'menu_position')
