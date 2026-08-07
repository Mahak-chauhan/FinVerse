import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBookOpen,
  FaClock,
  FaChevronRight,
  FaGraduationCap,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import { getCourses } from '../services/courseService';
import { DashboardSkeleton } from '../components/Loader/Skeleton';
import EmptyState from '../components/EmptyState/EmptyState';

const difficultyColors = {
  Beginner: ['#3b82f6', 'rgba(59,130,246,0.12)'],
  Intermediate: ['#ca8a04', 'rgba(202,138,4,0.12)'],
  Advanced: ['#9333ea', 'rgba(147,51,234,0.12)'],
};

const Academy = () => {
  const { showError } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">FinVerse Academy</h2>
        <p className="page-subtitle mb-0">
          Master the mechanics of wealth creation. Hand-crafted modules from
          budgeting basics to advanced tax strategies.
        </p>
      </div>

      {courses.length ? (
        <div className="row g-4">
          {courses.map((course) => {
            const [dColor, dBg] =
              difficultyColors[course.difficulty] || ['#6366f1', 'rgba(99,102,241,0.12)'];
            return (
              <div className="col-md-6 col-xl-4" key={course.id}>
                <Link
                  to={`/academy/${course.id}`}
                  className="text-decoration-none"
                >
                  <div className="glass-card p-4 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span
                        className="badge rounded-pill px-3 py-1 fw-semibold"
                        style={{
                          background: 'rgba(99,102,241,0.1)',
                          color: '#6366f1',
                        }}
                      >
                        {course.category}
                      </span>
                      <span
                        className="badge rounded-pill px-3 py-1 fw-semibold"
                        style={{ background: dBg, color: dColor }}
                      >
                        {course.difficulty}
                      </span>
                    </div>

                    <h5 className="fw-bold mb-2">{course.title}</h5>
                    <p
                      className="text-muted small mb-4"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>

                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                      <div className="d-flex gap-3 text-muted small">
                        <span className="d-flex align-items-center gap-1">
                          <FaClock /> {course.readingTimeMinutes}m
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <FaBookOpen /> {course.lessonsCount}{' '}
                          {course.lessonsCount === 1 ? 'lesson' : 'lessons'}
                        </span>
                      </div>
                      <FaChevronRight className="text-muted" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FaGraduationCap}
          title="No courses available"
          subtitle="Courses will appear here once they are published."
        />
      )}
    </div>
  );
};

export default Academy;
