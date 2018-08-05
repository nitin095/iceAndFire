import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [Location]
})

export class BookComponent implements OnInit {

  public item;
  public bookDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) { }

  ngOnInit() {
    let itemId = this._route.snapshot.paramMap.get('id');
    let details = this.httpService.getDetails('books', itemId).subscribe(
      data => {
        details = data;
        this.item = details;
        this.getBookData();
      },
      error => {
        console.log(error.errorMessage)
      }
    )
  }

  getBookData = () => {
    this.bookDetails = {
      characters: [],
      povCharacters: [],
      displayCharactersNumber: 25,
      displayPovCharactersNumber: 25
    };
    for (let character of this.item.characters) {
      this.httpService.getDetailsByUrl(character).subscribe(
        data => {
          if (data.name) {
            this.bookDetails.characters.push({ name: data.name, id: this.getId(data.url) })
          } else {
            this.bookDetails.characters.push({ name: data.aliases[0], id: this.getId(data.url) })
          }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for 
    for (let character of this.item.povCharacters) {
      this.httpService.getDetailsByUrl(character).subscribe(
        data => {
          if (data.name) {
            this.bookDetails.povCharacters.push({ name: data.name, id: this.getId(data.url) })
          } else {
            this.bookDetails.povCharacters.push({ name: data.aliases[0], id: this.getId(data.url) })
          }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    console.log(this.bookDetails)
  };
  // end getBookData


  // function to extract id from a resource url
  getId(url): number {
    return url.substring(url.lastIndexOf('/') + 1)
  }

  // function to hide image on error using its id
  hideImage = (id) => {
    console.log('HANDLING IMAGE ERROR!')
    document.getElementById(id).style.display = "none"
  }

  // function to display more characters in deatil view
  displayMoreCharacters(number): any {
    this.bookDetails.displayCharactersNumber += number;
    if (this.bookDetails.displayCharactersNumber > this.bookDetails.characters.length) {
      this.bookDetails.displayCharactersNumber = this.bookDetails.characters.length
    }
  }

  // function to display more pov-characters in deatil view
  displayMorePovCharacters(number): any {
    this.bookDetails.displayPovCharactersNumber += number
  }

  // function to go back to previous location
  goback(): any {
    this.location.back();
  }

}

