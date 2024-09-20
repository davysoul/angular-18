import { Component, computed, input, Input,  OnChanges,  SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../../utils/monster.utils';

@Component({
  selector: 'app-playing-cards',
  standalone: true,
  imports: [],
  templateUrl: './playing-cards.component.html',
  styleUrl: './playing-cards.component.css'
})
export class PlayingCardsComponent {
 
 monster = input(new Monster());
  monsterTypeIcon = computed(()=>{
    return MonsterTypeProperties[this.monster().type].imageUrl;
  })  
  backgroundColor = computed(()=>{
    return MonsterTypeProperties[this.monster().type].color;
  }) 

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['monster']){
  //    console.log(changes['monster'].previousValue?.type);
  //     if(changes['monster'].previousValue?.type != changes['monster'].currentValue.type){
  //       this.monsterTypeIcon = MonsterTypeProperties[this.monster().type].imageUrl;
  //       this.backgroundColor = MonsterTypeProperties[this.monster().type].color;
  //     }
  //   }
    
  // }
  // monster: InputSignal<Monster>= input(new Monster,{
  //   alias:'my-monster',
  //   transform:(value:Monster)=>{
  //     value.hp = value.hp /2;
  //     return value; 
  //   }
  // });
  // @Input({
  //   alias:'my-monster',
  //   transform:(value:Monster)=>{
  //     value.hp = value.hp /3;
  //     return value;
  //   }
  // }) monster1:Monster = new Monster();
 
}
