import { NgModule } from '@angular/core';
import { ServiceModule } from './services/service.module';

@NgModule({
    exports: [ ServiceModule ]
})
export class CoreModule { }
