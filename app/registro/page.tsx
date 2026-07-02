import type { Metadata } from "next";
import { MtbRegistrationWizard } from "@/components/mtb/MtbRegistrationWizard";

export const metadata: Metadata = {
  title: "Inscripción MTB — Jungle Fish",
  description:
    "Asegura tu campo en la competencia de Mountain Bike de Jungle Fish. Incluye tokens $JFISH y beneficios exclusivos.",
};

export default function RegistroPage() {
  return <MtbRegistrationWizard />;
}
