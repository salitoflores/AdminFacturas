import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,
        HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
        HttpHandler, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let sendRequest = req;
        const token = localStorage.getItem('user');
        if (token && token !== '') {
            // console.log('Se envia token de auth');
            const authToken = 'Bearer ' + token;
            const authReq = req.clone({setHeaders: {Authorization: authToken}});
            sendRequest = authReq;
        }
        return next.handle(sendRequest);
    }
}
