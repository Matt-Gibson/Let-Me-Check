from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.add_material),
    path("list/", views.list_materials),
    path("filter/<str:color>/", views.filter_materials),
]
