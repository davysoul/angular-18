import { Component, Inject, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../../utils/monster.utils';
import { PlayingCardsComponent } from "../../components/playing-cards/playing-cards.component";
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule, PlayingCardsComponent,MatButtonModule,MatInputModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit,OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private formValuesSubscription: Subscription | null = null;
  monsterId = signal<number | undefined>(undefined);
  routeSubscription :Subscription | null = null;
  monsterTypes = Object.values(MonsterType);
  
  formGroup = this.fb.group({
    name :['',[Validators.required]],
    hp :[0,[Validators.min(1),Validators.required,Validators.max(200)]],
    image :['',[Validators.required]],
    type :['',[Validators.required]],
    figureCaption:['',[Validators.required]],
    attackName:['',[Validators.required]],
    attackStrength :[0,[Validators.min(1),Validators.max(200)]],
    attackDescription:['',[Validators.required]]
  });
  monster:Monster = Object.assign(new Monster(),this.formGroup.value);
  // formGroup = new FormGroup({
  //   name : new FormControl('',[Validators.required]),
  //   hp : new FormControl(0,[Validators.min(1),Validators.required,Validators.max(200)]),
  //   image : new FormControl('',[Validators.required]),
  //   type : new FormControl('',[Validators.required]),
  //   figureCaption: new FormControl('',[Validators.required]),
  //   attackName: new FormControl('',[Validators.required]),
  //   attackStrength : new FormControl('',[Validators.min(1),Validators.max(200)]),
  //   attackDescription: new FormControl('',[Validators.required])
  // })
  
  
    ngOnInit(): void {
      //const params = this.route.snapshot.params;
     this.formValuesSubscription = this.formGroup.valueChanges.subscribe( data =>{
        this.monster = Object.assign(new Monster,data);
      })
      this.routeSubscription = this.route.params.subscribe(
        params =>{
          console.log(params['id']);
          if(params['id']){
            //console.log(params['monster']);
            //this.monsterId = parseInt(params['monster'])
            this.monsterId.set(params['id']? parseInt(params['id']):undefined);
            console.log(this.monsterId()) ;
            const monsterFound = this.monsterService.getMonster(this.monsterId()!);
            console.log('Monster fount: '+monsterFound);
            if(monsterFound){
              this.monster = monsterFound;
              this.formGroup.patchValue(this.monster);
            }
          }
          
        }
      )
      
     
    }
    ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe();
      this.formValuesSubscription?.unsubscribe();
    }
     
    next() {
        let nextId = this.monsterId() || 0;
         nextId++;
        this.router.navigate(['/monster/' + nextId])
      }
      submit(event: Event) {
        event.preventDefault();
         if(this.monsterId() === -1){
          this.monsterService.addMonster(this.monster);
         }else{
          this.monster.id = this.monsterId()!;
          this.monsterService.updateMonster(this.monster);
         }
         this.navigateBack();
        }
      isFieldValid(name:string){
        const formControl = this.formGroup.get(name);
        return formControl?.invalid && (formControl.dirty || formControl.touched);
      } 
      onFileChange(event:any){
        const reader = new FileReader();
        if(event.target.files && event.target.files.length){
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = ()=> {
           this.formGroup.patchValue({
            image: reader.result as string
           })
          }
        }
      } 
      navigateBack(){
        this.router.navigate(['home']);
      }
        
}
