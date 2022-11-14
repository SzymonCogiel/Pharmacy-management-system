from rest_framework.views import APIView
from django.http import HttpResponse
import json
import matplotlib.pyplot as plt
from PIL import Image
from rest_framework.decorators import action

class TestAPIView(APIView):

    @staticmethod
    def get(request):
        plt.plot([1, 2, 3, 4])
        plt.ylabel('some numbers')
        plt.savefig("output.jpg")
        try:
            with open("output.jpg", "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        except IOError:
            red = Image.new('RGBA', (1, 1), (255, 0, 0, 0))
            response = HttpResponse(content_type="image/jpeg")
            red.save(response, "JPEG")
            return response


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
    def post(self, request):
        mail = request.GET.get('mail', None)
        login = request.GET.get('login', None)
        password = request.GET.get('password', None)
        print(password)
        response = str(json.dumps(str(login)))
        return HttpResponse(response, content_type="text/plain")
