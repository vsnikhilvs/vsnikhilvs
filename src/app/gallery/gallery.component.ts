import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as Bowser from "bowser";

interface ImageData {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  webp: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  portfolioData: ImageData[] = [];
  currentData: ImageData = {
    id: "",
    title: "",
    description: "",
    location: "",
    image: "",
    webp: ""
  };
  display: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    const browser = Bowser.getParser(window.navigator.userAgent);
    this.db.collection("images").valueChanges().subscribe(
      (rawData: any) => {
        for (let item of rawData) {
          const imageItem = item;
          if (browser.getBrowserName() !== "Chrome" &&
            browser.getBrowserName() !== "Firefox" &&
            browser.getBrowserName() !== "Microsoft Edge"
          ) {
            this.storage.ref(`/${item.id}.jpg`).getDownloadURL().subscribe(
              (imageUrl) => {
                imageItem["image"] = imageUrl;
              }
            )
          } else {
            this.storage.ref(`/${item.id}.webp`).getDownloadURL().subscribe(
              (imageUrl) => {
                imageItem["webp"] = imageUrl;
              }
            )
          }
          this.portfolioData.push(imageItem);
        }
      },
      (err) => console.log(err)
    )
  }

  openDialog(item: ImageData) {
    this.currentData = item;
    this.display = true;
  }

  handleHideDialog() {
    this.currentData = {
      id: "",
      title: "",
      description: "",
      location: "",
      image: "",
      webp: ""
    };
    this.display = false;
  }

}
