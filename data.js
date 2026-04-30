// ============================================================
// Election Process Assistant — Data Module
// ============================================================

const ELECTION_TIMELINE = [
  {
    id: 1,
    phase: "Announcement of Elections",
    icon: "megaphone",
    duration: "D-Day minus 45+ days",
    shortDesc: "The Election Commission announces the schedule and Model Code of Conduct kicks in.",
    details: [
      "The Election Commission of India (ECI) announces the election schedule, including key dates for nominations, campaigning, polling, and counting.",
      "The Model Code of Conduct (MCC) comes into effect immediately upon announcement, binding all political parties and candidates.",
      "The MCC prohibits the ruling party from announcing new schemes, making ad-hoc appointments, or using government machinery for campaigning.",
      "Election observers are appointed to ensure free and fair elections across all constituencies."
    ],
    funFact: "The Model Code of Conduct has been in use since the 1960s, though it was first formally issued in the 1971 elections."
  },
  {
    id: 2,
    phase: "Nomination Filing",
    icon: "file-text",
    duration: "7 days window",
    shortDesc: "Candidates file their nominations with the Returning Officer of their constituency.",
    details: [
      "Candidates must file nomination papers with the Returning Officer of the constituency they wish to contest from.",
      "Each candidate must deposit a security amount — ₹25,000 for general category and ₹12,500 for SC/ST candidates.",
      "Nominations must be supported by a proposer who is a registered voter in the constituency.",
      "Candidates must disclose their criminal record, assets, liabilities, and educational qualifications in an affidavit.",
      "Independent candidates and party nominees both follow the same filing process."
    ],
    funFact: "In the 2019 General Elections, over 8,000 candidates filed nominations across 543 Lok Sabha constituencies."
  },
  {
    id: 3,
    phase: "Scrutiny of Nominations",
    icon: "search",
    duration: "1 day after last nomination date",
    shortDesc: "The Returning Officer examines all nomination papers for validity.",
    details: [
      "The Returning Officer checks every nomination paper for completeness and validity.",
      "Nominations can be rejected if the candidate is underage, not a registered voter, or has incomplete paperwork.",
      "The scrutiny process is open — candidates and their agents can be present and raise objections.",
      "Decisions on acceptance or rejection are made on the same day."
    ],
    funFact: "Nomination rejections are relatively rare but can cause significant political drama when they do occur."
  },
  {
    id: 4,
    phase: "Withdrawal of Candidatures",
    icon: "user-minus",
    duration: "2 days after scrutiny",
    shortDesc: "Candidates may withdraw from the election within the specified deadline.",
    details: [
      "Candidates who have filed valid nominations can choose to withdraw before the deadline.",
      "Withdrawal must be submitted in writing to the Returning Officer.",
      "After the withdrawal deadline, the final list of contesting candidates is published.",
      "Strategic withdrawals often happen when parties negotiate alliances or adjust candidates."
    ],
    funFact: "Tactical withdrawals are a common political strategy — parties sometimes negotiate seat-sharing deals even after nominations."
  },
  {
    id: 5,
    phase: "Election Campaign",
    icon: "volume-2",
    duration: "Ends 48 hours before polling",
    shortDesc: "Parties and candidates campaign to win voter support through rallies, ads, and outreach.",
    details: [
      "Political parties and candidates campaign through rallies, roadshows, door-to-door canvassing, and media advertisements.",
      "Campaigns must follow Election Commission guidelines — no hate speech, no bribery, no appeals to communal sentiments.",
      "There are strict expenditure limits: ₹95 lakh for Lok Sabha and ₹40 lakh for Assembly elections (as of 2024).",
      "All campaigning must stop 48 hours before polling day — known as the 'silence period'.",
      "Digital and social media campaigning has become increasingly important in recent elections."
    ],
    funFact: "India's 2019 elections were the most expensive in history at that point, with an estimated ₹60,000 crore spent across all parties."
  },
  {
    id: 6,
    phase: "Polling Day",
    icon: "vote",
    duration: "Single day (may span phases)",
    shortDesc: "Voters cast their ballots at designated polling stations using EVMs.",
    details: [
      "Voters cast their votes at designated polling booths using Electronic Voting Machines (EVMs) paired with VVPAT (Voter Verifiable Paper Audit Trail).",
      "Each voter's identity is verified using their EPIC (Elector's Photo Identity Card) or approved alternate ID.",
      "Indelible ink is applied to the voter's left index finger to prevent duplicate voting.",
      "Polling hours are typically 7 AM to 6 PM, though they may vary by region.",
      "Special provisions exist for persons with disabilities, senior citizens, and women voters.",
      "NOTA (None of the Above) option is available on every EVM since 2013."
    ],
    funFact: "India's EVMs are standalone, battery-powered devices with no network connectivity — making them tamper-resistant by design."
  },
  {
    id: 7,
    phase: "Counting of Votes",
    icon: "calculator",
    duration: "Usually 1 day",
    shortDesc: "Votes are counted under strict supervision at designated counting centers.",
    details: [
      "Counting takes place at designated counting centers under the supervision of the Returning Officer.",
      "Postal ballots are counted first, followed by EVM votes round by round.",
      "Each round typically covers one assembly segment's votes.",
      "Candidates and their agents can be present during counting and raise objections.",
      "VVPAT slips from randomly selected 5 polling stations per assembly constituency are physically verified.",
      "Results are declared constituency-by-constituency as counting progresses."
    ],
    funFact: "With EVMs, India can count over 600 million votes in a single day — a feat impossible with paper ballots."
  },
  {
    id: 8,
    phase: "Declaration of Results",
    icon: "award",
    duration: "Same day as counting",
    shortDesc: "Winners are declared and the process of government formation begins.",
    details: [
      "The candidate with the highest number of votes in each constituency is declared the winner (First-Past-The-Post system).",
      "The Returning Officer issues the 'Certificate of Election' to winning candidates.",
      "The party or alliance with a majority (272+ seats in Lok Sabha) is invited to form the government.",
      "Elected members must take the oath of office within a specified period.",
      "Election results can be challenged through an Election Petition filed in the High Court."
    ],
    funFact: "India follows the 'First Past the Post' system — a candidate can win even with just 20-30% of total votes if the opposition is fragmented."
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the minimum age to vote in Indian elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "As per Article 326 of the Indian Constitution, every citizen who is 18 years of age or above and is not disqualified is entitled to vote."
  },
  {
    question: "What does EVM stand for?",
    options: ["Electronic Vote Machine", "Electronic Voting Machine", "Electric Voting Mechanism", "Election Voting Machine"],
    correct: 1,
    explanation: "EVM stands for Electronic Voting Machine. India has been using EVMs since 1982, with full implementation from 2004."
  },
  {
    question: "How many seats are there in the Lok Sabha?",
    options: ["500", "543", "545", "552"],
    correct: 1,
    explanation: "The Lok Sabha has 543 elected seats. Members are directly elected by the people from their respective constituencies."
  },
  {
    question: "What is NOTA?",
    options: [
      "National Organization for Transparent Administration",
      "None of the Above — an option to reject all candidates",
      "New Online Tallying Application",
      "National Office of Tabulation Authority"
    ],
    correct: 1,
    explanation: "NOTA (None of the Above) was introduced in 2013 by the Supreme Court's order, allowing voters to reject all candidates."
  },
  {
    question: "Which body conducts elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "NITI Aayog"],
    correct: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering elections in India."
  },
  {
    question: "What is the 'Model Code of Conduct'?",
    options: [
      "A law passed by Parliament for elections",
      "Guidelines for voter behavior at polling booths",
      "A set of guidelines for political parties and candidates during elections",
      "Rules for counting votes"
    ],
    correct: 2,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the ECI for political parties and candidates to ensure free and fair elections."
  },
  {
    question: "When must all election campaigning stop before polling day?",
    options: ["24 hours before", "48 hours before", "72 hours before", "On polling day morning"],
    correct: 1,
    explanation: "All campaigning must stop 48 hours before polling day. This 'silence period' gives voters time to reflect without influence."
  },
  {
    question: "What is VVPAT?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Virtual Voting and Paper Tally",
      "Vote Validation and Processing Terminal",
      "Verified Voter Authentication Protocol"
    ],
    correct: 0,
    explanation: "VVPAT is a slip-based system attached to EVMs that prints a paper slip showing the voter's choice, visible for 7 seconds before dropping into a sealed box."
  }
];

