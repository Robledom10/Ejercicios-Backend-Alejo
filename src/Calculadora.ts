class Calculadora {
    sumar(a: number, b: number): number {
        return a + b;
    }

    restar(a: number, b: number): number {
        return a - b;
    }

    multiplicar(a: number, b: number): number {
        return a * b
    }

    dividir(a: number, b: number): number {
        if (b == 0) {
            throw new Error("No se puede dividir entre cero")
        }
        return a / b;
    }

    calcular(operacion: string, a: number, b: number): number {
        switch (operacion.toLowerCase()) {
            case "sumar":
                return this.sumar(a, b);
            case "restar":
                return this.restar(a, b);
            case "multiplicar":
                return this.multiplicar(a, b);
            case "dividir":
                return this.dividir(a, b);
            default:
                throw new Error("Operacion invalida. Usa: sumar, restar, multiplicar o dividir.");

        }
    }
}

const calc = new Calculadora;

console.log("Suma:", calc.calcular("sumar", 10, 5));
console.log("Resta:", calc.calcular("restar", 10, 5));
console.log("Multiplicación:", calc.calcular("multiplicar", 10, 5));
console.log("División:", calc.calcular("dividir", 10, 5));

try {
  console.log(calc.calcular("dividir", 10, 0));
} catch (error) {
  console.error((error as Error).message);
}