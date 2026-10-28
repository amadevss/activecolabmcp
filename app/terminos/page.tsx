import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Condiciones de uso de ${site.name}.`,
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos de uso" updated={site.policiesUpdated}>
      <section>
        <h2>El servicio</h2>
        <p>
          {site.name} es un servicio independiente operado por {site.ownerName} que conecta Claude con ActiveCollab. No está
          afiliado, patrocinado ni respaldado por ActiveCollab ni por Anthropic. ActiveCollab y Claude son marcas de sus
          respectivos propietarios.
        </p>
      </section>

      <section>
        <h2>Uso</h2>
        <ul>
          <li>Necesitas una cuenta válida de ActiveCollab y usar solo tu propia cuenta.</li>
          <li>
            Claude actúa con tus permisos de ActiveCollab. Eres responsable de las acciones que le pides y de revisar las
            operaciones importantes (por ejemplo, borrar o mover a la papelera) antes de confirmarlas.
          </li>
          <li>
            No está permitido intentar saltarse los límites o la seguridad del servicio, ni usarlo para dañar a otras
            personas o a ActiveCollab.
          </li>
          <li>Podemos suspender el acceso en caso de abuso o para proteger el servicio.</li>
        </ul>
      </section>

      <section>
        <h2>Precio</h2>
        <p>
          Por ahora el servicio es gratuito. Más adelante podría tener una cuota para cubrir los costos. Si eso ocurre, lo
          avisaremos antes y nunca se cobrará nada sin tu consentimiento expreso.
        </p>
      </section>

      <section>
        <h2>Garantías y responsabilidad</h2>
        <p>
          El servicio se ofrece “tal cual”, sin garantías de disponibilidad continua ni de ausencia de errores. Puede cambiar
          o dejar de ofrecerse. En la medida máxima que permita la ley, el operador no es responsable de daños indirectos ni
          de pérdidas de datos derivadas del uso del servicio, de ActiveCollab o de Claude.
        </p>
      </section>

      <section>
        <h2>Privacidad</h2>
        <p>
          El tratamiento de datos se describe en la{" "}
          <a className="underline" href="/privacidad">
            política de privacidad
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Cambios y contacto</h2>
        <p>
          Podemos actualizar estos términos; la versión vigente estará siempre en esta página. Para cualquier duda escribe a{" "}
          <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
