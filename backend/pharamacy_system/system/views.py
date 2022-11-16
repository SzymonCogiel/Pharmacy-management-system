from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
import json
import matplotlib.pyplot as plt
from rest_framework.decorators import action
import io
import pandas as pd
from .models import User
from .serializers import UserSerializer
from django.forms import ValidationError
from django.core.exceptions import ObjectDoesNotExist


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

        login = request.GET.get('login', None)
        password = request.GET.get('password', None)
        user = User.objects.filter(user_name=login).values()
        expected_pass = user[0]['password']
        if expected_pass == password:
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
        exsist = self.check_user(login, mail)
        if exsist['login']:
            return HttpResponse('Istnieje juz konto o takim logine', content_type="text/plain")
        elif exsist['mail']:
            return HttpResponse('Istnieje juz konto o takim mailu', content_type="text/plain")
        user = User(user_name=login, mail=mail, password=password)
        user.save()
        return HttpResponse('Pomyslnie zjerestorwany', status=201, content_type="text/plain")

    def check_user(self, login, mail) -> dict[bool]:

        exsist = {'login': True, 'mail': True}

        try:
            User.objects.get(user_name=login)
        except ObjectDoesNotExist:
            exsist['login'] = False
        try:
            User.objects.get(mail=mail)
        except ObjectDoesNotExist:
            exsist['mail'] = False
        finally:
            return exsist


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


class DataTestView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):
        result = pd.DataFrame({'bla': [1, 2, 3], 'bla2': ['a', 'b', 'c']}).to_json(orient='index')
        return JsonResponse(json.loads(result), safe=False)
