import "./globals.css";
import { Navbar , Footer} from "../features/layouts/index"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
