import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './includes/layouts/header/header.component';
import { FooterComponent } from './includes/layouts/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { VisionMissionComponent } from './vision-mission/vision-mission.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AboutUsComponent,
    VisionMissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'vision-mission', component: VisionMissionComponent }
    ])
  ],
})
export class WebModule { }
