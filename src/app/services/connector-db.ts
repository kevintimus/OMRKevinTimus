import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectorDb {
  constructor(private http: HttpClient) {}

  llistaDoctors() {
    return this.http.get<Doctor[]>('http://localhost:3000/llistaDoctors');
  }

  empleatsDept(id: number) {
    return this.http.get<any>(`http://localhost:3000/empleatsDept/${id}`);
  }

  modificarDoctor(codiDoctor: number, doctor: any) {
    return this.http.put(`http://localhost:3000/ModificarDoctor/${codiDoctor}`, doctor);
  }

  borrarEmpelado(numEmpleado: number) {
    return this.http.delete(`http://localhost:3000/borrarEmpleado/${numEmpleado}`);
  }

  hospitalsInfo() {
    return this.http.get<any[]>('http://localhost:3000/hospitalsInfo');
  }
}
