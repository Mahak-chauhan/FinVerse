const Skeleton = ({ width = '100%', height = '20px', className = '', style = {} }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, ...style }}
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="row g-4">
      {[1, 2, 3, 4].map((n) => (
        <div className="col-md-6 col-xl-3" key={n}>
          <div className="glass-card p-4">
            <Skeleton height="50px" width="50px" className="mb-3" />
            <Skeleton height="24px" width="60%" className="mb-2" />
            <Skeleton height="32px" width="80%" />
          </div>
        </div>
      ))}
      <div className="col-12">
        <div className="glass-card p-4">
          <Skeleton height="300px" />
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="glass-card p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="d-flex align-items-center gap-3 py-3 border-bottom" key={i}>
          <Skeleton height="40px" width="40px" />
          <div className="flex-grow-1">
            <Skeleton height="16px" width="40%" className="mb-2" />
            <Skeleton height="12px" width="25%" />
          </div>
          <Skeleton height="20px" width="80px" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
