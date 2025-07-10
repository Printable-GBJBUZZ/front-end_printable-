'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { FaFile, FaFileAlt, FaImage, FaPlus, FaUpload, FaVideo } from 'react-icons/fa';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
  const [state, setState] = React.useState({
    series: [45, 28, 15, 11], // Updated to match your data: Docs, Images, Videos, Other Files
    options: {
      chart: {
        height: 350,
        type: 'radialBar' as const,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '16px',
              color: '#111827',
              fontWeight: 600,
            },
            value: {
              fontSize: '14px',
              color: '#6B7280',
            },
            total: {
              show: true,
              label: 'Storage Used',
              fontSize: '20px',
              fontWeight: 600,
              color: '#0B0E3F',
              formatter: function (w: any) {
                return '64%'
              }
            }
          }
        }
      },
      colors: ['#FACC15', '#A78BFA', '#F97316', '#EC4899'], // Yellow, Purple, Orange, Pink
      labels: ['Docs', 'Images', 'Videos', 'Other Files'],
      legend: {
        show: false, // We'll use custom legend
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          }
        }
      }]
    },
  });

  return (
    <div className="w-40 h-40 mx-auto lg:mx-0 flex-shrink-0">
      <ReactApexChart 
        options={state.options} 
        series={state.series} 
        type="radialBar" 
        height={160} 
        width={160}
      />
    </div>
  );
};

export default function MySpacePage() {
  return (
    <div className="bg-[#F8FAFC] p-6 min-h-screen">
      <div className="mx-auto bg-white rounded-xl p-6 space-y-6 shadow-sm">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-semibold text-lg text-[#111827]">Printable Vault</h1>
            <p className="text-sm text-[#6B7280]">Upload, organize, and manage your files for printing.</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="flex items-center gap-2 border border-[#374151] rounded-md text-[#374151] text-sm font-medium px-4 py-2 hover:bg-[#F3F4F6] transition-colors duration-200"
              aria-label="Create new folder"
            >
              <FaPlus className="w-4 h-4" /> Create Folder
            </button>
            <button 
              className="flex items-center gap-2 bg-[#0B0E3F] text-white text-sm font-medium rounded-md px-5 py-2 hover:bg-[#0a0c33] transition-colors duration-200"
              aria-label="Upload files"
            >
              <FaUpload className="w-4 h-4" /> Upload Files
            </button>
          </div>
        </header>

        <section className="flex flex-col lg:flex-row gap-6">
          {/* Storage Overview Card */}
          <div className="w-full lg:max-w-sm bg-[#F3F7FA] rounded-2xl p-8">
            <h2 className="text-black font-extrabold text-2xl mb-8">Storage Overview</h2>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-black font-extrabold text-4xl leading-none">
                3.2 <span className="font-normal">GB</span>
              </p>
              <p className="text-gray-500 font-normal text-lg">of 5 GB Used</p>
            </div>
            
            {/* Storage Progress Bar */}
            <div className="flex items-center justify-between mt-6" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100} aria-label="Storage usage: 64%">
              <div className="flex-1 h-6 rounded-full bg-[#0B0B3B] mr-4"></div>
              <div className="w-24 h-6 rounded-full bg-[#4ADE80]"></div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="bg-[#0B0B3B] text-white text-lg font-normal rounded-full px-8 py-3 hover:bg-[#0a0c33] transition-colors duration-200">
                Upgrade Storage
              </button>
            </div>
          </div>

          {/* File Type Distribution Chart */}
          <div className="bg-[#F3F4F6] rounded-xl p-6 flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* ApexChart */}
            <ApexChart />

            {/* Legend */}
            <div className="flex flex-col flex-1 max-w-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#D1D5DB] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-sm bg-[#FACC15]" aria-hidden="true"></div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827] flex items-center gap-1">
                      <FaFileAlt className="w-3 h-3" aria-hidden="true" /> Docs
                    </p>
                    <p className="text-xs text-[#A1A1AA]">1.2 GB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#111827]">35%</p>
              </div>
              
              <div className="flex items-center justify-between border-b border-[#D1D5DB] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-sm bg-[#F97316]" aria-hidden="true"></div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827] flex items-center gap-1">
                      <FaVideo className="w-3 h-3" aria-hidden="true" /> Videos
                    </p>
                    <p className="text-xs text-[#A1A1AA]">123 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#111827]">15%</p>
              </div>
              
              <div className="flex items-center justify-between border-b border-[#D1D5DB] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-sm bg-[#A78BFA]" aria-hidden="true"></div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827] flex items-center gap-1">
                      <FaImage className="w-3 h-3" aria-hidden="true" /> Images
                    </p>
                    <p className="text-xs text-[#A1A1AA]">601 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#111827]">28%</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-sm bg-[#EC4899]" aria-hidden="true"></div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827] flex items-center gap-1">
                      <FaFile className="w-3 h-3" aria-hidden="true" /> Other Files
                    </p>
                    <p className="text-xs text-[#A1A1AA]">232 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#111827]">11%</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    
  );
}
