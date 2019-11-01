import { Component } from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material/bottom-sheet'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin';
  currentroute: string;
  // title = 'AngularMaterialGettingStarted';
  constructor(private _bottomSheet: MatBottomSheet,private router: Router) {
    this.currentroute=this.router.url
  }

    openBottomSheet(): void {
      this._bottomSheet.open(BottomSheetComponent);
    }
  }
  // isMenuOpen = true;
  // contentMargin = 240;

  // task: string[] = [
  //   'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
  // ]

  // onToolbarMenuToggle() {
  //   console.log('On toolbar toggled', this.isMenuOpen);
  //   this.isMenuOpen = !this.isMenuOpen;

  //   if(!this.isMenuOpen) {
  //     this.contentMargin = 70;
  //   } else {
  //     this.contentMargin = 240;
  //   }
  // }
  // myFunction() {
  //   var x = document.getElementById("myNavbar");
  //   if (x.className === "navbar") {
  //     x.className += " responsive";
  //   } else {
  //     x.className = "navbar";
  //   }
  // }

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet/bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
