import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Providers from "./providers";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="layout">
            <Sidebar />

            <div className="app-content">
              <Navbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}