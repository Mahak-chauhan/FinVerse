import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const BarChart = ({ data = [], height = 300 }) => {
  if (!data.length) {
    return (
      <div className="d-flex align-items-center justify-content-center text-muted" style={{ height }}>
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(value, name) => [formatCurrency(value), name]}
          contentStyle={{
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
