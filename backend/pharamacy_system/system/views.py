from rest_framework.views import APIView
from django.http import HttpResponse
import json
import matplotlib.pyplot as plt
from PIL import Image
from rest_framework.decorators import action
import io

class TestAPIView(APIView):

    @staticmethod
    def get(request):
        plt.plot([1, 2, 3, 4], color="pink")
        plt.ylabel('some numbers')

        # Save it to a temporary buffer.
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)

        return HttpResponse(buf, content_type="image/png")


class LogView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):

        # mockup until we have the database
        mock_users = {'szymon': 'password'}
        login = request.GET.get('login', None)
        password = request.GET.get('password', None)

        if mock_users[login] == password:
            response = str(json.dumps(str("ok")))
        else:
            response = str(json.dumps(str("denial")))

        return HttpResponse(response, content_type="text/plain")


class RegisterView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):
        mail = request.GET.get('mail', None)
        login = request.GET.get('login', None)
        password = request.GET.get('password', None)
        print(password)
        response = str(json.dumps(str(login)))
        return HttpResponse(response, content_type="text/plain")


class MapView(APIView):
    pass


class SalesAnalysisView(APIView):
    pass


class StockStatusView(APIView):
    pass


class CustomerSatisfactionView(APIView):
    pass


class PDFmanualView(APIView):
    pass


class DataDrugsView(APIView):
    pass





