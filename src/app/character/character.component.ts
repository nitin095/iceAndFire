import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  providers: [Location]
})
export class CharacterComponent implements OnInit {

  public character;
  public characterDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.character = undefined;
      let itemId = this._route.snapshot.paramMap.get('id');
      this.httpService.getDetails("characters", itemId).subscribe(
        data => {
          this.character = data;
          this.getCharacterData();
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    });
  }


  getCharacterData = () => {
    this.characterDetails = {
      father: {},
      mother: {},
      spouse: {},
      books: [],
      povBooks: [],
      allegiances: []
    };
    if (this.character.father) {
      this.httpService.getDetailsByUrl(this.character.father).subscribe(
        data => {
          this.characterDetails.father = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.character.mother) {
      this.httpService.getDetailsByUrl(this.character.mother).subscribe(
        data => {
          this.characterDetails.mother = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.character.spouse) {
      this.httpService.getDetailsByUrl(this.character.spouse).subscribe(
        data => {
          this.characterDetails.spouse = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    for (let book of this.character.books) {
      this.httpService.getDetailsByUrl(book).subscribe(
        data => {
          this.characterDetails.books.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let book of this.character.povBooks) {
      this.httpService.getDetailsByUrl(book).subscribe(
        data => {
          this.characterDetails.povBooks.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let house of this.character.allegiances) {
      this.httpService.getDetailsByUrl(house).subscribe(
        data => {
          this.characterDetails.allegiances.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    console.log(this.characterDetails)
  }//end getCharacterData

  // function to extract id from a resource url
  getId(url): number {
    return url.substring(url.lastIndexOf('/') + 1)
  }

  // function to hide image on error using its id
  hideImage = (id) => {
    console.log('HANDLING IMAGE ERROR!')
    document.getElementById(id).style.display = "none"
  }

   // function to go back to previous location
   goBack(): any {
    this.location.back();
  }

}
