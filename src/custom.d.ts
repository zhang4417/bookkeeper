type Tag = {
    value: string;
    name: string;
}
type RecordItem = {
    tags: Tag[];
    iconName: string;
    notes: string;
    type: string;
    amount: number;
    createAt?: string;
}
type tagsListModel = {
    tags: string[];
    fetchTags: () => string[];
    createTags: () => void;
    saveTags: () => void;
};

