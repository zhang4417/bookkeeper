import recordListModel from '@/store/recordListModel';
import tagsListModel from '@/store/tagsListModel';

const store2={
    ...recordListModel,
    ...tagsListModel
}

export default store2