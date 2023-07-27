import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import "../../styles/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="max-w-full mx-auto bg-white py-4">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF3RTWK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <main className="max-w-5xl mx-auto">
        <Banner />
        {children}
        </main>
      </body>
        <Footer />
    </html>
  );
}
