import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseComponent {

    protected getHttpErrorMessage(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Error occurred:', error.error.message);
            return error.error.message;
        } else if (error.status === 500) {
            return 'Ha ocurrido un problema, intente nuevamente y revise los logs del Console Server';
        } else if (error.status === 400) {
            return error.error;
        } else {
            return 'Ha ocurrido un error. Intente nuevamente la operacion.';
        }
    }

    protected loadScript(scriptUrl: string) {
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = scriptUrl;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        })
    }
}