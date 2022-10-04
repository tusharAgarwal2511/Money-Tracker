import { Progress } from 'antd'
import React from 'react'
import '../resources/analytics.css'

const Analytics = (props) => {

	const totalTransactions = props.transactions.length
	const totalIncomeTransactions = props.transactions.filter(transaction => transaction.type === 'income')
	const totalExpenseTransactions = props.transactions.filter(transaction => transaction.type === 'expense')

	const totalIncomeTransactionPercentage = (totalIncomeTransactions.length / totalTransactions) * 100
	const totalExpenseTransactionPercentage = (totalExpenseTransactions.length / totalTransactions) * 100

	const totalTurnOver = props.transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
	const totalIncomeTurnOver = props.transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)

	const totalExpenseTurnOver = props.transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)

	const totalIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnOver) * 100
	const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnOver) * 100

	const catagories = ['salary', 'freelance', 'food', 'entertainment', 'travel', 'education', 'investment', 'medical', 'tax', 'other']


	return (
		<div className='analytics'>
			<div className="row d-flex justify-content-around wrap">

				<div className="col-md-4 mt-3">
					<div className="transaction-count">
						<h4>Total Transactions: {totalTransactions} </h4>
						<hr />
						<h5>Income:{totalIncomeTransactions.length}</h5>
						<h5>Expense: {totalExpenseTransactions.length}</h5>
						<div className="progress-bars d-flex justify-content-around">
							<Progress strokeColor='green' type='circle' percent={totalIncomeTransactionPercentage.toFixed(0)} />
							<Progress strokeColor='red' type='circle' percent={totalExpenseTransactionPercentage.toFixed(0)} />
						</div>
					</div>
				</div>

				<div className="col-md-4 mt-3">
					<div className="transaction-count ">
						<h4>Total TurnOver: {totalTurnOver} </h4>
						<hr />
						<h5>Income:{totalIncomeTurnOver}</h5>
						<h5>Expense: {totalExpenseTurnOver}</h5>
						<div className="progress-bars d-flex justify-content-around">
							<Progress strokeColor='green' type='circle' percent={totalIncomeTurnOverPercentage.toFixed(0)} />
							<Progress strokeColor='red' type='circle' percent={totalExpenseTurnOverPercentage.toFixed(0)} />
						</div>
					</div>
				</div>

			</div>

			<div className="row mt-5">

				<div className="col-md-6">
					<div className="catgory-analysis">
						<h4>Income - Catagory</h4>
						{catagories.map((catagory) => {
							const amount = props.transactions.filter(t => t.type === 'income' && t.catagory === catagory).reduce((acc, t) => acc + t.amount, 0)
							return (amount > 0 &&
								<div className='catagory-card'>
									<h5>{catagory}</h5>
									<Progress percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)} />
								</div>
							)
						})}
					</div>
				</div>

				<div className="col-md-6">
					<div className="catgory-analysis mt-2">
						<h4>Expense - Catagory</h4>
						{catagories.map((catagory) => {
							const amount = props.transactions.filter(t => t.type === 'expense' && t.catagory === catagory).reduce((acc, t) => acc + t.amount, 0)
							return (amount > 0 &&
								<div className='catagory-card'>
									<h5>{catagory}</h5>
									<Progress percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)} />
								</div>
							)
						})}
					</div>
				</div>


			</div>

		</div>
	)
}

export default Analytics