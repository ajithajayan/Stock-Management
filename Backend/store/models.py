from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator

# Supplier model
class Supplier(models.Model):
    name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Category model
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

# Brand model
class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

# Product model
class Product(models.Model):
    name = models.CharField(max_length=255)
    purchase_date = models.DateField()
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='products')
    unit = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    expiry_date = models.DateField()
    opening_stock = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    manufacturing_date = models.DateField()
    product_code = models.CharField(max_length=100, unique=True)
    barcode = models.CharField(max_length=100, unique=True, blank=True, null=True)

    def __str__(self):
        return self.name

# Branch model
class Branch(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    branch_code = models.AutoField(primary_key=True)
    contact_details = models.CharField(max_length=15)

    def __str__(self):
        return self.name

# Inventory Transaction models
class ProductInTransaction(models.Model):
    date = models.DateField()
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='in_transactions')
    supplier_invoice_number = models.CharField(max_length=100, unique=True)
    total_qty_amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])

class ProductInTransactionDetail(models.Model):
    transaction = models.ForeignKey(ProductInTransaction, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='in_transaction_details')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    remarks = models.TextField(blank=True, null=True)

class ProductOutTransaction(models.Model):
    date = models.DateField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='out_transactions')
    branch_incharge = models.CharField(max_length=255)
    supplier_invoice_number = models.CharField(max_length=100, unique=True)
    total_qty_amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])

class ProductOutTransactionDetail(models.Model):
    transaction = models.ForeignKey(ProductOutTransaction, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='out_transaction_details')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    remarks = models.TextField(blank=True, null=True)

class PurchaseRequest(models.Model):
    date = models.DateField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='purchase_requests')
    order_form_number = models.CharField(max_length=100, unique=True)
    branch_incharge = models.CharField(max_length=255)
    total_qty_amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])

class PurchaseRequestDetail(models.Model):
    request = models.ForeignKey(PurchaseRequest, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchase_request_details')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    remarks = models.TextField(blank=True, null=True)

class DamageProductTransaction(models.Model):
    date = models.DateField()
    damage_transfer_number = models.CharField(max_length=100, unique=True)
    total_qty_amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])

class DamageProductTransactionDetail(models.Model):
    transaction = models.ForeignKey(DamageProductTransaction, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='damage_transaction_details')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    remarks = models.TextField(blank=True, null=True)
 

