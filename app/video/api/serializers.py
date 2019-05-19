from rest_framework import serializers

from video.models import Video
from tags.api.serializers import TagSerializer


class VideoSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='title'
    )

    tags = TagSerializer(read_only=True, many=True)

    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )

    class Meta:
        model = Video
        fields = (
            'title',
            'slug',
            'description',
            'price',
            'category',
            'tags',
            'preview',
            'thumbnail',
            'duration',
            'status',
            'author'
        )
