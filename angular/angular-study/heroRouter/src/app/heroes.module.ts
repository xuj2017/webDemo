import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HeroesComponent }    from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

import { HeroService } from './hero.service';
import{Routes} from '@angular/router';

// import { HeroRoutingModule } from './heroes-routing.module';
import { RouterModule } from '@angular/router';

const heroesRoutes: Routes = [
    { path: 'heroes',  component: HeroesComponent },
    { path: 'hero/:id', component: HeroDetailComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
        heroesRoutes
    )
  ],
  declarations: [
    HeroesComponent,
    HeroDetailComponent
  ],
  providers: [ HeroService ]
})
export class HeroesModule {}

