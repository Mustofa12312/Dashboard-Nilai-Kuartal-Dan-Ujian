import "./globals.css";
import "../styles/theme.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Dashboard Admin Profesional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
