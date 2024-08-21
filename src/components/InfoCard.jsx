import { Button, Card, Col } from 'react-bootstrap'
import { useState } from 'react'

export default function InfoCard({item, del, title, notIds}){
    let [hovering, setHover] = useState('d-none')

    const hasImage = item.cardImage ? 'rounded-top-4' : ''

    return (
        <Col xs={4}>
            <Card onMouseEnter={() => setHover('d-block')} onMouseLeave={() => setHover('d-none')} className={hasImage + ' mt-2 mb-2 info-card'}>
                <Button onClick={del} id={Object.values(item)[0]+'-del-'+title} className={hovering+' btn-delete btn-peri position-absolute top-0 start-0 translate-middle rounded-circle'}>
                    <i className="bi bi-x" id={Object.values(item)[0]+'-i-'+title}></i>
                </Button>
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