type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: string;
    createAt?: Date;
}
type tagsListModel = {
    data: string[];
    fetch: () => string[];
    create: () => void;
    save: () => void;
};
interface Window {
    tagList: string[];
}