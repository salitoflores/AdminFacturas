import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

/**
 * Declaramos los interceptores que se van a desarrollar en todo el proyecto
 */
export const httpIntecerptorsProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
