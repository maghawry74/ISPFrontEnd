import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iprovider } from 'src/app/models/iprovider';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
providersList:Iprovider[]=[];
constructor(private providerService:ProviderService, private router:Router)
{
}
  ngOnInit(): void {
    this.providerService.GetAll().subscribe(data=>{
      this.providersList = data;
    })
  }
  deleteProvider(id:number)
  {
    let confirmDel = confirm("Are you sure you want to delete this provider")
    if(confirmDel==true)
    {
      this.providerService.Delete(id).subscribe(resp=>{
        this.ngOnInit();
      })
    }
  }
  goToAddComp()
  {
    this.router.navigate(['/Provider/Add'])
  }
  toEditProv(id:number)
  {
    this.router.navigate(['Provider/Edit',id]);
  }
}
