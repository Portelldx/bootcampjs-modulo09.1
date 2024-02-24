import { Producto, TipoIva, tiposIva } from './model';

export const calcularPrecioBaseLinea = (
  producto: Producto,
  cantidad: number
): number => {
  return producto.precio * cantidad;
};

export const calcularIva = (precioBase: number, tipoIva: TipoIva): number => {
  const porcentajeIva = tiposIva[tipoIva];
  return parseFloat((precioBase * (porcentajeIva / 100)).toFixed(2));
};

export const calcularPrecioConIva = (
  precioBase: number,
  tipoIva: TipoIva
): number => {
  const iva = calcularIva(precioBase, tipoIva);
  return parseFloat((precioBase + iva).toFixed(2));
};
