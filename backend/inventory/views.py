from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Material


@csrf_exempt
def add_material(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        material = Material.objects.create(
            category=data["category"],
            color=data["color"],
            qty=data["qty"],
            length=data["length"],
            price=data["price"],
        )
        material.save()

        # return updated list with ids
        materials = list(
            Material.objects.values("id", "category", "color", "qty", "length", "price")
        )
        return JsonResponse(materials, safe=False)
    
@csrf_exempt
def delete_material(request, pk):
    if request.method == "DELETE":
        try:
            material = Material.objects.get(pk=pk)
            material.delete()
            return JsonResponse({"success": True})
        except Material.DoesNotExist:
            return JsonResponse({"success": False, "error": "Not found"}, status=404)
    return JsonResponse({"success": False, "error": "Invalid method"}, status=405)



def list_materials(request):
   if request.method == "GET":
        materials = list(
            Material.objects.values("id", "category", "color", "qty", "length", "price")
        )
        return JsonResponse(materials, safe=False)


def filter_materials(request, color):
    if request.method == "GET":
        materials = list(
            Material.objects.filter(color=color).values(
                "id", "category", "color", "qty", "length", "price"
            )
        )
        return JsonResponse(materials, safe=False)
