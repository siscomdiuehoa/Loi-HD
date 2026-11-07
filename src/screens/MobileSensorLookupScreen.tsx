import React, { useState } from 'react';
import { Cpu, Search, Thermometer } from 'lucide-react';

interface SensorStandard {
  brand: string;
  roomSensor: string; // Sensor phòng
  coilSensor: string; // Sensor đồng dàn lạnh
  outdoorSensor: string; // Sensor ngoài trời
  dischargeSensor: string; // Sensor đầu đẩy máy nén
  notes: string;
}

export const MobileSensorLookupScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sensorStandards: SensorStandard[] = [
    {
      brand: 'Panasonic',
      roomSensor: '15 kΩ',
      coilSensor: '20 kΩ (hoặc 15 kΩ)',
      outdoorSensor: '5 kΩ / 15 kΩ',
      dischargeSensor: '50 kΩ / 200 kΩ',
      notes: 'Đo ở nhiệt độ phòng chuẩn 25°C. Đa số Inverter dùng sensor dàn 20kΩ.',
    },
    {
      brand: 'Daikin',
      roomSensor: '20 kΩ',
      coilSensor: '20 kΩ',
      outdoorSensor: '20 kΩ',
      dischargeSensor: '200 kΩ (Sensor đẩy)',
      notes: 'Daikin dùng cảm biến 20kΩ chuẩn ở 25°C trên hầu hết các dòng máy.',
    },
    {
      brand: 'LG',
      roomSensor: '10 kΩ (hoặc 5 kΩ)',
      coilSensor: '5 kΩ (hoặc 10 kΩ)',
      outdoorSensor: '10 kΩ',
      dischargeSensor: '200 kΩ',
      notes: 'Dòng Dual Inverter đời mới đa phần dùng sensor phòng & dàn 5kΩ.',
    },
    {
      brand: 'Saiver',
      roomSensor: '10 kΩ (NTC 10k)',
      coilSensor: '10 kΩ (NTC 10k)',
      outdoorSensor: '10 kΩ / PT1000',
      dischargeSensor: '10 kΩ / NTC',
      notes: 'Hệ thống AHU / Chiller Saiver thường sử dụng cảm biến chuẩn NTC 10k hoặc PT1000.',
    },
    {
      brand: 'Toshiba / Carrier',
      roomSensor: '10 kΩ',
      coilSensor: '10 kΩ',
      outdoorSensor: '10 kΩ',
      dischargeSensor: '50 kΩ',
      notes: 'Cảm biến trở kháng 10kΩ tiêu chuẩn ở 25°C.',
    },
    {
      brand: 'Casper / Funiki / Midea',
      roomSensor: '5 kΩ',
      coilSensor: '5 kΩ (hoặc 10 kΩ)',
      outdoorSensor: '5 kΩ',
      dischargeSensor: '50 kΩ',
      notes: 'Phần lớn sử dụng cặp sensor 5kΩ / 5kΩ hoặc 5kΩ / 10kΩ.',
    },
  ];

  const filteredList = sensorStandards.filter((item) =>
    item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Bảng Trị Số Sensor Cảm Biến
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Điện trở chuẩn (kΩ) ở nhiệt độ 25°C cho thợ điện lạnh
            </p>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hãng (Panasonic, Daikin, LG...)"
          className="w-full bg-white dark:bg-slate-800 rounded-xl px-3.5 py-2.5 pl-9 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-brand-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
      </div>

      {/* Sensor Cards List */}
      <div className="space-y-3">
        {filteredList.map((item) => (
          <div
            key={item.brand}
            className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {item.brand}
              </h3>
              <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
                Chuẩn ở 25°C
              </span>
            </div>

            {/* Grid of Values */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400">
                  Sensor phòng (Indoor):
                </span>
                <p className="font-bold text-brand-600 dark:text-brand-400 text-sm">
                  {item.roomSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400">
                  Sensor dàn lạnh (Coil):
                </span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {item.coilSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400">
                  Sensor ngoài trời (Outdoor):
                </span>
                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                  {item.outdoorSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400">
                  Sensor đầu đẩy (Discharge):
                </span>
                <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                  {item.dischargeSensor}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              💡 {item.notes}
            </p>
          </div>
        ))}
      </div>

      {/* Guide Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold">
          <Thermometer className="w-4 h-4 text-amber-600" />
          <span>Mẹo đo kiểm sensor thực tế ngoài công trường:</span>
        </div>
        <p className="text-[11px] text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
          Cảm biến nhiệt độ NTC có hệ số nhiệt điện trở âm: khi nhiệt độ tăng thì điện trở giảm, khi nhiệt độ giảm thì điện trở tăng. Nếu dùng tay ủ ấm đầu cảm biến mà giá trị kΩ không giảm hoặc nhảy số chập chờn thì sensor đã hỏng.
        </p>
      </div>
    </div>
  );
};
