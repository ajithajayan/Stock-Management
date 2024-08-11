from rest_framework import generics, status
from rest_framework.response import Response
from store.models import (
    Supplier, Category, Brand, Product, Branch,
    ProductInTransaction, ProductOutTransaction,
    PurchaseRequest, DamageProductTransaction
)
from .serializers import (
    SupplierSerializer, CategorySerializer, BrandSerializer, ProductSerializer, BranchSerializer,
    ProductInTransactionSerializer, ProductOutTransactionSerializer,
    PurchaseRequestSerializer, DamageProductTransactionSerializer
)

# Supplier Views
class SupplierListCreateView(generics.ListCreateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SupplierDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

# Category Views
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Brand Views
class BrandListCreateView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

# Product Views
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.select_related('brand', 'category', 'supplier').all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        # This method is called when a new product is being created
        serializer.save()
        # Any additional business logic can be added here, if needed

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_update(self, serializer):
        # Automatically called when an instance is being updated
        serializer.save()
        # If you need to recalculate stocks or perform other actions post-update, do it here

    def perform_destroy(self, instance):
        # Handle any cleanup or stock adjustments before deleting a product
        instance.delete()  # Delete the product
        # Potentially update TotalStock here if needed


# Branch Views
class BranchListCreateView(generics.ListCreateAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class BranchDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    lookup_field = 'branch_code'

# Product In Transaction Views
class ProductInTransactionListCreateView(generics.ListCreateAPIView):
    queryset = ProductInTransaction.objects.all()
    serializer_class = ProductInTransactionSerializer

class ProductInTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductInTransaction.objects.all()
    serializer_class = ProductInTransactionSerializer

# Product Out Transaction Views
class ProductOutTransactionListCreateView(generics.ListCreateAPIView):
    queryset = ProductOutTransaction.objects.all()
    serializer_class = ProductOutTransactionSerializer

class ProductOutTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductOutTransaction.objects.all()
    serializer_class = ProductOutTransactionSerializer

# Purchase Request Views
class PurchaseRequestListCreateView(generics.ListCreateAPIView):
    queryset = PurchaseRequest.objects.all()
    serializer_class = PurchaseRequestSerializer

class PurchaseRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PurchaseRequest.objects.all()
    serializer_class = PurchaseRequestSerializer

# Damage Product Transaction Views
class DamageProductTransactionListCreateView(generics.ListCreateAPIView):
    queryset = DamageProductTransaction.objects.all()
    serializer_class = DamageProductTransactionSerializer

class DamageProductTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DamageProductTransaction.objects.all()
    serializer_class = DamageProductTransactionSerializer
