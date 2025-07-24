from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
from .auth_views import LoginView, RegisterView

# Cria o router e registra o viewset
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]

# URLs geradas automaticamente:
# GET    /api/products/                    - Lista produtos
# POST   /api/products/                    - Cria produto
# GET    /api/products/{id}/               - Detalha produto
# PUT    /api/products/{id}/               - Atualiza produto (completo)
# PATCH  /api/products/{id}/               - Atualiza produto (parcial)
# DELETE /api/products/{id}/               - Remove produto
# GET    /api/products/estatisticas/       - Estatísticas
# GET    /api/products/categorias/         - Lista categorias
# POST   /api/products/{id}/duplicar/      - Duplica produto