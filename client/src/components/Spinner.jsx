import React from 'react'
import { Spin } from 'antd';
import '../resources/default-layout.css'

const Spinner = () => {
    return (
        <div className='spinner'>
            <Spin color='grey' size='large' />
        </div>
    )
}

export default Spinner