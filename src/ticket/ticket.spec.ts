import { calculaTicket } from './ticket';
import { LineaTicket, Producto, TipoIva } from './model';

describe('calculaTicket', () => {
  const lineasTicket: LineaTicket[] = [
    {
      producto: {
        nombre: 'Pan',
        precio: 1,
        tipoIva: 'superreducidoC' as TipoIva, // 0%
      },
      cantidad: 5,
    },
    {
      producto: {
        nombre: 'Vino',
        precio: 10,
        tipoIva: 'general' as TipoIva, // 21%
      },
      cantidad: 2,
    },
  ];

  it('Debería lanzar un error si el ticket está vacío', () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [];

    // Act
    const resultado = () => calculaTicket(lineasTicket);

    // Assert
    expect(resultado).toThrowError('El ticket está vacío');
  });

  it('Debería lanzar un error si alguna cantidad de producto es no válida', () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
      {
        producto: {
          nombre: 'Producto con cantidad no válida',
          precio: 10,
          tipoIva: 'general' as TipoIva,
        },
        cantidad: 0, // Cantidad no válida
      },
    ];

    // Act
    const resultado = () => calculaTicket(lineasTicket);

    // Assert
    expect(resultado).toThrowError(
      'La cantidad de cada producto debe ser mayor que cero'
    );
  });

  it('calcula correctamente el total sin IVA', () => {
    // Arrange
    const expectedTotalSinIva = 25; // 5 * 1 + 2 * 10

    // Act
    const resultado = calculaTicket(lineasTicket);

    // Assert
    expect(resultado.total.totalSinIva).toBeCloseTo(expectedTotalSinIva, 2);
  });

  it('calcula correctamente el total con IVA', () => {
    // Arrange
    const expectedTotalConIva = 25 + 2 * 10 * 0.21; // El IVA se aplica solo al vino

    // Act
    const resultado = calculaTicket(lineasTicket);

    // Assert
    expect(resultado.total.totalConIva).toBeCloseTo(expectedTotalConIva, 2);
  });

  it('calcula correctamente el total del IVA', () => {
    // Arrange
    const expectedTotalIva = 2 * 10 * 0.21;

    // Act
    const resultado = calculaTicket(lineasTicket);

    // Assert
    expect(resultado.total.totalIva).toBeCloseTo(expectedTotalIva, 2);
  });

  it('realiza correctamente el desglose del IVA por tipo', () => {
    // Arrange
    const expectedTotalIvaGeneral = 2 * 10 * 0.21;

    // Act
    const resultado = calculaTicket(lineasTicket);

    // Assert
    const desgloseGeneral = resultado.desgloseIva.find(
      (d) => d.tipoIva === 'general'
    );
    expect(desgloseGeneral?.cuantia).toBeCloseTo(expectedTotalIvaGeneral, 2);

    const desgloseSuperreducidoC = resultado.desgloseIva.find(
      (d) => d.tipoIva === 'superreducidoC'
    );
    expect(desgloseSuperreducidoC?.cuantia || 0).toBeCloseTo(0, 2); // No hay IVA aplicado al pan
  });
});
