'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

export default function Charts() {
  const viewsChartRef = useRef<HTMLCanvasElement>(null);
  const demographyChartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!viewsChartRef.current || !demographyChartRef.current) return;
    
    // Views Chart
    const viewsChart = new Chart(viewsChartRef.current, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Visualizaciones',
            data: [12500, 14200, 13800, 15600, 18900, 21400, 19800],
            borderColor: '#9146ff',
            backgroundColor: 'rgba(145, 70, 255, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Tasa de Engagement',
            data: [12.4, 13.2, 14.1, 13.8, 15.2, 14.7, 13.9],
            borderColor: '#ff0050',
            backgroundColor: 'rgba(255, 0, 80, 0.1)',
            tension: 0.3,
            fill: true,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#adadb8'
            }
          },
          y1: {
            position: 'right',
            beginAtZero: true,
            max: 20,
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#adadb8',
              callback: function(value) {
                if (typeof value === 'number') {
                  return value + '%';
                }
                return value;
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#adadb8'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#adadb8'
            }
          }
        }
      }
    });
    
    // Demography Chart
    const demographyChart = new Chart(demographyChartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
          data: [35, 42, 15, 6, 2],
          backgroundColor: [
            '#ff0050',
            '#9146ff',
            '#3b82f6',
            '#00d26a',
            '#ffc107'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#adadb8',
              padding: 15
            }
          }
        }
      }
    });
    
    return () => {
      viewsChart.destroy();
      demographyChart.destroy();
    };
  }, []);
  
  return (
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Visualizaciones y Engagement</h3>
          <div className="chart-actions">
            <select className="chart-filter">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Este año</option>
            </select>
          </div>
        </div>
        <canvas ref={viewsChartRef} className="chart-canvas"></canvas>
      </div>
      
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Demografía de Audiencia</h3>
          <div className="chart-actions">
            <select className="chart-filter">
              <option>Por edad</option>
              <option>Por país</option>
              <option>Por género</option>
            </select>
          </div>
        </div>
        <canvas ref={demographyChartRef} className="chart-canvas"></canvas>
      </div>
    </div>
  );
}