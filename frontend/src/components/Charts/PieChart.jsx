import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const PieChart = ({ data = [], height = 300 }) => {
  if (!data.length) {
    return (
      <div className="d-flex align-items-center justify-content-center text-muted" style={{ height }}>
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [formatCurrency(value), 'Amount']}
          contentStyle={{
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}
        />
        <Legend
          verticalAlign="bottom"
          layout="horizontal"
          iconType="circle"
          iconSize={8}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
