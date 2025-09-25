from django.db import models


class Material(models.Model):
    category = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    qty = models.IntegerField()
    length = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
