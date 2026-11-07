import React, { useState } from 'react';
import { Cpu, Search, Thermometer, Sparkles } from 'lucide-react';

interface SensorStandard {
  brand: string;
  roomSensor: string;
  coilSensor: string;
  outdoorSensor: string;
  dischargeSensor: string;
  notes: string;
}

export const LiquidSensorScreen: React.FC = () => {
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
      brand: 'Midea',
      roomSensor: '5 kΩ / 10 kΩ',
      coilSensor: '5 kΩ / 10 kΩ',
      outdoorSensor: '10 kΩ',
      dischargeSensor: '50 kΩ / 200 kΩ',
      notes: 'Dòng dân dụng đa phần dùng 5kΩ / 5kΩ. Dòng thương mại dùng 10kΩ / 10kΩ.',
    },
    {
      brand: 'Mitsubishi Heavy',
      roomSensor: '5 kΩ / 10 kΩ',
      coilSensor: '5 kΩ (NTC)',
      outdoorSensor: '10 kΩ',
      dischargeSensor: '200 kΩ (hoặc 50kΩ)',
      notes: 'Dòng VRF KXZ kiểm tra chuẩn điện trở theo nhiệt độ môi trường.',
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
      brand: 'Gree',
      roomSensor: '15 kΩ (ở 25°C)',
      coilSensor: '20 kΩ (ở 25°C)',
      outdoorSensor: '15 kΩ (ở 25°C)',
      dischargeSensor: '50 kΩ (ở 25°C)',
      notes: 'Dòng cục bộ & VRF GMV5 đo ở nhiệt độ phòng chuẩn 25°C: Sensor phòng 15k, Sensor đồng dàn 20k, Sensor đẩy 50k.',
    },
    {
      brand: 'Casper',
      roomSensor: '5 kΩ / 10 kΩ',
      coilSensor: '5 kΩ (hoặc 10 kΩ)',
      outdoorSensor: '5 kΩ / 10 kΩ',
      dischargeSensor: '50 kΩ (Sensor đầu đẩy)',
      notes: 'Phần lớn dòng dân dụng Casper sử dụng sensor 5kΩ / 5kΩ ở 25°C. Dòng thương mại dùng 10kΩ.',
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
      brand: 'Casper / Funiki',
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
    <div className="p-4 pb-28 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md border border-white/40">
          <Cpu className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5 drop-shadow-sm">
            BẢNG TRỊ SỐ SENSOR
            <Sparkles className="w-3 h-3 text-amber-500" />
          </h2>
          <p className="text-[11px] text-amber-700 dark:text-amber-200/70 font-bold">
            Điện trở chuẩn (kΩ) ở nhiệt độ 25°C cho thợ điện lạnh
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hãng (Gree, Pana, Daikin, Midea, Mitsu...)"
          className="w-full liquid-glass rounded-full sm:rounded-2xl px-4 py-3 pl-10 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
        />
        <Search className="w-4 h-4 text-sky-600 dark:text-cyan-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Sensor Cards List */}
      <div className="space-y-3">
        {filteredList.map((item) => (
          <div
            key={item.brand}
            className="liquid-card rounded-3xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2">
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                {item.brand}
              </h3>
              <span className="text-[10px] font-black text-sky-700 dark:text-cyan-300 bg-sky-500/15 dark:bg-cyan-500/15 border border-sky-400/30 dark:border-cyan-400/30 px-2.5 py-0.5 rounded-full shadow-sm">
                Chuẩn 25°C
              </span>
            </div>

            {/* Grid of Values */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Sensor phòng (Indoor):
                </span>
                <p className="font-black text-sky-700 dark:text-cyan-300 text-sm">
                  {item.roomSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Sensor dàn lạnh (Coil):
                </span>
                <p className="font-black text-emerald-700 dark:text-emerald-300 text-sm">
                  {item.coilSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Sensor ngoài trời (Outdoor):
                </span>
                <p className="font-black text-slate-800 dark:text-slate-200 text-sm">
                  {item.outdoorSensor}
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Sensor đầu đẩy (Discharge):
                </span>
                <p className="font-black text-amber-600 dark:text-amber-300 text-sm">
                  {item.dischargeSensor}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300/80 font-medium italic">
              💡 {item.notes}
            </p>
          </div>
        ))}
      </div>

      {/* Guide Note */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 to-yellow-500/10 border border-amber-400/40 text-xs text-amber-900 dark:text-amber-200 space-y-1 shadow-lg backdrop-blur-xl">
        <div className="flex items-center space-x-1.5 font-black text-amber-800 dark:text-amber-300">
          <Thermometer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Mẹo đo kiểm sensor thực tế ngoài công trường:</span>
        </div>
        <p className="text-[11px] text-amber-800/90 dark:text-amber-100/80 leading-relaxed font-medium">
          Cảm biến nhiệt độ NTC có hệ số nhiệt điện trở âm: khi nhiệt độ tăng thì điện trở giảm, khi nhiệt độ giảm thì điện trở tăng. Nếu dùng tay ủ ấm đầu cảm biến mà giá trị kΩ không giảm hoặc nhảy số chập chờn thì sensor đã hỏng.
        </p>
      </div>
    </div>
  );
};
