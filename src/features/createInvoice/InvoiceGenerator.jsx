import { useMemo, useState } from 'react'

const createEmptyRow = (id) => ({
    id,
    itemName: '',
    quantity: '',
    unit: 'KG',
    rate: '',
})

function numberToWords(value) {
    const number = Number(value)
    if (!Number.isFinite(number)) return 'Zero Only'

    const wholePart = Math.floor(Math.abs(number))
    const decimalPart = Math.round((Math.abs(number) - wholePart) * 100)

    const belowTwenty = [
        'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    ]
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    const scales = ['', 'Thousand', 'Million', 'Billion']

    const underThousandToWords = (num) => {
        let result = ''
        const hundred = Math.floor(num / 100)
        const rest = num % 100

        if (hundred > 0) result += `${belowTwenty[hundred]} Hundred`
        if (rest > 0) {
            if (result) result += ' '
            if (rest < 20) {
                result += belowTwenty[rest]
            } else {
                const ten = Math.floor(rest / 10)
                const one = rest % 10
                result += tens[ten]
                if (one > 0) result += ` ${belowTwenty[one]}`
            }
        }

        return result || 'Zero'
    }

    if (wholePart === 0 && decimalPart === 0) return 'Zero Only'

    let words = ''
    let scaleIndex = 0
    let remaining = wholePart

    while (remaining > 0) {
        const chunk = remaining % 1000
        if (chunk > 0) {
            const chunkWords = underThousandToWords(chunk)
            const scale = scales[scaleIndex]
            words = `${chunkWords}${scale ? ` ${scale}` : ''}${words ? ` ${words}` : ''}`
        }
        remaining = Math.floor(remaining / 1000)
        scaleIndex += 1
    }

    if (decimalPart > 0) {
        return `${words} and ${underThousandToWords(decimalPart)} Paisa Only`
    }

    return `${words} Only`
}

function InvoiceGenerator() {
    const [companyName, setCompanyName] = useState('AUTHETIC LACQUER')
    const [customerName, setCustomerName] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [invoiceDate, setInvoiceDate] = useState('')
    const [previousInvoiceRef, setPreviousInvoiceRef] = useState('')
    const [previousBalance, setPreviousBalance] = useState('0')
    const [paidAmount, setPaidAmount] = useState('0')
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [rows, setRows] = useState([createEmptyRow(1)])
    const [nextId, setNextId] = useState(2)

    const rowsWithAmount = useMemo(() => {
        return rows.map((row) => {
            const quantity = Number.parseFloat(row.quantity) || 0
            const rate = Number.parseFloat(row.rate) || 0
            const amount = quantity * rate
            return { ...row, amount }
        })
    }, [rows])

    const totalAmount = useMemo(
        () => rowsWithAmount.reduce((sum, row) => sum + row.amount, 0),
        [rowsWithAmount],
    )

    const previousBalanceValue = Number.parseFloat(previousBalance) || 0
    const paidAmountValue = Number.parseFloat(paidAmount) || 0
    const netBalance = totalAmount + previousBalanceValue
    const netDueAmount = netBalance - paidAmountValue

    const amountInWords = useMemo(() => numberToWords(totalAmount), [totalAmount])

    function updateRow(rowId, key, value) {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)),
        )
    }

    function addRow() {
        setRows((prevRows) => [...prevRows, createEmptyRow(nextId)])
        setSelectedRowId(nextId)
        setNextId((prev) => prev + 1)
    }

    function removeSelectedRow() {
        if (rows.length === 1) return

        if (!selectedRowId) {
            setRows((prevRows) => prevRows.slice(0, -1))
            return
        }

        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRowId))
        setSelectedRowId(null)
    }

    function formatCurrency(value) {
        return value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    return (
        <div className='sm:p-6 md:px-20 lg:px-32 xl:px-40 2xl:px-48'>
            <section className="mx-auto mt-6 w-full max-w-7x rounded-xl border border-slate-200 bg-white p-4 shadow-sm ">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4  ">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Invoice Generator</h1>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Print Invoice
                    </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 ">
                    <div className="space-y-3 rounded-lg border border-slate-200 p-4">
                        <label className="block text-sm font-medium text-slate-700">
                            Company Name
                            <input
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                                placeholder="Enter company name"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Customer Name
                            <input
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                                placeholder="Enter customer name"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Customer Address
                            <textarea
                                value={customerAddress}
                                onChange={(event) => setCustomerAddress(event.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                                placeholder="Enter customer address"
                            />
                        </label>
                    </div>

                    <div className="space-y-3 rounded-lg border border-slate-200 p-4">
                        <label className="block text-sm font-medium text-slate-700">
                            Invoice Number
                            <input
                                value={invoiceNumber}
                                onChange={(event) => setInvoiceNumber(event.target.value)}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                                placeholder="e.g. KH-021"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Date
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(event) => setInvoiceDate(event.target.value)}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Previous Invoice Reference (Optional)
                            <input
                                value={previousInvoiceRef}
                                onChange={(event) => setPreviousInvoiceRef(event.target.value)}
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                                placeholder="e.g. KH-020"
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-[760px] w-full border-collapse border border-slate-300 text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold">S.No</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name of Item</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Quantity</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Rate</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rowsWithAmount.map((row, index) => {
                                const isSelected = selectedRowId === row.id
                                return (
                                    <tr
                                        key={row.id}
                                        className={isSelected ? 'bg-slate-100' : ''}
                                        onClick={() => setSelectedRowId(row.id)}
                                    >
                                        <td className="border border-slate-300 px-3 py-2">{index + 1}</td>
                                        <td className="border border-slate-300 px-3 py-2">
                                            <input
                                                value={row.itemName}
                                                onChange={(event) => updateRow(row.id, 'itemName', event.target.value)}
                                                className="w-full rounded border border-slate-200 px-2 py-1 focus:border-slate-500 focus:outline-none"
                                                placeholder="Item name"
                                            />
                                        </td>
                                        <td className="border border-slate-300 px-3 py-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={row.quantity}
                                                    onChange={(event) => updateRow(row.id, 'quantity', event.target.value)}
                                                    className="w-24 rounded border border-slate-200 px-2 py-1 focus:border-slate-500 focus:outline-none"
                                                    placeholder="0.00"
                                                />
                                                <select
                                                    value={row.unit}
                                                    onChange={(event) => updateRow(row.id, 'unit', event.target.value)}
                                                    className="rounded border border-slate-200 px-2 py-1 focus:border-slate-500 focus:outline-none"
                                                >
                                                    <option value="KG">KG</option>
                                                    <option value="Ltr">Ltr</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 px-3 py-2">
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={row.rate}
                                                onChange={(event) => updateRow(row.id, 'rate', event.target.value)}
                                                className="w-28 rounded border border-slate-200 px-2 py-1 focus:border-slate-500 focus:outline-none"
                                                placeholder="0.00"
                                            />
                                        </td>
                                        <td className="border border-slate-300 px-3 py-2 font-medium text-slate-800">
                                            {formatCurrency(row.amount)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={addRow}
                        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                        Add Product
                    </button>
                    <button
                        type="button"
                        onClick={removeSelectedRow}
                        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Remove Product
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 p-4">
                        <h2 className="text-sm font-semibold text-slate-800">Amount in Words</h2>
                        <p className="mt-2 text-sm text-slate-700">{amountInWords}</p>
                    </div>

                    <div className="rounded-lg border-2 border-slate-300 bg-slate-50 p-4">
                        <h2 className="text-sm font-semibold text-slate-900">Totals</h2>
                        <div className="mt-3 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">Total</span>
                                <span className="font-semibold text-slate-900">{formatCurrency(totalAmount)}</span>
                            </div>

                            <label className="flex items-center justify-between gap-3">
                                <span className="text-slate-700">Previous Due</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={previousBalance}
                                    onChange={(event) => setPreviousBalance(event.target.value)}
                                    className="w-40 rounded-md border border-slate-300 px-2 py-1 text-right focus:border-slate-500 focus:outline-none"
                                />
                            </label>

                            <div className="flex items-center justify-between border-t border-slate-300 pt-2">
                                <span className="font-medium text-slate-800">Net Total</span>
                                <span className="font-semibold text-slate-900">{formatCurrency(netBalance)}</span>
                            </div>

                            <label className="flex items-center justify-between gap-3">
                                <span className="text-slate-700">Paid Amount</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={paidAmount}
                                    onChange={(event) => setPaidAmount(event.target.value)}
                                    className="w-40 rounded-md border border-slate-300 px-2 py-1 text-right focus:border-slate-500 focus:outline-none"
                                />
                            </label>

                            <div className="flex items-center justify-between border-t border-slate-300 pt-2">
                                <span className="font-semibold text-slate-900">Net Due Amount</span>
                                <span className="font-bold text-slate-900">{formatCurrency(netDueAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-10 border-t border-slate-200 pt-8 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                        <p className="font-medium">Customer&apos;s Signature</p>
                        <div className="mt-10 border-t border-slate-400" />
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="font-medium">Authorized Signatory</p>
                        <div className="mt-10 border-t border-slate-400" />
                    </div>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                    <p>Reference: {previousInvoiceRef || 'N/A'} | Invoice No: {invoiceNumber || 'N/A'} | Date: {invoiceDate || 'N/A'}</p>
                </div>
            </section>
        </div>
    )
}

export default InvoiceGenerator