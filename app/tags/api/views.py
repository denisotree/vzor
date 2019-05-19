from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from tags.models import Tags
from .serializers import TagSerializer


class TagListView(ListAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    # permission_classes = (permissions.AllowAny, )


class TagDetailView(RetrieveAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.AllowAny, )


class TagCreateView(CreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    # permission_classes = (permissions.IsAuthenticated, )


class TagUpdateView(UpdateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )


class TagDeleteView(DestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )
