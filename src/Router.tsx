import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { PageLoader } from "./ui/components/loaders/PageLoader";
import "./ui/ds/core/core.css";
import NotFoundPage from "./ui/pages/error/NotFoundPage";
import AdminLayout from "./ui/pages/admin/_layout/AdminLayout";

const AppLayout = lazy(() => import("./ui/pages/_layout/AppLayout"));
const AdminFormsLayout = lazy(() => import("./ui/pages/admin/forms/formdetail/layout/AdminFormLayout"));
const HomePage = lazy(() => import("./ui/pages/home/HomePage"));
const SubmitPage = lazy(() => import("./ui/pages/forms/submit/SubmitPage"));
const QuestionsPage = lazy(() => import("./ui/pages/admin/forms/formdetail/questions/QuestionsPage"));
const UpsertQuestionPage = lazy(() => import("./ui/pages/admin/forms/formdetail/upsertquestion/UpsertQuestionPage"));
const SettingsPage = lazy(() => import("./ui/pages/admin/forms/formdetail/settings/SettingsPage"));
const RefStudyPage = lazy(() => import("./ui/pages/testing/refstudy/RefStudyPage"));
const ChatPageView = lazy(() => import("./ui/pages/testing/chat/ChatPageView"));
const TokenLoginPage = lazy(() => import("./ui/pages/tokenlogin/TokenLoginPage"));
const AutoLoginPage = lazy(() => import("./ui/pages/autologin/AutoLoginPage"));
const QMediaTestPage = lazy(() => import("./ui/pages/testing/qmedia/QMediaTestPage"));


export default function Router() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* All routes wrapped inside AppLayout */}
                <Route element={<AppLayout />}>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ref-study" element={<RefStudyPage />} />
                    <Route path="/forms/:permalink/submit" element={<SubmitPage />} />
                    <Route path="/chat" element={<ChatPageView />} />
                    <Route path="/token-login" element={<TokenLoginPage />} />
                    <Route path="/auto-login" element={<AutoLoginPage />} />
                    <Route path="/testing/qmedia" element={<QMediaTestPage />} />

                    {/* Admin Routes */}

                    {/* Admin Routes with AdminLayout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="forms/:permalink" element={<AdminFormsLayout />}>
                            <Route index element={<QuestionsPage />} />
                            <Route path="questions" element={<QuestionsPage />} />
                            <Route path="upsert-question" element={<UpsertQuestionPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
}
