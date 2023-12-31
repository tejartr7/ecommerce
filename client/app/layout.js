import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
const inter = Inter({ subsets: ['latin'] })
import Script from 'next/script'
export const metadata = {
  title: 'Jobs Admin',
  description: 'Generated by created by RTR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
      <Script id="show-banner">
        {`let toggleBtn = document.querySelector("#navbar-toggle");
      let collapse = document.querySelector("#navbar-collapse");
      console.log("toggleBtn");
      toggleBtn.onclick = () => {
        collapse.classList.toggle("hidden");
        collapse.classList.toggle("flex");
      };
      `}
      </Script>
    </html>
  )
}
