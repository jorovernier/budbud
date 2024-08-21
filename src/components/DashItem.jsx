import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import ItemFactory from './ItemFactory'

export default function DashItem ({title, data, setData, show, del}){
    let display;

    if(title === 'Income' || title === 'Expenses'){
        display = (
            <ListGroup className='mt-2 mb-2 pt-2'>
                <ItemFactory arr={data} isList={true} del={del} title={title}/>
            </ListGroup>
        )
    } else {
        display = (
            <Row className='d-flex flex-nowrap overflow-x-scroll pt-2'>
                <ItemFactory arr={data} isList={false} del={del} title={title}/>
            </Row>
        )
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>{title}</h1>
                </Col>
                <Col xs={3} className='d-flex justify-content-end'>
                    <Button onClick={show} className='btn-reseda' id={title +'-add'}><i className="bi bi-plus"></i></Button>
                </Col>
            </Row>
            {display}
        </Container>
    )
}