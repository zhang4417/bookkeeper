function creatId() {
    let id = 0
    return () => {
        id += 1
        return id
    }
}

const id = creatId()
export default id
