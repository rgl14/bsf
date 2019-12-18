import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, componentRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageformService } from './manageform.service';
import { AgGridModule } from 'ag-grid-angular';
import { CustomcellbuttonsComponent, SetMatchLiveTvDialog } from './customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from './navigationcell/navigationcell.component';
import { ButtontogglecellComponent,UserstatusDialog } from './buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from './ratesnavigation/ratesnavigation.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
import { MainComponent, BottomSheetComponent } from './main/main.component';
import { TokenInterceptor } from './services/token-interceptor';
import { CelltextfieldComponent } from './celltextfield/celltextfield.component';
import { CelldisabledtextfieldComponent } from './celldisabledtextfield/celldisabledtextfield.component';
import { CelldisabledusedlimitComponent } from './celldisabledusedlimit/celldisabledusedlimit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MarketCtlgComponent } from './market-ctlg/market-ctlg.component';
import { PackageSettingsComponent } from './package-settings/package-settings.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { UsermanagementService } from './services/usermanagement.service';
import { SharedataService } from './services/sharedata.service';
import { CustomsporttogglecellComponent } from './customsporttogglecell/customsporttogglecell.component';
import { TournamenttogglecellComponent } from './tournamenttogglecell/tournamenttogglecell.component';
import { MatchtogglecellComponent } from './matchtogglecell/matchtogglecell.component';
import { MarkettogglecellComponent } from './markettogglecell/markettogglecell.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    HeaderComponent,
    SidebarComponent,
    componentRouting,
    CustomcellbuttonsComponent,
    NavigationcellComponent,
    ButtontogglecellComponent,
    UserstatusDialog,
    CustomsporttogglecellComponent,
    RatesnavigationComponent,
    CelltextfieldComponent,
    CelldisabledtextfieldComponent,
    CelldisabledusedlimitComponent,
    LoginComponent,
    MainComponent,
    MarketCtlgComponent,
    PackageSettingsComponent,
    CreatePackageComponent,
    SetMatchLiveTvDialog,
    TournamenttogglecellComponent,
    MatchtogglecellComponent,
    MarkettogglecellComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ],
  entryComponents: [BottomSheetComponent, CustomcellbuttonsComponent, NavigationcellComponent, ButtontogglecellComponent,UserstatusDialog,CustomsporttogglecellComponent,TournamenttogglecellComponent,MatchtogglecellComponent,MarkettogglecellComponent, RatesnavigationComponent, CelltextfieldComponent, CelldisabledtextfieldComponent, CelldisabledusedlimitComponent, SetMatchLiveTvDialog],
  providers: [
    ManageformService,
    CookieService,
    TokenService,
    UsermanagementService,
    SharedataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
