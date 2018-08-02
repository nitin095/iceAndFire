import { Pipe, PipeTransform } from '@angular/core';
import { HttpService} from '../app/http.service';

@Pipe({
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {

  constructor(public httpService:HttpService) {
  }

  transform(url: any, args?: any) {
    console.log('getName pipe running');
    if(!args){
      let name;
     this.httpService.getDetailsByUrl(url).subscribe(
      data => {
        console.log('Name: '+data.name)
        return name = data.name
      },
      error => {
        console.log(error.errorMessage)
      }
    )
    }
    if(args == 'n'){
      console.log('INSIDE NOW')
      console.log(url)
    }
    
  }
}
