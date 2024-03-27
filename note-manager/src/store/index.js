// store.js
import { makeAutoObservable } from "mobx";

class MobxStore {
    uuid = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setUuid(value) {
        this.uuid = value;
    }

    deleteUuid() {
        this.uuid=null;
    }
    getUuid(){
        return this.uuid;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;
