from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from pages.models import Pages
from .serializers import PageSerializer


class PageListView(ListAPIView):
    queryset = Pages.objects.all().order_by('menu_position')
    serializer_class = PageSerializer
    # permission_classes = (permissions.AllowAny, )


class PageDetailView(RetrieveAPIView):
    queryset = Pages.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.AllowAny, )


class PageCreateView(CreateAPIView):
    queryset = Pages.objects.all()
    serializer_class = PageSerializer
    # permission_classes = (permissions.IsAuthenticated, )


class PageUpdateView(UpdateAPIView):
    queryset = Pages.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )


class PageDeleteView(DestroyAPIView):
    queryset = Pages.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )
