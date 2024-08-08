import {Container, Col, Row} from 'react-bootstrap'
import ItemFactory from './ItemFactory'

export default function DashItem ({title, data, setData}){
    return (
        <Container>
            <Row>
                <h1>{title}</h1>
            </Row>
            <Row>
                <ItemFactory arr={data}/>
            </Row>
        </Container>
    )
}