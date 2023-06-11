import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGovernarate } from 'src/app/models/igovernarate';
import { StaticGovernarateService } from 'src/app/services/static-governarate.service';

@Component({
  selector: 'app-governate',
  templateUrl: './governate.component.html',
  styleUrls: ['./governate.component.css']
})
export class GovernateComponent implements OnInit {
  governateList : IGovernarate[] =[];
  constructor(private governateService:StaticGovernarateService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.governateList = this.governateService.getAll();
  }
  deleteGovernate(code:number)
  {
    let confirmDel = confirm("Are you sure you want to delete this governorate")
    if(confirmDel==true)
    {
    this.governateService.delete(code);
    }
    this.ngOnInit();
  }
  goToAddComp()
  {
    this.router.navigate(['/Governate/Add']);
  }
  toEditGov(code:number)
  {
    this.router.navigate(['Governate/Edit', code]);
  }
}
