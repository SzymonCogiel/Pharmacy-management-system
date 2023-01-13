import os
import io
import json
import pandas as pd
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
from .models import User, Drugs, DrugsInfo, PresInfo
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from atlassian import Confluence
from .serializers import DrugsSerializer, DrugsInfoSerializer, UserSerializer, PresInfoSerializer
from PIL import Image

import sys
from pharamacy_system import settings
sys.path.insert(0, '../')



pg_pass = os.environ.get('POSTGRES_PASS','')
engine = create_engine( 'postgresql+psycopg2://postgres:{0}@localhost:5432/pharmacy'.format(pg_pass))

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
            response = str(json.dumps({"res": "denial"}))
            return HttpResponse(response, content_type="text/plain")

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
        name = request.GET.get('name', None)
        surname = request.GET.get('surname', None)
        pharmacy = request.GET.get('pharmacy', None)
        password = request.GET.get('password', None)
        exsist = self.check_user(login, mail)
        if exsist['login']:
            return HttpResponse('Istnieje juz konto o takim logine', status=409, content_type="text/plain")
        elif exsist['mail']:
            return HttpResponse('Istnieje juz konto o takim mailu', status=409, content_type="text/plain")
        user = User(user_name=login, mail=mail, password=password, name=name, surname=surname, pharmacy=pharmacy)
        user.save()
        return HttpResponse('Pomyslnie zarejestrowany', status=201, content_type="text/plain")

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
    @staticmethod
    def get(request):
        cena = pd.read_sql_query('SELECT price FROM drugs_info', con=engine)
        plt.figure(1, figsize=(8, 8))
        plt.hist(cena)
        plt.xlabel('Cena [zł])', size=40)
        plt.ylabel('Ilość', size=40)
        plt.grid(True)
        plt.title('Najpopularniejsze ceny', size=40)
        plt.savefig('./cena.png')

        rodzaje = pd.read_sql_query('SELECT condition, COUNT(*) FROM drugs GROUP BY condition ORDER BY count DESC LIMIT 5;',
                                    con=engine)
        plt.figure(2, figsize=(8, 8))
        plt.scatter(rodzaje['condition'], rodzaje['count'])
        plt.xlabel('Przeznaczenie leku', size=40)
        plt.ylabel('Ilość', size=40)
        plt.title('Najpopularniejsze rodzaje leków', fontsize=30)
        plt.savefig('./rodzaje.png')

        plt.figure(3, figsize=(8, 8))
        mies = pd.read_sql_query(
            'SELECT sum(january)as Styczeń,sum(february) as Luty, sum(march) as Marzec,sum(april) as kwiecień,sum(may)as Maj,sum(june) as Czerwiec,sum(july)as Lipiec,sum(august) as Sierpień,sum(september) as Wrzesień,sum(october) as Październik,sum(november) as Listopad,sum(december) as Grudzień FROM drugs_monthly_report;',
            con=engine)
        mies = mies.T
        plt.xlabel('Miesiące', size=40)
        plt.ylabel('Mln zł', size=40)
        plt.title('Sprzedaż w ciągu roku', fontsize=30)
        plt.plot(mies)
        plt.savefig('./kolowy.png')
        plt.xticks(rotation=45)
        list_pdf = ['./kolowy.png', './rodzaje.png', './cena.png']

        images = [
            Image.open(f).convert('RGB')
            for f in list_pdf
        ]

        pdf_path = 'pharmacy_summary.pdf'
        images[0].save(
            pdf_path, "PDF", resolution=100.0, save_all=True, append_images=images[1:]
        )
        pdfFileObj = open(pdf_path, 'rb')

        response = HttpResponse(pdfFileObj, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="' + pdf_path + '"'
        return response


class StockStatusView(APIView):

    @staticmethod
    def get(request):
        drugname = request.GET.get('drugname')
        price = float(request.GET.get('price'))
        amount = request.GET.get('amount')
        prescription = request.GET.get('prescription')
        warehouse = request.GET.get('warehouse')
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

        if prescription == "undefined":
            pass
        elif prescription:
            drugInfo = drugInfo.filter(prescription=prescription)

        if warehouse == "undefined":
            pass
        elif warehouse:
            drugInfo = drugInfo.filter(warehouse=warehouse)

        serializer = DrugsInfoSerializer(drugInfo, many=True)
        return Response(serializer.data)

class PrescriptionStatusView(APIView):

    @staticmethod
    def get(request):
        id = request.GET.get('id')
        pesel = request.GET.get('pesel')
        prescription_id = request.GET.get('prescription_id')
        drug_name = request.GET.get('drug_name')
        count = request.GET.get('count')
        presInfo = PresInfo.objects.all()

        #to presinfo po równa się coś wywala

        if id == "undefined":
            pass
        elif id:
            presInfo = presInfo.filter(id=id)

        if pesel == "undefined":
            pass
        elif pesel:
            presInfo = presInfo.filter(pesel=pesel)

        if prescription_id == "undefined":
            pass
        elif prescription_id:
            presInfo = presInfo.filter(prescription_id=prescription_id)

        if drug_name == "undefined":
            pass
        elif drug_name:
            presInfo = presInfo.filter(drug_name=drug_name)

        if count == "undefined":
            pass
        elif count:
            presInfo = presInfo.filter(count=count)


        serializer = PresInfoSerializer(presInfo, many=True)
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
        useful = request.GET.get('useful')

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


class UpdatePasswordView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):
        mail = request.GET.get('mail')
        new_password = request.GET.get('new_password')
        try:
            User.objects.filter(mail=mail).update(password=str(new_password))
        except:
            response = str(json.dumps({"res": "denial"}))
            return HttpResponse(response, content_type="text/plain")

        response = str(json.dumps({"res": "ok"}))
        return HttpResponse(response, content_type="text/plain")


class UserInfoView(APIView):

    @action(detail=False, methods=['get'])
    def get(self, request):
        mail = request.GET.get('mail')
        user = User.objects.filter(mail=mail).values()
        response = str(json.dumps({"res": str(user)}))
        return HttpResponse(response, content_type="text/plain")


class UserView(APIView):

        @staticmethod
        def get(request):
            mail = request.GET.get('mail')
            userInfo = User.objects.filter(mail=mail).all()

            serializer = UserSerializer(userInfo, many=True)
            return Response(serializer.data)


class TestChangeStatusView(APIView):

    @staticmethod
    def get(request):
        drugname = request.GET.get('drugname')
        price = request.GET.get('price')
        warehouse = request.GET.get('warehouse')
        condition = request.GET.get('condition')


        drugInfo = pd.DataFrame( list( DrugsInfo.objects.all().values()))
        drug = [ x['condition'] for x in list( Drugs.objects.all().values('condition'))[:2637]]
        drugInfo['condition'] = drug


        if condition == "undefined":
            pass
        elif condition:
            drugInfo = drugInfo[drugInfo['condition'] == condition]


        response = drugInfo
        response = json.loads(response.to_json(orient='index'))
        response = [response[i] for i in response.keys()]
        print(type(response))


        return HttpResponse(json.dumps(response), content_type='application/json')


