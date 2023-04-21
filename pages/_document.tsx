import Document , {Html,Head,Main,NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang={"fa"} dir={"rtl"}>
                <Head />
                <body>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4XDCXRSFV"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-S4XDCXRSFV');
                </script>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument