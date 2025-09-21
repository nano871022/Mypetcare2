# Especificación de Juego: "Cuida a Tome" (Mascota Virtual para Niños)

## Resumen

Juego para tablets/celulares de bajos recursos tipo Tamagotchi, donde el jugador cuida a un gato virtual llamado Tome. El juego NO usa motor gráfico complejo; todos los gráficos se dibujan usando el Canvas (HTML5 o Android canvas). El arte es tipo caricatura, simple y amigable para niños de 4 años.

---

## 1. Público objetivo

- Niños/as de 4 años.
- Jugar en tablets/celulares Android de bajos recursos.

## 2. Arte y Gráficos

- El gato y los objetos se dibujan a mano en el canvas, con formas simples (óvalos, líneas, rellenos de color plano).
- Animaciones básicas: cambiar de expresión, mostrar objetos (comida, cepillo, ropa), cambiar de color/ropa.
- Los fondos y elementos deben ser coloridos y claros, no recargados.

## 3. Pantallas principales

### a) Pantalla principal ("Habitación de Tome")
- Muestra al gato en el centro.
- Botones grandes y coloridos para:
  - Alimentar
  - Bañar
  - Lavar dientes
  - Cambiar ropa

### b) Mini-pantallas de acción
- Al presionar cada botón, se muestra una animación simple en el canvas:
  - Comer: el gato mastica y sonríe.
  - Baño: burbujas y agua cayendo.
  - Cepillado: cepillo sobre la boca, dientes brillan.
  - Cambio de ropa: ropa nueva aparece sobre el gato.

---

## 4. Mecánicas y Estados

### a) Barras de Estado
- **Hambre**
- **Higiene**
- **Dientes**
- **Ropa**

Visualizadas como barras o íconos simples sobre/abajo del gato.

### b) Consecuencias por descuido
- Si la barra baja mucho:
  - **Hambre baja**: Tome se ve sin energía, se acuesta, cara triste.
  - **Higiene baja**: aparecen nubecitas de olor, manchas en el pelaje.
  - **Dientes baja**: dientes se ven sucios o faltan.
  - **Ropa baja**: ropa rota, Tome huele mal (nubecita de olor).

Cada barra baja automáticamente cada cierto tiempo (ej. cada 2-5 minutos en tiempo real).

### c) Acciones
- **Alimentar**: Sube la barra de hambre. Si estaba baja, Tome se anima y sonríe.
- **Bañar**: Sube higiene. Quita manchas y olores.
- **Lavar dientes**: Sube barra de dientes. Recupera dientes perdidos/sucios.
- **Cambiar ropa**: Ropa nueva, quita olores y roturas.

---

## 5. Interfaz de Usuario

- **Botones grandes** (mínimo 80x80 px), colores llamativos.
- **Textos mínimos**, ideal solo íconos y dibujos.
- **Feedback visual inmediato**: cada acción muestra animación o cambio de estado en el canvas.
- **No requiere lectura**.

---

## 6. Sonido *(opcional, puede omitirse por hardware)*

- Sonidos simples: maullido al tocar a Tome, efecto de agua al bañar, etc.

---

## 7. Propuesta de Estructura de Código (Pseudo-HTML5/JS)

- **index.html**: Canvas principal, botones de acción.
- **main.js**: Lógica de estados, timers, interacción con botones.
- **cat.js**: Dibujo y animaciones del gato según estado.
- **assets/**: Imágenes PNG simples (opcional, pero preferible dibujar todo en JS).

---

## 8. Ejemplo de Estados y Transiciones

| Acción        | Barra asociada | Efecto visual        | Consecuencia por descuido      |
|---------------|---------------|----------------------|--------------------------------|
| Alimentar     | Hambre        | Come, sonríe         | Se acuesta, desánimo           |
| Bañar         | Higiene       | Burbujas, agua       | Manchas, nubecita de olor      |
| Lavar dientes | Dientes       | Cepillo, dientes     | Dientes sucios/faltan          |
| Cambiar ropa  | Ropa          | Ropa nueva           | Ropa rota, nubecita de olor    |

---

## 9. Consideraciones Técnicas

- **Canvas**: Todo dibujado en tiempo real, sin imágenes pesadas ni spritesheets.
- **Animaciones**: Transiciones simples (cambiar de color, mostrar/ocultar objetos).
- **Persistencia**: Guardar estado localmente (localStorage en web, SharedPreferences en Android).
- **Sin conexión**: Funciona 100% offline.

---

## 10. Objetivo pedagógico

- Enseñar a los niños la importancia de los hábitos de higiene y autocuidado.

---

## 11. Ejemplo de flujo de usuario

1. El niño entra al juego y ve a Tome.
2. Una barra muestra que tiene hambre (baja).
3. El niño presiona el botón de comida.
4. Se ve a Tome comer (animación), la barra sube.
5. Si pasa mucho tiempo sin bañar, aparecen manchas en el gato y una nubecita de olor.
6. El niño puede bañar a Tome y todo vuelve a la normalidad.

---

## 12. Extensiones futuras (para considerar)

- Más tipos de ropa
- Juguetes para jugar con Tome
- Mini-juegos educativos simples

---

## 13. Referencias visuales

- Tom y Jerry (estilo simple, expresivo)
- "My Talking Tom" pero mucho más simple y con gráficos básicos

---

**Nota para Jules:**  
Prioriza la facilidad de uso para niños pequeños, mantén el código y el arte lo más simple posible, todo debe funcionar bien en dispositivos de bajos recursos.  
No uses motores gráficos ni librerías pesadas, sólo Canvas y lógica básica.
