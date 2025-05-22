import { FormAuthProvider } from "./FormAuthProvider";
import { Observer } from "mobx-react-lite";
import { useFormAuthStore } from "./FormAuthContext";
import { FormCurrentAuthFragment } from "./FormCurrentAuthFragment";
import { AppBar } from "../comp/AppBar";
import AppBarLogo from "~/ui/components/AppBarLogo";
import { ProfileView } from "../comp/profile/ProfileView";
import { CollectDetailsView } from "./CollectDetailsView";
import { VerifyEmailView } from "./VerifyEmailView";
import { UnknowStateView } from "~/ui/components/errors/UnknowStateView";


export function FormAuthFragment() {
    return (
        <FormAuthProvider>
            <Body />
        </FormAuthProvider>
    );
}


function Body() {
    const store = useFormAuthStore();
    return (
        <div className="h-screen flex flex-col">
            <AppBar
                leading={<AppBarLogo />}
                trailing={<ProfileView />}
            />
            <main className="overflow-y-auto p-4 sm:p-6">
                <Observer>
                    {() => {
                        switch (store.currentFragment) {
                            case FormCurrentAuthFragment.CollectDetails:
                                return <CollectDetailsView />;
                            case FormCurrentAuthFragment.VerifyEmail:
                                return <VerifyEmailView />;
                            default:
                                return <UnknowStateView />;
                        }
                    }}
                </Observer>
            </main>
        </div>
    );
}





