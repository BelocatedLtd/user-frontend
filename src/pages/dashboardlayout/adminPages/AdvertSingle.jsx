import React from 'react'
import { useParams } from 'react-router-dom'

const AdvertSingle = () => {
    const {id} = useParams()
  return (
    <div>AdvertSingle {id}</div>
  )
}

export default AdvertSingle