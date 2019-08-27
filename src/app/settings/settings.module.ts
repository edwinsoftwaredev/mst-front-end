import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {SharedModule} from '../shared/shared.module';
import {MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
