import {
  calcularPrecioBaseLinea,
  calcularPrecioConIva,
  calcularTotales,
} from './ticket.helper';
import { LineaTicket, Producto } from './model';

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

describe('calcularTotales', () => {
  it('Calcula los totales (sin IVA, con IVA, y el IVA total) de las líneas del ticket', () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: 'Pan', precio: 1, tipoIva: 'superreducidoC' }, // 0% IVA
        cantidad: 5,
      },
      {
        producto: { nombre: 'Vino', precio: 10, tipoIva: 'general' }, // 21% IVA
        cantidad: 2,
      },
    ];

    const expectedTotalSinIva = 25; // (5 * 1) + (2 * 10)
    const expectedTotalIva = 4.2; // 21% de 20 (precio de Vino)
    const expectedTotalConIva = expectedTotalSinIva + expectedTotalIva;

    // Act
    const { totalSinIva, totalConIva, totalIva } =
      calcularTotales(lineasTicket);

    // Assert
    expect(totalSinIva).toEqual(expectedTotalSinIva);
    expect(totalIva).toEqual(expectedTotalIva);
    expect(totalConIva).toEqual(expectedTotalConIva);
  });
});
