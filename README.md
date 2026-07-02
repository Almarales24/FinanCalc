# 💰 FinanCalc

FinanCalc es una aplicación web desarrollada con **Angular 21** que permite realizar cálculos financieros relacionados con préstamos. La aplicación calcula automáticamente la cuota mensual, el total a pagar y el total de intereses a partir del monto solicitado, la tasa de interés y el plazo del préstamo.

Su arquitectura está separada en componentes, servicios y modelos, facilitando el mantenimiento y la escalabilidad del proyecto.

---

# 📌 Características

- Cálculo de préstamos mediante el método de amortización.
- Cálculo automático de:
  - Cuota mensual.
  - Total a pagar.
  - Total de intereses.
- Validación de formularios con Reactive Forms.
- Persistencia del último cálculo mediante LocalStorage.
- Gestión del estado utilizando RxJS (BehaviorSubject).
- Interfaz moderna y responsiva.
- Arquitectura modular basada en Angular Standalone Components.

---

# 🛠 Tecnologías utilizadas

- Angular 21
- TypeScript
- RxJS
- Angular Reactive Forms
- HTML5
- CSS3
- TailwindCSS
- LocalStorage

---

# 📂 Estructura del proyecto

```
src/
│
├── app/
│   ├── components/
│   │   └── calculadora-prestamos/
│   │
│   ├── services/
│   │   ├── calculadora.service.ts
│   │   └── finanzas.ts
│   │
│   ├── models/
│   │   └── prestamo.model.ts
│   │
│   ├── graficos/
│   ├── finanzas-personales/
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.ts
│
├── assets/
└── environments/
```

---

# ⚙️ Instalación

Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto

```bash
cd FinanCalc
```

Instalar dependencias

```bash
npm install
```

---

# ▶️ Ejecutar el proyecto

Iniciar el servidor de desarrollo

```bash
npm start
```

o

```bash
ng serve
```

Abrir en el navegador

```
http://localhost:4200
```

---

# 🧮 Funcionamiento

El usuario debe ingresar:

- Monto del préstamo.
- Tasa de interés anual.
- Número de meses.

La aplicación calcula automáticamente:

- Cuota mensual.
- Total pagado.
- Total de intereses generados.

El resultado queda almacenado en el navegador utilizando **LocalStorage**, permitiendo conservar la información incluso después de recargar la página.

---

# 🏗 Arquitectura

El proyecto sigue una arquitectura modular basada en Angular:

### Componentes

Se encargan de la presentación y de la interacción con el usuario.

Ejemplo:

- Calculadora de préstamos.

### Servicios

Contienen la lógica del negocio.

En este proyecto el servicio realiza:

- Cálculo financiero.
- Persistencia de datos.
- Administración del estado mediante RxJS.

### Modelos

Definen las estructuras de datos utilizadas por la aplicación.

---

# 📐 Fórmula utilizada

Para calcular la cuota mensual se utiliza la fórmula estándar de amortización:

\[
C = \frac{P \cdot i (1+i)^n}{(1+i)^n-1}
\]

Donde:

- **P** = monto del préstamo
- **i** = tasa de interés mensual
- **n** = número de cuotas

---

# 💾 Persistencia

La aplicación almacena el último cálculo utilizando:

```
LocalStorage
```

Clave utilizada:

```
financalc_prestamo
```

Esto permite recuperar automáticamente el último resultado calculado.

---

# 📖 Scripts disponibles

Instalar dependencias

```bash
npm install
```

Servidor de desarrollo

```bash
npm start
```

Compilar proyecto

```bash
npm run build
```

Modo desarrollo

```bash
npm run watch
```

Ejecutar pruebas

```bash
npm test
```

---

# 👨‍💻 Autor

Proyecto desarrollado como una calculadora financiera utilizando Angular 21 y TypeScript con una arquitectura modular enfocada en buenas prácticas de desarrollo frontend.

---

# 📄 Licencia

Este proyecto se distribuye únicamente con fines académicos y de aprendizaje.
