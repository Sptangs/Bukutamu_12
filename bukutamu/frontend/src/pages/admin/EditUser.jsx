import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const EditUser = () => {
    const {id} = useParams();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        getUser();
    }, []);
    const handleChange = (event) => {
        const name = event.target.name;
        name === 'nama'?setNama(event.target.value):'';
        name === 'email'?setEmail(event.target.value):'';
    }

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/users/'+id, {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNama(data.nama);
        setEmail(data.email);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for(let elm of frmel.elements){
            fData[elm.name] = elm.value;
        }
        const response = await fetch('http://localhost:3000/api/users/'+id,{
            method: "PUT",
            mode: "cors",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify(fData),
        });
        if(!response.ok){
            console.log(error => console.error);
        }else{
            event.target.reset();
            Swal.fire({
                icon:"success",
                text:"Update Berhasil Yeeee",
                timer: 1000
            })
            .then(res => {
                window.location.href = '/admin/user';
            })
        }
    }

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col">
                    <h1 className='m-0'>Data User</h1>
                </div>
                <div className="col">
                    <ol className='breadcrumb float-sm-right'>
                        <li className='breadcrumb-item'><a href="#">Home</a></li>
                        <li className='breadcrumb-item active'>Input User</li>
                    </ol>
                </div>
            </div>
        </div>
      </div>
      <section className='content'>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                           <Link to="/admin/user/" className="btn btn-primary float-start">Lihat Data</Link> 
                           <h2 className='text-center'>Edit Data User</h2>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name">Nama</label>
                                    <input type="text" value={nama} onChange={handleChange} name="nama" className='form-control'/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" value={email} onChange={handleChange} name='email' className='form-control'/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className='form-control'
                                    />
                                    <span className='text-danger'>Kosongkan Jika Tidak Ingin Mengubah Password</span>
                                </div>
                                <div className="card-footer">
                                    <button type='submit' className='btn btn-primary'>Simpan</button>
                                </div>
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

export default EditUser
