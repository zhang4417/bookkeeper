function creatId() {
    let id: number = JSON.parse(localStorage.getItem('_MaxId') || '0')
    return () => {
        id += 1
        localStorage.setItem('_MaxId', JSON.stringify(id))
        return id
    }
}

const id = creatId()
export default id
