from django_filters import rest_framework as filters
from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)
from authors.models import Author
from .serializers import UserSerializer


class AuthorListView(ListAPIView):
    queryset = Author.objects.exclude(is_superuser=True)
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('id', 'username')


class AuthorDetailView(RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    permission_classes = (permissions.AllowAny,)
