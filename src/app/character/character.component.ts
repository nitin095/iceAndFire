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

  public item;
  public characterDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) { }

  ngOnInit() {
    let itemId = this._route.snapshot.paramMap.get('id');
    let details = this.httpService.getDetails("characters", itemId).subscribe(
      data => {
        details = data;
        this.item = details;
        this.getCharacterData();
      },
      error => {
        console.log(error.errorMessage)
      }
    )
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
    if (this.item.father) {
      this.httpService.getDetailsByUrl(this.item.father).subscribe(
        data => {
          this.characterDetails.father = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.item.mother) {
      this.httpService.getDetailsByUrl(this.item.mother).subscribe(
        data => {
          this.characterDetails.mother = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.item.spouse) {
      this.httpService.getDetailsByUrl(this.item.spouse).subscribe(
        data => {
          this.characterDetails.spouse = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    for (let book of this.item.books) {
      this.httpService.getDetailsByUrl(book).subscribe(
        data => {
          this.characterDetails.books.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let book of this.item.povBooks) {
      this.httpService.getDetailsByUrl(book).subscribe(
        data => {
          this.characterDetails.povBooks.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let house of this.item.allegiances) {
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

}
