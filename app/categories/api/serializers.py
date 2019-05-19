from rest_framework import serializers

from categories.models import Categories


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('id', 'title', 'slug', 'description', 'thumbnail', 'created', 'modified')
