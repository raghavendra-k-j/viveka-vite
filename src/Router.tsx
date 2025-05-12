import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { PageLoader } from "./ui/components/loaders/PageLoader";

const AppLayout = lazy(() => import("./ui/pages/_layout/AppLayout"));
const HomePage = lazy(() => import("./ui/pages/home/HomePage"));
const SubmitPage = lazy(() => import("./ui/pages/forms/submit/SubmitPage"));



export default function Router() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forms/:permalink/submit" element={<SubmitPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
