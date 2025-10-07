import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import { TrendingUp, Droplets, Recycle, TreePine } from 'lucide-react';

const monthlyPointsData = [
  { name: 'Jan', points: 400 }, { name: 'Feb', points: 300 }, { name: 'Mar', points: 600 },
  { name: 'Apr', points: 800 }, { name: 'May', points: 500 }, { name: 'Jun', points: 700 },
];

const pointsBreakdownData = [
  { name: 'Challenges', value: 400 },
  { name: 'Mini-Games', value: 300 },
  { name: 'Daily Logins', value: 100 },
];

const impactData = [
  { name: 'Jan', co2: 1.2, water: 200 }, { name: 'Feb', co2: 1.5, water: 250 }, { name: 'Mar', co2: 1.8, water: 300 },
  { name: 'Apr', co2: 2.5, water: 400 }, { name: 'May', co2: 2.2, water: 350 }, { name: 'Jun', co2: 2.8, water: 450 },
];

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA'];

const Analytics: React.FC = () => {
  const { user } = useUser();
  const { analytics } = useApp();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text-primary">Your Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Stat cards remain here */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-4">Monthly Points Earned</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPointsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-4">Points Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pointsBreakdownData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {pointsBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-text-primary mb-4">Environmental Impact Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="co2" stroke="#2563EB" name="CO₂ Reduced (kg)" />
            <Line type="monotone" dataKey="water" stroke="#3B82F6" name="Water Saved (L)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
