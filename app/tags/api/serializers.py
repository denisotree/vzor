from rest_framework import serializers

from tags.models import Tags


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ('id', 'title', 'slug', 'created', 'modified')
