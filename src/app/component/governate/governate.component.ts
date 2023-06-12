import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGovernarate } from '../../models/igovernarate';
import { StaticGovernarateService } from '../../services/static-governarate.service';
import { GovernorateService } from '../../services/governorate.service';

@Component({
  selector: 'app-governate',
  templateUrl: './governate.component.html',
  styleUrls: ['./governate.component.css']
})
export class GovernateComponent implements OnInit {
  governateList : IGovernarate[] =[];

  constructor(private governateService:StaticGovernarateService,
    private router:Router,
    private GovernorateService:GovernorateService
    ){}
  ngOnInit(): void {
    this.GovernorateService.getAll().subscribe(data=>{
    this.governateList = data; 
     })
  }
  deleteGovernate(code:number)
  {
    let confirmDel = confirm("Are you sure you want to delete this governorate")
    if(confirmDel==true)
    {
      this.GovernorateService.deleteGov(code).subscribe(resp=>{
      this.ngOnInit();
      });
    }
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
