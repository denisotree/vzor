from django.urls import path

from .views import (
    AuthorListView,
    AuthorDetailView,
)

urlpatterns = [
    path('', AuthorListView.as_view()),
    path('<username>/', AuthorDetailView.as_view()),
]
