from django.urls import path
from .views import TestAPIView, LogView, RegisterView, DataTestView, PDFManualView

urlpatterns = [
    path('pharamcy/test', TestAPIView.as_view()),
    path('pharamcy/login', LogView.as_view()),
    path('pharamcy/register', RegisterView.as_view()),
    path('pharamcy/data', DataTestView.as_view()),
    path('pharamcy/manual', PDFManualView.as_view()),
]
