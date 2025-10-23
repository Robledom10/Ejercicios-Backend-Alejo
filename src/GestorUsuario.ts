interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    activo: boolean
}

class UsuarioService {
    private usuarios: Usuario[] = []

    crear(usuario: Usuario): void {
        const existente = this.usuarios.find(u => u.id === usuario.id);

        if (existente) {
            console.log("Este usuario ya existe.");
            return;
        }

        this.usuarios.push(usuario);
        console.log(`Usuario "${usuario.nombre}" creado correctamente`);

    }

    desactivar(id: number) {
        const usuario = this.usuarios.find(u => u.id === id);

        if (!usuario) {
            console.log(`No encontro ningun usuario con el ID ${id}`)
            return;
        }

        usuario.activo = false;
        console.log(`Usuario ${usuario.nombre} desactivado correctamente.`);
    }

    listarActivos() {
        const activo = this.usuarios.filter(u => u.activo)

        if (activo.length === 0) {
            console.log("No hay usuarios activos en este momento")
            return;
        };

        activo.forEach(u => {
            console.log(`- ID: ${u.id} | Nombre: ${u.nombre} | Correo: ${u.correo}`);
        });
    }
}

const servicio = new UsuarioService();

// Crear usuarios
servicio.crear({ id: 1, nombre: "Ana", correo: "ana@mail.com", activo: true });
servicio.crear({ id: 2, nombre: "Luis", correo: "luis@mail.com", activo: true });
servicio.crear({ id: 3, nombre: "Marta", correo: "marta@mail.com", activo: false });

// Listar activos
servicio.listarActivos();

// Desactivar uno
servicio.desactivar(1);

// Listar activos nuevamente
servicio.listarActivos();