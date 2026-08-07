import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaChevronLeft,
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import { getCourseById } from '../services/courseService';
import { DashboardSkeleton } from '../components/Loader/Skeleton';

const CourseDetail = () => {
  const { id } = useParams();
  const { showError } = useToast();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completed, setCompleted] = useState([]);

  const loadCourse = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCourseById(id);
      setCourse(res.data.data);
      if (res.data.data.lessons?.length) {
        setActiveLessonId(res.data.data.lessons[0]._id);
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [id, showError]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-5">
        <h4>Course not found.</h4>
        <Link to="/academy" className="btn btn-outline-gradient mt-3">
          Back to Academy
        </Link>
      </div>
    );
  }

  const lessons = course.lessons || [];
  const activeIndex = lessons.findIndex((l) => l._id === activeLessonId);
  const activeLesson = lessons[activeIndex] || lessons[0];
  const isLast = activeIndex === lessons.length - 1;
  const completedCount = completed.length;
  const progress =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const handleComplete = () => {
    if (!activeLesson) return;
    if (!completed.includes(activeLesson._id)) {
      setCompleted((prev) => [...prev, activeLesson._id]);
    }
    if (!isLast) {
      setActiveLessonId(lessons[activeIndex + 1]._id);
    } else {
      window.confirm('Course completed! Great job.');
    }
  };

  return (
    <div className="animate-fade">
      <Link
        to="/academy"
        className="text-decoration-none small fw-semibold brand-text mb-3 d-inline-flex align-items-center gap-1"
      >
        <FaChevronLeft /> Back to Academy
      </Link>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 mb-4">
            <span
              className="badge rounded-pill px-3 py-1 fw-semibold mb-2"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
            >
              {course.category}
            </span>
            <h4 className="fw-bold mb-3">{course.title}</h4>
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="fw-bold small">{progress}%</span>
            </div>

            <div className="d-flex flex-column gap-2">
              {lessons.map((lesson, idx) => {
                const isActive = lesson._id === activeLessonId;
                const isDone = completed.includes(lesson._id);
                return (
                  <button
                    key={lesson._id}
                    className={`btn text-start d-flex align-items-center gap-2 ${
                      isActive
                        ? 'btn-gradient'
                        : isDone
                        ? 'btn-outline-success'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setActiveLessonId(lesson._id)}
                  >
                    {isDone || progress === 100 ? (
                      <FaCheckCircle />
                    ) : (
                      <span className="small fw-bold">{idx + 1}</span>
                    )}
                    <span className="small">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4">
            <p className="text-uppercase small fw-bold text-muted mb-2">
              Lesson {activeIndex + 1} of {lessons.length}
            </p>
            <h3 className="fw-bold mb-4">{activeLesson?.title}</h3>

            <div
              className="text-muted"
              style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
            >
              {activeLesson?.content}
            </div>

            {activeLesson?.quiz?.length > 0 && (
              <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(99,102,241,0.05)' }}>
                <h6 className="fw-bold mb-2">
                  <FaGraduationCap className="brand-text me-1" /> Quick Quiz
                </h6>
                {activeLesson.quiz.map((q, qi) => (
                  <div key={qi} className="mb-3">
                    <p className="fw-semibold small mb-1">{q.question}</p>
                    <div className="d-flex flex-column gap-1">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className="small p-2 rounded-2"
                          style={{ background: 'rgba(255,255,255,0.6)' }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
              <button
                className="btn btn-outline-secondary"
                disabled={activeIndex === 0}
                onClick={() => setActiveLessonId(lessons[activeIndex - 1]?._id)}
              >
                Previous
              </button>
              <button className="btn-gradient btn" onClick={handleComplete}>
                {isLast ? (
                  <>
                    Complete Course <FaCheckCircle className="ms-2" />
                  </>
                ) : (
                  <>
                    Complete &amp; Continue <FaArrowRight className="ms-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
