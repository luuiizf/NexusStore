# Generated by Django 5.2.4 on 2025-07-09 02:19

import django.core.validators
from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='ativo',
            field=models.BooleanField(default=True, help_text='Define se o produto está ativo no sistema', verbose_name='Produto Ativo'),
        ),
        migrations.AlterField(
            model_name='product',
            name='categoria',
            field=models.CharField(choices=[('eletrônicos', 'Eletrônicos'), ('informática', 'Informática'), ('áudio', 'Áudio'), ('casa e jardim', 'Casa e Jardim'), ('esportes', 'Esportes'), ('moda', 'Moda'), ('livros', 'Livros')], help_text='Categoria do produto', max_length=50, verbose_name='Categoria'),
        ),
        migrations.AlterField(
            model_name='product',
            name='data_criacao',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação'),
        ),
        migrations.AlterField(
            model_name='product',
            name='estoque',
            field=models.PositiveIntegerField(default=0, help_text='Quantidade disponível em estoque', verbose_name='Quantidade em Estoque'),
        ),
        migrations.AlterField(
            model_name='product',
            name='preco',
            field=models.DecimalField(decimal_places=2, help_text='Preço do produto em reais', max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Preço'),
        ),
    ]
