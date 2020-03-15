const recordListModel = {
    data: [] as RecordItem[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        return this.data;
    },
    add(record: RecordItem) {
        const record2 = JSON.parse(JSON.stringify(record)); //深拷贝record
        record2.createAt = new Date();
        this.data.push(record2);
    },
    save() {
        window.localStorage.setItem("recordList", JSON.stringify(this.data))
    }
};

export default recordListModel;