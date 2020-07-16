type Tag = {
    value: string;
    name: string;
}
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createAt: string;
    id?: number;
}
type tagsListModel = {
    tags: string[];
    fetchTags: () => string[];
    createTags: () => void;
    saveTags: () => void;
};

