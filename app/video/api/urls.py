# from video.api.views import VideoViewSet
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# urlpatterns = router.urls

from django.urls import path

from .views import (
    VideoListView,
    VideoDetailView,
    VideoCreateView,
    VideoUpdateView,
    VideoDeleteView
)

urlpatterns = [
    path('', VideoListView.as_view()),
    path('create/', VideoCreateView.as_view()),
    path('<slug>/', VideoDetailView.as_view()),
    path('<slug>/update/', VideoUpdateView.as_view()),
    path('<slug>/delete/', VideoDeleteView.as_view())
]
