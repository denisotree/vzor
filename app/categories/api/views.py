from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from categories.models import Categories
from .serializers import CategorySerializer


class CategoryListView(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (permissions.AllowAny, )


class CategoryDetailView(RetrieveAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.AllowAny, )


class CategoryCreateView(CreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (permissions.IsAuthenticated, )


class CategoryUpdateView(UpdateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )


class CategoryDeleteView(DestroyAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    # permission_classes = (permissions.IsAuthenticated, )
