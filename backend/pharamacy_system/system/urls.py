from django.urls import path
from .views import TestAPIView

urlpatterns = [
    path('pharamcy/test', TestAPIView.as_view()),
]
