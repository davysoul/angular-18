import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters :Monster[] = [];
  currentIndex: number = 1;
  constructor() { 
    this.load();
  }

  getAll(): Monster[]{
    return this.monsters.map(monster => monster.copy());
  }
  getMonster(id:number):Monster | undefined{
    const monster = this.monsters.find(monster => monster.id ==id);
    return monster ? monster.copy() : undefined;
  }
  addMonster(monster:Monster):Monster{
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();
    return monsterCopy;
  }
  updateMonster(monster:Monster):Monster{
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === monster.id);
    if(monsterIndex != -1){
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }
    return monsterCopy;
  }
  delete(id:number){
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === id);
    if(monsterIndex !=-1){
      this.monsters.splice(monsterIndex,1);
      this.save();
    }
  }
  private save(){
    localStorage.setItem('monsters',JSON.stringify(this.monsters));
  }
  private load(){
    const monsterData = localStorage.getItem('monsters');
    if(monsterData){
      this.monsters = JSON.parse(monsterData).map((monsterJson:any)=> Object.assign(new Monster(),monsterJson));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id));
    }else{
      this.init();
      this.save();
    }
   
  }
  private init(){
    this.monsters = [];
    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name ="pik";
    monster1.hp = 60;
    monster1.attackName= "Geo";
    monster1.image = 'assets/images/pikachu.jpg';
    monster1.attackStrength = 100;
    monster1.figureCaption ='No 001 Pik';
    monster1.attackDescription = 'This is the desc..';
    monster1.type = MonsterType.ELECTRIC;
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name ="car";
    monster2.hp = 40;
    monster2.image = 'assets/images/water.jpg';
    monster2.type = MonsterType.WATER;
    monster2.attackName= "Geo";
    monster2.attackStrength = 120;
    monster2.figureCaption ='No 002 Car';
    monster2.attackDescription = 'This is the of monster 2 desc..';
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name ="fire";
    monster3.hp = 40;
    monster3.image = 'assets/images/fire.png';
    monster3.type = MonsterType.FIRE;
    monster3.attackName= "Geo";
    monster3.attackStrength = 200;
    monster3.figureCaption ='No 003 Fire';
    monster3.attackDescription = 'This is the of monster 3 desc..';
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name ="bulb";
    monster4.hp = 40;
    monster4.image = 'assets/images/img1.jpg';
    monster4.type = MonsterType.ELECTRIC;
    monster4.attackName= "Geo";
    monster4.attackStrength = 10;
    monster4.figureCaption ='No 004 Bulb';
    monster4.attackDescription = 'This is the of monster 4 desc..';
    this.monsters.push(monster4);
  }
}
