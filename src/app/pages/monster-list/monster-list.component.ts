import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { PlayingCardsComponent } from "../../components/playing-cards/playing-cards.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [PlayingCardsComponent, SearchBarComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

  monsters = signal<Monster[]>([]);

  search = model('');
  monsterService = inject(MonsterService);
  router = inject(Router);
  filtersMonsters = computed(()=>{
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })
  selectedMonsterIndex = signal(1);
 
  constructor(){
    
    this.monsters. set(this.monsterService.getAll()) ;
    
  }

  addMonster(){
    //const genericMonster = new Monster();
   // this.monsterService.addMonster(genericMonster);
    //this.monsters.set(this.monsterService.getAll());
    this.router.navigate(['monster']);
    
  }
  openMonster(monster: Monster) {
    if(monster){
      //this.router.navigate([`monster/${monster.id}`]);
      this.router.navigate(['monster',monster.id]);
    }
    }
}
