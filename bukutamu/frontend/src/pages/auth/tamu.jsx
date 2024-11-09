import React from 'react'
import Swal from 'sweetalert2';
// import '../../css/tamu.css';

const Tamu = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements){
            fData[el.name] = el.value;
        }
        const response = await fetch("http://localhost:3000/api/bukutamu", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(fData),
        });
        if(!response.ok){
            console.log(error => console.error);
        }else{
            Swal.fire("Ok! Data berhasil di simpan", {
                icon: "success",
                timer:"2000",
            });
            event.target.reset();
        }
    }

  return (
    <div className="container">
        <div className="register-box" style={{ width:"800px" }}>
            <div className="card">
                <div className="card-header text-center">
                    <h3>Buku Tamu</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="Nama">Nama Tamu</label>
                            <input type="text" name='nama_tamu' className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="no_hp">Nomor HP</label>
                            <input type="text" name='no_hp' className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jabatan">Jabatan</label>
                            <input type="text" name='jabatan' className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="unit_kerja">Unit Kerja</label>
                            <input type="text" name='unit_kerja' className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tujuan">Tujuan</label>
                            <select name="tujuan" id="tujuan" className='form-control'>
                                <option value="">=== Pilih Unit Kerja Tujuan ===</option>
                                <option value="Kepala Sekolah">Kepala Sekolah</option>
                                <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                                <option value="Akuntansi">Akuntansi</option>
                                <option value="Bisnis Digital">Bisnis Digital</option>
                                <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                                <option value="Manajemen Perkantoran">Manajemen Perkantoran</option>
                                <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="yang_dituju">Nama Yang Dituju</label>
                            <input type="text" name='yang_dituju' className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <input type="text" name='keterangan' className='form-control'/>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type='submit' className='btn btn-primary'>Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Tamu;
