import React from 'react'
import Navbar from '../../landingPage/Navbar'
import InvoiceGenerator from './InvoiceGenerator'

const CreateInVoice = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <section>
                <Navbar></Navbar>
            </section>

            <section>
                <InvoiceGenerator />
            </section>
        </div>
    )
}

export default CreateInVoice