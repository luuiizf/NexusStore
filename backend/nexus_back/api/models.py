from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Product(models.Model):
    CATEGORIA_CHOICES = [
        ('Eletrônicos', 'Eletrônicos'),
        ('Informática', 'Informática'),
        ('Áudio', 'Áudio'),
        ('Casa e jardim', 'Casa e Jardim'),
        ('Esportes', 'Esportes'),
        ('Moda', 'Moda'),
        ('Livros', 'Livros'),
    ]

    nome = models.CharField(
        max_length=200,
        verbose_name="Nome do Produto",
        help_text="Nome do produto (máximo 200 caracteres)"
    )
    
    descricao = models.TextField(
        verbose_name="Descrição",
        help_text="Descrição detalhada do produto"
    )
    
    preco = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        verbose_name="Preço",
        help_text="Preço do produto em reais"
    )
    
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        verbose_name="Categoria",
        help_text="Categoria do produto"
    )
    
    estoque = models.PositiveIntegerField(
        default=0,
        verbose_name="Quantidade em Estoque",
        help_text="Quantidade disponível em estoque"
    )
    
    ativo = models.BooleanField(
        default=True,
        verbose_name="Produto Ativo",
        help_text="Define se o produto está ativo no sistema"
    )
    
    imagem_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="URL da Imagem",
        help_text="URL da imagem do produto"
    )
    
    data_criacao = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data de Criação"
    )
    
    data_atualizacao = models.DateTimeField(
        auto_now=True,
        verbose_name="Data de Atualização"
    )

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ['-data_criacao']
        indexes = [
            models.Index(fields=['categoria']),
            models.Index(fields=['ativo']),
            models.Index(fields=['data_criacao']),
        ]

    def __str__(self):
        return f"{self.nome} - {self.categoria}"

    @property
    def valor_total_estoque(self):
        """Calcula o valor total do estoque deste produto"""
        return float(self.preco * self.estoque)

    @property
    def status_estoque(self):
        """Retorna o status do estoque baseado na quantidade"""
        if self.estoque == 0:
            return "Sem estoque"
        elif self.estoque < 5:
            return "Estoque baixo"
        elif self.estoque < 10:
            return "Estoque médio"
        else:
            return "Estoque alto"

    def clean(self):
        """Validações customizadas"""
        from django.core.exceptions import ValidationError
        
        if self.nome and len(self.nome.strip()) < 2:
            raise ValidationError({'nome': 'O nome deve ter pelo menos 2 caracteres.'})
        
        if self.descricao and len(self.descricao.strip()) < 10:
            raise ValidationError({'descricao': 'A descrição deve ter pelo menos 10 caracteres.'})

    def save(self, *args, **kwargs):
        """Override do save para limpeza de dados"""
        if self.nome:
            self.nome = self.nome.strip()
        if self.descricao:
            self.descricao = self.descricao.strip()
        
        self.full_clean()
        super().save(*args, **kwargs)
