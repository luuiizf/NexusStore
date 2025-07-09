import django_filters
from django.db.models import Q
from .models import Product


class ProductFilter(django_filters.FilterSet):
    """Filtros customizados para produtos"""
    
    # Filtro por nome (busca parcial, case-insensitive)
    nome = django_filters.CharFilter(
        field_name='nome',
        lookup_expr='icontains',
        label='Nome do produto'
    )
    
    # Filtro por categoria
    categoria = django_filters.ChoiceFilter(
        choices=Product.CATEGORIA_CHOICES,
        label='Categoria'
    )
    
    # Filtro por status ativo
    ativo = django_filters.BooleanFilter(
        field_name='ativo',
        label='Produto ativo'
    )
    
    # Filtro por faixa de preço
    preco_min = django_filters.NumberFilter(
        field_name='preco',
        lookup_expr='gte',
        label='Preço mínimo'
    )
    
    preco_max = django_filters.NumberFilter(
        field_name='preco',
        lookup_expr='lte',
        label='Preço máximo'
    )
    
    # Filtro por estoque
    estoque_min = django_filters.NumberFilter(
        field_name='estoque',
        lookup_expr='gte',
        label='Estoque mínimo'
    )
    
    estoque_max = django_filters.NumberFilter(
        field_name='estoque',
        lookup_expr='lte',
        label='Estoque máximo'
    )
    
    # Filtro para produtos com estoque baixo
    estoque_baixo = django_filters.BooleanFilter(
        method='filter_estoque_baixo',
        label='Estoque baixo (menos de 5 unidades)'
    )
    
    # Filtro por data de criação
    data_criacao_inicio = django_filters.DateFilter(
        field_name='data_criacao',
        lookup_expr='gte',
        label='Criado a partir de'
    )
    
    data_criacao_fim = django_filters.DateFilter(
        field_name='data_criacao',
        lookup_expr='lte',
        label='Criado até'
    )
    
    # Busca geral (nome, descrição ou categoria)
    busca = django_filters.CharFilter(
        method='filter_busca_geral',
        label='Busca geral'
    )

    class Meta:
        model = Product
        fields = {
            'nome': ['exact', 'icontains'],
            'categoria': ['exact'],
            'ativo': ['exact'],
            'preco': ['exact', 'gte', 'lte'],
            'estoque': ['exact', 'gte', 'lte'],
        }

    def filter_estoque_baixo(self, queryset, name, value):
        """Filtra produtos com estoque baixo (menos de 5 unidades)"""
        if value:
            return queryset.filter(estoque__lt=5)
        return queryset

    def filter_busca_geral(self, queryset, name, value):
        """Busca geral em nome, descrição e categoria"""
        if value:
            return queryset.filter(
                Q(nome__icontains=value) |
                Q(descricao__icontains=value) |
                Q(categoria__icontains=value)
            )
        return queryset
