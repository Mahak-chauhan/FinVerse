import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const LineChart = ({ data = [], height = 300 }) => {
  if (!data.length) {
    return (
      <div className="d-flex align-items-center justify-content-center text-muted" style={{ height }}>
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="balance"
          name="Balance"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
