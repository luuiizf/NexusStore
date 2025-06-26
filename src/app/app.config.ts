// // src/app/app.config.ts

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// // 1. Importe o provedor do PrimeNG e o tema desejado
// import { providePrimeNG } from 'primeng/config';
// import Lara from '@primeng/themes/lara';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideAnimationsAsync(),

//     // 2. Configure o PrimeNG aqui
//     providePrimeNG({
//       theme: {
//         preset: Lara, // Use o tema importado
//         options: {
//           prefix: 'p',
//           // Você queria 'lara-light-indigo', então definimos o modo claro
//           darkModeSelector: 'light'
//         }
//       },
//       ripple: true // Habilita o efeito de ondulação (ripple) globalmente
//     })
//   ]
// };