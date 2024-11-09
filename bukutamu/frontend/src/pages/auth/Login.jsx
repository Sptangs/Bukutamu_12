import React from 'react';
import Swal from 'sweetalert2';
import './login.css';

const Login = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};

        for (let elm of event.target.elements) {
            if (elm.type === 'email' || elm.type === 'password') {
                fData[elm.name] = elm.value;
            }
        }

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token != null) {
                localStorage.setItem('token', data.token);
                event.target.reset();
                window.location.href = '/admin/dashboard';
            } else {
                event.target.reset();
                Swal.fire({
                    icon: "error",
                    text: "User Tidak Ditemukan",
                    timer: 1000
                });
            }
        })
        .catch(error => {
            console.error('Error : ', error);
            Swal.fire({
                icon: "error",
                text: "Terjadi kesalahan saat login, coba lagi",
                timer: 1000
            });
        });
    }

    return (
        <section onSubmit={handleSubmit} className="form-02-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="_lk_de">
                            <div className="form-03-main">
                                <div className="logo">
                                    <img src="../dist/img/logo.png" alt="logo" />
                                </div>
                                <form>
                                    <div className="form-group">
                                        <input type="email" name="email" className="form-control _ge_de_ol" placeholder="Enter Email" required aria-required="true" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control _ge_de_ol" placeholder="Enter Password" required aria-required="true" />
                                    </div>
                                    <div className="form-group">
                                            <button type="submit" className="_btn_04">Sign In</button>          
                                    </div>
                                    <div className="form-group nm_lk">
                                        <p>Or Login With</p>
                                    </div>
                                    <div className="form-group pt-0">
                                        <div className="_social_04">
                                            <ol>
                                                <li><i className="fa fa-facebook" /></li>
                                                <li><i className="fa fa-twitter" /></li>
                                                <li><i className="fa fa-google-plus" /></li>
                                                <li><i className="fa fa-instagram" /></li>
                                                <li><i className="fa fa-linkedin" /></li>
                                            </ol>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;