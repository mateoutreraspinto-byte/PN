import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Tabaco Perro Negro | Puros artesanales ecuatorianos",description:"Puros hechos a mano con tabaco negro ecuatoriano. Conoce la jauría y descubre el carácter de nuestra tierra.",openGraph:{title:"Tabaco Perro Negro",description:"El carácter de nuestra tierra, en cada hoja.",type:"website"},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#17110d"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
