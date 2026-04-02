/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  User, 
  Bell, 
  BookOpen, 
  Clock, 
  ClipboardCheck, 
  GraduationCap, 
  LogOut, 
  ChevronRight,
  Search,
  Plus,
  Send,
  MoreVertical
} from 'lucide-react';

// --- Types ---
type Tab = 'home' | 'schedule' | 'tasks' | 'chat' | 'profile';

interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'pending' | 'completed';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

// --- Mock Data ---
const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Tugas Matematika - Kalkulus', subject: 'Matematika', deadline: 'Besok, 08:00', status: 'pending' },
  { id: '2', title: 'Laporan Praktikum Fisika', subject: 'Fisika', deadline: '3 Apr, 23:59', status: 'pending' },
  { id: '3', title: 'Analisis Puisi Modern', subject: 'B. Indonesia', deadline: '5 Apr, 12:00', status: 'completed' },
];

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Ujian Tengah Semester', content: 'Jadwal UTS akan dimulai minggu depan. Harap persiapkan diri.', date: '2 Jam yang lalu', author: 'Pak Budi' },
  { id: '2', title: 'Libur Nasional', content: 'Hari Jumat depan sekolah diliburkan dalam rangka hari raya.', date: 'Kemarin', author: 'Admin Sekolah' },
];

const MOCK_SCHEDULE = [
  { time: '07:30 - 09:00', subject: 'Matematika', room: 'Lab A' },
  { time: '09:15 - 10:45', subject: 'B. Inggris', room: 'Kelas 12-1' },
  { time: '11:00 - 12:30', subject: 'Fisika', room: 'Lab Fisika' },
];

// --- Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void, key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-indigo-600 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 rounded-3xl bg-white p-6 shadow-2xl"
      >
        <GraduationCap size={64} className="text-indigo-600" />
      </motion.div>
      <motion.h1 
        className="font-display text-4xl font-bold tracking-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        ClassMate
      </motion.h1>
      <motion.p
        className="mt-2 text-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Modern Learning Experience
      </motion.p>
      <motion.div 
        className="mt-12 h-1 w-48 overflow-hidden rounded-full bg-indigo-400/30"
        initial={{ width: 0 }}
        animate={{ width: 192 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <motion.div 
          className="h-full bg-white"
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Card3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="preserve-3d h-full w-full rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200/50">
        {children}
      </div>
    </motion.div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-indigo-100"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <GraduationCap size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Selamat Datang</h2>
          <p className="text-slate-500">Masuk ke akun ClassMate Anda</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email / NISN</label>
            <input 
              type="text" 
              placeholder="Masukkan NISN anda"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Kata Sandi</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-indigo-600" />
              Ingat saya
            </label>
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">Lupa sandi?</a>
          </div>
          <button 
            onClick={onLogin}
            className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            Masuk Sekarang
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Belum punya akun? <a href="#" className="font-bold text-indigo-600">Hubungi Admin</a>
        </div>
      </motion.div>
    </div>
  );
};

