const recordListModel = {
    recordList: [] as RecordItem[],
    fetchRecord() {
        this.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        return this.recordList;
    },
    addRecord(record: RecordItem) {
        const record2 = JSON.parse(JSON.stringify(record)); //深拷贝record
        record2.createAt = new Date();
        this.recordList.push(record2);
        this.saveRecord();
    },
    saveRecord() {
        window.localStorage.setItem("recordList", JSON.stringify(this.recordList))
    }
};

export default recordListModel;