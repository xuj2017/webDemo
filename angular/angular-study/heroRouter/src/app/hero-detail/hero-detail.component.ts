import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, animate } from '@angular/core';
import { Hero, HeroService } from '../hero.service';
import { ActivatedRoute, Router ,ParamMap} from '@angular/router';
// import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  // animations:slideInDownAnimation
})
export class HeroDetailComponent implements OnInit {

  // @HostBinding('@routerAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position') position = 'absolute';

  hero:Hero;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:HeroService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')))
      .subscribe((hero: Hero) => this.hero = hero);
  }

  gotoHeroes(){
    let heroId = this.hero?this.hero.id:null;
    this.router.navigate(['/heroes',{id:heroId,foo:'foo'}]);
  }

}
