export enum MonsterType{
    PLANT = 'plant',
    ELECTRIC = 'electric',
    FIRE = 'fire',
    WATER = 'water'
}

export interface IMonsterProperties{
    imageUrl: string;
    color: string;
}

export const MonsterTypeProperties : {[key:string]:IMonsterProperties} = {
    [MonsterType.PLANT]:{
        imageUrl:'assets/images/plant.jpg',
        color:'rgb(135,255,124)'
    },
    [MonsterType.ELECTRIC]:{
        imageUrl:'assets/images/electric.jpg',
        color:'rgb(255,255,104)'
    },
    [MonsterType.FIRE]:{
        imageUrl:'assets/images/fire.png',
        color:'rgb(255,104,104)'
    },
    [MonsterType.WATER]:{
        imageUrl: 'assets/images/water.jpg',
        color:'rgb(118,234,255)'
    }
}