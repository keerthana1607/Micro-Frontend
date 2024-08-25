

//----------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Checkbox from '@mui/material/Checkbox'; // Import Checkbox from MUI
// import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Box, useTheme } from '@mui/material';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const incomeTypes = [
//   'Salary',
//   'Business',
//   'Other Source Income Tax',
//   'Service Tax',
//   'Property & Sales Tax'
// ];

// const deductionTypes = [
//   'Health Insurance',
//   'Education',
//   'Other Deduction',
//   'Service Tax',
//   'Property & Sales Tax'
// ];

// function getStyles(name, selectedNames, theme) {
//   return {
//     fontWeight:
//       selectedNames.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function AddTaxReturn() {
//     let navigate = useNavigate();
//     const theme = useTheme(); // Use theme hook

//     const [taxReturn, setTaxReturn] = useState({
//         formDate: "",
//         age: "",
//         incomeType: [],
//         incomeAmount: "",
//         deductionType: [],
//         deductionAmount: "",
//         taxableAmount: 0,
//         calculatedTax: 0,
//         proof: null,
//     });

//     const [taxPolicy, setTaxPolicy] = useState({
//         policyType: "",
//     });

//     const [policyTypes, setPolicyTypes] = useState([]);

//     const [isChecked, setIsChecked] = useState(false); // State for Checkbox

//     useEffect(() => {
//         const fetchPolicyTypes = async () => {
//             try {
//                 const response = await axios.get("http://localhost:7737/taxpolicies/getAllPoliciesType");
//                 setPolicyTypes(response.data);
//             } catch (error) {
//                 console.error("Error fetching policy types", error);
//             }
//         };

//         fetchPolicyTypes();
//     }, []);

//     useEffect(() => {
//         const income = parseFloat(taxReturn.incomeAmount) || 0;
//         const deduction = parseFloat(taxReturn.deductionAmount) || 0;
//         const taxFreeThreshold = 300000;
// const taxableAmount = Math.max(0, (income - deduction) - taxFreeThreshold);
//         // const taxableAmount = income - deduction;

//         setTaxReturn(prevTaxReturn => ({
//             ...prevTaxReturn,
//             taxableAmount: taxableAmount,
//         }));
//     }, [taxReturn.incomeAmount, taxReturn.deductionAmount]);

//     const onInputChange = (e) => {
//         const { name, value } = e.target;

//         setTaxReturn((prevTaxReturn) => {
//             const updatedTaxReturn = { ...prevTaxReturn, [name]: value };

//             if (name === "incomeAmount" || name === "deductionAmount") {
//                 updatedTaxReturn.taxableAmount = updatedTaxReturn.incomeAmount - updatedTaxReturn.deductionAmount;
//             }

//             return updatedTaxReturn;
//         });
//     };

//     const onInputChangePolicy = (e) => {
//         setTaxPolicy({ ...taxPolicy, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (event) => {
//         setTaxReturn((prevTaxReturn) => ({ ...prevTaxReturn, proof: event.target.files[0] }));
//     };

//     const handleFileDelete = () => {
//         setTaxReturn((prevTaxReturn) => ({ ...prevTaxReturn, proof: null }));
//     };

//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//     };

//     const handleIncomeTypeChange = (event) => {
//         setTaxReturn((prevTaxReturn) => ({
//             ...prevTaxReturn,
//             incomeType: event.target.value,
//         }));
//     };

//     const handleDeductionTypeChange = (event) => {
//         setTaxReturn((prevTaxReturn) => ({
//             ...prevTaxReturn,
//             deductionType: event.target.value,
//         }));
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();

//         if (parseFloat(taxReturn.incomeAmount) <= 0) {
//             Swal.fire('Validation Error', 'Income amount must be greater than 0', 'error');
//             return;
//         }
        

