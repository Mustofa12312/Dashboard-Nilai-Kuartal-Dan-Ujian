import {
  getGradesKuartal,
  getGradesUjianAkhir,
} from "../../../features/grades/grade.service";
import GradesClient from "./GradesClient";

export default async function GradesPage() {
  const kuartal = await getGradesKuartal();
  const ujianAkhir = await getGradesUjianAkhir();

  return <GradesClient kuartal={kuartal} ujianAkhir={ujianAkhir} />;
}
