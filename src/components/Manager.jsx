import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])



    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }
        , [])

    const copyText = (text) => {
        toast.success('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: form.id})
            })
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast.success('Password Saved!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast.error('Error : Password not saved!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id})
                
            })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.success('Password Deleted!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        // console.log([...passwordArray, form])
        
    }
    }
    const editPassword = (id) => {
        console.log("editing password with id", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id:id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="mycontainer py-8 md:py-16">
                <div className='mt-9 md:mt-0'>

                    <h1 className='text-4xl text-center font-bold'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-500'>OP/&gt;</span>
                    </h1>
                </div>
                <p className='text-lg text-green-500 text-center'>Your own Password Manager</p>
                <div className="flex text-black flex-col p-4 gap-8 items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 bg-white' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 bg-white' type="text" name='username' id='username' />
                        <div className="relative w-full">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 bg-white' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 gap-2 rounded-full py-2 px-4 w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <>
                            {/* Card layout for Mobile */}
                            <div className="md:hidden flex flex-col gap-4 mb-10">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <div key={index} className="bg-green-100 p-4 rounded-md flex flex-col gap-3 border border-white shadow-sm">
                                            <div className="flex justify-between items-center min-w-0 gap-2">
                                                <span className="font-bold text-green-800 shrink-0">Site:</span>
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <a href={item.site} target='_blank' rel="noreferrer" className="underline truncate text-sm">{item.site}</a>
                                                    <div className="lordiconcopy size-7 cursor-pointer shrink-0" onClick={() => copyText(item.site)}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center min-w-0 gap-2">
                                                <span className="font-bold text-green-800 shrink-0">Username:</span>
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <span className="truncate text-sm">{item.username}</span>
                                                    <div className="cursor-pointer shrink-0" onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center min-w-0 gap-2">
                                                <span className="font-bold text-green-800 shrink-0">Password:</span>
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <span className="truncate text-sm">{"*".repeat(item.password.length)}</span>
                                                    <div className="cursor-pointer shrink-0" onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center border-t border-green-200 pt-2">
                                                <span className="font-bold text-green-800">Actions:</span>
                                                <div className="flex gap-3">
                                                    <span className="cursor-pointer" onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ "width": "22px", "height": "22px" }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className="cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "22px", "height": "22px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Table layout for Desktop */}
                            <div className="hidden md:block overflow-x-auto w-full">
                                <table className="table-auto w-full overflow-hidden rounded-md mb-10 min-w-[700px]">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2'>Site</th>
                                            <th className='py-2'>Username</th>
                                            <th className='py-2'>Password</th>
                                            <th className='py-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArray.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className="flex justify-center items-center">
                                                        <a href={item.site} target='_blank'>{item.site}</a>
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className="flex justify-center items-center">
                                                        {item.username}
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className="flex justify-center items-center">
                                                        {"*".repeat(item.password.length)}
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}

export default Manager