//         if (parseFloat(taxReturn.deductionAmount) <= 0 || parseFloat(taxReturn.deductionAmount) > 300000) {
//             Swal.fire('Validation Error', 'Deduction amount must be greater than 0 and less than or equal to 300,000', 'error');
//             return;
//         }
//         if (new Date(taxReturn.formDate) > new Date()) {
//             Swal.fire('Validation Error', 'Form date cannot be in the future', 'error');
//             return;
//         }
//         if (!taxReturn.formDate || !taxReturn.age || !taxReturn.incomeType.length || !taxReturn.incomeAmount || !taxReturn.deductionType.length || !taxReturn.deductionAmount ) {
//             Swal.fire('Validation Error', 'All fields are required', 'error');
//             return;
//         }
//         if (!isChecked) {
//             Swal.fire('Validation Error', 'You must confirm that the details are accurate and final before submission', 'error');
//             return;
//         }

//         const formdata = new FormData();
//         formdata.append("formDate", taxReturn.formDate);
//         formdata.append("age", taxReturn.age);
//         formdata.append("incomeType", JSON.stringify(taxReturn.incomeType));
//         formdata.append("incomeAmount", taxReturn.incomeAmount);
//         formdata.append("deductionType", JSON.stringify(taxReturn.deductionType));
//         formdata.append("deductionAmount", taxReturn.deductionAmount);
//         formdata.append("taxableAmount", taxReturn.taxableAmount);
//         formdata.append("calculatedTax", taxReturn.calculatedTax);
//         formdata.append("proof", taxReturn.proof);
//         formdata.append("userId", sessionStorage.getItem("userId"));
//         formdata.append("policyType", taxPolicy.policyType);

//         try {
//             const response = await axios.post(
//                 "http://localhost:7737/taxreturns/forminsert",
//                 formdata
//             );

//             Swal.fire({
//                 title: 'Form Submitted',
//                 text: 'Your tax return has been successfully submitted.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 navigate("/userhome");
//             });
//         } catch (error) {
//             console.error("Error submitting form:", error);

//             Swal.fire({
//                 title: 'Submission Error',
//                 text: 'There was an error submitting your form. Please try again.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark add-tax-return-navbar">
//                 <div className="container-fluid">
//                     <a className="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <a className="nav-link text-white" href="/userhome">BACK</a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>

//             <div className='container' id='Carder'>
//                 <div className='row'>
//                     <div className="col-md-10 offset-md-1 border rounded p-4 mt-4 shadow dark">
//                         <h2 className='text-center m-4'>
//                             <b>REGISTER TAX RETURN DETAILS</b>
//                         </h2>
//                         <form onSubmit={onSubmit}>
//                             <div className='mb-3'>
//                                 <label htmlFor='formDate' className='form-label'><b>Form Date</b></label>
//                                 <input
//                                     type='date'
//                                     className='form-control'
//                                     name="formDate"
//                                     id='formDate'
//                                     value={taxReturn.formDate}
//                                     onChange={onInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className='mb-3'>
//                                 <label htmlFor='age' className='form-label'><b>Age</b></label>
//                                 <input
//                                     type='number'
//                                     className='form-control'
//                                     placeholder='Enter Age'
//                                     name="age"
//                                     id='age'
//                                     value={taxReturn.age}
//                                     onChange={onInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className='mb-3'>
//                                 <FormControl sx={{ m: 1, width: 300 }}>
//                                     <InputLabel id="income-type-label">Income Type</InputLabel>
//                                     <Select
//                                         labelId="income-type-label"
//                                         id="income-type"
//                                         multiple
//                                         value={taxReturn.incomeType}
//                                         onChange={handleIncomeTypeChange}
//                                         input={<OutlinedInput id="select-income-type" label="Income Type" />}
//                                         renderValue={(selected) => (
//                                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                                 {selected.map((value) => (
//                                                     <Chip key={value} label={value} />
//                                                 ))}
//                                             </Box>
//                                         )}
//                                         MenuProps={MenuProps}
//                                     >
//                                         {incomeTypes.map((type) => (
//                                             <MenuItem
//                                                 key={type}
//                                                 value={type}
//                                                 style={getStyles(type, taxReturn.incomeType, theme)}
//                                             >
//                                                 {type}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </div>

