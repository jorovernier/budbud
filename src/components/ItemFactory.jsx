import { Card, Col, ListGroup } from 'react-bootstrap'

export default function ItemFactory ({arr, isList}){

    let items = arr.map((item) => {
        let notIds = []
        Object.keys(item).forEach((it, i) => {
            if(!it.includes('Id')){
                notIds.push({[Object.keys(item)[i]]: Object.values(item)[i]})
            }
        })
        if(isList){
            let itemInfo = notIds.map((item) => {
                if(Object.keys(item)[0].includes('Date')){
                    return (
                        <p className='mb-0' key={Object.keys(item)[0]}>{Object.keys(item)[0].split(/(?=[A-Z])/)[1]+':'} <b className='fs-5'>{Object.values(item)[0].split('T')[0]}</b></p>
                    )
                } else {
                    return (
                        <p className='mb-0' key={Object.keys(item)[0]}>{Object.keys(item)[0].split(/(?=[A-Z])/)[1]+':'} <b className='fs-5'>{+Object.values(item)[0] ? '$'+Object.values(item)[0] : Object.values(item)[0]}</b></p>
                    )
                }
            })
            return <ListGroup.Item key={Object.values(item)[0]} className="d-flex justify-content-around p-3">{itemInfo}</ListGroup.Item>
        } else {
            let isImage = item.cardImage ? 'rounded-top-4' : ''
            return (
                <Col xs={3} key={Object.values(item)[0]}>
                    <Card className={isImage}>
                        {item.cardImage && <Card.Img src={item.cardImage} />}
                        <Card.Header className='fw-medium'>{Object.values(notIds[1])[0]}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle>{Object.values(notIds[0])[0]}</Card.Subtitle>
                            <Card.Text>{Object.keys(notIds[2])[0].split(/(?=[A-Z])/)[1] + ' $'+Object.values(notIds[2])[0]}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
    })
    
    return (
        items
    )
}