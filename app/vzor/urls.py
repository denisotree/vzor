from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/v1/video/', include('video.api.urls')),
    path('api/v1/category/', include('categories.api.urls')),
    path('api/v1/tags/', include('tags.api.urls')),
    path('api/v1/pages/', include('pages.api.urls')),
    path('api/v1/authors/', include('authors.api.urls')),
    path('admin/', admin.site.urls),
    path('froala_editor/', include('froala_editor.urls')),
    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
