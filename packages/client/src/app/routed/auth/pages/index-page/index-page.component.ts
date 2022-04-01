import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OctkitService} from "../../../../service/octkit.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AuthAction} from "../../../../store/auth/auth.action";
import {AuthState, AuthStateModel} from "../../../../store/auth/auth.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  @Select(AuthState) auth$: Observable<AuthStateModel>

  form = new FormGroup({
    token: new FormControl("",Validators.required)
  })

  constructor(
    private router: Router,
    private store: Store
  ) { }

  get token(): FormControl{
    return this.form.get("token") as FormControl
  }

  ngOnInit(): void {
    this.auth$.subscribe((r)=>{
      if(r.token){
        this.token.setValue(r.token)
      }
    })
  }

  async login(){
    Object.values(this.form.controls).forEach(ctrl => {
      ctrl.markAsTouched()
    })
    if(this.form.invalid){
      alert("input token")
    }
    this.store.dispatch( new AuthAction.login(this.token.value)).subscribe(()=>{
      this.router.navigateByUrl("/boards")
    })
    // console.log(result)
    // console.log(this.token.invalid)
    // console.log(this.form.get("token")?.hasError("required"))

  }
}
