const archivos = require('./lecturaEscritura');
const departamentos = archivos.leerJson("departamentos")


/*  */
const inmobiliaria = {
    //A:
    departamentos,
    //B:
    listarDepartamentos: departamentos =>
        departamentos.map(departamento => ({
            id: (`${departamento.id}, precio $ ${departamento.precioAlquiler}, ${departamento.disponible ? "Disponible" : "Alquilado"}, ${departamento.ambientes} ambientes `)
        })
        ),
    //C:
    buscarPorId: id => departamentos.find(departamento => departamento.id === id),
    //D:
    departamentosNoDisponibles: () => departamentos.filter(departamento => !departamento.disponible),
    //E:
    departamentosDisponibles: () => departamentos.filter(departamento => departamento.disponible),
    //F:
    filtrarPorAmbientes: cantidadAmbientes => departamentos.filter(departamento => departamento.ambientes >= cantidadAmbientes),
    //G:
    filtrarPorPrecio: function (precioAlquilerMaximo) {
        const departamentosDisponibles = this.departamentosDisponibles();
        return departamentosDisponibles.filter(departamentoDisponible => departamentoDisponible.precioAlquiler <= precioAlquilerMaximo)
    },
    //H:
    rebajarPrecioAlquiler: function (porcentajeDescuento) {
        porcentaje = 1 - (porcentajeDescuento / 100);
        const departamentosDisponibles = this.departamentosDisponibles();
        return departamentosDisponibles.map(departamentosDisponible => {
            return {
                ...departamentosDisponible,
                precioAlquiler: departamentosDisponible.precioAlquiler * porcentaje
            }
        })
    },
    //I:
    calcularRecaudacion: function () {
        const departamentosNoDisponibles = this.departamentosNoDisponibles();
        const precios = departamentosNoDisponibles.map(departamentosNoDisponible => departamentosNoDisponible.precioAlquiler)
        return precios.reduce(
            (valorAnterior, valorActual) => valorAnterior + valorActual
        )
    },
    //J:
    ordenarPorPrecio: function (departamentos) {
        const compare = (a,b) => b.precioAlquiler-a.precioAlquiler;
        return departamentos.sort(compare)
    } 
}


//A:
//B: console.log(inmobiliaria.listarDepartamentos(departamentos));
//C: console.log(inmobiliaria.buscarPorId(4));
//D:console.table(inmobiliaria.departamentosNoDisponibles());
//E:console.table(inmobiliaria.departamentosDisponibles());
//F: console.table(inmobiliaria.filtrarPorAmbientes(5));
//G: console.table(inmobiliaria.filtrarPorPrecio(500000));
//H: console.table(inmobiliaria.rebajarPrecioAlquiler(50));
//I: console.log(inmobiliaria.calcularRecaudacion());
//J: console.table(inmobiliaria.ordenarPorPrecio(departamentos));