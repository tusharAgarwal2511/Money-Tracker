import React, { useState, useEffect } from 'react'
import '../resources/transactions.css'
import DefaultLayout from '../components/DefaultLayout'
import { Select, message, Table } from 'antd'
import AddEditTransaction from '../components/AddEditTransaction'
import Spinner from '../components/Spinner'
import axios from 'axios'
import moment from 'moment'
import { DatePicker, Space } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics'


const { RangePicker } = DatePicker;

// const URL = "http://localhost:5000"

const Home = () => {


	const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const [transactionData, setTransactionData] = useState([])
	const [frequency, setFrequency] = useState('7')
	const [selectedRange, setSelectedRange] = useState([])
	const [type, setType] = useState('all')
	const [viewType, setViewType] = useState('table')
	const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)

	const getTransactions = async () => {
		try {

			const userId = JSON.parse(localStorage.getItem('money-tracker-user'))


			setLoading(true)
			const response = await axios.post('/api/transactions/getalltransactions', {
				userId: userId._id, frequency, ...(frequency === 'custom' && { selectedRange }), type
			})
			console.log(response.data)

			setTransactionData(response.data)
			setLoading(false)

		} catch (error) {
			setLoading(false)
			message.error('Something went wrong')
		}
	}

	const deleteTransaction = async (record) => {
		try {

			setLoading(true)
			await axios.post('/api/transactions/deletetransaction', {
				transactionId: record._id
			})
			message.success('Transaction Deleted successfully')
			getTransactions()

			setLoading(false)

		} catch (error) {
			setLoading(false)
			message.error('Something went wrong')
		}
	}

	useEffect(() => {
		getTransactions()
	}, [frequency, selectedRange, type])

	const columns = [
		{
			title: "Date",
			dataIndex: 'date',
			render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
		},
		{
			title: "Amount",
			dataIndex: 'amount'
		},
		{
			title: "Catagory",
			dataIndex: 'catagory'
		},
		{
			title: "Type",
			dataIndex: 'type'
		},
		{
			title: "Reference",
			dataIndex: 'reference'
		},
		{
			title: "Actions",
			dataIndex: 'actions',
			render: (text, record) => {
				return <div>
					<EditOutlined className='mx-2' onClick={() => {
						setSelectedItemForEdit(record)
						setShowAddEditTransactionModal(true)
					}} />
					<DeleteOutlined className='mx-2' onClick={() => { deleteTransaction(record) }} />
				</div>
			}
		}

	]


	return (
		<DefaultLayout>
			{loading && <Spinner />}

			<div className="filter d-flex justify-content-between align-items-center">

				<div className='d-flex'>


					<div className="d-flex flex-column">
						<h6>Select Custom Range</h6>

						<Select value={frequency} onChange={(value) => { setFrequency(value) }}>
							<Select.Option value='7'>Last 1 Week</Select.Option>
							<Select.Option value='30'>Last 1 Month</Select.Option>
							<Select.Option value='365'>Last 1 Year</Select.Option>
							<Select.Option value='custom'>Custom Range</Select.Option>
						</Select>

						{frequency === 'custom' && (

							<div className='mt-2'>
								<RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
							</div>

						)}
					</div>

					<div className="d-flex flex-column mx-5">

						<h6>Select Type</h6>
						<Select value={type} onChange={(value) => { setType(value) }}>
							<Select.Option value='all'>All</Select.Option>
							<Select.Option value='income'>Income</Select.Option>
							<Select.Option value='expense'>Expense</Select.Option>

						</Select>

					</div>

				</div>

				<div className='d-flex'>

					<div >

						<div className="view-switch mx-5">

							<UnorderedListOutlined className={`${viewType === 'table' ? 'active-icon mx-2' : 'inactive-icon mx-2'}`} onClick={() => { setViewType('table') }} />

							<AreaChartOutlined className={`${viewType === 'analytics' ? 'active-icon mx-2' : 'inactive-icon mx-2'}`} onClick={() => { setViewType('analytics') }} />

						</div>

					</div>

					<button className="primary" onClick={() => {
						setShowAddEditTransactionModal(true)
					}}>ADD NEW</button>
				</div>

			</div>

			<div className="table-analytics">
				{viewType === 'table' ?
					<div className="table">
						<Table columns={columns} dataSource={transactionData} />
					</div>
					:
					<Analytics transactions={transactionData} />
				}
			</div>

			{showAddEditTransactionModal && (<AddEditTransaction
				showAddEditTransactionModal={showAddEditTransactionModal}
				setShowAddEditTransactionModal={setShowAddEditTransactionModal}
				selectedItemForEdit={selectedItemForEdit}
				setSelectedItemForEdit={setSelectedItemForEdit}
				getTransactions={getTransactions}
			/>)}


		</DefaultLayout>
	)
}

export default Home