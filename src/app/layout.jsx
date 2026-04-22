import "../styles.css";

export const metadata = {
  title: "Souvik Banerjee",
  description: "Personal website of Souvik Banerjee.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem("portfolio-theme");
                  var theme = savedTheme === "dark" || savedTheme === "light"
                    ? savedTheme
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.setAttribute("data-theme", theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
