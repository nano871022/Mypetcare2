# Cuida a Tome - Mascota Virtual

Este es un juego de mascota virtual simple para niños, diseñado para funcionar en dispositivos Android de bajos recursos. El objetivo es cuidar de un gato llamado Tome, atendiendo a sus necesidades básicas de higiene y alimentación.

La aplicación está construida como una aplicación web local (HTML, CSS, JavaScript) envuelta en una `WebView` de Android.

## Características Implementadas

- **Mascota Virtual (Tome):** El gato se dibuja en un Canvas HTML y su apariencia cambia según su estado.
- **Barras de Estado:**
  - Hambre
  - Higiene
  - Salud Dental
- **Decaimiento de Estado:** Las barras de estado de Tome empeoran automáticamente con el tiempo.
- **Acciones del Jugador:**
  - **Alimentar:** Mejora la barra de hambre.
  - **Bañar:** Mejora la barra de higiene y limpia las manchas del pelaje.
  - **Lavar Dientes:** Mejora la barra de salud dental.
- **Persistencia:** El estado del juego se guarda localmente en el dispositivo, por lo que el progreso no se pierde al cerrar la aplicación.
- **Feedback Visual:** El gato se ve triste si sus necesidades son bajas, y aparecen manchas o dientes sucios como indicadores visuales.

## Características No Implementadas

- **Cambiar Ropa:** El botón existe, pero la funcionalidad para cambiar la apariencia de la ropa de Tome aún no se ha desarrollado.
- **Sonidos:** No se han añadido efectos de sonido.

## Arquitectura del Código

La lógica del juego en JavaScript está diseñada siguiendo una arquitectura de **Puertos y Adaptadores (Arquitectura Hexagonal)**. Esto separa la lógica central del juego de las dependencias externas como el renderizado en pantalla o el almacenamiento.

- **Núcleo (`core.js`):** Contiene todo el estado y las reglas del juego, sin ninguna dependencia externa.
- **Adaptadores:**
  - **Adaptador de Canvas (`cat.js`):** Escucha los cambios de estado del núcleo y se encarga de dibujar el gato y las barras de estado en el canvas.
  - **Adaptador de Persistencia (`persistenceAdapter.js`):** Escucha los cambios de estado y los guarda en el `localStorage` del navegador.
  - **Adaptadores de UI y Temporizador (`main.js`):** Conectan los botones de la interfaz de usuario y el temporizador del juego a las acciones del núcleo.

Este enfoque hace que el código sea más fácil de mantener, probar y evolucionar en el futuro.

## CI/CD Workflows

Este proyecto utiliza GitHub Actions para la Integración Continua y el Despliegue Continuo (CI/CD).

### 1. Build and Test for Manual Download (`build-for-testing.yml`)

- **Propósito:** Compilar una versión de la aplicación para pruebas y validación manual.
- **Activación:** Este workflow se debe ejecutar manualmente desde la pestaña "Actions" de GitHub.
- **Acciones:**
  - Compila la aplicación en modo `release`.
  - Ejecuta las pruebas unitarias.
  - Sube dos artefactos que se pueden descargar:
    - `test-results`: Un reporte de los resultados de las pruebas.
    - `app-bundle-release`: El fichero `.aab` (Android App Bundle) listo para ser instalado en un dispositivo de pruebas.

### 2. Build and Deploy to Google Play (`build-and-deploy.yml`)

- **Propósito:** Desplegar automáticamente una nueva versión a la Google Play Console.
- **Activación:** Se ejecuta automáticamente cada vez que se integra código a la rama `master`.
- **Acciones:**
  - Compila y firma el Android App Bundle usando las credenciales guardadas en los secretos del repositorio.
  - Sube el bundle firmado al **track interno** de Google Play para una distribución de prueba.
  - Crea y publica un nuevo tag de Git (ej: `v20231027-143000`) para marcar la versión exacta del código que se ha desplegado.
