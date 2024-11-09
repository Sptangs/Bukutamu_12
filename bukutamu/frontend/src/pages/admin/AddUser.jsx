import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
    const token = localStorage.getItem('token');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for(let el of frmel.elements){
            fData[el.name] = el.value;
        }
        const response = await fetch("http://localhost:3000/api/users/",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });
        if(!response.ok){
            console.log(error => console.error);
        }else{
            event.target.reset();
            Swal.fire({
                icon:"success",
                text:"Simpan Berhasil",
                timer: 1000
            }).then(res => {
                window.location.href = '/admin/user';
            })
        }
    }

    return(
        <>
           <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Data User</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input User</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div> 
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/user" className="btn btn-primary float-start">Lihat Data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama">Nama</label>
                                            <input type="text" name="nama" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AddUser;