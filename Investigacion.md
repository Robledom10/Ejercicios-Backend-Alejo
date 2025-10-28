# Asincronismo en JavaScript

## 1. ¿Qué es el asincronismo en JavaScript?

El **asincronismo** en JavaScript es la forma en que el lenguaje maneja tareas que **tardan en completarse**, como pedir datos a un servidor o leer un archivo, **sin bloquear la ejecución del resto del código**.
JavaScript es *single-threaded* (usa un solo hilo), por eso necesita un sistema para no quedarse “esperando” cuando algo demora.

### Diferencia entre código sincrónico y asincrónico

**Sincrónico:**

```js
console.log("Inicio");
let data = leerArchivo(); // tarda 5 segundos
console.log("Fin"); // se ejecuta después de los 5s
```

**Asincrónico:**

```js
console.log("Inicio");
leerArchivoAsync(() => console.log("Archivo leído"));
console.log("Fin"); // se ejecuta sin esperar
```

### Ejemplos donde el asincronismo es necesario

- Consultar una **API** (peticiones HTTP).
- Leer o escribir en **archivos** desde el servidor.
- Ejecutar **consultas a bases de datos**.
- Manejar **temporizadores** (setTimeout, setInterval).

---

## 2. ¿Qué es el Event Loop?

El **Event Loop** es el mecanismo que permite que JavaScript ejecute código de manera **no bloqueante** (asincrónica).
Supervisa constantemente qué tareas ya están listas para ejecutarse y las pasa al **Call Stack** cuando el motor de JS está libre.

### Componentes importantes

- **Call Stack (Pila de llamadas):**
  Aquí se ejecuta el código **principal** (funciones, variables, etc).Si la pila está ocupada, las tareas deben esperar.
- **Task Queue (Cola de tareas):**
  Aquí llegan las tareas **asincrónicas** (por ejemplo, callbacks de setTimeout, respuestas de fetch, etc).
  El **Event Loop** revisa si el *Call Stack* está vacío y, si lo está, mueve una tarea de la *Task Queue* a la pila para ejecutarla.

---

## 3. Callbacks

Una **callback** es una función que se pasa como **parámetro a otra función**, y que se ejecuta **cuando una tarea termina**.

### Ejemplo estructural

```js
function leerArchivo(ruta, callback) {
  console.log("Leyendo archivo...");
  callback("Contenido del archivo");
}

leerArchivo("data.txt", function (contenido) {
  console.log("Archivo leído:", contenido);
});
```

---

## 4. Promesas

Las **promesas** surgieron para **mejorar el manejo de callbacks**, evitando el *callback hell* (anidaciones infinitas).
Una promesa representa un **valor que estará disponible ahora, más tarde o nunca**.

### Estados de una promesa

1. **Pending (pendiente)** → Aún no se resolvió ni rechazó.
2. **Fulfilled (cumplida)** → La operación terminó con éxito.
3. **Rejected (rechazada)** → Ocurrió un error.

### Ejemplo simple

```js
const promesa = new Promise((resolve, reject) => {
  let exito = true;
  if (exito) resolve("Operación exitosa");
  else reject("Error en la operación");
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));
```

---

## 5. Async / Await

async y await hacen que el código **asincrónico parezca sincrónico**, facilitando la lectura y el manejo de errores.

### Ventajas sobre .then()

- Código **más limpio y legible**.
- Manejo de errores con try/catch.
- Evita la anidación excesiva de .then().

### Ejemplo

```js
async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://api.example.com/data");
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
```

---

## 6. Aplicaciones prácticas en Node.js

El asincronismo se usa **constantemente** en Node.js, por ejemplo:

1. **Consultas a bases de datos:**

   ```js
   const usuarios = await db.query("SELECT * FROM usuarios");
   ```
2. **Peticiones a APIs externas:**

   ```js
   const respuesta = await fetch("https://api.openweathermap.org");
   ```
3. **Lectura o escritura de archivos:**

   ```js
   const data = await fs.promises.readFile("archivo.txt", "utf8");
   ```

En resumen, el asincronismo permite que Node.js **no se bloquee** mientras espera tareas lentas, manteniendo al servidor rápido y eficiente.
