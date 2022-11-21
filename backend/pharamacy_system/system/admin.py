from django.contrib import admin
from .models import User
from .models import Drugs
from .models import DrugsInfo

# Register your models here.


admin.site.register(User)
admin.site.register(Drugs)
