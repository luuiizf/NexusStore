from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom exception handler para melhor tratamento de erros
    """
    # Chama o handler padrão primeiro
    response = exception_handler(exc, context)
    
    if response is not None:
        # Log do erro
        logger.error(f"API Error: {exc} - Context: {context}")
        
        # Customiza a resposta de erro
        custom_response_data = {
            'error': True,
            'message': 'Ocorreu um erro na operação',
            'details': response.data,
            'status_code': response.status_code
        }
        
        # Mensagens mais amigáveis para erros comuns
        if response.status_code == 400:
            custom_response_data['message'] = 'Dados inválidos fornecidos'
        elif response.status_code == 404:
            custom_response_data['message'] = 'Recurso não encontrado'
        elif response.status_code == 500:
            custom_response_data['message'] = 'Erro interno do servidor'
            
        response.data = custom_response_data
    
    return response

def validate_image_url(url):
    """
    Valida se a URL da imagem é válida
    """
    if not url:
        return True  # URL vazia é válida (opcional)
    
    import re
    url_pattern = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    
    return url_pattern.match(url) is not None
