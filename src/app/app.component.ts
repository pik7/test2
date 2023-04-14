import { Component, OnInit } from '@angular/core';
import { PageRequest, PayLoadRmp } from './model/payload-rmp.model';
import { RequestService } from './service/request.service';
import { Brand } from './model/brand.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  public payLoade!:PayLoadRmp;
  public requests!:Request[];
  public brands!:Brand[];
  filterGroup!:FormGroup;

  
  constructor(private resquestService:RequestService, private fb:FormBuilder, private route:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.resquestService.getBrands().subscribe(data=>(this.brands = data));
    this.resquestService.getRequest().subscribe(data=>(this.payLoade = data));
    //this.resquestService.getPageRequest(this.currentPage, this.size).subscribe(data => this.maPage = data);
    this.filterGroup=this.fb.group({
      nameCampaign:this.fb.control(null),
      brandSearch:this.fb.control(null),
    })
  }
  
  handleFilter() {
    let name = this.filterGroup?.value.nameCampaign;
    let brand = this.filterGroup?.value.brandSearch;
    this.resquestService.campaignFilter(name,brand).subscribe(data =>(this.payLoade = data));
    
  }

  handleModify(_t41: HTMLDivElement) {
    //console.log(_t41.id);
    //this.resquestService.handleSearchRequest(parseInt(_t41.id)).subscribe(data =>(this.payLoade = data));
    //this.router.navigateByUrl("/campagne-modify", {state:this.payLoade});
    this.router.navigateByUrl("/campagne-modify/"+_t41.id); 
  }
}
