import { Route } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { UploadComponent } from './components/upload/upload.component';

const pathMatch = 'full';

export const appRoutes: Route[] = [
    { path: UploadComponent.name, component: UploadComponent, pathMatch },
    { path: FormsComponent.name, component: FormsComponent, pathMatch },
];

export const defaultRoute: Route = { path: '', component: UploadComponent, pathMatch };
