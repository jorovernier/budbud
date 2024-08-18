import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import ItemFactory from './ItemFactory'

export default function DashItem ({title, data, setData}){
    let display;

    if(title === 'Income' || title === 'Expenses'){
        display = (
            <ListGroup>
                <ItemFactory arr={data} isList={true}/>
            </ListGroup>
        )
    } else {
        display = (
            <Row>
                <ItemFactory arr={data} isList={false}/>
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
                    <Button id={title +'-add'}><i className="bi bi-plus"></i></Button>
                    <Button className='ms-1' id={title +'-del'}><i className="bi bi-trash3"></i></Button>
                </Col>
            </Row>
            {display}
        </Container>
    )
}