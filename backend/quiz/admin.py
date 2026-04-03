from django.contrib import admin
from .models import Category, SubCategory, Question, Result

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Question)
admin.site.register(Result)