import { productos } from './compra';
import { LineaTicket, TicketFinal } from './model';
import {
  calcularPrecioBaseLinea,
  calcularPrecioConIva,
  calcularTotales,
  calcularDesgloseIva,
} from './ticket.helper';

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  if (lineasTicket.length === 0) {
    throw new Error('El ticket está vacío');
  }
  lineasTicket.forEach((linea) => {
    if (linea.cantidad <= 0) {
      throw new Error('La cantidad de cada producto debe ser mayor que cero');
    }
  });

  const lineas = lineasTicket.map((linea) => ({
    nombre: linea.producto.nombre,
    cantidad: linea.cantidad,
    precioSinIva: calcularPrecioBaseLinea(linea.producto, linea.cantidad),
    tipoIva: linea.producto.tipoIva,
    precioConIva: calcularPrecioConIva(
      calcularPrecioBaseLinea(linea.producto, linea.cantidad),
      linea.producto.tipoIva
    ),
  }));

  const { totalSinIva, totalConIva, totalIva } = calcularTotales(lineasTicket);
  const desgloseIva = calcularDesgloseIva(lineasTicket);

  return {
    lineas,
    total: { totalSinIva, totalConIva, totalIva },
    desgloseIva,
  };
};

const ticketFinal = calculaTicket(productos);
console.log('Ticket Final:', ticketFinal);
