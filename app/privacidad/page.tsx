import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Qué datos trata ${site.name}, para qué y cómo retirar el acceso.`,
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated={site.policiesUpdated}>
      <section>
        <h2>Quién es responsable</h2>
        <p>
          {site.name} es un servicio independiente operado por {site.ownerName}. Para cualquier consulta sobre tus datos
          escribe a <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>

      <section>
        <h2>Qué hace el servicio</h2>
        <p>
          Conecta Claude (de Anthropic) con tu cuenta de ActiveCollab para que Claude pueda consultar y gestionar tu
          información de ActiveCollab cuando tú se lo pides en el chat.
        </p>
      </section>

      <section>
        <h2>Qué datos tratamos y para qué</h2>
        <ul>
          <li>
            <strong>Email, contraseña y código de verificación de ActiveCollab:</strong> se envían a ActiveCollab solo en el
            momento de iniciar sesión, para que ActiveCollab emita un token de acceso. No se guardan ni se registran en los
            logs.
          </li>
          <li>
            <strong>Token de acceso de ActiveCollab, ID de cuenta y email:</strong> van cifrados dentro de los tokens que
            recibe Claude. Nuestro servidor no guarda una copia: solo los descifra en cada petición para llamar a
            ActiveCollab en tu nombre.
          </li>
          <li>
            <strong>Contenido de ActiveCollab</strong> (proyectos, tareas, horas, comentarios, etc.): pasa por el servidor
            cuando Claude lo pide y se entrega a Claude. No lo guardamos.
          </li>
          <li>
            <strong>Límite de intentos:</strong> para proteger el servicio guardamos de forma temporal la dirección IP y un
            resumen cifrado (hash) del email usado al iniciar sesión. Se borran solos en un máximo de una hora.
          </li>
          <li>
            <strong>Registros técnicos:</strong> el proveedor de hosting registra datos técnicos de las peticiones (IP, fecha,
            ruta) para el funcionamiento y la seguridad del servicio.
          </li>
          <li>
            <strong>Cookies:</strong> solo una cookie técnica durante el inicio de sesión (dura 10 minutos) para proteger el
            formulario. No usamos cookies de seguimiento ni analítica.
          </li>
        </ul>
      </section>

      <section>
        <h2>Con quién se comparten</h2>
        <ul>
          <li>
            <strong>ActiveCollab:</strong> para iniciar sesión y para cada acción que pides.
          </li>
          <li>
            <strong>Anthropic (Claude):</strong> recibe las respuestas de ActiveCollab que Claude solicita. Su uso se rige por
            la política de privacidad de Anthropic.
          </li>
          <li>
            <strong>Vercel</strong> (hosting) y <strong>Upstash</strong> (límite de intentos), como proveedores técnicos.
          </li>
        </ul>
        <p>No vendemos ni cedemos tus datos a nadie más.</p>
      </section>

      <section>
        <h2>Cuánto tiempo</h2>
        <p>
          El acceso de Claude dura mientras mantengas el conector: el token de sesión se renueva cada hora y caduca a los 30
          días sin uso. Los datos del límite de intentos se borran en una hora como máximo.
        </p>
      </section>

      <section>
        <h2>Cómo retirar el acceso</h2>
        <ul>
          <li>Desconecta o elimina el conector en los ajustes de Claude.</li>
          <li>
            Para invalidar también el token emitido por ActiveCollab, elimínalo desde ActiveCollab o escríbenos y te
            ayudamos.
          </li>
        </ul>
      </section>

      <section>
        <h2>Tus derechos</h2>
        <p>
          Puedes pedir información sobre tus datos, su corrección o su eliminación escribiendo a{" "}
          <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Como no guardamos tus datos
          de ActiveCollab, normalmente basta con desconectar el conector.
        </p>
      </section>

      <section>
        <h2>Seguridad</h2>
        <p>
          Las conexiones usan HTTPS. Los tokens se cifran con AES-256-GCM y solo pueden usarse desde Claude. El inicio de
          sesión usa OAuth 2.1 con PKCE y tiene límite de intentos.
        </p>
      </section>

      <section>
        <h2>Cambios</h2>
        <p>Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha.</p>
      </section>
    </LegalPage>
  );
}
