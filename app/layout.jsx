import "./globals.css";
import AuthProvider from "./context/AuthContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="layout">
            <Sidebar />
            <div className="app-content">
              <Navbar />
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}