import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { IToast } from './dyn-toast';

@Injectable()
export class DynToastService {

    constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'bottom-left';
    }

    showToast(toast: IToast) {
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: toast.Title,
            msg: toast.Msg,
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        switch (toast.Type) {
            case 'default': 
                this.toastyService.default(toastOptions); 
                break;
            case 'info': 
                this.toastyService.info(toastOptions); 
                break;
            case 'success': 
                this.toastyService.success(toastOptions); 
                break;
            case 'wait': 
                this.toastyService.wait(toastOptions); 
                break;
            case 'error': 
                this.toastyService.error(toastOptions); 
                break;
            case 'warning': 
                this.toastyService.warning(toastOptions); 
                break;
        }
    }
}