import DashItem from './DashItem'
import {Container, Col, Row} from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'

export default function Dashboard (){
    const {accounts, cards, expenses, income} = useLoaderData()

    function cleanUp(arr){
        let cleaned = []
        for(let item of arr){

            let toPush = {}
            for(let i = 0; i < Object.keys(item).length - 1; i++){
                toPush[Object.keys(item)[i]]=item[Object.keys(item)[i]]
            }

            let subObj = Object.values(item)[Object.values(item).length -1]
            toPush[Object.keys(subObj)[1]] = subObj[Object.keys(subObj)[1]]

            cleaned.push(toPush)
        }
        return cleaned
    }

    let [accts, setAccts] = useState(accounts)
    let [crds, setCards] = useState(cards)
    let [exps, setExps] = useState(cleanUp(expenses))
    let [inc, setIncs] = useState(cleanUp(income))

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <DashItem title={'Accounts'} data={accts} setData={setAccts}/> 
                    </Col>
                    <Col>
                        <DashItem title={'Cards'} data={crds} setData={setCards}/>
                    </Col>
                </Row>
                <Row>
                    <Col>   
                        <DashItem title={'Expenses'} data={exps} setData={setExps}/>
                    </Col>
                    <Col>
                        <DashItem title={'Income'} data={inc} setData={setIncs}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}