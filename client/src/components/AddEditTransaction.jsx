import React, { useState } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import '../resources/transactions.css'
import axios from 'axios'
import Spinner from '../components/Spinner'

const AddEditTransaction = (props) => {

    // const URL = "http://localhost:5000"

    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        try {

            const user = JSON.parse(localStorage.getItem('money-tracker-user'))
            setLoading(true)
            if (props.selectedItemForEdit) {
                //edit
                await axios.post('/api/transactions/edittransaction', {
                    payload: {
                        ...values, userId: user._id,
                    },
                    transactionId: props.selectedItemForEdit._id
                })
                props.getTransactions()
                message.success('Transaction Updated successfully')
            }
            else {
                //add
                await axios.post('/api/transactions/addtransaction', {
                    ...values, userId: user._id
                })
                props.getTransactions()
                message.success('Transaction added successfully')
            }
            props.setShowAddEditTransactionModal(false)
            props.setSelectedItemForEdit(null)
            setLoading(false)

        }
        catch (error) {
            setLoading(false)
            message.error('Transaction failed')

        }
    }

    return (
        <Modal
            title={props.selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
            visible={props.showAddEditTransactionModal}
            onCancel={() => { props.setShowAddEditTransactionModal(false) }}
            footer={false}
        >
            {loading && <Spinner />}

            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={props.selectedItemForEdit}>

                <Form.Item label='Amount' name='amount'>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Type' name='type'>
                    <Select >

                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Catagory' name='catagory'>
                    <Select >
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='entertainment'>Entertainment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='medical'>Medical</Select.Option>
                        <Select.Option value='tax'>Tax</Select.Option>
                        <Select.Option value='other'>Other</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item label='Date' name='date'>
                    <Input type='date' />
                </Form.Item>

                <Form.Item label='Reference' name='reference'>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <Input type='text' />
                </Form.Item>
                <div className="d-flex justify-content-end align-items-center">
                    <button className="primary" type='submit'>Save</button>
                </div>
            </Form>

        </Modal>
    )
}

export default AddEditTransaction