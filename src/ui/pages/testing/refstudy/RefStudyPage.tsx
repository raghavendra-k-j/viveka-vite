import { RefStudyProvider } from "./RefStudyProvider";
import { useRefStudyStore } from "./RefStudyContext";
import { useEffect } from "react";
import { Observer } from "mobx-react-lite";



export default function RefStudyPage() {
    return (<RefStudyProvider>
        <h1>RefStudyProvider</h1>
        <Body />
    </RefStudyProvider>);
}

function Body() {
    const store = useRefStudyStore();
    useEffect(() => {
        store.createTestData();
    },
        [store]);

    return (<div>
        <h2>RefStudyPage Body: {store.instanceId}</h2>
        <ChildComponent />
    </div>);
}


function ChildComponent() {
    const store = useRefStudyStore();
    return (
        <div>
            <h3>ChildComponent</h3>
            <Observer>
                {() => (
                    store.testData ? (
                        <p>TestData Instance ID: {store.testData.instanceId}</p>
                    ) : (
                        <p>No TestData created yet.</p>
                    )
                )}
            </Observer>
        </div>
    );

}


