#!/usr/bin/env python3
"""
Script para configurar o banco de dados e criar dados de exemplo
"""
import os
import sys
import django
from decimal import Decimal


# Adiciona o diretório do projeto ao path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend', 'nexus_back'))

# Configura o Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexus_back.settings')
django.setup()

from nexus_back.api.models import Product

def create_sample_products():
    """Cria produtos de exemplo para teste"""
    
    sample_products = [
        {
            'nome': 'Smartphone Samsung Galaxy S23',
            'descricao': 'Smartphone premium com câmera de 50MP, tela AMOLED de 6.1" e processador Snapdragon 8 Gen 2',
            'preco': Decimal('2499.99'),
            'categoria': 'Eletrônicos',
            'estoque': 15,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
        },
        {
            'nome': 'Notebook Dell Inspiron 15',
            'descricao': 'Notebook para uso profissional com Intel Core i7, 16GB RAM, SSD 512GB e tela Full HD',
            'preco': Decimal('3299.00'),
            'categoria': 'Informática',
            'estoque': 8,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
        },
        {
            'nome': 'Fone de Ouvido Sony WH-1000XM4',
            'descricao': 'Fone de ouvido wireless com cancelamento de ruído ativo e qualidade de áudio premium',
            'preco': Decimal('899.90'),
            'categoria': 'Áudio',
            'estoque': 25,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        },
        {
            'nome': 'Smart TV LG 55" 4K',
            'descricao': 'Smart TV 55 polegadas com resolução 4K, HDR e sistema operacional webOS',
            'preco': Decimal('2199.00'),
            'categoria': 'Eletrônicos',
            'estoque': 12,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'
        },
        {
            'nome': 'Cadeira Gamer RGB',
            'descricao': 'Cadeira gamer ergonômica com iluminação RGB, apoio lombar e ajuste de altura',
            'preco': Decimal('799.99'),
            'categoria': 'Casa e jardim',
            'estoque': 6,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'
        },
        {
            'nome': 'Tênis Nike Air Max',
            'descricao': 'Tênis esportivo confortável para corrida e atividades físicas',
            'preco': Decimal('459.90'),
            'categoria': 'Esportes',
            'estoque': 30,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
        },
        {
            'nome': 'Camiseta Polo Lacoste',
            'descricao': 'Camiseta polo clássica em algodão pima, disponível em várias cores',
            'preco': Decimal('299.00'),
            'categoria': 'Moda',
            'estoque': 20,
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
        },
        {
            'nome': 'Mouse Gamer Logitech G502',
            'descricao': 'Mouse gamer com sensor óptico de alta precisão e 11 botões programáveis',
            'preco': Decimal('189.90'),
            'categoria': 'Informática',
            'estoque': 3,  # Estoque baixo para teste
            'ativo': True,
            'imagem_url': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
        },
        {
            'nome': 'Produto Inativo - Teste',
            'descricao': 'Este é um produto inativo para testar os filtros do sistema',
            'preco': Decimal('99.99'),
            'categoria': 'Eletrônicos',
            'estoque': 0,
            'ativo': False,
            'imagem_url': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
        },
    ]
    
    print("Criando produtos de exemplo...")
    
    for product_data in sample_products:
        product, created = Product.objects.get_or_create(
            nome=product_data['nome'],
            defaults=product_data
        )
        
        if created:
            print(f"✓ Produto criado: {product.nome}")
        else:
            print(f"- Produto já existe: {product.nome}")
    
    print(f"\nTotal de produtos no banco: {Product.objects.count()}")
    print(f"Produtos ativos: {Product.objects.filter(ativo=True).count()}")
    print(f"Produtos com estoque baixo: {Product.objects.filter(estoque__lt=5, ativo=True).count()}")

if __name__ == '__main__':
    print("=== Configuração do Banco de Dados ===")
    
    # Limpa produtos existentes (opcional)
    if '--reset' in sys.argv:
        print("Removendo produtos existentes...")
        Product.objects.all().delete()
        print("Produtos removidos.")
    
    create_sample_products()
    print("\n=== Configuração concluída! ===")
