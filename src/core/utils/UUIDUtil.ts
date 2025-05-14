import { v4 as uuidv4 } from 'uuid';

export class UUIDUtil {

    static get compact() {
        const uuid = uuidv4();
        return uuid.replace(/-/g, '');
    }


}