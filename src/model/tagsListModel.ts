const tagsListModel: tagsListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
        return this.data
    },
    create() {
        const name = window.prompt('请输入标签名')
        if (name === '') {
            return window.alert('标签名不能为空')
        }
        if (name === null) {
            return;
        }
        if (this.data.indexOf(name!) >= 0) {
            return window.alert('Duplicated')
        }
        this.data.push(name!)
        this.save()
        return window.alert('Success')

    },
    save() {
        window.localStorage.setItem('tagsList', JSON.stringify(this.data))
    }
}

export default tagsListModel