//                             <div className='mb-3'>
//                                 <FormControl sx={{ m: 1, width: 300 }}>
//                                     <InputLabel id="deduction-type-label">Deduction Type</InputLabel>
//                                     <Select
//                                         labelId="deduction-type-label"
//                                         id="deduction-type"
//                                         multiple
//                                         value={taxReturn.deductionType}
//                                         onChange={handleDeductionTypeChange}
//                                         input={<OutlinedInput id="select-deduction-type" label="Deduction Type" />}
//                                         renderValue={(selected) => (
//                                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                                 {selected.map((value) => (
//                                                     <Chip key={value} label={value} />
//                                                 ))}
//                                             </Box>
//                                         )}
//                                         MenuProps={MenuProps}
//                                     >
//                                         {deductionTypes.map((type) => (
//                                             <MenuItem
//                                                 key={type}
//                                                 value={type}
//                                                 style={getStyles(type, taxReturn.deductionType, theme)}
//                                             >
//                                                 {type}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </div>

//                             <div className='mb-3'>
//                                 <label htmlFor='incomeAmount' className='form-label'><b>Income Amount</b></label>
//                                 <input
//                                     type='number'
//                                     className='form-control'
//                                     placeholder='Enter Income Amount'
//                                     name="incomeAmount"
//                                     id='incomeAmount'
//                                     value={taxReturn.incomeAmount}
//                                     onChange={onInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className='mb-3'>
//                                 <label htmlFor='deductionAmount' className='form-label'><b>Deduction Amount</b></label>
//                                 <input
//                                     type='number'
//                                     className='form-control'
//                                     placeholder='Enter Deduction Amount'
//                                     name="deductionAmount"
//                                     id='deductionAmount'
//                                     value={taxReturn.deductionAmount}
//                                     onChange={onInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className='mb-3'>
//                                 <label htmlFor='taxableAmount' className='form-label'><b>Taxable Amount</b></label>
//                                 <input
//                                     type='text'
//                                     className='form-control'
//                                     id='taxableAmount'
//                                     value={taxReturn.taxableAmount.toFixed(2)}
//                                     readOnly
//                                 />
//                             </div>

//                             <div className='mb-3'>
//                                 <label htmlFor='proof' className='form-label'><b>Proof (Upload PDF)</b></label>
//                                 <input
//                                     type='file'
//                                     className='form-control'
//                                     id='proof'
//                                     accept=".pdf"
//                                     onChange={handleFileChange}
//                                 />
//                                 {taxReturn.proof && (
//                                     <div className='mt-2'>
//                                         <span>File: {taxReturn.proof.name}</span>
//                                         <button type="button" className='btn btn-danger btn-sm ms-2' onClick={handleFileDelete}>Delete</button>
//                                     </div>
//                                 )}
//                             </div>

//                             <div className='mb-3'>
//                                 <Checkbox
//                                     checked={isChecked}
//                                     onChange={handleCheckboxChange}
//                                     inputProps={{ 'aria-label': 'controlled' }}
//                                 />
//                                 <span>I confirm that the details provided are accurate and final.</span>
//                             </div>

//                             <div className='text-center'>
//                                 <button type='submit' className='btn btn-primary'>Submit</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


//----------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox from MUI
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Box, useTheme } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const incomeTypes = [
  'Salary',
  'Business',
  'Other Source Income ',
  'Pension and Retirement Income',
  ' Investment income'
];

const deductionTypes = [
  'Health Insurance',
  'Education',
  'Other Deduction',
  ' Retirement Contributions',
  ' Mortgage Interest'
];

