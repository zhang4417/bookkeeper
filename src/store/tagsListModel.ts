const tagsListModel: tagsListModel = {
    tags: [],
    fetchTags() {
        this.tags = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
        return this.tags
    },
    createTags() {
        const name = window.prompt('请输入标签名')
        if (name === '') {
            return window.alert('标签名不能为空')
        }
        if (name === null) {
            return;
        }
        if (this.tags.indexOf(name!) >= 0) {
            return window.alert('Duplicated')
        }
        this.tags.push(name!)
        this.saveTags()
        return window.alert('Success')

    },
    saveTags() {
        window.localStorage.setItem('tagsList', JSON.stringify(this.tags))
    }
}

export default tagsListModel