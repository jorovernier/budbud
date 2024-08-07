import Accounts from './Accounts'
import Cards from './Cards'
import Expenses from './Expenses'
import Income from './Income'
import {Container, Col, Row} from 'react-bootstrap'

export default function Dashboard (){
    return (
        <div>
            <h1>
                Dashboard
            </h1>

            <Container>
                <Row>
                    <Col>
                        <Accounts/> 
                    </Col>
                    <Col>
                        <Cards/>
                    </Col>
                </Row>
                <Row>
                    <Col>   
                        <Expenses/>
                    </Col>
                    <Col>
                        <Income/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}