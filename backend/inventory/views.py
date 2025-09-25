from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Material


@csrf_exempt
def add_material(request):
    if request.method == "POST":
        data = json.loads(request.body)
        Material.objects.create(
            category=data["category"],
            color=data["color"],
            qty=data["qty"],
            length=data["length"],
            price=data["price"],
        )
        materials = list(Material.objects.values())
        return JsonResponse(materials, safe=False)


def list_materials(request):
    materials = list(Material.objects.values())
    return JsonResponse(materials, safe=False)


def filter_materials(request, color):
    materials = list(Material.objects.filter(color=color).values())
    return JsonResponse(materials, safe=False)
