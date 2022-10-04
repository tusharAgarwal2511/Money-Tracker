import React from 'react'
import '../resources/default-layout.css'
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


const DefaultLayout = (props) => {

	const user = JSON.parse(localStorage.getItem('money-tracker-user'))
	const navigate = useNavigate()

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<li onClick={() => {
							localStorage.removeItem('money-tracker-user')
							navigate('/login')
						}}>Logout</li>
					),
				},


			]}
		/>
	);

	return (
		<div className='layout'>

			<div className="header d-flex justify-content-between align-items-center">
				<div>
					<h1 className="logo">MONEY TRACKER</h1>
				</div>

				<div>
					<Dropdown overlay={menu} placement="bottomLeft">
						<button className='secondary'>{user.name}</button>
					</Dropdown>
				</div>
			</div>

			<div className="content">
				{props.children}
			</div>

		</div>
	)
}

export default DefaultLayout