"use client"

import { useActiveWeb3React } from "@/hooks/useActiveWeb3React"
import { getUserHistoryAction } from "@/redux/actions/globalAction"
import { globalState } from "@/redux/reducer/globalSlice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BLOCK_EXPLORER } from "@/utils/constants"
import { Button } from "../ui/button"


const getColor = (type) => {
    switch (type) {
        case "Donation":
            return "text-[#00A63E]";
        case "Withdrawal":
            return "text-[#E7000B]"
        default:
            return "text-[#155DFC]"
    }
}

const History = () => {

    const { wallet, account, chain, library, chainId } = useActiveWeb3React()
    const dispatch = useDispatch()
    const { userHistory, contractLoading } = useSelector(globalState);


    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState("All");


    useEffect(() => {
        if (!account || !wallet || !chain || !library) return;

        dispatch(getUserHistoryAction({
            account,
            wallet,
            chain,
            library
        }))

    }, [account, wallet, chain, library])


    const formatDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        return date.toLocaleString('en-US', { hour12: false }); // Format as "MM/DD/YYYY, HH:mm:ss"
    };

    const filteredData = userHistory?.history?.filter((transaction) => {
        const typeMatch = filter !== "All" ? transaction.type === filter : true;
        const transactionHashMatch = transaction.transactionHash.toLowerCase().includes(searchQuery.toLowerCase());
        const amountMatch = transaction.amount.toString().includes(searchQuery);
        const dateMatch = formatDate(transaction.date).toLowerCase().includes(searchQuery.toLowerCase());
        const donerMatch = transaction.doner ? transaction.doner.toLowerCase().includes(searchQuery.toLowerCase()) : false;

        return typeMatch && (transactionHashMatch || amountMatch || dateMatch || donerMatch);
    });



    const downloadPDF = (data) => {
        const doc = new jsPDF();

        // Set the title of the document
        doc.setFontSize(18);
        doc.text("Transaction Report", 14, 20); // Title at position (14, 20)

        // Define column headers
        const columns = ["Transaction Hash",
            "Type",
            "Doner",
            "Amount"
            , "Fee",
            "Date",
            //   "Path", 
            //   "Level", 
            //   "Block Number"
        ];
        const columnWidths = [50, 30, 40, 30, 30, 40,
            // 30, 30, 30
        ]; // Define column widths

        // Set font size for the table header
        doc.setFontSize(12);
        let startY = 30;

        // Draw column headers
        let currentX = 14; // Starting X position for the first column
        columns.forEach((column, index) => {
            doc.text(column, currentX, startY);
            currentX += columnWidths[index]; // Move X position based on column width
        });

        startY += 10; // Add space below the header for the rows

        // Set font size for the table rows
        doc.setFontSize(10);

        // Loop through the data and add rows
        data.forEach((transaction) => {
            let currentX = 14; // Reset starting X position for each row
            const row = [
                "..." + transaction.transactionHash?.slice(-4),
                transaction.type,
                transaction.doner ? "..." + transaction.doner?.slice(-4) : "N/A", // Only included in Donation type
                transaction.amount,
                transaction.fee || "N/A",   // Only included in Withdrawal type
                formatDate(transaction.date),
                // transaction.path || "N/A",   // Path field is included in Donation and Exit
                // transaction.level || "N/A",  // Level field is included in Donation
                // transaction.blockNumber
            ];

            // Loop through the row data and add each piece of data to the PDF
            row.forEach((item, index) => {
                doc.text(item.toString(), currentX, startY);
                currentX += columnWidths[index]; // Move X position based on column width
            });

            startY += 8; // Add some space after each row
        });

        // Save the PDF
        doc.save("transactions.pdf");
    };
    const downloadExcel = (data) => {
        const wb = XLSX.utils.book_new();

        // Define columns for the Excel sheet, including blockNumber
        // Define column headers
        const columns = ["Transaction Hash",
            "Type",
            "Doner",
            "Amount"
            , "Fee",
            "Date",
            //   "Path", 
            //   "Level", 
            //   "Block Number"
        ];


        // Prepare the rows
        const rows = data.map((transaction) => [
            transaction.transactionHash,
            transaction.type,
            transaction.doner || "N/A",  // Only included in Donation type
            transaction.amount,
            transaction.fee || "N/A",    // Only included in Withdrawal type
            formatDate(transaction.date),
            // transaction.path || "N/A",    // Path field is included in Donation and Exit
            // transaction.level || "N/A",   // Level field is included in Donation
            // transaction.blockNumber
        ]);

        // Create a worksheet
        const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);

        // Apply styling to the worksheet
        const wsProps = {
            '!cols': [
                { wpx: 200 }, // Column width for Transaction Hash
                { wpx: 100 }, // Column width for Type
                { wpx: 150 }, // Column width for Doner
                { wpx: 100 }, // Column width for Amount
                { wpx: 100 }, // Column width for Fee
                { wpx: 150 }, // Column width for Date
                // { wpx: 100 }, // Column width for Path
                // { wpx: 100 }, // Column width for Level
                // { wpx: 100 }, // Column width for Block Number
            ],
            '!rows': [
                { hpx: 40 }, // Adjust row height for better readability
            ],
        };

        // Apply the styles to the worksheet
        ws['!cols'] = wsProps['!cols'];
        ws['!rows'] = wsProps['!rows'];

        // Create the Excel sheet and download it
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");
        XLSX.writeFile(wb, 'transactions.xlsx');
    };

    return (
        <>
            {/* <div>
                <input
                    type="text"
                    placeholder="Search by Transaction Hash or Amount"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4 p-2 border rounded"
                />

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Date & Time</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((transaction, index) => (
                            <tr key={index}>
                                <td className="border p-2">{formatDate(transaction.date)}</td>
                                <td className="border p-2" style={{ color: transaction.type === 'Withdrawal' ? 'red' : 'green' }}>
                                    {transaction.type}
                                </td>                            <td className="border p-2">{transaction.amount}</td>
                                <td className="border p-2">{transaction.transactionHash}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            <div className="flex items-center mb-[40px] flex-col sm:flex-row">
                <Button
                    onClick={() => downloadPDF(filteredData)}
                    className="min-w-full sm:min-w-[250px] md:min-w-[280px] lg:min-w-[310px] bg-[#F8F8F8] font-semibold text-sm sm:text-base lg:text-lg leading-[100%] uppercase flex items-center text-black py-[15px] md:py-[16px] py-[18px] lg:py-[20px] px-[15px] md:px-[20px] lg:px-[25px] min-h-[45px] sm:min-h-[50px] md:min-h-[54px] lg:min-h-[64px] rounded-[100px] download-pdf-btn mr-0 sm:mr-[24px] mb-[24px] sm:mb-0"
                >
                    <div className="clearfix">
                        <i className="block w-[20px] h-[auto] mr-[10px]">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 2V6C14.5 6.53043 14.7107 7.03914 15.0858 7.41421C15.4609 7.78929 15.9696 8 16.5 8H20.5M10.5 9H8.5M16.5 13H8.5M16.5 17H8.5M15.5 2H6.5C5.96957 2 5.46086 2.21071 5.08579 2.58579C4.71071 2.96086 4.5 3.46957 4.5 4V20C4.5 20.5304 4.71071 21.0391 5.08579 21.4142C5.46086 21.7893 5.96957 22 6.5 22H18.5C19.0304 22 19.5391 21.7893 19.9142 21.4142C20.2893 21.0391 20.5 20.5304 20.5 20V7L15.5 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </i>
                    </div>
                    Download PDF
                </Button>
                <Button
                    onClick={() => downloadExcel(filteredData)}
                    className="min-w-full sm:min-w-[250px] md:min-w-[280px] lg:min-w-[310px] bg-[#F8F8F8] font-semibold text-sm sm:text-base lg:text-lg leading-[100%] uppercase flex items-center text-black py-[15px] md:py-[16px] py-[18px] lg:py-[20px] px-[15px] md:px-[20px] lg:px-[25px] min-h-[45px] sm:min-h-[50px] md:min-h-[54px] lg:min-h-[64px] rounded-[100px] download-pdf-btn"
                >
                    <div className="clearfix">
                        <i className="block w-[20px] h-[auto] mr-[10px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15V3M12 15L7 10M12 15L17 10M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </i>
                    </div>
                    Download Excel
                </Button>
            </div>
            <div className="transaction-history-div  p-[18px] sm:p-[20px] md:p-[22px] lg:p-[24px]">
                <div className="flex items-center mb-[24px] flex-col sm:flex-row">
                    <div className="flex-1 mb-[24px] sm:mb-0 mr-0 sm:mr-[24px] w-full sm:w-[unset]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by wallet, date, or transaction hash..."
                                className="bg-white search-input-wrapper w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="absolute top-0 left-[15px] h-full m-auto w-[24px] ">
                                <img
                                    src="/images/search.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                        </div>
                    </div>
                    <div className="min-w-full sm:min-w-[285px] transaction-select-div">
                        <Select onValueChange={(e) => setFilter(e)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="All Transactions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Donation">Donation</SelectItem>
                                    <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                                    <SelectItem value="Exit">Exit</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="transaction-table-div">
                    <div className="py-[25px] px-[20px]">
                        <h5 className="font-bold text-[#212B36] leading-[100%] text-base sm:text-[18px] md:text-[20px] lg:text-[22px]">Transaction History</h5>
                    </div>
                    <div className="okiri-table-div">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Date & Time</TableHead>
                                    <TableHead>TYPE</TableHead>
                                    <TableHead>Amount (USDT)</TableHead>
                                    <TableHead className="">Wallet</TableHead>
                                    <TableHead className="">Level</TableHead>
                                    <TableHead className="">Transaction</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((transaction, index) => (
                                    <TableRow key={index + transaction?.transactionHash}>
                                        <TableCell className="">{formatDate(transaction.date)}</TableCell>
                                        <TableCell><span className={cn(getColor(transaction.type), "font-bold")}>{transaction.type}</span></TableCell>
                                        <TableCell><span className={cn(getColor(transaction.type), "font-bold")}>{transaction.amount ? `$${transaction.amount}` : "-"}</span></TableCell>
                                        <TableCell className="">{transaction?.doner ? `...${transaction.doner.slice(-4)}` : ""}</TableCell>
                                        <TableCell className="">
                                            {transaction?.level !== undefined &&
                                                <span className="text-sfpro text-[#000000] font-medium p-[8px] leading-[100%] text-sm flex justify-center items-center bg-[#F8F8F8] level-span-wrapper rounded-[8px] max-w-[fit-content]">{`Level ${transaction?.level + 1}`}</span>}
                                        </TableCell>
                                        <TableCell className="">
                                            <Link href={BLOCK_EXPLORER[chainId] + transaction.transactionHash} target="_blank" className="text-[#155DFC] text-sm leading-[100%] font-semibold font-sfpro flex items-center">
                                                <div className="clearfix">
                                                    <i className="w-[16px] h-auto mr-[12px] block">
                                                        <img
                                                            src="/images/external-link.svg"
                                                            alt="Okirikiri Logo"
                                                            className="w-full h-full object-contain object-center"
                                                        />
                                                    </i>
                                                </div>
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/* <TableFooter>
                                        <TableRow>
                                        <TableCell colSpan={3}>Total</TableCell>
                                        <TableCell className="text-right">$2,500.00</TableCell>
                                        </TableRow>
                                    </TableFooter> */}
                        </Table>
                    </div >
                </div >
            </div >
        </>
    )
}

export default History