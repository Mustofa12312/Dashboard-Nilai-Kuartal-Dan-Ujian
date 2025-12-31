import {
  getStudentsKuartal,
  getStudentsUjianAkhir,
} from "../../../features/students/student.service";
import StudentsClient from "./StudentsClient";

export default async function StudentsPage() {
  const kuartal = await getStudentsKuartal();
  const ujianAkhir = await getStudentsUjianAkhir();

  return <StudentsClient kuartal={kuartal} ujianAkhir={ujianAkhir} />;
}
