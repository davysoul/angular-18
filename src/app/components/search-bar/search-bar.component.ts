import { Component, EventEmitter, input, Input, model, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
 //@Input() search:string = 'Initial data';
 //@Output() searchChange = new EventEmitter<string>();
 //@Output() searchButtonClicked = new EventEmitter();
//  search = input<string>('Initial data');
search = model('Initial data');
 //searchChange = output<string>();
 searchButtonClicked = output({
  alias:'submit'
 });
searchClick() {
 this.searchButtonClicked.emit();
}
// updateSearch(value:string){
//  this.search.set(value)
// }
}