function getStyles(name, selectedNames, theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddTaxReturn() {
    let navigate = useNavigate();
    const theme = useTheme(); // Use theme hook

    const [taxReturn, setTaxReturn] = useState({
        formDate: "",
        age: "",
        incomeType: [],
        incomeAmount: "",
        deductionType: [],
        deductionAmount: "",
        taxableAmount: 0,
        calculatedTax: 0,
        proof: null,
    });

    const [taxPolicy, setTaxPolicy] = useState({
        policyType: "",
    });

    const [policyTypes, setPolicyTypes] = useState([]);

    const [isChecked, setIsChecked] = useState(false); // State for Checkbox

    useEffect(() => {
        const fetchPolicyTypes = async () => {
            try {
                const response = await axios.get("http://localhost:7737/taxpolicies/getAllPoliciesType");
                setPolicyTypes(response.data);
            } catch (error) {
                console.error("Error fetching policy types", error);
            }
        };

        fetchPolicyTypes();
    }, []);

    useEffect(() => {
        const income = parseFloat(taxReturn.incomeAmount) || 0;
        const deduction = parseFloat(taxReturn.deductionAmount) || 0;
        const taxFreeThreshold = 300000;
        // Calculate taxable amount
        const taxableAmount = Math.max(0, (income - taxFreeThreshold) - deduction);
        setTaxReturn(prevTaxReturn => ({
            ...prevTaxReturn,
            taxableAmount: taxableAmount,
        }));
    }, [taxReturn.incomeAmount, taxReturn.deductionAmount]);

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setTaxReturn((prevTaxReturn) => {
            const updatedTaxReturn = { ...prevTaxReturn, [name]: value };

            if (name === "incomeAmount" || name === "deductionAmount") {
                // Recalculate taxableAmount
                const income = parseFloat(updatedTaxReturn.incomeAmount) || 0;
                const deduction = parseFloat(updatedTaxReturn.deductionAmount) || 0;
                const taxFreeThreshold = 300000;
                const taxableAmount = Math.max(0, (income - taxFreeThreshold) - deduction);
                updatedTaxReturn.taxableAmount = taxableAmount;
            }

            return updatedTaxReturn;
        });
    };

    const onInputChangePolicy = (e) => {
        setTaxPolicy({ ...taxPolicy, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        setTaxReturn((prevTaxReturn) => ({ ...prevTaxReturn, proof: event.target.files[0] }));
    };

    const handleFileDelete = () => {
        setTaxReturn((prevTaxReturn) => ({ ...prevTaxReturn, proof: null }));
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleIncomeTypeChange = (event) => {
        setTaxReturn((prevTaxReturn) => ({
            ...prevTaxReturn,
            incomeType: event.target.value,
        }));
    };

    const handleDeductionTypeChange = (event) => {
        setTaxReturn((prevTaxReturn) => ({
            ...prevTaxReturn,
            deductionType: event.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (parseFloat(taxReturn.incomeAmount) <= 0) {
            Swal.fire('Validation Error', 'Income amount must be greater than 0', 'error');
            return;
        }

        if (parseFloat(taxReturn.deductionAmount) <= 0 || parseFloat(taxReturn.deductionAmount) > 300000) {
            Swal.fire('Validation Error', 'Deduction amount must be greater than 0 and less than or equal to 300,000', 'error');
            return;
        }
        if (new Date(taxReturn.formDate) > new Date()) {
            Swal.fire('Validation Error', 'Form date cannot be in the future', 'error');
            return;
        }
        if (!taxReturn.formDate || !taxReturn.age || !taxReturn.incomeType.length || !taxReturn.incomeAmount || !taxReturn.deductionType.length || !taxReturn.deductionAmount ) {
            Swal.fire('Validation Error', 'All fields are required', 'error');
            return;
        }
        if (!isChecked) {
            Swal.fire('Validation Error', 'You must confirm that the details are accurate and final before submission', 'error');
            return;
        }

        const formdata = new FormData();
        formdata.append("formDate", taxReturn.formDate);
        formdata.append("age", taxReturn.age);
        formdata.append("incomeType", JSON.stringify(taxReturn.incomeType));
        formdata.append("incomeAmount", taxReturn.incomeAmount);
        formdata.append("deductionType", JSON.stringify(taxReturn.deductionType));
        formdata.append("deductionAmount", taxReturn.deductionAmount);
        formdata.append("taxableAmount", taxReturn.taxableAmount);
        formdata.append("calculatedTax", taxReturn.calculatedTax);
        formdata.append("proof", taxReturn.proof);
        formdata.append("userId", sessionStorage.getItem("userId"));
        formdata.append("policyType", taxPolicy.policyType);

        try {
            const response = await axios.post(
                "http://localhost:7737/taxreturns/forminsert",
                formdata
            );

            Swal.fire({
                title: 'Form Submitted',
                text: 'Your tax return has been successfully submitted.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/userhome");
            });
        } catch (error) {
            console.error("Error submitting form:", error);

            Swal.fire({
                title: 'Submission Error',
                text: 'There was an error submitting your form. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark add-tax-return-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/userhome">BACK</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container' id='Carder'>
                <div className='row'>
                    <div className="col-md-10 offset-md-1 border rounded p-4 mt-4 shadow dark">
                        <h2 className='text-center m-4'>
                            <b>REGISTER TAX RETURN DETAILS</b>
                        </h2>
                        <div className='alert alert-info' role='alert'>
                            <strong>Note:</strong> According to government regulations, no tax is applied to income up to ₹3 lakh. Therefore, in the calculation of taxable amount, ₹3 lakh is automatically deducted from the total income amount, and tax is computed only on the remaining amount.
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='formDate' className='form-label'><b>Form Date</b></label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="formDate"
                                    id='formDate'
                                    value={taxReturn.formDate}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='age' className='form-label'><b>Age</b></label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Enter Age'
                                    name="age"
                                    id='age'
                                    value={taxReturn.age}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="income-type-label">Income Type</InputLabel>
                                    <Select
                                        labelId="income-type-label"
                                        id="income-type"
                                        multiple
                                        value={taxReturn.incomeType}
                                        onChange={handleIncomeTypeChange}
                                        input={<OutlinedInput id="select-income-type" label="Income Type" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {incomeTypes.map((type) => (
                                            <MenuItem
                                                key={type}
                                                value={type}
                                                style={getStyles(type, taxReturn.incomeType, theme)}
                                            >
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='mb-3'>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="deduction-type-label">Deduction Type</InputLabel>
                                    <Select
                                        labelId="deduction-type-label"
                                        id="deduction-type"
                                        multiple
                                        value={taxReturn.deductionType}
                                        onChange={handleDeductionTypeChange}
                                        input={<OutlinedInput id="select-deduction-type" label="Deduction Type" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {deductionTypes.map((type) => (
                                            <MenuItem
                                                key={type}
                                                value={type}
                                                style={getStyles(type, taxReturn.deductionType, theme)}
                                            >
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='incomeAmount' className='form-label'><b>Income Amount</b></label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Enter Income Amount'
                                    name="incomeAmount"
                                    id='incomeAmount'
                                    value={taxReturn.incomeAmount}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='deductionAmount' className='form-label'><b>Deduction Amount</b></label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Enter Deduction Amount'
                                    name="deductionAmount"
                                    id='deductionAmount'
                                    value={taxReturn.deductionAmount}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='taxableAmount' className='form-label'><b>Taxable Amount</b></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='taxableAmount'
                                    value={taxReturn.taxableAmount.toFixed(2)}
                                    readOnly
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='proof' className='form-label'><b>Proof (Upload PDF)</b></label>
                                <input
                                    type='file'
                                    className='form-control'
                                    id='proof'
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                />
                                {taxReturn.proof && (
                                    <div className='mt-2'>
                                        <span>File: {taxReturn.proof.name}</span>
                                        <button type="button" className='btn btn-danger btn-sm ms-2' onClick={handleFileDelete}>Delete</button>
                                    </div>
                                )}
                            </div>

                            <div className='mb-3'>
                                <Checkbox
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <span>I confirm that the details provided are accurate and final.</span>
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
