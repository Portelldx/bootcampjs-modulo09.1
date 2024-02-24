import { productos } from './compra';
import { LineaTicket, TicketFinal, TotalPorTipoIva, TipoIva } from './model';
import { calcularPrecioBaseLinea, calcularPrecioConIva } from './ticket.helper';

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  if (lineasTicket.length === 0) {
    throw new Error('El ticket está vacío');
  }
  lineasTicket.forEach((linea) => {
    if (linea.cantidad <= 0) {
      throw new Error('La cantidad de cada producto debe ser mayor que cero');
    }
  });

  const lineas = lineasTicket.map((linea) => {
    const precioSinIva = calcularPrecioBaseLinea(
      linea.producto,
      linea.cantidad
    );
    const precioConIva = calcularPrecioConIva(
      precioSinIva,
      linea.producto.tipoIva
    );
    return {
      nombre: linea.producto.nombre,
      cantidad: linea.cantidad,
      precioSinIva: precioSinIva,
      tipoIva: linea.producto.tipoIva,
      precioConIva: precioConIva,
    };
  });

  const totalSinIva = lineas.reduce(
    (acc, linea) => acc + linea.precioSinIva,
    0
  );
  const totalConIva = lineas.reduce(
    (acc, linea) => acc + linea.precioConIva,
    0
  );
  const totalIva = totalConIva - totalSinIva;

  const desgloseIva: Record<TipoIva, TotalPorTipoIva> = lineas.reduce(
    (acc: Record<TipoIva, TotalPorTipoIva>, linea) => {
      const tipoIva = linea.tipoIva;
      const montoIva = linea.precioConIva - linea.precioSinIva;
      if (!acc[tipoIva]) {
        acc[tipoIva] = { tipoIva, cuantia: 0 };
      }
      acc[tipoIva].cuantia = parseFloat(
        (acc[tipoIva].cuantia + montoIva).toFixed(2)
      );
      return acc;
    },
    {} as Record<TipoIva, TotalPorTipoIva>
  );

  const desgloseIvaArray = Object.values(desgloseIva);

  return {
    lineas,
    total: {
      totalSinIva: parseFloat(totalSinIva.toFixed(2)),
      totalConIva: parseFloat(totalConIva.toFixed(2)),
      totalIva: parseFloat(totalIva.toFixed(2)),
    },
    desgloseIva: desgloseIvaArray,
  };
};

const ticketFinal = calculaTicket(productos);
console.log('Ticket Final:', ticketFinal);