const BENTO_CARDS = [
  {
    id: "who-can-vote",
    title: "Who Can Vote?",
    icon: "users",
    color: "#2563EB",
    front: "Learn about voter eligibility and requirements",
    back: [
      "Must be an Indian citizen",
      "Minimum 18 years of age on the qualifying date",
      "Must be registered in the electoral roll",
      "Must not be disqualified under any law",
      "Must possess a valid voter ID (EPIC) or approved alternate ID",
      "NRIs can also vote (must be present at the polling booth)"
    ]
  },
  {
    id: "how-to-register",
    title: "How to Register",
    icon: "clipboard-check",
    color: "#059669",
    front: "Step-by-step voter registration guide",
    back: [
      "Visit nvsp.in or download the Voter Helpline App",
      "Fill Form 6 for new registration",
      "Upload photo, age proof, and address proof",
      "Your application is verified by the BLO (Booth Level Officer)",
      "Once approved, you receive your EPIC (Voter ID Card)",
      "Check your name on the voter list before election day"
    ]
  },
  {
    id: "types-of-elections",
    title: "Types of Elections",
    icon: "layers",
    color: "#7C3AED",
    front: "Explore the different levels of elections in India",
    back: [
      "Lok Sabha (General Elections) — National level, 543 seats",
      "Vidhan Sabha (State Assembly) — State level",
      "Rajya Sabha — Indirectly elected by state legislators",
      "Municipal/Panchayat — Local body elections",
      "By-elections — Fill vacancies between general elections",
      "Presidential & Vice-Presidential elections"
    ]
  },
  {
    id: "key-bodies",
    title: "Key Bodies",
    icon: "landmark",
    color: "#DC2626",
    front: "The organizations that make elections happen",
    back: [
      "Election Commission of India (ECI) — Autonomous constitutional body",
      "Chief Election Commissioner — Heads the ECI",
      "Returning Officer — Manages elections in each constituency",
      "Booth Level Officer (BLO) — Ground-level voter registration",
      "Election Observers — Ensure code of conduct compliance",
      "District Election Officer — Coordinates at district level"
    ]
  }
];

