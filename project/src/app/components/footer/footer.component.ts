import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Sobre a NexusStore</h3>
            <p class="text-gray-300">
              Projeto acadêmico de e-commerce desenvolvido com Angular e tecnologias modernas.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">Termos de Uso</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contato</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: contato&#64;nexusstore.com</li>
              <li>Tel: (11) 1234-5678</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 NexusStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}