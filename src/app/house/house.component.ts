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

  public house;
  public houseDetails: any;

  constructor(private _route: ActivatedRoute, public router: Router, public httpService: HttpService, private location: Location) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.house = undefined;
      let itemId = this._route.snapshot.paramMap.get('id');
      let details = this.httpService.getDetails("houses", itemId).subscribe(
        data => {
          details = data;
          this.house = details;
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
    if (this.house.currentLord) {
      this.httpService.getDetailsByUrl(this.house.currentLord).subscribe(
        data => {
          this.houseDetails.currentLord = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.house.heir) {
      this.httpService.getDetailsByUrl(this.house.heir).subscribe(
        data => {
          this.houseDetails.heir = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.house.overlord) {
      this.httpService.getDetailsByUrl(this.house.overlord).subscribe(
        data => {
          this.houseDetails.overlord = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    if (this.house.founder) {
      this.httpService.getDetailsByUrl(this.house.founder).subscribe(
        data => {
          this.houseDetails.founder = { name: data.name, id: this.getId(data.url) }
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }
    for (let house of this.house.cadetBranches) {
      this.httpService.getDetailsByUrl(house).subscribe(
        data => {
          this.houseDetails.cadetBranches.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }//end for
    for (let character of this.house.swornMembers) {
      this.httpService.getDetailsByUrl(character).subscribe(
        data => {
          this.houseDetails.swornMembers.push({ name: data.name, id: this.getId(data.url) })
        },
        error => {
          console.log(error.errorMessage)
        }
      )
    }// end for
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
  goBack(): any {
    this.location.back();
  }

}
