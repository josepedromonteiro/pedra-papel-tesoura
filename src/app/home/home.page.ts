import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ChangeDetection } from '@angular/cli/lib/config/schema';
import { ModalController } from '@ionic/angular';
import { HelperComponent } from '../helper/helper.component';

export interface GameItem {
  image: string;
  type: GameItemType;
}

export type GameItemType = 'PEDRA' | 'PAPEL' | 'TESOURA';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

  public images: GameItem[] = [
    {
      image: 'assets/PEDRA.png',
      type: 'PEDRA'
    },
    {
      image: 'assets/PAPEL.png',
      type: 'PAPEL'
    },
    {
      image: 'assets/TESOURA.png',
      type: 'TESOURA'
    }
  ];

  public activeHumanItem: GameItem;
  public activeComputerItem: GameItem;
  public humanPoints = 0;
  public playerPoints = 0;
  public whoWins = '';
  public showNote = false;
  public isPlaying = false;
  public computerInterval;

  constructor(private changeDetect: ChangeDetectorRef,
              private modalCtrl: ModalController) {
    this.activeHumanItem = this.images[0];
    this.activeComputerItem = this.images[0];

    // const a = setInterval(() => {
    //     if (i === 15) {
    //       this.checkValues();
    //       this.showNote = true;
    //       setTimeout(() => {
    //         this.showNote = false;
    //       }, 3000);
    //       clearInterval(a);
    //     } else {
    //       const item: GameItem = this.images[Math.floor(Math.random() * this.images.length)];
    //       const item2: GameItem = this.images[Math.floor(Math.random() * this.images.length)];
    //       this.activeHumanItem = item;
    //       this.activeComputerItem = item2;
    //       this.changeDetect.detectChanges();
    //       i++;
    //     }
    //   }
    //   , 100);
  }

  public play(): void {
    this.activeHumanItem = null;
    this.activeComputerItem = this.images[0];
    this.isPlaying = true;
    this.computerInterval = setInterval(() => {
          const item2: GameItem = this.images[Math.floor(Math.random() * this.images.length)];
          this.activeComputerItem = item2;
          this.changeDetect.detectChanges();
      }
      , 100);
  }

  private checkValues(): void {
    switch (this.activeHumanItem.type) {
      case 'PAPEL':
        if (this.activeComputerItem.type === 'PAPEL') {
          this.whoWins = '';
          break;
        }

        if (this.activeComputerItem.type === 'PEDRA') {
          this.humanPoints++;
          this.whoWins = 'humano';
        }

        if (this.activeComputerItem.type === 'TESOURA') {
          this.playerPoints++;
          this.whoWins = 'computador';
        }
        break;
      case 'PEDRA':
        if (this.activeComputerItem.type === 'PAPEL') {
          this.playerPoints++;
          this.whoWins = 'computador';
        }
        if (this.activeComputerItem.type === 'PEDRA') {
          this.whoWins = '';
          break;
        }
        if (this.activeComputerItem.type === 'TESOURA') {
          this.humanPoints++;
          this.whoWins = 'humano';
        }
        break;
      case 'TESOURA':
        if (this.activeComputerItem.type === 'PAPEL') {
          this.humanPoints++;
          this.whoWins = 'humano';
        }

        if (this.activeComputerItem.type === 'PEDRA') {
          this.playerPoints++;
          this.whoWins = 'computador';
        }

        if (this.activeComputerItem.type === 'TESOURA') {
          this.whoWins = '';
          break;
        }
        break;
      default:
        break;
    }
  }


  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: HelperComponent,
    });
    return await modal.present();
  }

  public aposta(type: GameItem) {
    this.isPlaying = false;
    clearInterval(this.computerInterval);
    this.activeHumanItem = type;
    this.checkValues();
    this.showNote = true;
    setTimeout(() => {
      this.showNote = false;
    }, 3000);
  }

}
