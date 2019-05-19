# from video.api.views import VideoViewSet
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# urlpatterns = router.urls

from django.urls import path

from .views import (
    CategoryListView,
    CategoryDetailView,
    CategoryCreateView,
    CategoryUpdateView,
    CategoryDeleteView
)

urlpatterns = [
    path('', CategoryListView.as_view()),
    path('create/', CategoryCreateView.as_view()),
    path('<slug>/', CategoryDetailView.as_view()),
    path('<slug>/update/', CategoryUpdateView.as_view()),
    path('<slug>/delete/', CategoryDeleteView.as_view())
]
