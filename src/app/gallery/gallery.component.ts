import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as Bowser from "bowser";

interface ImageData {
  id: string;
  title: string;
  description: string;
  location: string;
  locationUrl: string;
  image: string;
  webp: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  locations: any[] = [
    {
      name: "Agasthyaarkoodam",
      link: "https://www.google.com/maps/place/Agasthyamalai/@8.6163064,77.2372931,15z/data=!3m1!4b1!4m5!3m4!1s0x3b044a7eaa5b040f:0x7816ced6458f2c6f!8m2!3d8.6163066!4d77.2460479"
    },
    {
      name: "Koottappana",
      link: "https://www.google.com/maps/place/Koottappana,+Neyyattinkara,+Kerala/@8.4095535,77.0748158,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05ae4263baa713:0x4ba970896be27634!8m2!3d8.4102767!4d77.0758352"
    },
    {
      name: "Chittippara",
      link: "https://www.google.com/maps/place/Chittipara/@8.6433328,77.0698525,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05c9accdce4ba7:0x45d70d331d85745f!8m2!3d8.6433328!4d77.0720412"
    },
    {
      name: "Ernakulam",
      link: "https://www.google.com/maps/place/Ernakulam,+Kerala/@9.9708673,76.2382529,12z/data=!3m1!4b1!4m5!3m4!1s0x3b080d08f976f3a9:0xe9cdb444f06ed454!8m2!3d9.9816358!4d76.2998842"
    },
    {
      name: "Lourdes Matha College",
      link: "https://www.google.com/maps/place/Lourdes+Matha+College+of+Science+and+Technology/@8.557623,77.0971846,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05b69c2bef35eb:0x72f7bc19418c91ef!8m2!3d8.557623!4d77.0993733"
    },
    {
      name: "Ponmudi",
      link: "https://www.google.com/maps/place/Ponmudi,+Kerala/@8.7607962,77.1068787,15z/data=!3m1!4b1!4m5!3m4!1s0x3b05cdc4e9091881:0xa2a557886da0bdfc!8m2!3d8.7599422!4d77.1168753"
    },
    {
      name: "Vettucadu",
      link: "https://www.google.com/maps/place/Vettukadu,+Thiruvananthapuram,+Kerala/@8.4962125,76.8972601,16z/data=!3m1!4b1!4m5!3m4!1s0x3b05bc6ec911d815:0xc91f70e0fedda0a1!8m2!3d8.4964792!4d76.9016845"
    },
    {
      name: "Vaazhvanthol",
      link: "https://www.google.com/maps/place/Vazhvanthol+Waterfalls/@8.6746456,77.1588837,16z/data=!4m9!1m2!2m1!1sVaazhvanthol!3m5!1s0x3b05cb61066c3fff:0xf1297a705adfffd5!8m2!3d8.6746618!4d77.1632133!15sCgtWYXpodmFudGhvbJIBEnRvdXJpc3RfYXR0cmFjdGlvbg"
    },
    {
      name: "Thozhukkal",
      link: "https://www.google.com/maps/place/Thozhukkal,+Neyyattinkara,+Kerala/@8.417509,77.0743587,15z/data=!3m1!4b1!4m5!3m4!1s0x3b05ae6a67c41f6d:0xabeb381cba8df60b!8m2!3d8.4186501!4d77.083787"
    },
    {
      name: "Tiltlabs",
      link: "https://www.google.com/maps/place/TILTLABS/@8.5606406,76.8786982,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05be5700000021:0x91537c232d497c3d!8m2!3d8.5606406!4d76.8808869"
    },
    {
      name: "Aazhimala",
      link: "https://www.google.com/maps/place/Aazhimala+Shiva+Temple/@8.3569124,77.0091615,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05af55443fbb25:0x9174f2a75a0d46d5!8m2!3d8.3569141!4d77.0113931"
    },
    {
      name: "Alappuzha",
      link: "https://www.google.com/maps/place/Alappuzha,+Kerala/@9.5010297,76.2720654,12z/data=!3m1!4b1!4m5!3m4!1s0x3b0884f1aa296b61:0xb84764552c41f85a!8m2!3d9.4980667!4d76.3388484"
    },
    {
      name: "Palayam",
      link: "https://www.google.com/maps/place/Palayam,+Thiruvananthapuram,+Kerala/@8.5027084,76.9435187,15z/data=!3m1!4b1!4m5!3m4!1s0x3b05bbbeae2acd9b:0x4d6c81bc718417e2!8m2!3d8.5039157!4d76.9510538"
    },
    {
      name: "Meenmutti Waterfalls",
      link: "https://www.google.com/maps/place/Kallar+Meenmutty+Waterfalls/@8.7122176,77.1430379,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05cc76a88c34db:0xf64e83731e517670!8m2!3d8.7122176!4d77.1452266"
    },
    {
      name: "Studio Road",
      link: "https://www.google.com/maps/place/Studio+Rd+Nemom,+Kerala/@8.4634418,76.9992429,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05ba98451cbfe3:0x574f2147958a68d0!8m2!3d8.4634418!4d77.0014316"
    },
    {
      name: "Sankhumugham",
      link: "https://www.google.com/maps/place/Shangumugham+Beach/@8.4789037,76.9093314,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05bc83dedcfc07:0xc899203065f19098!8m2!3d8.4784498!4d76.9119061"
    },
    {
      name: "Kovalam",
      link: "https://www.google.com/maps/place/Kovalam,+Kerala/@8.4005254,76.9623138,14z/data=!3m1!4b1!4m5!3m4!1s0x3b05a5090a19ec65:0xb67f315bc0b762ac!8m2!3d8.3988128!4d76.9820149"
    },
    {
      name: "Vattiyoorkkavu",
      link: "https://www.google.com/maps/place/Vattiyoorkavu,+Thiruvananthapuram,+Kerala+695013/@8.5241369,76.9794204,15z/data=!3m1!4b1!4m5!3m4!1s0x3b05ba1f77debd29:0x3f190e801e20ba7c!8m2!3d8.5241371!4d76.9881752"
    },
    {
      name: "Padmanabhaswamy Temple",
      link: "https://www.google.com/maps/place/Sree+Padmanabhaswamy+Temple/@8.4827779,76.9414019,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05bb09b7e81d35:0x1d2fedb7213a1ef7!8m2!3d8.4827779!4d76.9435906"
    },
    {
      name: "Chowara",
      link: "https://www.google.com/maps/place/Chowara,+Kerala/@10.1243572,76.3673719,15z/data=!3m1!4b1!4m5!3m4!1s0x3b0808c16cc90ec9:0x7e435e2da8b43beb!8m2!3d10.1282593!4d76.3731527"
    },
    {
      name: "Nedumangadu",
      link: "https://www.google.com/maps/place/Nedumangad,+Kerala/@8.6073944,76.9806979,14z/data=!3m1!4b1!4m5!3m4!1s0x3b05b81a8bcfb02f:0xa992d4b3ab376b61!8m2!3d8.6080226!4d77.004626"
    },
    {
      name: "Varkala",
      link: "https://www.google.com/maps/place/Varkala,+Kerala/@8.7432563,76.699973,14z/data=!3m1!4b1!4m5!3m4!1s0x3b05ef26d90220fb:0xa3ec40c67d4dd020!8m2!3d8.7378685!4d76.7163359"
    },
    {
      name: "Thampanoor",
      link: "https://www.google.com/maps/place/Thampanoor,+Thiruvananthapuram,+Kerala/@8.4901445,76.9511894,17z/data=!3m1!4b1!4m5!3m4!1s0x3b05bba5e411a9e9:0xd91a25e733df7162!8m2!3d8.490873!4d76.9527483"
    },
    {
      name: "Thiruvananthapuram",
      link: "https://www.google.com/maps/place/Thiruvananthapuram,+Kerala/@8.4997267,76.8541262,12z/data=!3m1!4b1!4m5!3m4!1s0x3b05bbb805bbcd47:0x15439fab5c5c81cb!8m2!3d8.5241391!4d76.9366376"
    },
    {
      name: "Nagercoil",
      link: "https://www.google.com/maps/place/Nagercoil,+Tamil+Nadu/@8.4997267,76.8541262,12z/data=!4m5!3m4!1s0x3b04f0dfc0ddc7b7:0x809a9e32a95d3ed1!8m2!3d8.1832857!4d77.4118996"
    }
  ]
  portfolioData: ImageData[] = [];
  currentData: ImageData = {
    id: "",
    title: "",
    description: "",
    location: "",
    locationUrl: "",
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
          for (let place of this.locations) {
            if (item.location === place.name) {
              imageItem["locationUrl"] = place.link;
            }
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
      locationUrl: "",
      image: "",
      webp: ""
    };
    this.display = false;
  }

}
