import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
} from 'ionic-angular';

import { IntroPage } from '../intro/intro';

export interface Cost
{
  quantity:number;
  plus: boolean;
}

@Component(
{
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
  public firstime:boolean = true;
  public registered:Cost[] = [];
  public total:number = 0;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ){
  	if (this.firstime)
    {
      this.firstime = false;
      this.navCtrl.push(IntroPage);
  	}
  }

  addCost(q:Cost)
  {
    this.total += q.plus ? q.quantity * 1 : q.quantity * (-1);
    this.registered = this.registered.concat([q]);
    this.registered.reverse();
  }

  showAddModifier(event)
  {
    var par = this;
    const prompt = this.alertCtrl.create(
    {
      title: 'Ingreso',
      message: 'Está por agregar un monto que suma',
      inputs:
      [
        {
          name: 'val',
          type: 'number',
          placeholder: '$'
        },
      ],
      buttons:
      [
        {
          text: 'cancelar',
        },
        {
          text: 'aplicar',
          handler: data =>
          {
            par.addCost({quantity: data.val, plus: true});
          }
        },
      ]
    });
    prompt.present();
  }

  showRemoveModifier(event)
  {
    var par = this;
    const prompt = this.alertCtrl.create(
    {
      title: 'Egreso',
      message: 'Está por registrar un gasto',
      inputs:
      [
        {
          name: 'val',
          type: 'number',
          placeholder: '$'
        },
      ],
      buttons:
      [
        {
          text: 'cancelar',
        },
        {
          text: 'Aplicar',
          handler: data =>
          {
            par.addCost({quantity: data.val, plus: false});
          }
        },
      ]
    });
    prompt.present();
  }
}