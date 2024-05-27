from django.contrib import admin
from .models import DynamicDetail, StaticDetail, GoalDetail

admin.site.register(DynamicDetail)
admin.site.register(StaticDetail)
admin.site.register(GoalDetail)