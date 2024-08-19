import { Button, ListGroup } from 'react-bootstrap'
import { useState } from 'react'

export default function Item({item, del, title, itemInfo, notIds}){
    let [hovering, setHover] = useState('d-none')

    return (
        <ListGroup.Item onMouseEnter={() => setHover('d-block')} onMouseLeave={() => setHover('d-none')} className="d-flex justify-content-around p-3">
            <Button onClick={del} id={Object.values(item)[0]+'-del-'+title} className={hovering+' btn-delete btn-peri position-absolute top-0 start-0 translate-middle rounded-circle'}>
                <i className="bi bi-x" id={Object.values(item)[0]+'-i-'+title}></i>
            </Button>
            {itemInfo}
        </ListGroup.Item>
    )
}