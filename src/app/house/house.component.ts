import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
  providers: [Location]
})
export class HouseComponent implements OnInit {

  public item;
  public houseDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.item = undefined;
      let itemId = this._route.snapshot.paramMap.get('id');
      let details = this.httpService.getDetails("houses", itemId).subscribe(
        data => {
          details = data;
          this.item = details;
          this.getHouseData();
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    });
  }


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

  // function to go back to previous location
  goback(): any {
    this.location.back();
  }

}
