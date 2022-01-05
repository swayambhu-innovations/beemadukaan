import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './includes/layouts/header/header.component';
import { FooterComponent } from './includes/layouts/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { VisionMissionComponent } from './vision-mission/vision-mission.component';
import { ServicesComponent } from './services/services.component';
import { CarInsuranceComponent } from './services/car-insurance/car-insurance.component';
import { TwowheelerInsuranceComponent } from './services/twowheeler-insurance/twowheeler-insurance.component';
import { HealthInsuranceComponent } from './services/health-insurance/health-insurance.component';
import { InsuranceRenewalComponent } from './insurance-renewal/insurance-renewal.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SingleBlogComponent } from './blogs/single-blog/single-blog.component';
import { ContentfulService } from '../services/contentful.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadsComponent } from './downloads/downloads.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AboutUsComponent,
    VisionMissionComponent,
    ServicesComponent,
    CarInsuranceComponent,
    TwowheelerInsuranceComponent,
    HealthInsuranceComponent,
    InsuranceRenewalComponent,
    ContactUsComponent,
    BlogsComponent,
    FeedbackComponent,
    SingleBlogComponent,
    DownloadsComponent,
  ],
  providers:[
    ContentfulService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'vision-mission', component: VisionMissionComponent },
      {
        path:'services',
        children: [
          { path:'',  component : ServicesComponent},
          { path:'car-insurance' , component : CarInsuranceComponent},
          { path:'two-wheeler-insurance', component : TwowheelerInsuranceComponent },
          { path:'health-insurance', component : HealthInsuranceComponent},
        ],
      },
      { path: 'renew-insurance', component: InsuranceRenewalComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'blogs/:id', component: SingleBlogComponent },
      { path: 'feedbacks', component: FeedbackComponent },
      { path: 'downloads', component: DownloadsComponent },
    ])
  ],
})
export class WebModule { }
