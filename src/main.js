import React from 'react';
import { Select, Row,  List, Card, Col, Divider } from 'antd';
const { Option } = Select;

const main = (props) => {
    const handleChangeFurniture = e => {
        console.log('e', e)
        // props.data.products.map(a => {
        //     if (a.)
        // }) 
    }
    const handleChangeTime = e => {
        console.log('e', e)
    }

    return (
        <Row>
            <Col span={24}>
            <br />
            <div className='headerstyle'>
                <Col span={10}>
                <Select defaultValue="Furniture Style" style={{ width: '100%' }} onChange={handleChangeFurniture}>
                    {props.data.furniture_styles !== undefined && props.data.furniture_styles.map((list, id) => {
                        return <Option key={id} value={list}>{list}</Option>
                    })}
                </Select>
                </Col>
                <Col span={10} offset={1}>
                <Select defaultValue="Delivery Time" style={{ width: '100%' }} onChange={handleChangeTime}>
                    {props.data.products !== undefined && props.data.products.map((list, ix) => {
                        return <Option key={list.delivery_time} value={list.delivery_time}>{list.delivery_time}</Option>
                    })}
                </Select>
                </Col>
            </div>
            <Divider />

            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={props.data.products}
                renderItem={(item, index) => (
                <List.Item align='left' key={index}>
                    <Card title={item.name  + item.price}>{item.description}
                    <Divider />
                    {item.furniture_style.map(a => {
                        return <div>{a}</div>
                    })}
                    <Divider />
                    <div align='right'> {item.delivery_time} </div>
                    </Card>
                    
                    
                </List.Item>
                )}
            />
            </Col>
        </Row>  
    )
}

export default main