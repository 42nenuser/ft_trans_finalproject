# user_service/urls.py

   from django.contrib import admin
   from django.urls import path, include
   from rest_framework.routers import DefaultRouter
   from users.views import UserViewSet, UserProfileViewSet

   router = DefaultRouter()
   router.register(r'users', UserViewSet)
   router.register(r'profiles', UserProfileViewSet)

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('api/', include(router.urls)),
   ]
