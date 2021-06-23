import { Component, OnInit } from '@angular/core';

import { Producto, Productos } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private productoService: ProductoService
  ) {}

  AccionABMC = 'L'; // inicialmente inicia en el Listado de articulos (buscar con parametros)

  Productos: Producto[] = null;
  FormRegistro: FormGroup;
  submitted = false;

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],

      ProductoStock: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,7}')]
      ],
      ProductoFechaAlta: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ]
    });

    this.BuscarProducto();
  }

  BuscarProducto() {
    this.productoService.get().subscribe((res: any) => {
      console.log(res);
      this.Productos = res;
    });
  }
  AgregarProducto() {
    this.AccionABMC = 'A';
    this.submitted = false;
  }

  Volver() {
    this.AccionABMC = 'L';
  }

  Guardar() {
    this.submitted = true;
    // verificar que los validadores esten OK

    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };
    console.log(itemCopy);
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.ProductoFechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (this.AccionABMC == 'A') {
      this.productoService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        //this.modalDialogService.Alert('Registro agregado correctamente.');
        this.BuscarProducto();
      });
    }
  }
}
