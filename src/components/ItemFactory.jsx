import Item from './Item'
import InfoCard from './InfoCard'

export default function ItemFactory ({arr, isList, del, title}){

    let items = arr.map((item) => {
        let notIds = []
        Object.keys(item).forEach((it, i) => {
            if(!it.includes('Id')){
                notIds.push({[Object.keys(item)[i]]: Object.values(item)[i]})
            }
        })
        if(isList){
            let itemInfo = notIds.map((niItem) => {
                if(Object.keys(niItem)[0].includes('Date')){
                    return (
                        <p className='mb-0' key={Object.keys(niItem)[0]}>{Object.keys(niItem)[0].split(/(?=[A-Z])/)[1]+':'} <b className='fs-5'>{Object.values(niItem)[0].split('T')[0]}</b></p>
                    )
                } else {
                    return (
                        <p className='mb-0' key={Object.keys(niItem)[0]}>{Object.keys(niItem)[0].split(/(?=[A-Z])/)[1]+':'} <b className='fs-5'>{+Object.values(niItem)[0] ? '$'+Object.values(niItem)[0] : Object.values(niItem)[0]}</b></p>
                    )
                }
            })
            return <Item key={Object.values(item)[0]} item={item} del={del} title={title} itemInfo={itemInfo} notIds={notIds}></Item>
        } else {
            return <InfoCard key={Object.values(item)[0]} item={item} del={del} title={title} notIds={notIds}></InfoCard>
        }
    })
    
    return (
        items
    )
}