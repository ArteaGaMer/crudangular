import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  formularioDeEmpleados:FormGroup;
  elID:any;
  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador:Router,
  ) {
    this.elID = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.ObtenerEmpleado(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDeEmpleados.setValue(
          {
            nombre:respuesta[0]['nombre'],
            fecha_nacimiento:respuesta[0]['fecha_nacimiento'],
            telefono:respuesta[0]['telefono'],
            email:respuesta[0]['email'],
            calle:respuesta[0]['calle'],
            numero:respuesta[0]['numero'],
            colonia:respuesta[0]['colonia'],
            ciudad:respuesta[0]['ciudad'],
            codigo_postal:respuesta[0]['codigo_postal']
            
          }
        );
      }
    );
    this.formularioDeEmpleados=this.formulario.group(
      {
        nombre:[''],
        fecha_nacimiento:[''],
        telefono:[''],
        email:[''],
        calle:[''],
        numero:[''],
        colonia:[''],
        ciudad:[''],
        codigo_postal:[''],
      }
    );
   }

  ngOnInit(): void {
  }
  enviarDatos():any{
    console.log(this.elID);
    console.log(this.formularioDeEmpleados.value);
    this.crudService.EditarEmpleado(this.elID,this.formularioDeEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
  }

}
