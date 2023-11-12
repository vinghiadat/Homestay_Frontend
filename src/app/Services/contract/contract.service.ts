import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient, private router: Router) {}
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addContract(contract: Contract): Observable<void> {
    return this.http.post<void>(this.getFullUrl(`api/v1/contract`),contract);
  }
  getContractByUserId(id: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      this.getFullUrl(`api/v1/contract/user/${id}`)
    );
  }
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/contract/${id}`));
  }
  
}
