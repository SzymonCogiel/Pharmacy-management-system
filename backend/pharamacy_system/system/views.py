import io
import json
import pandas as pd
import matplotlib.pyplot as plt
from .models import User, Drugs, DrugsInfo
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from atlassian import Confluence
from .serializers import DrugsSerializer, DrugsInfoSerializer

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
            return HttpResponse('Istnieje juz konto o takim logine', status=409, content_type="text/plain")
        elif exsist['mail']:
            return HttpResponse('Istnieje juz konto o takim mailu', status=409, content_type="text/plain")
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

    @staticmethod
    def get(request):
        drugname = request.GET.get('drugname')
        price = request.GET.get('price')
        amount = request.GET.get('amount')

        drugInfo = DrugsInfo.objects.all()


        if drugname == "undefined":
            pass
        elif drugname:
            drugInfo = drugInfo.filter(drugname=drugname)

        if price == "undefined":
            pass
        elif price:
            drugInfo = drugInfo.filter(price=price)

        if amount == "undefined":
            pass
        elif amount:
            drugInfo = drugInfo.filter(amount=amount)


        serializer = DrugsInfoSerializer(drugInfo, many=True)
        return Response(serializer.data)


class CustomerSatisfactionView(APIView):
    pass


class PDFManualView(APIView):

    def get(self, request):
        password = settings.confluence_pass
        user_name = settings.confluence_mail
        PARENT_PAGE_ID = '491521'

        confluence = Confluence(
            url='https://spatial-vison.atlassian.net/',
            username=user_name,
            password=password,
            api_version="cloud"
        )

        children = confluence.get_child_pages(PARENT_PAGE_ID)
        children = self.tree_downloader(confluence, children)
        children.append(PARENT_PAGE_ID)

        for i in children:
            p = confluence.get_page_by_id(i)
            title = p['title']
            id = p['id']
            pdf_name = title + '.pdf'
            # with open(pdf_name, "wb") as pdf_file:
            #     pdf_file.write(confluence.get_page_as_pdf(id))
            pdf = confluence.get_page_as_pdf(id)


        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="' + pdf_name + '"'
        return response

    def tree_downloader(self, confluence: Confluence, children: list) -> list:
        list_id = []
        for i in children:
            if isinstance(i, str):
                i_id = i
            else:
                i_id = i['id']
            grandchildren = confluence.get_child_pages(i_id)
            list_id.append(i_id)
            if grandchildren:
                list_id.extend(self.tree_downloader(confluence, grandchildren))
        return list_id


class DataDrugsView(APIView):

    @staticmethod
    def get(request):
        drugname = request.GET.get('drugname')
        condition = request.GET.get('condition')
        review = request.GET.get('review')
        rating = request.GET.get('rating')
        useful = request.GET.get('rating')

        drug = Drugs.objects.all()

        if drugname == "undefined":
            pass
        elif drugname:
            drug = drug.filter(drugname=drugname)

        if condition == "undefined":
            pass
        elif condition:
            drug = drug.filter(condition=condition)

        if rating == "undefined" or rating == "all":
            pass
        elif rating:
            drug = drug.filter(rating=rating)

        if useful == "undefined" or useful == "all":
            pass
        elif useful:
            drug = drug.filter(useful=useful)

        serializer = DrugsSerializer(drug, many=True)
        return Response(serializer.data)


class DataTestView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):
        result = pd.DataFrame({'bla': [1, 2, 3], 'bla2': ['a', 'b', 'c']}).to_json(orient='index')
        return JsonResponse(json.loads(result), safe=False)

