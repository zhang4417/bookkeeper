type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: string;
    createAt?: Date;
}
type tagsListModel = {
    tags: string[];
    fetchTags: () => string[];
    createTags: () => void;
    saveTags: () => void;
};
