const Course = require('../models/Course');

const seedCourses = [
  {
    title: 'Budgeting Basics',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    readingTimeMinutes: 8,
    description:
      'Learn how to create a practical monthly budget using the 50/30/20 rule and track your spending like a pro.',
    lessons: [
      {
        title: 'Why Budgeting Matters',
        orderIndex: 1,
        content:
          'A budget is a plan for your money. It ensures every rupee has a purpose, prevents overspending, and helps you reach your financial goals faster. Without a budget, money tends to disappear without a trace.\n\nStart by logging your income and all fixed expenses like rent, EMIs, and groceries. Then decide how much you want to save each month before you spend on wants.',
        quiz: [
          {
            question: 'What is the primary purpose of a budget?',
            options: [
              'To restrict all spending',
              'To plan and direct your money toward goals',
              'To increase credit card limits',
              'To avoid paying taxes',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'The 50/30/20 Rule',
        orderIndex: 2,
        content:
          'The 50/30/20 rule is a simple budgeting framework:\n\n• 50% of income goes to needs (rent, food, utilities)\n• 30% goes to wants (entertainment, dining, shopping)\n• 20% goes to savings and investments\n\nThis framework is flexible. If you live in a high-cost city, adjust the percentages to fit your reality, but always keep saving at least 20%.',
        quiz: [
          {
            question: 'Under the 50/30/20 rule, what share of income goes to savings?',
            options: ['10%', '20%', '30%', '50%'],
            answer: 1,
          },
        ],
      },
      {
        title: 'Tracking and Adjusting',
        orderIndex: 3,
        content:
          'A budget is not set-and-forget. Review it weekly and at the end of each month. Categorize your spending, find leaks, and adjust next month\u2019s plan.\n\nUse a finance tracker app to automate this. When you see trends, you can cut unnecessary subscriptions and redirect that money to savings or investments.',
        quiz: [
          {
            question: 'How often should you review your budget?',
            options: [
              'Once a year',
              'Never',
              'Weekly and monthly',
              'Only when in debt',
            ],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Saving & Emergency Fund',
    category: 'Saving',
    difficulty: 'Beginner',
    readingTimeMinutes: 10,
    description:
      'Build a safety net with a 3-6 month emergency fund and learn proven strategies to save consistently.',
    lessons: [
      {
        title: 'The Emergency Fund',
        orderIndex: 1,
        content:
          'An emergency fund is money set aside for unexpected expenses like medical bills, job loss, or urgent home repairs. It prevents you from going into debt when life throws surprises.\n\nThe recommended target is 3-6 months of essential expenses. Keep this money in a liquid, low-risk account like a savings account or liquid fund.',
        quiz: [
          {
            question: 'How many months of expenses should an emergency fund ideally cover?',
            options: ['1 month', '3-6 months', '12-24 months', 'None'],
            answer: 1,
          },
        ],
      },
      {
        title: 'Pay Yourself First',
        orderIndex: 2,
        content:
          'The best way to save is to automate it. On salary day, immediately transfer at least 20% to a separate savings account before you can spend it.\n\nThis "pay yourself first" approach makes saving a priority rather than an afterthought. Even small amounts of ₹1,000-5,000 monthly compound into significant wealth over time.',
        quiz: [
          {
            question: 'What does "pay yourself first" mean?',
            options: [
              'Buy luxury items first',
              'Save before spending',
              'Pay bills first',
              'Invest in stocks first',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Cutting Wasteful Spending',
        orderIndex: 3,
        content:
          'Audit your subscriptions and recurring payments. Streaming services, gym memberships, and app subscriptions you rarely use quietly drain your wallet.\n\nCancel unused subscriptions and redirect that money to your emergency fund. Small consistent savings add up faster than you think.',
        quiz: [
          {
            question: 'Where should you look first when trying to save more?',
            options: [
              'Unused subscriptions',
              'Essential groceries',
              'Rent payments',
              'Taxes',
            ],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    title: 'UPI & Digital Payments',
    category: 'Digital',
    difficulty: 'Beginner',
    readingTimeMinutes: 7,
    description:
      'Master UPI, digital wallets, and safe online transactions to manage money securely in the digital age.',
    lessons: [
      {
        title: 'Understanding UPI',
        orderIndex: 1,
        content:
          'UPI (Unified Payments Interface) lets you transfer money instantly between bank accounts using just a mobile number or UPI ID. It is free, works 24/7, and is widely accepted across India.\n\nPopular apps include GPay, PhonePe, and Paytm. Always verify the recipient\u2019s UPI ID before confirming any payment.',
        quiz: [
          {
            question: 'What does UPI stand for?',
            options: [
              'Universal Payment Interface',
              'Unified Payments Interface',
              'United Payment Index',
              'Unique Payment Identifier',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Staying Safe Online',
        orderIndex: 2,
        content:
          'Protect yourself from digital fraud:\n\n• Never share your UPI PIN, OTP, or card details with anyone\n• Only make payments on secure, trusted platforms\n• Beware of phishing links and fake customer-support calls\n• Review your transaction history regularly\n\nIf you notice suspicious activity, immediately report it to your bank and the UPI app.',
        quiz: [
          {
            question: 'Should you ever share your UPI PIN with a caller?',
            options: [
              'Yes, if they are from your bank',
              'Only over the phone',
              'Never',
              'Sometimes',
            ],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Mutual Funds',
    category: 'Investing',
    difficulty: 'Intermediate',
    readingTimeMinutes: 12,
    description:
      'Understand how mutual funds work, the different types, and how to choose the right fund for your goals.',
    lessons: [
      {
        title: 'What is a Mutual Fund?',
        orderIndex: 1,
        content:
          'A mutual fund pools money from many investors and invests it in a diversified portfolio of stocks, bonds, and other assets. A professional fund manager handles the investment decisions.\n\nThis gives small investors access to a diversified portfolio they could not build individually, while spreading risk across many assets.',
        quiz: [
          {
            question: 'Who manages a mutual fund?',
            options: [
              'The investors',
              'A professional fund manager',
              'The government',
              'A bank teller',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Types of Mutual Funds',
        orderIndex: 2,
        content:
          'Common types include:\n\n• Equity funds: invest in stocks, higher risk, higher returns\n• Debt funds: invest in bonds, lower risk, stable returns\n• Hybrid funds: mix of both\n• Index funds: track a market index like Nifty 50\n\nMatch the fund type to your risk appetite and investment horizon.',
        quiz: [
          {
            question: 'Which fund type has the highest risk?',
            options: ['Debt funds', 'Equity funds', 'Index funds', 'Money market'],
            answer: 1,
          },
        ],
      },
      {
        title: 'Choosing a Fund',
        orderIndex: 3,
        content:
          'When choosing a mutual fund, look at:\n\n• Expense ratio: lower is better\n• Past performance across market cycles\n• Fund manager track record\n• AUM (assets under management)\n\nAvoid chasing past returns alone. Consistency and low costs matter most for long-term wealth building.',
        quiz: [
          {
            question: 'Why is a lower expense ratio preferable?',
            options: [
              'It guarantees higher returns',
              'It reduces your costs over time',
              'It eliminates risk',
              'It is always safer',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'SIP - Systematic Investment Plan',
    category: 'Investing',
    difficulty: 'Intermediate',
    readingTimeMinutes: 9,
    description:
      'Learn how SIPs let you invest small amounts regularly and harness the power of compounding and rupee-cost averaging.',
    lessons: [
      {
        title: 'What is a SIP?',
        orderIndex: 1,
        content:
          'A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals — monthly, quarterly, or yearly.\n\nThis is ideal for salaried individuals as it builds a disciplined investing habit. You can start with as little as ₹500 per month.',
        quiz: [
          {
            question: 'What is the minimum monthly SIP amount mentioned?',
            options: ['₹100', '₹500', '₹5,000', '₹50,000'],
            answer: 1,
          },
        ],
      },
      {
        title: 'Rupee Cost Averaging',
        orderIndex: 2,
        content:
          'Rupee cost averaging means you buy more units when prices are low and fewer when they are high. Over time, this lowers your average purchase cost.\n\nBecause you invest the same amount regularly, market volatility works in your favour rather than against you.',
        quiz: [
          {
            question: 'How does rupee cost averaging help investors?',
            options: [
              'It guarantees profits',
              'It lowers the average cost per unit',
              'It eliminates all risk',
              'It avoids taxes',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Power of Compounding',
        orderIndex: 3,
        content:
          'Compounding means your returns generate their own returns. The earlier you start, the more powerful it becomes.\n\nExample: Investing ₹10,000 monthly at 12% annual return for 20 years can grow to over ₹1 crore. Starting just 5 years later significantly reduces the final corpus.',
        quiz: [
          {
            question: 'Why is starting early important in investing?',
            options: [
              'To avoid taxes',
              'To harness the power of compounding',
              'To buy more stocks',
              'To reduce risk to zero',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Stock Market Basics',
    category: 'Investing',
    difficulty: 'Intermediate',
    readingTimeMinutes: 11,
    description:
      'Understand stocks, indices, how the market works, and the principles of long-term equity investing.',
    lessons: [
      {
        title: 'How the Stock Market Works',
        orderIndex: 1,
        content:
          'The stock market is where shares of publicly traded companies are bought and sold. When you buy a share, you own a tiny piece of that company.\n\nIn India, the two main exchanges are NSE and BSE. Prices move based on supply and demand, influenced by company performance and broader economic factors.',
        quiz: [
          {
            question: 'What are the two main stock exchanges in India?',
            options: [
              'NSE and BSE',
              'NASDAQ and NYSE',
              'SEBI and RBI',
              'Nifty and Sensex',
            ],
            answer: 0,
          },
        ],
      },
      {
        title: 'Stocks vs Indices',
        orderIndex: 2,
        content:
          'An index is a basket of stocks that represents a segment of the market. The Nifty 50 tracks the 50 largest companies; the Sensex tracks 30 blue-chip companies.\n\nInvesting in an index fund gives you broad market exposure with low cost and reduced company-specific risk.',
        quiz: [
          {
            question: 'What does the Nifty 50 track?',
            options: [
              'The 50 largest companies in India',
              'All listed stocks',
              'Only IT companies',
              'Government bonds',
            ],
            answer: 0,
          },
        ],
      },
      {
        title: 'Long-Term Investing Principles',
        orderIndex: 3,
        content:
          'Successful investors focus on the long term. They stay invested through market ups and downs, avoid panic selling, and let compounding work.\n\nKey principles: diversify, invest regularly, keep costs low, and avoid trying to time the market. Discipline beats prediction.',
        quiz: [
          {
            question: 'What is a key principle of long-term investing?',
            options: [
              'Timing the market daily',
              'Panic selling on dips',
              'Staying invested and diversifying',
              'Putting all money in one stock',
            ],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Income Tax Basics (India)',
    category: 'Tax',
    difficulty: 'Intermediate',
    readingTimeMinutes: 13,
    description:
      'Learn how Indian income tax works, deductions under 80C/80D, and how to file your returns correctly.',
    lessons: [
      {
        title: 'Understanding Income Tax',
        orderIndex: 1,
        content:
          'Income tax is a portion of your income you pay to the government. It is calculated on your total income after deductions, using a slab system.\n\nIn India, you can choose between the Old Regime and New Regime. The new regime has lower rates but fewer deductions; the old regime allows many deductions like 80C.',
        quiz: [
          {
            question: 'What is income tax based on?',
            options: [
              'Your age only',
              'Your income after deductions',
              'Your savings account balance',
              'Your expenses',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Section 80C Deductions',
        orderIndex: 2,
        content:
          'Section 80C allows deductions up to ₹1.5 lakh per year from your taxable income. Eligible investments include:\n\n• ELSS mutual funds\n• Public Provident Fund (PPF)\n• Employee Provident Fund (EPF)\n• Life insurance premiums\n• Tax-saving fixed deposits\n\nThese deductions reduce your taxable income, lowering your tax liability.',
        quiz: [
          {
            question: 'What is the maximum deduction allowed under Section 80C?',
            options: ['₹50,000', '₹1 lakh', '₹1.5 lakh', '₹2 lakh'],
            answer: 2,
          },
        ],
      },
      {
        title: 'Filing Your Returns',
        orderIndex: 3,
        content:
          'Filing your income tax return (ITR) is mandatory if your income exceeds the basic exemption limit. It is done online through the Income Tax Department portal.\n\nTwo common forms: ITR-1 for salaried individuals with simple income, and ITR-3 for those with business income. Keep Form 16, investment proofs, and bank statements ready.',
        quiz: [
          {
            question: 'Which ITR form is for salaried individuals with simple income?',
            options: ['ITR-1', 'ITR-3', 'ITR-4', 'ITR-5'],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    title: 'Insurance Fundamentals',
    category: 'Protection',
    difficulty: 'Intermediate',
    readingTimeMinutes: 10,
    description:
      'Understand term life insurance, health insurance, and how to protect yourself and your family financially.',
    lessons: [
      {
        title: 'Why Insurance Matters',
        orderIndex: 1,
        content:
          'Insurance protects you from financial loss due to unexpected events. It transfers risk from you to the insurer in exchange for a premium.\n\nThe two most important types are term life insurance (protects your family if you pass away) and health insurance (covers medical expenses).',
        quiz: [
          {
            question: 'What is the main purpose of insurance?',
            options: [
              'To make profit',
              'To transfer financial risk',
              'To avoid taxes',
              'To invest in stocks',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Term Life Insurance',
        orderIndex: 2,
        content:
          'Term insurance is the purest and most affordable form of life cover. You pay a premium, and if you pass away during the policy term, your family receives the sum assured.\n\nA common rule is to have life cover of 10-15 times your annual income. Buy term insurance early when premiums are lower.',
        quiz: [
          {
            question: 'How much life cover is commonly recommended?',
            options: [
              '1-2 times annual income',
              '10-15 times annual income',
              'Equal to savings',
              'No cover needed',
            ],
            answer: 1,
          },
        ],
      },
      {
        title: 'Health Insurance',
        orderIndex: 3,
        content:
          'Health insurance covers hospitalisation and medical treatment costs. It is essential because a single medical emergency can wipe out years of savings.\n\nConsider a family floater plan that covers your whole family under one sum insured. Look for plans with good network hospitals, cashless treatment, and no-claim bonuses.',
        quiz: [
          {
            question: 'What does a family floater health plan cover?',
            options: [
              'Only the primary earner',
              'The entire family under one sum insured',
              'Only children',
              'Only hospital stays abroad',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Credit Score Mastery',
    category: 'Credit',
    difficulty: 'Beginner',
    readingTimeMinutes: 9,
    description:
      'Learn what a credit score is, how it is calculated, and how to build and maintain a strong score.',
    lessons: [
      {
        title: 'What is a Credit Score?',
        orderIndex: 1,
        content:
          'A credit score is a 3-digit number (300-900 in India) that reflects your creditworthiness. Lenders use it to decide whether to approve loans and at what interest rate.\n\nCIBIL, Experian, and Equifax are the main credit bureaus. A higher score means you are seen as a lower-risk borrower.',
        quiz: [
          {
            question: 'What is the credit score range in India?',
            options: ['0-100', '300-900', '500-1000', '1-999'],
            answer: 1,
          },
        ],
      },
      {
        title: 'How Your Score is Calculated',
        orderIndex: 2,
        content:
          'Your credit score is based on several factors:\n\n• Payment history (35%): paying on time is crucial\n• Credit utilization (30%): keep below 30% of your limit\n• Credit history length (15%)\n• Credit mix (10%)\n• New credit inquiries (10%)\n\nNever miss EMIs or credit card payments — it is the fastest way to hurt your score.',
        quiz: [
          {
            question: 'What is the largest factor in your credit score?',
            options: [
              'Credit mix',
              'New inquiries',
              'Payment history',
              'Number of credit cards',
            ],
            answer: 2,
          },
        ],
      },
      {
        title: 'Building a Strong Score',
        orderIndex: 3,
        content:
          'To build a strong credit score:\n\n• Pay all bills and EMIs on time\n• Keep credit utilization under 30%\n• Avoid applying for too many loans at once\n• Maintain a good mix of secured and unsecured credit\n• Check your credit report regularly for errors',
        quiz: [
          {
            question: 'What utilization level is recommended?',
            options: ['Below 30%', 'Above 90%', 'Exactly 50%', '100%'],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    title: 'Loan Management',
    category: 'Credit',
    difficulty: 'Intermediate',
    readingTimeMinutes: 10,
    description:
      'Understand different loan types, EMI calculations, and strategies to manage and repay debt efficiently.',
    lessons: [
      {
        title: 'Types of Loans',
        orderIndex: 1,
        content:
          'Common loans include home loans, car loans, personal loans, and education loans. Secured loans (backed by collateral) have lower interest rates than unsecured loans.\n\nHome loans typically have the lowest rates, while personal loans and credit card debt carry the highest interest rates.',
        quiz: [
          {
            question: 'Which loan typically has the lowest interest rate?',
            options: [
              'Personal loan',
              'Credit card debt',
              'Home loan',
              'Payday loan',
            ],
            answer: 2,
          },
        ],
      },
      {
        title: 'Understanding EMI',
        orderIndex: 2,
        content:
          'EMI (Equated Monthly Installment) is the fixed amount you pay monthly to repay a loan. It includes both principal and interest.\n\nA lower loan amount, lower interest rate, and longer tenure reduce your EMI. However, longer tenures mean you pay more total interest over time.',
        quiz: [
          {
            question: 'What does EMI include?',
            options: [
              'Only principal',
              'Only interest',
              'Both principal and interest',
              'Only processing fees',
            ],
            answer: 2,
          },
        ],
      },
      {
        title: 'Managing Debt Wisely',
        orderIndex: 3,
        content:
          'Keep your total debt-to-income ratio below 40%. Prioritise paying off high-interest debt like credit cards first.\n\nConsider debt consolidation, prepay loans when you have surplus funds, and avoid taking new loans while repaying existing ones. A healthy borrowing habit protects your credit score.',
        quiz: [
          {
            question: 'What debt-to-income ratio is recommended?',
            options: ['Below 40%', 'Above 80%', 'Exactly 60%', '100%'],
            answer: 0,
          },
        ],
      },
    ],
  },
];

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: 1 });

    const data = courses.map((c) => ({
      id: c._id,
      title: c.title,
      category: c.category,
      difficulty: c.difficulty,
      readingTimeMinutes: c.readingTimeMinutes,
      description: c.description,
      lessonsCount: c.lessons.length,
    }));

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const seedCoursesIfEmpty = async () => {
  try {
    const count = await Course.countDocuments();
    if (count > 0) return;

    await Course.insertMany(seedCourses);
    console.log('Seeded academy courses');
  } catch (error) {
    console.error('Failed to seed courses:', error.message);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  seedCoursesIfEmpty,
};
