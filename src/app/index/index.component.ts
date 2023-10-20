import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({     transform: 'scale(0)', opacity: 0 }),
            animate('1.5s ease-out',
                    style({  transform: 'scale(1)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({  transform: 'scale(1)', opacity: 1 }),
            animate('0s ease-in',
                    style({     transform: 'scale(0)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class IndexComponent implements OnInit {
  number:any = '';
  referral_code:any = '';
  referral_name:any = '';
  telephone:any = '';
  marketer:any = '';
  show = false;

  // target = 0;
  spinLoader= false;
  animate = false;
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  generateRandNumber() {
    this.clear();
    this.spinLoader = true;
    return this.api.generateRandNumber().subscribe(
      (res) => {
        console.log(res);
        this.setDetails(res.result)
        this.animate = true;
        this.spinLoader = false;
      },

      (err) => {
        this.spinLoader = false;
        console.log(err);
      }
    );
  }

  clear() {
    this.number = '';
    this.referral_name = ''
    this.telephone = ''
    this.marketer = ''
    this.show = false;
    this.animate = false;
  }

  // set(res:any){
  //   // console.log(res)
  //   this.clear()
  //   let length = 0;
  //   const intervall = setInterval(() => {
  //     this.number = this.number + res[length++]
  //     console.log(this.number)
  //     if (this.number.length == res.length) {
  //           this.show = true;
  //           clearInterval(intervall)
  //         }
  //   }, 500)

  // }

  setDetails(res:any){
    this.clear()
    this.show = true;

      this.referral_code = res.referral_code;
        this.referral_name = res.referral_name;
        this.telephone = res.telephone;
        this.marketer = res.marketer;
  }

}
