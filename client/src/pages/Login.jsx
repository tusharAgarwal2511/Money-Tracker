import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd';
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner';

// const URL = "http://localhost:5000"


const Login = () => {

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const onFinish = async (values) => {
		try {
			setLoading(true)
			const response = await axios.post('/api/users/login', values)
			localStorage.setItem('money-tracker-user', JSON.stringify({ ...response.data, password: '' }))
			setLoading(false)
			message.success('Login successful')
			navigate('/')
		} catch (error) {
			setLoading(false)
			message.error('Login Failed')
		}
	}

	useEffect(() => {
		if (localStorage.getItem('money-tracker-user')) {
			navigate('/')
		}
		else {

		}
	})

	return (
		<div className='login'>
			{loading && <Spinner />}

			<div className="row justify-content-center align-items-center w-100 h-100">

				<div className="col-md-5">

					<Form layout='vertical' onFinish={onFinish}>
						<h1>Login</h1>

						<Form.Item label='Email' name='email'>
							<Input />
						</Form.Item>

						<Form.Item label='Password' name='password'>
							<Input type='password' />
						</Form.Item>

						<div className="d-flex justify-content-between align-items-center">
							<Link to='/register'>Click here to Register</Link>
							<button className='primary' type='submit'>Login</button>
						</div>

					</Form>

				</div>

				<div className="col-md-5">
					<div className='lottie'>
						<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_OdVhgq.json" background="transparent" speed="1" loop autoplay></lottie-player>
					</div>
				</div>



			</div>

		</div>
	)
}

export default Login