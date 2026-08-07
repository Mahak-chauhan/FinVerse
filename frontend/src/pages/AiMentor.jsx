import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FaRobot,
  FaUser,
  FaPlus,
  FaPaperPlane,
  FaComments,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import {
  getConversations,
  createConversation,
  getConversation,
  sendMessage,
} from '../services/mentorService';

const AiMentor = () => {
  const { showError } = useToast();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const loadConversations = useCallback(async () => {
    try {
      const res = await getConversations();
      setConversations(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load conversations');
    }
  }, [showError]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleNewChat = async () => {
    try {
      const res = await createConversation();
      setActiveId(res.data.data._id);
      setMessages([]);
      loadConversations();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to create conversation');
    }
  };

  const handleSelectConv = async (id) => {
    setActiveId(id);
    try {
      const res = await getConversation(id);
      setMessages(res.data.data.messages || []);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load conversation');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !activeId || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const res = await sendMessage(activeId, userText);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.data.assistant },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not generate a response right now.',
        },
      ]);
      showError(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
      loadConversations();
    }
  };

  return (
    <div className="animate-fade">
      <div className="row g-4">
        <div className="col-lg-4 col-xl-3">
          <div className="glass-card p-3">
            <button
              className="btn-gradient btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              onClick={handleNewChat}
            >
              <FaPlus /> New Consultation
            </button>

            <div
              className="d-flex flex-column gap-1"
              style={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
              {conversations.length ? (
                conversations.map((c) => (
                  <button
                    key={c._id}
                    className={`btn text-start d-flex align-items-center gap-2 ${
                      activeId === c._id
                        ? 'sidebar-link active'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => handleSelectConv(c._id)}
                  >
                    <FaComments />
                    <span
                      className="small text-truncate"
                      style={{ maxWidth: '160px' }}
                    >
                      {c.title}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-muted small text-center p-3">
                  No conversations yet
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-xl-9">
          <div className="glass-card d-flex flex-column" style={{ height: '70vh' }}>
            {!activeId ? (
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-5">
                <FaRobot className="fs-1 opacity-25 mb-3" />
                <h4 className="fw-bold">FinVerse AI Mentor</h4>
                <p className="text-muted mb-4" style={{ maxWidth: '420px' }}>
                  Select a conversation or start a new one. Your AI mentor is
                  trained on advanced financial principles and understands your
                  data context.
                </p>
                <button className="btn-gradient btn" onClick={handleNewChat}>
                  <FaRobot className="me-1" /> Start Chat
                </button>
              </div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex-grow-1 p-4 d-flex flex-column gap-3"
                  style={{ overflowY: 'auto' }}
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`d-flex gap-3 ${
                        m.role === 'user'
                          ? 'justify-content-end flex-row-reverse'
                          : ''
                      }`}
                      style={{ maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}
                    >
                      <div
                        className={`stat-icon ${
                          m.role === 'user'
                            ? 'btn-gradient'
                            : 'balance-card'
                        }`}
                        style={{ width: '36px', height: '36px', fontSize: '15px' }}
                      >
                        {m.role === 'user' ? <FaUser /> : <FaRobot />}
                      </div>
                      <div
                        className={`p-3 rounded-3 ${
                          m.role === 'user'
                            ? 'btn-gradient'
                            : 'bg-white text-dark shadow-sm'
                        }`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="d-flex gap-3">
                      <div
                        className="stat-icon balance-card"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <FaRobot />
                      </div>
                      <div className="p-3 rounded-3 bg-white shadow-sm">
                        <span className="text-muted">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ask about your spending, investments, or general advice..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      disabled={loading}
                    />
                    <button
                      className="btn-gradient px-3"
                      onClick={handleSend}
                      disabled={!input.trim() || loading}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMentor;