const KEY_FACTS = [
  "India is the world's largest democracy with over 960 million eligible voters",
  "The first general election in 1951-52 lasted from October to February — nearly 4 months",
  "India uses over 5.5 million EVMs in a general election",
  "Voter turnout in the 2024 Lok Sabha elections was approximately 65.8%",
  "The Election Commission was established on 25th January 1950 — celebrated as National Voters' Day",
  "The smallest polling station was set up for a single voter in Gir forest, Gujarat",
  "India has over 10 lakh (1 million) polling stations across the country",
  "The indelible ink used on voters' fingers is manufactured by Mysore Paints & Varnish Ltd",
  "NOTA was introduced in 2013 following a Supreme Court judgment",
  "Women voter turnout has been steadily rising and exceeded male turnout in several recent state elections"
];

const NVIDIA_API_CONFIG = {
  endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
  model: "meta/llama-3.1-8b-instruct"
};

const AI_SYSTEM_PROMPT = `You are an expert Election Process Assistant for Indian elections. Your role is to help citizens understand:

1. The Indian election process (Lok Sabha, Vidhan Sabha, Local body elections)
2. Voter registration and eligibility
3. The role of the Election Commission of India
4. Electronic Voting Machines (EVMs) and VVPAT
5. Model Code of Conduct
6. Election timelines and phases
7. Voting rights and responsibilities
8. Key constitutional provisions related to elections

Guidelines:
- Be accurate, clear, and concise
- Use simple language that anyone can understand
- Reference constitutional articles and laws when relevant
- If unsure about specific dates or numbers, say so
- Encourage democratic participation
- Stay politically neutral — never endorse any party or candidate
- Focus on the process, not political opinions
- Keep responses under 200 words for clarity
- Use bullet points for lists
- Be friendly and encouraging about civic participation`;

// Fallback responses when the NVIDIA API is unavailable
const FALLBACK_RESPONSES = {
  "voting age": "The minimum voting age in India is **18 years**. This was reduced from 21 to 18 by the 61st Amendment Act of 1988.",
  "register": "You can register to vote by:\n1. Visiting **nvsp.in**\n2. Downloading the **Voter Helpline App**\n3. Filling **Form 6** for new registration\n4. Submitting ID and address proof\n5. Getting verified by your Booth Level Officer",
  "evm": "**Electronic Voting Machines (EVMs)** are standalone, battery-operated devices used in Indian elections since 2004. They have no network connectivity, making them tamper-resistant. Each EVM is paired with a VVPAT that prints a paper slip for verification.",
  "nota": "**NOTA (None of the Above)** was introduced in 2013 by a Supreme Court order. It allows voters to reject all candidates. However, even if NOTA gets the highest votes, the candidate with the next highest votes wins.",
  "default": "I'm your Election Process Assistant! I can help you understand:\n• Voting eligibility and registration\n• The election process and timeline\n• EVMs and how voting works\n• The Election Commission's role\n• Your rights as a voter\n\nWhat would you like to know?"
};
