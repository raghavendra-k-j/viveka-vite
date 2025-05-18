import { AppBar } from "../forms/submit/comp/AppBar";

export default function HomePage() {
    return (
        <div className="h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 flex items-center justify-center">
                <div>Centered</div>
            </div>
        </div>
    );
}
