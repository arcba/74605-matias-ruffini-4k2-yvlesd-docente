export interface Producto {
  ProductoID: number;
  ProductoNombre: string;
  ProductoFechaAlta: Date;
  ProductoStock: number;
}

export const Productos: Producto[] = [
  {
    ProductoID: 1,
    ProductoNombre: 'calculadora',
    ProductoFechaAlta: new Date('05/05/1990'),
    ProductoStock: 10
  }
];
