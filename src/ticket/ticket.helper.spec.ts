import {
  calcularIva,
  calcularPrecioBaseLinea,
  calcularPrecioConIva,
} from './ticket.helper';
import { productos } from './compra';
import { LineaTicket, Producto, tiposIva } from './model';

describe('calcularPrecioBase', () => {
  it('Calcula el precio total sin IVA de cada linea de productos', () => {
    // Arrange
    const producto: Producto = {
      nombre: 'Leche',
      precio: 1.5,
      tipoIva: 'superreducidoC',
    };
    const cantidad: number = 3;
    // Act
    const result = calcularPrecioBaseLinea(producto, cantidad);
    // Assert
    expect(result).toEqual(4.5);
  });
});

describe('calcularPrecioConIva', () => {
  it('Calcula el precio con IVA 21% de cada linea de productos', () => {
    // Arrange
    const precioSinIva = 4;
    const tipoIva = 'general'; // 21% de IVA
    // Act
    const result = calcularPrecioConIva(precioSinIva, tipoIva);
    // Assert
    expect(result).toEqual(4.84);
  });
});
