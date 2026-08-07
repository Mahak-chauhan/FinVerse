const { GoogleGenerativeAI } = require('@google/generative-ai');

const SYSTEM_PROMPT = `You are FinVerse's AI Financial Mentor — a knowledgeable, empathetic, and practical financial advisor.

You help users with:
- Budget planning and spending analysis
- Saving strategies and goal setting
- Investment basics (mutual funds, SIPs, stocks, ETFs)
- Credit score improvement tips
- Loan guidance and EMI calculations
- Insurance basics and coverage advice
- Tax-saving strategies (80C, 80D, etc.)
- Emergency fund planning

Tone: Concise, warm, professional. Use plain language. Give actionable advice.
Format: Use bullet points for lists, be direct. Keep responses focused and under 300 words.
Currency: Default to Indian Rupees (₹) unless stated otherwise.
Do NOT give generic disclaimers like "consult a financial advisor" on every response.`;

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  } catch {
    return null;
  }
};

const buildFallbackResponse = (userMessage) => {
  const text = userMessage.toLowerCase();

  if (text.includes('save') || text.includes('saving') || text.includes('emergency')) {
    return {
      text: `Here are some practical savings tips for you:

• Aim to save at least 20% of your monthly income — pay yourself first.
• Build an emergency fund covering 3–6 months of essential expenses.
• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings & investments.
• Automate a fixed transfer to a separate savings account on salary day.
• Cut recurring subscriptions you no longer use and route the savings to your fund.

Start small and stay consistent — even ₹1,000 a month adds up over time.`,
    };
  }

  if (text.includes('invest') || text.includes('mutual') || text.includes('sip')) {
    return {
      text: `Here's a beginner-friendly investing roadmap:

• Start with a SIP in a diversified index fund or large-cap mutual fund.
• A typical goal is to invest 15% of your income; increase it as you earn more.
• Build a 3–6 month emergency fund before aggressive investing.
• For long-term goals (5+ years), equity funds generally outperform inflation.
• Consider tax-saving options like ELSS under Section 80C.

Always align your investments with your risk appetite and time horizon.`,
    };
  }

  if (text.includes('budget') || text.includes('spend') || text.includes('expense')) {
    return {
      text: `A simple budgeting approach:

• Track every expense for 30 days to understand where your money goes.
• Group spending into needs, wants, and savings.
• Set a monthly spending cap for discretionary categories.
• Review your budget weekly and adjust as needed.
• Use the 50/30/20 framework as a starting baseline.

Consistent tracking is the single biggest driver of financial control.`,
    };
  }

  if (text.includes('credit') || text.includes('loan') || text.includes('emi')) {
    return {
      text: `Guidance on credit and loans:

• Keep credit utilization below 30% of your available limit.
• Pay all EMIs and credit card bills on time — payment history matters most.
• Keep your debt-to-income ratio under 40%.
• A higher income and lower existing EMIs improve loan approval odds.
• Compare interest rates across lenders before applying.

A clean credit history opens better offers and lower interest rates.`,
    };
  }

  if (text.includes('tax') || text.includes('80c') || text.includes('80d')) {
    return {
      text: `Smart tax-saving strategies:

• Use Section 80C deductions (up to ₹1.5L) via ELSS, PPF, or life insurance.
• Claim health insurance premiums under Section 80D.
• For salaried individuals, opt for the regime that suits you best.
• Keep records of rent (HRA) and home loan interest for deductions.
• Consider NPS for additional deductions under Section 80CCD.

Plan your tax-saving investments before the financial year ends.`,
    };
  }

  return {
    text: `I'm your FinVerse financial mentor. I can help you with budgeting, saving, investing (mutual funds, SIPs, stocks), credit scores, loans, insurance, and tax planning.

Try asking me something like:
• "How should I budget my monthly salary?"
• "What is a good emergency fund amount?"
• "Should I start a SIP in mutual funds?"
• "How can I improve my credit score?"

Tell me a bit about your goals and I'll give you tailored, actionable advice.`,
  };
};

const generateMentorReply = async (history) => {
  const model = getModel();

  if (!model) {
    const lastUserMessage = [...history].reverse().find((m) => m.role === 'user');
    return buildFallbackResponse(lastUserMessage.content || '');
  }

  try {
    const contents = history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const result = await model.generateContent({
      contents,
      systemInstruction: SYSTEM_PROMPT,
    });

    const text = result.response.text();
    return { text };
  } catch (err) {
    const lastUserMessage = [...history].reverse().find((m) => m.role === 'user');
    return buildFallbackResponse(lastUserMessage.content || '');
  }
};

module.exports = {
  generateMentorReply,
  buildFallbackResponse,
};
