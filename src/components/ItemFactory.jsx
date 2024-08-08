
export default function ItemFactory ({arr}){
    let notIds = []

    arr.forEach((item) => {
        Object.keys(item).forEach((it, i) => {
            if(!it.includes('Id')){
                notIds.push({[Object.keys(item)[i]]: Object.values(item)[i]})
            }
        })
    })
    
    let formatted = notIds.map((item) => {
        return (
            <div key={Object.keys(item)[0]}>
                <h2>{Object.keys(item)[0].split(/(?=[A-Z])/)[1]}</h2>
                <p>{Object.values(item)[0]}</p>
            </div>
        )
    })
    return (
        formatted
    )
}