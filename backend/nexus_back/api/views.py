from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum, Count
from .models import Product
from .serializers import *
from .filters import ProductFilter


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento completo de produtos.
    
    Fornece operações CRUD padrão:
    - GET /api/products/ - Lista produtos
    - POST /api/products/ - Cria produto
    - GET /api/products/{id}/ - Detalha produto
    - PUT /api/products/{id}/ - Atualiza produto completo
    - PATCH /api/products/{id}/ - Atualiza produto parcial
    - DELETE /api/products/{id}/ - Remove produto
    """
    
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['nome', 'descricao', 'categoria']
    ordering_fields = ['nome', 'preco', 'estoque', 'data_criacao', 'categoria']
    ordering = ['-data_criacao']

    def get_serializer_class(self):
        """Retorna o serializer apropriado baseado na ação"""
        if self.action == 'list':
            return ProductListSerializer
        elif self.action == 'create':
            return ProductCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return ProductUpdateSerializer
        return ProductSerializer

    def get_queryset(self):
        """Customiza a queryset baseada nos parâmetros"""
        queryset = Product.objects.all()
        
        # Filtro por categoria via query param
        categoria = self.request.query_params.get('categoria')
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        
        # Filtro por status ativo
        ativo = self.request.query_params.get('ativo')
        if ativo is not None:
            ativo_bool = ativo.lower() in ['true', '1', 'yes']
            queryset = queryset.filter(ativo=ativo_bool)
        
        # Filtro por estoque baixo
        estoque_baixo = self.request.query_params.get('estoque_baixo')
        if estoque_baixo and estoque_baixo.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(estoque__lt=5)
            
        return queryset

    def create(self, request, *args, **kwargs):
        """Cria um novo produto"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            product = serializer.save()
            response_serializer = ProductSerializer(product)
            return Response(
                response_serializer.data, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': f'Erro ao criar produto: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        """Atualiza um produto"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        try:
            product = serializer.save()
            response_serializer = ProductSerializer(product)
            return Response(response_serializer.data)
        except Exception as e:
            return Response(
                {'error': f'Erro ao atualizar produto: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        """Remove um produto"""
        try:
            instance = self.get_object()
            instance.delete()
            return Response(
                {'message': 'Produto removido com sucesso'}, 
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Erro ao remover produto: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'])
    def estatisticas(self, request):
        """Endpoint para estatísticas dos produtos"""
        total_produtos = Product.objects.count()
        produtos_ativos = Product.objects.filter(ativo=True).count()
        produtos_inativos = total_produtos - produtos_ativos
        
        # Estatísticas por categoria
        stats_categoria = Product.objects.values('categoria').annotate(
            total=Count('id'),
            ativos=Count('id', filter=Q(ativo=True))
        ).order_by('categoria')
        
        # Valor total em estoque
        valor_total = Product.objects.aggregate(
            total=Sum('preco') * Sum('estoque')
        )['total'] or 0
        
        # Produtos com estoque baixo
        estoque_baixo = Product.objects.filter(estoque__lt=5, ativo=True).count()
        
        return Response({
            'total_produtos': total_produtos,
            'produtos_ativos': produtos_ativos,
            'produtos_inativos': produtos_inativos,
            'estoque_baixo': estoque_baixo,
            'valor_total_estoque': valor_total,
            'por_categoria': list(stats_categoria)
        })

    @action(detail=False, methods=['get'])
    def categorias(self, request):
        """Lista todas as categorias disponíveis"""
        categorias = [choice[0] for choice in Product.CATEGORIA_CHOICES]
        return Response({'categorias': categorias})

    @action(detail=True, methods=['post'])
    def duplicar(self, request, pk=None):
        """Duplica um produto existente"""
        try:
            produto_original = self.get_object()
            
            # Cria uma cópia
            produto_duplicado = Product.objects.create(
                nome=f"{produto_original.nome} (Cópia)",
                descricao=produto_original.descricao,
                preco=produto_original.preco,
                categoria=produto_original.categoria,
                estoque=0,  # Inicia com estoque zero
                ativo=False,  # Inicia inativo
                imagem_url=produto_original.imagem_url
            )
            
            serializer = ProductSerializer(produto_duplicado)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {'error': f'Erro ao duplicar produto: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )