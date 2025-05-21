import { FormAuthProvider } from "./FormAuthProvider";
import { Observer } from "mobx-react-lite";
import { useFormAuthStore } from "./FormAuthContext";
import { FormCurrentAuthFragment } from "./FormCurrentAuthFragment";
import { AppBar } from "../comp/AppBar";
import AppBarLogo from "~/ui/components/AppBarLogo";
import { ProfileView } from "../comp/profile/ProfileView";
import { CollectDetailsView } from "./CollectDetailsView";
import { VerifyEmailView } from "./VerifyEmailView";


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
                        if (store.currentFragment === FormCurrentAuthFragment.CollectDetails) {
                            return <CollectDetailsView />;
                        } else if (store.currentFragment === FormCurrentAuthFragment.VerifyEmail) {
                            return <VerifyEmailView />;
                        }
                        else {
                            return <div>Unknown Fragment</div>;
                        }
                    }}
                </Observer>
            </main>
        </div>
    );
}





