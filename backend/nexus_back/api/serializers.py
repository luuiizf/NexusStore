from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    valor_total_estoque = serializers.ReadOnlyField()
    status_estoque = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = [
            'id',
            'nome',
            'descricao', 
            'preco',
            'categoria',
            'estoque',
            'ativo',
            'imagem_url',
            'data_criacao',
            'data_atualizacao',
            'valor_total_estoque',
            'status_estoque'
        ]
        read_only_fields = ['id', 'data_criacao', 'data_atualizacao']

    def validate_nome(self, value):
        """Validação customizada para o nome"""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("O nome deve ter pelo menos 2 caracteres.")
        return value.strip()

    def validate_descricao(self, value):
        """Validação customizada para a descrição"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("A descrição deve ter pelo menos 10 caracteres.")
        return value.strip()

    def validate_preco(self, value):
        """Validação customizada para o preço"""
        if value <= 0:
            raise serializers.ValidationError("O preço deve ser maior que zero.")
        return value

    def validate_estoque(self, value):
        """Validação customizada para o estoque"""
        if value < 0:
            raise serializers.ValidationError("O estoque não pode ser negativo.")
        return value


class ProductCreateSerializer(ProductSerializer):
    """Serializer específico para criação de produtos"""
    
    class Meta(ProductSerializer.Meta):
        fields = [
            'nome',
            'descricao',
            'preco', 
            'categoria',
            'estoque',
            'ativo',
            'imagem_url'
        ]


class ProductUpdateSerializer(ProductSerializer):
    """Serializer específico para atualização de produtos"""
    
    class Meta(ProductSerializer.Meta):
        fields = [
            'nome',
            'descricao',
            'preco',
            'categoria', 
            'estoque',
            'ativo',
            'imagem_url'
        ]

    def validate(self, attrs):
        """Validação geral do produto"""
        # Permite atualização parcial
        if 'nome' in attrs and len(attrs['nome'].strip()) < 2:
            raise serializers.ValidationError({
                'nome': 'O nome deve ter pelo menos 2 caracteres.'
            })
        
        if 'descricao' in attrs and len(attrs['descricao'].strip()) < 10:
            raise serializers.ValidationError({
                'descricao': 'A descrição deve ter pelo menos 10 caracteres.'
            })
            
        return attrs


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer otimizado para listagem de produtos"""
    
    class Meta:
        model = Product
        fields = [
            'id',
            'nome',
            'preco',
            'categoria',
            'estoque', 
            'ativo',
            'imagem_url',
            'data_criacao'
        ]