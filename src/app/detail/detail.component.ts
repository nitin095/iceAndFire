import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [Location]
})

export class DetailComponent implements OnInit, OnDestroy {

  public item;
  public category;
  public bookDetails: any;
  public characterDetails: any;
  public houseDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.item = undefined;
      this.category = this._route.snapshot.paramMap.get('category');
      let itemId = this._route.snapshot.paramMap.get('id');
      let details = this.httpService.getDetails(this.category, itemId).subscribe(
        data => {
          details = data;
          this.item = details;
          if (this.category == 'characters') {
            this.getCharacterData();
          } else if (this.category == 'books') {
            this.getBookData();
          } else {
            this.getHouseData();
          }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    });
  }//end ngOnInit()

  ngOnDestroy() {
    this.item = undefined
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

  getHouseData = () => {
    this.houseDetails = {
      currentLord: {},
      heir: {},
      overlord: {},
      founder: {},
      cadetBranches: [],
      swornMembers: []
    };
    if (this.item.currentLord) {
      this.httpService.getDetailsByUrl(this.item.currentLord).subscribe(
        data => {
          this.houseDetails.currentLord = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.item.heir) {
      this.httpService.getDetailsByUrl(this.item.heir).subscribe(
        data => {
          this.houseDetails.heir = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.item.overlord) {
      this.httpService.getDetailsByUrl(this.item.overlord).subscribe(
        data => {
          this.houseDetails.overlord = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.item.founder) {
      this.httpService.getDetailsByUrl(this.item.founder).subscribe(
        data => {
          this.houseDetails.founder = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    for (let house of this.item.cadetBranches) {
      this.httpService.getDetailsByUrl(house).subscribe(
        data => {
          this.houseDetails.cadetBranches.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let character of this.item.swornMembers) {
      this.httpService.getDetailsByUrl(character).subscribe(
        data => {
          this.houseDetails.swornMembers.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }// end for
    console.log(this.houseDetails)
  }// end getHouseData

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
