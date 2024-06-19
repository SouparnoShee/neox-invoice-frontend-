import React, { useEffect, useRef, useState } from 'react'
import neoxlogo from "./assets/neox-logo.jpg"
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'

const InvoiceOutput = ({ clientname }) => {
    const [clients, setClients] = useState([])
    const [projects, setProjects] = useState([])
    const inv_no = "NEOX" + (Math.floor(Math.random() * (900000000 - 1000000 + 1)) + 1000000).toString();
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Client-Data",
        onAfterPrint: () => alert("Print Success")
    })
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1; // months from 1-12
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();





    // Using padded values, so that 2023/1/7 becomes 2023/01/07
    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const newPaddedDate = `${year}/${pMonth}/${pDay}`;

    console.log(newPaddedDate)
    const getClient = async () => {
        try {
            const res = await axios.get(`https://neox-infotech-backend.onrender.com/api/v1/getclient/${clientname}`, { withCredentials: true })
            setClients(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    const getProject = async () => {
        try {
            const res = await axios.get(`https://neox-infotech-backend.onrender.com/api/v1/getproject/${clientname}`, { withCredentials: true })
            setProjects(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClient();
        getProject();
    }, [])
    return (
        <>
            <div className='invoice-output' ref={componentRef}>
                <div className="head">
                    <img src={neoxlogo} alt="" />
                    <div className="neox-heading">
                        <h1>NEOX INOTECH</h1>
                        <h4>GET YOUR FUTURE TECH SOLUTIONS WITH US </h4>
                    </div>

                </div>

                <div className="details">
                    <div className="client-details">
                        <span>{clients?.clientname}</span>
                        <span>{clients?.clientadrs1}</span>
                        <span>{clients?.clientadrs2}</span>
                        <span>{clients?.phone}</span>
                    </div>
                    <div className="company-details">
                        <span>NEOX INFOTECH</span>
                        <span>Kolaghat</span>
                        <span>Purba Medinipur</span>
                        <span>7507890912</span>
                    </div>
                </div>
                <div className="invoice">
                    <h2>Invoice No. - {inv_no}</h2>
                    <h2>Date - {newPaddedDate}</h2>
                </div>
                <table className='shaded-table'>
                    <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>
                            {projects?.project}
                        </td>
                        <td>{projects?.qty}</td>
                        <td>{projects?.price}</td>
                    </tr>
                </table>
                <h1>Total - {projects?.price}</h1>
                <p className='personalinfo'>
                    Make all checks payable to NEOX INFOTECH <br />
                    If you have any questions concerning this bill, contact NEOX INFOTECH,<br />
                    info@neoxinfotech.com https://www.neoxinfotech.com/ <br />
                    UCO BANK,<br />
                    NEOX INFOTECH(ANIMESH QUILA) <br />
                    A/C NO : 08000110010952 <br />
                    IFSC CODE: UCBA0000800 <br />
                    UPI ID: ANIBCOMP@OKICICI <br />
                    BRANCH NAME : MECHEDA <br />
                    ADDRESS : MECHEDA (T.PLANT) (Purba Medinipur) WEST BENGALI P.S- KOLAGHAT, <br />
                    DIST- PURBA MIDNAPORE, WEST BENGAL, PIN- 721137 <br />
                    NEOX INFOTECH <br />
                    Santipur <br />
                    1 No Thermal Gate <br />
                    Mecheda West Bengal <br />
                    721137 India <br />
                    P: 9153422783 <br />
                    THANK YOU FOR YOUR BUSINESS! <br />
                </p>
            </div>
            <button className='print' onClick={handlePrint}>Print & Save</button>
        </>
    )
}

export default InvoiceOutput
