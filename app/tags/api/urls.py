# from video.api.views import VideoViewSet
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# urlpatterns = router.urls

from django.urls import path

from .views import (
    TagListView,
    TagDetailView,
    TagCreateView,
    TagUpdateView,
    TagDeleteView
)

urlpatterns = [
    path('', TagListView.as_view()),
    path('create/', TagCreateView.as_view()),
    path('<slug>/', TagDetailView.as_view()),
    path('<slug>/update/', TagUpdateView.as_view()),
    path('<slug>/delete/', TagDeleteView.as_view())
]
