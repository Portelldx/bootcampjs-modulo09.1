import {
  LineaTicket,
  Producto,
  TipoIva,
  TotalPorTipoIva,
  tiposIva,
} from './model';

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

export const calcularTotales = (lineas: LineaTicket[]) => {
  const totalSinIva = lineas.reduce(
    (acc, linea) =>
      acc + calcularPrecioBaseLinea(linea.producto, linea.cantidad),
    0
  );
  const totalConIva = lineas.reduce(
    (acc, linea) =>
      acc +
      calcularPrecioConIva(
        calcularPrecioBaseLinea(linea.producto, linea.cantidad),
        linea.producto.tipoIva
      ),
    0
  );

  return {
    totalSinIva: parseFloat(totalSinIva.toFixed(2)),
    totalConIva: parseFloat(totalConIva.toFixed(2)),
    totalIva: parseFloat((totalConIva - totalSinIva).toFixed(2)),
  };
};

export const calcularDesgloseIva = (lineas: LineaTicket[]) => {
  const desgloseIva: Record<TipoIva, TotalPorTipoIva> = {} as Record<
    TipoIva,
    TotalPorTipoIva
  >;

  for (const linea of lineas) {
    const tipoIva = linea.producto.tipoIva;
    const montoIva =
      calcularPrecioConIva(
        calcularPrecioBaseLinea(linea.producto, linea.cantidad),
        tipoIva
      ) - calcularPrecioBaseLinea(linea.producto, linea.cantidad);

    if (!desgloseIva[tipoIva]) {
      desgloseIva[tipoIva] = { tipoIva, cuantia: 0 };
    }

    desgloseIva[tipoIva].cuantia = parseFloat(
      (desgloseIva[tipoIva].cuantia + montoIva).toFixed(2)
    );
  }

  return Object.values(desgloseIva);
};
