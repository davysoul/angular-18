import { MonsterType } from "../../utils/monster.utils";

export class Monster {
   id:number = -1;
   name:string = "My monster";
   image :string = 'assets/images/img1.jpg';
   type :MonsterType = MonsterType.ELECTRIC;
    hp:number = 40;
    figureCaption:string = "No 001 Monster";
    attackName:string = "Geo impact";
    attackStrength:number = 60;
    attackDescription:string = "This is a long description of the monster  attack probably something to do with electricity";
    copy():Monster{
      return Object.assign(new Monster(),this);
    }
   }
