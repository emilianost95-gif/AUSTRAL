/**
 * AUSTRAL — Registro de pedidos en Google Sheets
 * ------------------------------------------------
 * Este script recibe los pedidos del sitio (POST con JSON),
 * los guarda como fila en la hoja "Pedidos" y envía emails
 * de aviso al dueño y de confirmación al cliente.
 *
 * Instalación: ver instrucciones-sheets.md
 */

// ⚙️ CONFIGURACIÓN — editá estas dos líneas
const EMAIL_DUENO = "tu@correo.com"; // ← Tu email (vacío "" = sin aviso)
const NOMBRE_TIENDA = "AUSTRAL";

const SHEET_NAME = "Pedidos";

function doPost(e) {
  try {
    const o = JSON.parse(e.postData.contents);

    // Hoja de pedidos (se crea sola la primera vez)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow([
        "Fecha", "Código", "Nombre", "Email", "Items",
        "Subtotal", "Cupón", "Descuento", "Envío", "Total", "Estado",
      ]);
      sh.setFrozenRows(1);
      sh.getRange("1:1").setFontWeight("bold");
    }

    const items = (o.items || [])
      .map((i) => `${i.producto} (${i.talle}) x${i.cantidad}`)
      .join(" | ");

    sh.appendRow([
      new Date(), o.code, o.nombre, o.email, items,
      o.subtotal, o.cupon, o.descuento, o.envio, o.total, "Pendiente",
    ]);

    // Aviso al dueño
    if (EMAIL_DUENO) {
      MailApp.sendEmail(
        EMAIL_DUENO,
        `🧾 Nuevo pedido ${o.code} — ${o.nombre}`,
        `Pedido: ${o.code}\nCliente: ${o.nombre} ${o.email ? "(" + o.email + ")" : ""}\n\n` +
        `${items}\n\nTotal: $${o.total}\n\n` +
        `Estado inicial: Pendiente. Revisá la planilla para gestionarlo.`
      );
    }

    // Confirmación al cliente (solo si dejó email)
    if (o.email) {
      MailApp.sendEmail(
        o.email,
        `${NOMBRE_TIENDA} — Recibimos tu pedido ${o.code}`,
        `Hola ${o.nombre},\n\nRecibimos tu pedido ${o.code}:\n\n${items}\n\n` +
        `Total: $${o.total}\n\n` +
        `Te contactamos por WhatsApp para coordinar el pago y el envío.\n\n` +
        `Gracias por elegir ${NOMBRE_TIENDA}.`
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, code: o.code }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
