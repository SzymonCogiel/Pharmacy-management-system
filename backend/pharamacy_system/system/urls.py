from django.urls import path
from .views import TestAPIView, LogView, RegisterView, DataTestView, PDFManualView, DataDrugsView, StockStatusView, UpdatePasswordView, UserView, PrescriptionStatusView

urlpatterns = [
    path('pharamcy/test', TestAPIView.as_view()),
    path('pharamcy/login', LogView.as_view()),
    path('pharamcy/register', RegisterView.as_view()),
    path('pharamcy/data', DataTestView.as_view()),
    path('pharamcy/manual', PDFManualView.as_view()),
    path('pharamcy/drugs', DataDrugsView.as_view()),
    path('pharamcy/stock', StockStatusView.as_view()),
    path('pharamcy/updatepass', UpdatePasswordView.as_view()),
    path('pharamcy/user', UserView.as_view()),
    path('pharamcy/prescription', PrescriptionStatusView.as_view()),
]
