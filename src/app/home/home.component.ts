import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  public allItems = [];
  public visibleItems = [];
  public sortField: string;
  public selected: any = 'all';
  public filterFields: string = "";

  constructor(public httpService: HttpService, private elementRef: ElementRef) {
    console.log("home component constructor called");
  }

  ngOnInit() {
    let allBooks = this.httpService.getAllBooks().subscribe(
      data => {
        console.log(data);
        allBooks = data;
        this.allItems.push(...allBooks);
        this.sortBy('name')
      },
      error => {
        console.log(error.errorMessage)
      }
    )

    let allCharacters = this.httpService.getAllCharacters().subscribe(
      data => {
        console.log(data);
        allCharacters = data;
        allCharacters = allCharacters.filter(function (obj) {
          if (!obj.name) {
            return obj.name = obj.aliases[0].charAt(0).toUpperCase() + obj.aliases[0].slice(1);;
          } else {
            return obj
          }
        });
        this.allItems.push(...allCharacters);
        this.sortBy('name')
      },
      error => {
        console.log(error.errorMessage)
      }
    )

    let allHouses = this.httpService.getAllHouses().subscribe(
      data => {
        console.log(data);
        allHouses = data;
        this.allItems.push(...allHouses);
        this.sortBy('name')
      },
      error => {
        console.log(error.errorMessage)
      }
    )

    this.visibleItems = this.allItems;
    this.sortField = 'name'

  }// end ngOnInit()

  getCharacterImage = (name, id) => {
    let url;
    if (name) {
      url = `../assets/images/characters/${name}.jpg`;
      return url
    } else {
      this.hideImage(id)
    }
  }// end getCharacterImage

  hideImage = (id) => {
    document.getElementById(id).style.display = "none"
  }//end hideImage

  sortBy = (field) => {
    if (this.visibleItems.length > 1) {
      this.visibleItems.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        else if (a[field] > b[field]) return 1;
        else return 0;
      });
    }
  }//end sortBy

  select(item) {
    this.selected = item;
  };

  isActive(item) {
    return this.selected === item;
  };

  filterCategories = (category) => {
    this.select(category);
    this.visibleItems = this.allItems.filter(function (obj) {
      return obj.url.includes(category);
    });
  }//end filterCategories

  filter = (field, value) => {
    console.log('filjter function called. Fiels is ' + field + ' value is ' + value)
    if (value == 'reset') {
      return this.filterCategories('characters')
    }
    this.visibleItems = this.allItems.filter(function (obj) {
      if (field == 'released' || field == 'tvSeries') {
        if (obj[field]) {
          return obj[field].includes(value)
        }
      }
      return obj[field] == value;
    });
  }//end filterCategories

  getFilteresItems = (category, filter) => {
    console.log('getFilteredItems function called, filter is ' + filter)
    this.httpService.getFilteredCategory(`/${category}?${filter}`).subscribe(
      data => {
        console.log('data receives!')
        console.log(data)
        this.visibleItems = new Array;
        this.visibleItems.push(...data);
        this.sortBy('name')
      },
      error => {
        console.log(error.errorMessage)
      }
    )
  }//end getFilteredItems

  houseFilters = (filter) => {
    if(this.filterFields.includes(filter)){
      this.filterFields = this.filterFields.replace(filter,'');
      this.getFilteresItems('houses', this.filterFields)
    }else{
      this.filterFields += `&${filter}`;
      this.getFilteresItems('houses', this.filterFields)
    }
  }

  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style = 'background-image: linear-gradient(to right bottom, #000000, #090707, #100d0c, #151210, #181714);';
  }

}
