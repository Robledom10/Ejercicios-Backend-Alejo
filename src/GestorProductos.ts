class Productos {
    private __id: number;
    private __nombre: string;
    private __precio: number;
    private __stock: number;

    constructor(__id: number, __nombre: string, __precio: number, __stock: number) {
        this.__id = __id;
        this.__nombre = __nombre
        this.__precio = __precio;
        this.__stock = __stock;
    }

    get getId() {
        return this.__id
    }

    set setId(id: number) {
        this.__id = id;
    }

    get getNombre() {
        return this.__nombre;
    }

    set setNombre(nombre: string) {
        this.__nombre = nombre;
    }

    get getPrecio() {
        return this.__precio;
    }

    set setPrecio(precio: number) {
        this.__precio = precio
    }

    get getStock() {
        return this.__stock;
    }

    set setStock(stock: number) {
        this.__stock = stock;
    }
}

class Inventario {
    private productos: Productos[] = [];

    agregarProducto(producto: Productos): void {
        const existente = this.productos.find(p => p.getNombre.toLowerCase() === producto.getNombre.toLowerCase());
        if (existente) {
            existente.setStock = existente.getStock + producto.getStock;
            console.log(`Se actualizó el stock de "${producto.getNombre}". Total: ${existente.getStock}`);
        } else {
            this.productos.push(producto);
            console.log(`Producto "${producto.getNombre}" agregado al inventario.`);
        }
    }


    buscarPorNombre(nombre: string): Productos | undefined {
        return this.productos.find((p) => p.getNombre.toLowerCase() === nombre.toLowerCase())
    }

    listarProductos(): void {
        if (this.productos.length === 0) {
            console.log("El inventario esta vacio")
            return;
        }

        console.log("Inventario Actual")
        this.productos.forEach((p) => {
            console.log(
                `ID: ${p.getId} | ${p.getNombre} | Precio: $${p.getPrecio} | Stock: ${p.getStock}`
            );
        })
    }

    calcularValorTotal(): number  {
        return this.productos.reduce((total, p) => total + p.getPrecio * p.getStock, 0)
    }
}

const inv = new Inventario();

inv.agregarProducto(new Productos(1, "Café", 10, 5));
inv.agregarProducto(new Productos(2, "Azúcar", 3, 10));
inv.agregarProducto(new Productos(1, "Café", 10, 2)); // actualiza stock

inv.listarProductos();

const buscado = inv.buscarPorNombre("Café");
console.log("Producto encontrado:", buscado);

console.log("Valor total del inventario:", inv.calcularValorTotal());