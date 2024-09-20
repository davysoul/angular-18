import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent {

   
  // count:number = 0;
 
  selectedMonsterIndex = signal(1);
  // selectedMonster = computed(()=>{
  //   return this.monsters[this.selectedMonsterIndex()];
  // })
  constructor(){
    // effect(()=>{
    //   console.log(this.selectedMonster());
    // })
    
    
  }
  // increaseCount() {
  //   this.count ++;
  //   }
  //   toggleMonster() {
  //    this.selectedMonsterIndex.set((this.selectedMonsterIndex() +1) % this.monsters.length);
  //     }  
 
}
