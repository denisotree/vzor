# from rest_framework import viewsets

# class VideoViewSet(viewsets.ModelViewSet):
#     serializer_class = VideoSerializer
#     queryset = Video.objects.all()

from django_filters import rest_framework as filters
from rest_framework import filters as search
from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from video.models import Video
from .serializers import VideoSerializer


class VideoListView(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    # permission_classes = (permissions.AllowAny, )
    filter_backends = (filters.DjangoFilterBackend, search.SearchFilter,)
    search_fields = ('title', 'description', 'slug', "category__title", "tags__title")
    filterset_fields = ('title', 'slug', 'price', 'author', 'category', 'status')


class VideoDetailView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.AllowAny, )


class VideoCreateView(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    # permission_classes = (permissions.IsAuthenticated, )


class VideoUpdateView(UpdateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )


class VideoDeleteView(DestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )
