import { action, makeObservable, observable } from "mobx";
import { InstanceId } from "~/core/utils/InstanceId";
import { logger } from "~/core/utils/logger";


export class TestData {
    instanceId = InstanceId.generate("TestData");
    constructor() {
        logger.debug("TestData created", this.instanceId);
    }
}



export class RefStudyStore {
    instanceId = InstanceId.generate("RefStudyStore");
    testData: TestData | null = null;

    constructor() {
        logger.debug("RefStudyStore created", this.instanceId);
        makeObservable(this, {
            testData: observable.ref,
            createTestData: action,
        });
    }

    createTestData() {
        logger.debug("Calling createTestData in RefStudyStore", this.instanceId);
        this.testData = new TestData();
    }
}