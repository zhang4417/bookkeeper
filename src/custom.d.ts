type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: string;
    createAt?: string;
}
type tagsListModel = {
    tags: string[];
    fetchTags: () => string[];
    createTags: () => void;
    saveTags: () => void;
};
