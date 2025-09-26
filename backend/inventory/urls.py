from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.add_material, name="add_material"),
    path("list/", views.list_materials, name="list_materials"),
    path("filter/<str:color>/", views.filter_materials, name="filter_materials"),
    path("delete/<int:pk>/", views.delete_material, name="delete_material"),
]
