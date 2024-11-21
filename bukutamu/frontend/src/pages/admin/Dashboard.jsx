import React from "react";
import Chart from './LineChart'; // Import your Chart component


const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ background: "white", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <section className="content">
        <div className="container-fluid">
          {/* Dashboard Header */}
          <div className="row mb-4">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>

          {/* Dashboard Statistics Section */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                  <p>Bounce Rate</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>

          {/* Main Row for Charts */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light text-dark">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-2" />
                    Statistics Overview
                  </h3>
                </div>
                <div className="card-body" style={{ marginTop:"10px" }}>
                  <Chart /> {/* Embed the Chart component here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
