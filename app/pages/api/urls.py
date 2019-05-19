# from video.api.views import VideoViewSet
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# urlpatterns = router.urls

from django.urls import path

from .views import (
    PageListView,
    PageDetailView,
    PageCreateView,
    PageUpdateView,
    PageDeleteView
)

urlpatterns = [
    path('', PageListView.as_view()),
    path('create/', PageCreateView.as_view()),
    path('<slug>/', PageDetailView.as_view()),
    path('<slug>/update/', PageUpdateView.as_view()),
    path('<slug>/delete/', PageDeleteView.as_view())
]
