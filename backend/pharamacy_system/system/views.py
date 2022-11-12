from rest_framework.views import APIView
from django.http import HttpResponse
import json
import matplotlib.pyplot as plt
from PIL import Image

class TestAPIView(APIView):
    @staticmethod
    def get(request):
        # x = "test"
        # response = str(json.dumps(str(x)))
        # return HttpResponse(response, content_type="text/plain")
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