import NavigationBar from "../common/NavigationBar";
import Footer from "../landing/Footer";



export default function DefaultPage({ children: children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationBar />
            <main className="max-w-7xl mx-auto">
                {children}
            </main>
            <Footer />
        </>
    )
}