import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelperComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
