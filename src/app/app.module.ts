import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicScriptLoaderService } from './web/includes/services/dynamic-script-loader.service';
import { WebModule } from './web/web.module';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatabaseService } from './services/database.service';
import { AuthencationService } from './services/authencation.service';
import { UserDataService } from './services/user-data.service';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { DataProvider } from './providers/data.provider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { connectFunctionsEmulator } from 'firebase/functions';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    MatSnackBarModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    WebModule,
    AuthModule,
    MatProgressSpinnerModule,
    AdminModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => {
      const functions = getFunctions();
      connectFunctionsEmulator(functions,'localhost',5001);
      return functions;
    }),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DynamicScriptLoaderService,
    DatabaseService,
    AuthencationService,
    UserDataService,
    DataProvider,
    // { provide: BUCKET, useValue: 'beemadukaan' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
