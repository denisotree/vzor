from django.contrib import admin

from .models import Video


class VideoAdmin(admin.ModelAdmin):
    fields = ('title',
              'slug',
              'description',
              'price',
              'source',
              'preview',
              'thumbnail',
              'tags',
              'category',
              'author',
              'status')

    def save_model(self, request, obj, form, change):
        instance = form.save(commit=False)
        if not hasattr(instance, 'author'):
            instance.author = request.user
        instance.save()
        form.save_m2m()
        return instance

    def save_formset(self, request, form, formset, change):

        def set_user(instance):
            if not instance.author:
                instance.author = request.user
            instance.save()

        if formset.model == Video:
            instances = formset.save(commit=False)
            map(set_user, instances)
            formset.save_m2m()
            return instances
        else:
            return formset.save()


admin.site.register(Video, VideoAdmin)
