import React, { useState } from 'react'
import InvoiceOutput from './InvoiceOutput'
import axios from 'axios'
import toast from 'react-hot-toast'

const InvioceForm = () => {
    const [openNextForm, setOpenNextForm] = useState(false)
    const [invoicesubmit, setInvoiceSubmit] = useState(false)
    const [clientname, setClientName] = useState('')
    const [clientadrs1, setClientAdrs1] = useState('')
    const [clientadrs2, setClientAdrs2] = useState('')
    const [clientphone, setClientPhone] = useState('')
    const [project, setProject] = useState('')
    const [qty, setQty] = useState('')
    const [price, setPrice] = useState('')
    const handleClient = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://neox-infotech-backend.onrender.com/api/v1/clientdetails", { clientname, clientadrs1, clientadrs2, clientphone }, { withCredentials: true })
            toast.success(res.data.message)
            setOpenNextForm(true)
        } catch (error) {
            console.log(error)
        }

    }
    // const AddMoreProjects = async () => {
    //     try {
    //         const res = await axios.post(`https://neox-infotech-backend.onrender.com/api/v1/clientproject/${clientname}`, { project, qty, price }, { withCredentials: true })
    //         toast.success(res.data.message)
    //         setProject('')
    //         setQty('')
    //         setPrice('')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const projectSubmit = async () => {
        try {
            const res = await axios.post(`https://neox-infotech-backend.onrender.com/api/v1/clientproject/${clientname}`, { project, qty, price }, { withCredentials: true })
            toast.success(res.data.message)
            setInvoiceSubmit(true)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            {
                !invoicesubmit ?
                    <div className='invoice-form'>
                        <h1>Create A New Invoice</h1>
                        <form onSubmit={handleClient}>
                            <h2>Client Details</h2>
                            <div className="clientInput">
                                <input type="text" placeholder='Client Name or Organisation' onChange={(e) => setClientName(e.target.value)} />
                                <input type="text" placeholder='Client Address 1' onChange={(e) => setClientAdrs1(e.target.value)} />
                                <input type="text" placeholder='Client Address 2' onChange={(e) => setClientAdrs2(e.target.value)} />
                                <input type="number" placeholder='Client Phone Number' onChange={(e) => setClientPhone(e.target.value)} />
                            </div>
                            <button>Next</button>
                        </form>
                        {
                            openNextForm ? <div className="next-form">
                                <div className="project-input">
                                    <input type="text" placeholder='Project Details' onChange={(e) => setProject(e.target.value)} />
                                    <input type="text" placeholder='Project Qty' onChange={(e) => setQty(e.target.value)} />
                                    <input type="text" placeholder='Project Price' onChange={(e) => setPrice(e.target.value)} />
                                    <div className="buttons">
                                        {/* <button onClick={AddMoreProjects}>Add More</button> */}
                                        <button onClick={projectSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div> : null
                        }

                    </div> : <InvoiceOutput clientname={clientname} />
            }


        </>
    )
}

export default InvioceForm
