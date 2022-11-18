import io
import json
import pandas as pd
import matplotlib.pyplot as plt
from .models import User
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

import sys
from pharamacy_system import settings
sys.path.insert(0, '../')


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

        mail = request.GET.get('mail', None)
        password = request.GET.get('password', None)
        user = User.objects.filter(mail=mail).values()
        try:
            expected_pass = user[0]['password']
        except IndexError:
            expected_pass = ''

        if expected_pass == password:
            response = str(json.dumps({"res": "ok"}))
        else:
            response = str(json.dumps({"res": "denial"}))

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

    @staticmethod
    def check_user(login, mail) -> dict[str, bool]:

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


class PDFManualView(APIView):
    password = settings.confluence_pass


class DataDrugsView(APIView):
    pass


class DataTestView(APIView):


    @action(detail=False, methods=['get'])
    def get(self, request):
        result = pd.DataFrame({'bla': [1, 2, 3], 'bla2': ['a', 'b', 'c']}).to_json(orient='index')
        return JsonResponse(json.loads(result), safe=False)


class WelcomeView(APIView):

    def get(self, request):
        name = request.GET.get('login')
