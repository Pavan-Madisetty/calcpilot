import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroEMI – Premium Financial & Construction Calculator Suite",
  description: "Calculate Loan EMIs, SIP Wealth, Tax liability, Credit Card Rewards, and Construction Costs instantly with high-fidelity charts.",
  keywords: ["ZeroEMI", "Zero EMI", "EMI Calculator", "SIP Calculator", "Tax Calculator", "Rewards Calculator", "Construction Cost Calculator", "India", "Finance Tool"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>0️⃣</text></svg>" />
      </head>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} font-sans h-full bg-background text-foreground antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8K7P24SN05"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8K7P24SN05', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1219723889399254"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

