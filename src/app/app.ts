import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empleat } from './models/empleat.model';
import { Doctor } from './models/doctor.model';
import { ConnectorDb } from './services/connector-db';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  constructor(private http: HttpClient, private connector: ConnectorDb, private cdr: ChangeDetectorRef) {}

  doctors: Doctor[] = [];
  numeroEmpleats = 0;
  empleatABorrar = 0;
  hospitals: any[] = [];

  ngOnInit(): void {
    /*
    const EmpleatNou = new Empleat(67, 'Nose', 'QuePoner', 1234, new Date(), 23, 0, 10
    );
    this.http.post('http://localhost:3000/altaEmpleat', EmpleatNou).subscribe(res => console.log("Empelado creado ", res));
     */

    this.connector.llistaDoctors().subscribe({
      next: res => {
        console.log(res);
        this.doctors = res;
        this.cdr.detectChanges();
      }
    });

    const departamentID = 20;

    this.connector.empleatsDept(departamentID).subscribe({
      next: res => {
        console.log('Resultat ', res);
        this.numeroEmpleats = res.numEmpleats;
        this.cdr.detectChanges();
      }
    })

    const doctorModificat = {
      doctor_nom: 'KevinT',
      doctor_especialitat: 'Examen Jordi',
      doctor_hospital_codi: 22
    }

    this.connector.modificarDoctor(386, doctorModificat).subscribe({
      next: res => console.log('Todo ha ido bien' + res),
    })

    this.connector.hospitalsInfo().subscribe({
      next: res => {
        console.log('Hospitales ', res);
        this.hospitals = res;
        this.cdr.detectChanges();
      }
    });

    }
  protected readonly title = signal('OMRKevinTimus');

  borrarEmpleat() {
    this.connector.borrarEmpelado(this.empleatABorrar).subscribe({
      next: res => console.log('Empleado eliminado:', res),
    });
  }
}
