import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface ImageData {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string
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
    image: ""
  };
  display: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.db.collection("images").valueChanges().subscribe(
      (rawData: any) => {
        for (let item of rawData) {
          const imageItem = item;
          this.storage.ref(`/${item.id}.jpg`).getDownloadURL().subscribe(
            (imageUrl) => {
              imageItem["image"] = imageUrl;
            }
          )
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
      image: ""
    };
    this.display = false;
  }

}
