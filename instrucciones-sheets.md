# AUSTRAL — Instalación del registro de pedidos (Google Sheets)

Tiempo estimado: 10 minutos. Costo: $0.

## Paso 1 — Crear la planilla

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una planilla nueva.
2. Nombrala como quieras (ej: `AUSTRAL — Pedidos`). No hace falta crear columnas: el script arma la hoja "Pedidos" solo, con encabezados, la primera vez que llega un pedido.

## Paso 2 — Pegar el script

1. En la planilla: menú **Extensiones → Apps Script**.
2. Borrá el contenido de `Código.gs` y pegá todo el contenido de `apps-script-pedidos.gs`.
3. Editá las dos líneas de configuración de arriba:
   - `EMAIL_DUENO`: tu correo, para que te llegue un aviso por cada pedido.
   - `NOMBRE_TIENDA`: como quieras firmar los emails.
4. Guardá (Ctrl+S).

## Paso 3 — Publicar como aplicación web

1. Botón **Implementar → Nueva implementación**.
2. En el engranaje ⚙️ elegí tipo **Aplicación web**.
3. Configurá exactamente así:
   - **Ejecutar como**: *Yo* (tu cuenta).
   - **Quién tiene acceso**: *Cualquier persona*. ← Importante: si no, el sitio no puede enviarle pedidos.
4. **Implementar**. Google te va a pedir autorizar permisos (planilla + email): aceptá. Si aparece "app no verificada", tocá *Configuración avanzada → Ir al proyecto*: es normal, el "desarrollador no verificado" sos vos.
5. Copiá la **URL de la aplicación web** (termina en `/exec`).

## Paso 4 — Conectar el sitio

En `script.js`, arriba de todo, pegá la URL:

```js
const CHECKOUT = {
  whatsapp: "56912345678",      // tu número real, sin "+"
  sheetsEndpoint: "https://script.google.com/macros/s/XXXXX/exec",
};
```

Subí el cambio a GitHub Pages y listo.

## Paso 5 — Probar

1. Agregá productos al carrito en tu sitio, poné un nombre y confirmá.
2. Revisá: fila nueva en la planilla + email de aviso + WhatsApp abierto con el pedido.

## Cómo gestionar los pedidos

- La columna **Estado** arranca en "Pendiente". Cambiala a mano: `Pagado`, `Enviado`, `Entregado`, `Cancelado`.
- Tip: seleccioná la columna Estado → **Formato → Formato condicional** y asignale un color a cada estado. Panel de administración instantáneo.

## Cosas que conviene saber

- El sitio envía el pedido en modo `no-cors`: es "enviar y confiar", no puede leer la respuesta. Por eso el pedido de WhatsApp sale igual aunque Sheets falle — el registro es un respaldo, no un bloqueo.
- Cuotas gratuitas de Google: ~100 emails/día para cuentas Gmail. Para una tienda que arranca, sobra.
- **Nunca** pases datos de tarjeta por este sistema. Es un registro de pedidos, no una pasarela de pago.
- Si cambiás el código del script, tenés que hacer **Implementar → Administrar implementaciones → editar (lápiz) → Nueva versión**, si no los cambios no se publican. Este es el error más común.
