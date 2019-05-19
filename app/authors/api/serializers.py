from rest_framework import serializers

from authors.models import Author


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone',
            'avatar',
            'birth_date',
        )
