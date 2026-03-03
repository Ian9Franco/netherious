# 🛡️ Netherious Server Security Guide

Para blindar tu servidor y proteger a tus usuarios, sigue estas recomendaciones fundamentales.

## 1. Implementa la Whitelist (Obligatorio)

La forma más efectiva de evitar que extraños o bots entren a tu servidor es activar la lista blanca. Solo los jugadores que tú autorices podrán entrar.

**Comandos en la consola del servidor:**

- `/whitelist on`: Activa la whitelist.
- `/whitelist add <nombre_jugador>`: Agrega a un amigo a la lista.
- `/whitelist list`: Mira quién está invitado.

## 2. Protege tu IP Real

Tu IP actual (`sv30.minehost.pro:25471`) es pública en la web. Aunque es necesario para que los jugadores se conecten, te expone a ataques DDoS o intentos de escaneo.

**Recomendaciones:**

- **TCPShield**: Es un servicio gratuito (tiene plan free) que actúa como un "escudo" delante de tu servidor. Te darán una dirección como `play.netherious.com` y esconderán tu IP real.
- **Cloudflare Spectrum**: Similar a TCPShield, pero para usuarios más avanzados.

## 3. Seguridad de los Mods (Fingerprint)

El mod **AutoModpack** usa el fingerprint para verificar que los archivos no hayan sido alterados.

- **Ya hemos arreglado la Web**: Ahora tu fingerprint y contraseña de descarga están protegidos en el servidor (ServerActions). Nadie puede verlos simplemente inspeccionando el código de la web.
- **Vercel**: Asegúrate de **renombrar** tus variables en el panel de Vercel (quítales el `NEXT_PUBLIC_`) para que el cambio que hicimos funcione correctamente.

## 4. Auditoría de Logs

Si ves conexiones rechazadas como las que mostraste (`rejected vanilla connections`), es normal si alguien intenta entrar sin los mods. Sin embargo, si ves muchas de IPs extrañas, es señal de que bots están escaneando tu puerto. **La Whitelist detendrá esto por completo.**

---

_Desarrollado para mantener Netherious seguro y "nashe"._
