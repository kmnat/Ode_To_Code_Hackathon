import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router'; // This will come from appConfig
// import { routes } from './app/app-routing.module'; // This will come from appConfig
import { appConfig } from './app/app.config'; // Import appConfig

// Pass appConfig directly to bootstrapApplication
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
