import React, { useEffect, useState, useRef } from "react"; 
import { Doughnut, Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js"; 
import "../../css/Chart.css";

// Register ChartJS components 
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale); 

const Chart = () => { 
  const [chartDataTamu, setChartDataTamu] = useState(null); 
  const [chartDataYangDituju, setChartDataYangDituju] = useState(null); 
  const [chartDataTujuanDituju, setChartDataTujuanDituju] = useState(null); 
  const [barChartDataTamu, setBarChartDataTamu] = useState(null); 
  const [barChartDataYangDituju, setBarChartDataYangDituju] = useState(null); 
  const [barChartDataTujuanDituju, setBarChartDataTujuanDituju] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [activeTabTamu, setActiveTabTamu] = useState("bar"); 
  const [activeTabYangDituju, setActiveTabYangDituju] = useState("bar"); 
  const [activeTabTujuanDituju, setActiveTabTujuanDituju] = useState("bar"); 

  // Refs for canvas elements
  const tamuCanvasRef = useRef(null); 
  const yangDitujuCanvasRef = useRef(null); 
  const tujuanDitujuCanvasRef = useRef(null); 

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const token = localStorage.getItem("token"); 
        const response = await fetch("http://localhost:3000/api/bukutamu", { 
          headers: { Authorization: `Bearer ${token}` }, 
        }); 
        const data = await response.json(); 

        if (!response.ok) { 
          throw new Error("Failed to fetch data"); 
        } 

        const processData = (key) => { 
          return data.reduce((acc, item) => { 
            const unit = item[key] || "Unknown"; 
            acc[unit] = (acc[unit] || 0) + 1; 
            return acc; 
          }, {}); 
        }; 

        const generateColor = () => `hsl(${Math.random() * 360}, 100%, 70%)`; 

        const processChartData = (dataCounts) => { 
          const labels = Object.keys(dataCounts); 
          const counts = Object.values(dataCounts); 
          const colors = labels.map(() => generateColor()); 
          return { labels, counts, colors }; 
        }; 

        // Data for tamu 
        const tamuData = processChartData(processData("unit_kerja")); 
        setChartDataTamu({ 
          labels: tamuData.labels, 
          datasets: [{ data: tamuData.counts, backgroundColor: tamuData.colors }], 
        }); 
        setBarChartDataTamu({ 
          labels: tamuData.labels, 
          datasets: [{ label: "Jumlah Pengunjung", data: tamuData.counts, backgroundColor: tamuData.colors }], 
        }); 

        // Data for yang dituju 
        const yangDitujuData = processChartData(processData("yang_dituju")); 
        setChartDataYangDituju({ 
          labels: yangDitujuData.labels, 
          datasets: [{ data: yangDitujuData.counts, backgroundColor: yangDitujuData.colors }], 
        }); 
        setBarChartDataYangDituju({ 
          labels: yangDitujuData.labels, 
          datasets: [{ label: "Jumlah Yang Dituju", data: yangDitujuData.counts, backgroundColor: yangDitujuData.colors }], 
        }); 

        // Data for tujuan dituju (New chart data)
        const tujuanDitujuData = processChartData(processData("tujuan")); 
        setChartDataTujuanDituju({ 
          labels: tujuanDitujuData.labels, 
          datasets: [{ data: tujuanDitujuData.counts, backgroundColor: tujuanDitujuData.colors }], 
        }); 
        setBarChartDataTujuanDituju({ 
          labels: tujuanDitujuData.labels, 
          datasets: [{ label: "Jumlah Tujuan Dituju", data: tujuanDitujuData.counts, backgroundColor: tujuanDitujuData.colors }], 
        }); 

        setLoading(false); 
      } catch (error) { 
        setError(error.message); 
        setLoading(false); 
      } 
    }; 

    fetchData(); 
  }, []); 

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 

  const chartOptions = { 
    responsive: true, 
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        callbacks: { 
          label: (tooltipItem) => { 
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0); 
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2); 
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`; 
          }, 
        }, 
      }, 
    }, 
  };

  return ( 
    <div style={{ background: "white", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}> 
      <section style={{ padding: "20px" }}> 
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}> 
          
          {/* Pengunjung Card */}
          <div style={{ flex: "1 1 33%", minWidth: "300px", marginBottom: "20px" }}> 
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: "8px" }}> 
              <div style={{ backgroundColor: "#f8f9fa", color: "#343a40", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
                <h3 style={{ margin: 0 }}> 
                  <i className="fas fa-chart-pie mr-2" /> 
                  Pengunjung 
                </h3> 
                <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabTamu === "bar" ? "#007bff" : "", color: activeTabTamu === "bar" ? "white" : "" }} 
                      onClick={() => setActiveTabTamu("bar")}
                    >
                      Bar
                    </button>
                  </li>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabTamu === "donut" ? "#007bff" : "", color: activeTabTamu === "donut" ? "white" : "" }} 
                      onClick={() => setActiveTabTamu("donut")}
                    >
                      Donut
                    </button>
                  </li>
                </ul>
              </div> 
              <div style={{ padding: "20px" }}> 
                {activeTabTamu === "bar" ? ( 
                  <Bar data={barChartDataTamu} options={chartOptions} ref={tamuCanvasRef} /> 
                ) : ( 
                  <Doughnut data={chartDataTamu} options={chartOptions} ref={tamuCanvasRef} /> 
                )} 
              </div> 
            </div> 
          </div> 

          {/* Yang Dituju Card */}
          <div style={{ flex: "1 1 33%", minWidth: "300px", marginBottom: "20px" }}> 
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: "8px" }}> 
              <div style={{ backgroundColor: "#f8f9fa", color: "#343a40", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
                <h3 style={{ margin: 0 }}> 
                  <i className="fas fa-chart-pie mr-2" /> 
                  Yang Dituju 
                </h3> 
                <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabYangDituju === "bar" ? "#007bff" : "", color: activeTabYangDituju === "bar" ? "white" : "" }} 
                      onClick={() => setActiveTabYangDituju("bar")}
                    >
                      Bar
                    </button>
                  </li>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabYangDituju === "donut" ? "#007bff" : "", color: activeTabYangDituju === "donut" ? "white" : "" }} 
                      onClick={() => setActiveTabYangDituju("donut")}
                    >
                      Donut
                    </button>
                  </li>
                </ul>
              </div> 
              <div style={{ padding: "20px" }}> 
                {activeTabYangDituju === "bar" ? ( 
                  <Bar data={barChartDataYangDituju} options={chartOptions} ref={yangDitujuCanvasRef} /> 
                ) : ( 
                  <Doughnut data={chartDataYangDituju} options={chartOptions} ref={yangDitujuCanvasRef} /> 
                )} 
              </div> 
            </div> 
          </div> 

          {/* Tujuan Dituju Card */}
          <div style={{ flex: "1 1 33%", minWidth: "300px", marginBottom: "20px" }}> 
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: "8px" }}> 
              <div style={{ backgroundColor: "#f8f9fa", color: "#343a40", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
                <h3 style={{ margin: 0 }}> 
                  <i className="fas fa-chart-pie mr-2" /> 
                  Tujuan Dituju 
                </h3> 
                <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabTujuanDituju === "bar" ? "#007bff" : "", color: activeTabTujuanDituju === "bar" ? "white" : "" }} 
                      onClick={() => setActiveTabTujuanDituju("bar")}
                    >
                      Bar
                    </button>
                  </li>
                  <li>
                    <button 
                      style={{ padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: activeTabTujuanDituju === "donut" ? "#007bff" : "", color: activeTabTujuanDituju === "donut" ? "white" : "" }} 
                      onClick={() => setActiveTabTujuanDituju("donut")}
                    >
                      Donut
                    </button>
                  </li>
                </ul>
              </div> 
              <div style={{ padding: "20px" }}> 
                {activeTabTujuanDituju === "bar" ? ( 
                  <Bar data={barChartDataTujuanDituju} options={chartOptions} ref={tujuanDitujuCanvasRef} /> 
                ) : ( 
                  <Doughnut data={chartDataTujuanDituju} options={chartOptions} ref={tujuanDitujuCanvasRef} /> 
                )} 
              </div> 
            </div> 
          </div> 

        </div> 
      </section> 
    </div> 
  ); 
}; 

export default Chart;