const HomeView = () => {
  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Halo, Salman! 👋</h1>
          <p className="text-slate-500">Kelas 12 IPA 1 • Semester Genap</p>
        </div>
        <button className="relative rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card3D className="h-32">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                <ClipboardCheck size={20} />
              </div>
              <span className="text-xs font-bold text-green-600">+2%</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Kehadiran</p>
              <p className="font-display text-xl font-bold">98.5%</p>
            </div>
          </div>
        </Card3D>
        <Card3D className="h-32">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                <GraduationCap size={20} />
              </div>
              <span className="text-xs font-bold text-amber-600">Top 5</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rata-rata Nilai</p>
              <p className="font-display text-xl font-bold">92.4</p>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Next Class */}
      <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-xl shadow-indigo-200">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-indigo-100">Pelajaran Selanjutnya</p>
              <p className="font-bold">Matematika - Kalkulus</p>
            </div>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">15 Menit lagi</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
              <img src="https://picsum.photos/seed/teacher/100" alt="Teacher" referrerPolicy="no-referrer" />
            </div>
            <p className="text-sm font-medium">Pak Budi Santoso</p>
          </div>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-600">Absensi</button>
        </div>
      </div>

      {/* Announcements */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">Pengumuman</h2>
          <button className="text-sm font-bold text-indigo-600">Lihat Semua</button>
        </div>
        <div className="space-y-3">
          {MOCK_ANNOUNCEMENTS.map(ann => (
            <div key={ann.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">{ann.title}</h3>
                  <span className="text-[10px] text-slate-400">{ann.date}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">{ann.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">Tugas Mendatang</h2>
          <button className="text-sm font-bold text-indigo-600">Lihat Semua</button>
        </div>
        <div className="space-y-3">
          {MOCK_TASKS.filter(t => t.status === 'pending').slice(0, 2).map(task => (
            <div key={task.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{task.title}</h3>
                  <p className="text-xs text-slate-500">{task.subject} • {task.deadline}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScheduleView = () => {
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const [activeDay, setActiveDay] = useState('Sen');

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-slate-900">Jadwal Pelajaran</h1>
        <div className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-bold text-indigo-600">Minggu 12</div>
      </div>

      {/* Day Selector */}
      <div className="flex justify-between rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-all ${
              activeDay === day ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {MOCK_SCHEDULE.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></div>
              {idx !== MOCK_SCHEDULE.length - 1 && <div className="w-0.5 grow bg-slate-200"></div>}
            </div>
            <div className="flex-1 pb-6">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">{item.time}</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{item.room}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">{item.subject}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200">
                    <img src={`https://picsum.photos/seed/${item.subject}/100`} alt="Teacher" className="rounded-full" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-xs text-slate-500">Dosen Pengampu</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TasksView = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-slate-900">Manajemen Tugas</h1>
        <button className="rounded-xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-200">
          <Plus size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
        {(['all', 'pending', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 rounded-xl py-2 text-sm font-bold capitalize transition-all ${
              filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            {f === 'all' ? 'Semua' : f === 'pending' ? 'Belum Selesai' : 'Selesai'}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {MOCK_TASKS.filter(t => filter === 'all' || t.status === filter).map((task, idx) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div className={`absolute top-0 left-0 h-full w-1.5 ${task.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <div className="flex items-start justify-between">
              <div>
                <span className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {task.subject}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{task.title}</h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckSquare size={14} />
                    <span>{task.status === 'completed' ? 'Selesai' : 'Belum Selesai'}</span>
                  </div>
                </div>
              </div>
              <button className="rounded-full p-1 text-slate-300 hover:bg-slate-50 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ChatView = () => {
  return (
    <div className="flex h-[calc(100vh-180px)] flex-col pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-slate-900">Diskusi Kelas</h1>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200">
              <img src={`https://picsum.photos/seed/user${i}/100`} alt="User" className="rounded-full" referrerPolicy="no-referrer" />
            </div>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[10px] font-bold text-white">
            +12
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200">
            <img src="https://picsum.photos/seed/user1/100" alt="User" className="rounded-full" referrerPolicy="no-referrer" />
          </div>
          <div className="max-w-[80%]">
            <p className="mb-1 text-xs font-bold text-slate-900">Andi Wijaya</p>
            <div className="rounded-2xl rounded-tl-none bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-700">Halo teman-teman, ada yang sudah selesai tugas Kalkulus nomor 5?</p>
            </div>
            <span className="mt-1 block text-[10px] text-slate-400">09:15</span>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600">
            <img src="https://picsum.photos/seed/me/100" alt="Me" className="rounded-full" referrerPolicy="no-referrer" />
          </div>
          <div className="max-w-[80%] text-right">
            <p className="mb-1 text-xs font-bold text-slate-900">Saya</p>
            <div className="rounded-2xl rounded-tr-none bg-indigo-600 p-4 text-white shadow-lg shadow-indigo-100">
              <p className="text-sm">Sudah Andi, kuncinya ada di turunan parsialnya.</p>
            </div>
            <span className="mt-1 block text-[10px] text-slate-400">09:17</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200">
            <img src="https://picsum.photos/seed/user2/100" alt="User" className="rounded-full" referrerPolicy="no-referrer" />
          </div>
          <div className="max-w-[80%]">
            <p className="mb-1 text-xs font-bold text-slate-900">Siti Aminah</p>
            <div className="rounded-2xl rounded-tl-none bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm">Boleh share caranya di sini? Masih bingung nih.</p>
            </div>
            <span className="mt-1 block text-[10px] text-slate-400">09:20</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-indigo-600">
          <Plus size={24} />
        </button>
        <input 
          type="text" 
          placeholder="Tulis pesan..."
          className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
        />
        <button className="rounded-xl bg-indigo-600 p-2 text-white transition-all hover:bg-indigo-700">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const ProfileView = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="space-y-8 pb-24">
      <h1 className="font-display text-2xl font-bold text-slate-900">Profil Saya</h1>

      {/* Profile Card */}
      <Card3D className="h-auto">
        <div className="flex flex-col items-center py-4">
          <div className="relative mb-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-indigo-50 bg-slate-200 shadow-xl">
              <img src="https://picsum.photos/seed/me/200" alt="Profile" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1.5 ring-4 ring-white"></div>
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">Salman Faris</h2>
          <p className="text-sm text-slate-500">NISN: 20210045678</p>
          
          <div className="mt-6 flex w-full gap-4 border-t border-slate-100 pt-6">
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">Peringkat</p>
              <p className="font-bold text-slate-900">#4</p>
            </div>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">Poin</p>
              <p className="font-bold text-slate-900">1,250</p>
            </div>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">Lencana</p>
              <p className="font-bold text-slate-900">12</p>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Menu Options */}
      <div className="space-y-3">
        <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Pengaturan Akun</h3>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <button className="flex w-full items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <User size={20} />
              </div>
              <span className="font-medium text-slate-700">Informasi Pribadi</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
          <div className="h-px bg-slate-100 mx-4"></div>
          <button className="flex w-full items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <Bell size={20} />
              </div>
              <span className="font-medium text-slate-700">Notifikasi</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
          <div className="h-px bg-slate-100 mx-4"></div>
          <button className="flex w-full items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <GraduationCap size={20} />
              </div>
              <span className="font-medium text-slate-700">Riwayat Nilai</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600 transition-all hover:bg-red-100"
        >
          <div className="rounded-lg bg-red-100 p-2">
            <LogOut size={20} />
          </div>
          <span className="font-bold">Keluar dari Aplikasi</span>
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'schedule': return <ScheduleView />;
      case 'tasks': return <TasksView />;
      case 'chat': return <ChatView />;
      case 'profile': return <ProfileView onLogout={() => setIsLoggedIn(false)} />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" onFinish={() => setLoading(false)} />}
        
        {!loading && !isLoggedIn && (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        )}

        {!loading && isLoggedIn && (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 pt-8"
          >
            {/* Main Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Navbar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center p-6 pointer-events-none">
              <div className="pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-3xl bg-white/80 p-2 shadow-2xl shadow-indigo-100 ring-1 ring-slate-200/50 backdrop-blur-xl">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${
                    activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  <Calendar size={20} />
                  <span className="text-[10px] font-bold">Beranda</span>
                </button>
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${
                    activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  <Clock size={20} />
                  <span className="text-[10px] font-bold">Jadwal</span>
                </button>
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${
                    activeTab === 'tasks' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  <CheckSquare size={20} />
                  <span className="text-[10px] font-bold">Tugas</span>
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${
                    activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  <MessageSquare size={20} />
                  <span className="text-[10px] font-bold">Diskusi</span>
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${
                    activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  <User size={20} />
                  <span className="text-[10px] font-bold">Profil</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
