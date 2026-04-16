import { matchSorter } from 'match-sorter';

export type Landmark = {
  id: number;
  name: string;
  nameAmharic: string;
  nameOromo: string;
  description: string;
  latitude: number;
  longitude: number;
  category: 'church' | 'school' | 'hotel' | 'market' | 'landmark' | 'hospital' | 'mosque';
  notes: string;
  created_at: string;
  author: string;
  verified: boolean;
};

export const landmarkCategories: { value: Landmark['category']; label: string }[] = [
  { value: 'church', label: 'Church' },
  { value: 'school', label: 'School' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'market', label: 'Market' },
  { value: 'landmark', label: 'Landmark' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'mosque', label: 'Mosque' }
];

export type LandmarkCategory = Landmark['category'];

export type CommentReply = {
  id: number;
  author: string;
  content: string;
  created_at: string;
};

export type Comment = {
  id: number;
  articleId: number;
  author: string;
  authorRole: string;
  content: string;
  created_at: string;
  helpful: number;
  replies: CommentReply[];
};

export type ArticleRating = {
  articleId: number;
  helpful: number;
  notHelpful: number;
  userVote: 'helpful' | 'notHelpful' | null;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type Article = {
  id: number;
  title: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author: string;
  created_at: string;
  updated_at: string;
  views: number;
  featured: boolean;
};

export type ArticleCategory =
  | 'driver-tips'
  | 'dispatch-guide'
  | 'troubleshooting'
  | 'cultural-knowledge'
  | 'safety-procedures'
  | 'best-practices';

export const articleCategories: { value: ArticleCategory; label: string }[] = [
  { value: 'driver-tips', label: 'Driver Tips' },
  { value: 'dispatch-guide', label: 'Dispatch Guide' },
  { value: 'troubleshooting', label: 'Troubleshooting' },
  { value: 'cultural-knowledge', label: 'Cultural Knowledge' },
  { value: 'safety-procedures', label: 'Safety Procedures' },
  { value: 'best-practices', label: 'Best Practices' }
];

export type Expert = {
  id: number;
  name: string;
  role: string;
  expertise: string[];
  yearsOfExperience: number;
  location: string;
  contact: string;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  category: string;
  created_at: string;
  author: string;
  impact: 'high' | 'medium' | 'low';
};

export type ProTip = {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  author: string;
  role: string;
  created_at: string;
  tags: string[];
  likes: number;
  featured: boolean;
  seriesId?: string;
  seriesTitle?: string;
  episodeNumber?: number;
  transcript?: string;
  points?: number;
};

const sampleProTips: ProTip[] = [
  {
    id: 1,
    title: 'Reading Traffic Flow in Addis',
    description: 'Learn how to predict traffic patterns by observing time of day, weather, and local events. Experience teaches you which routes to avoid.',
    audioUrl: '/audio/pro-tip-1.mp3',
    duration: 180,
    author: 'Tadesse K.',
    role: 'Senior Driver',
    created_at: '2024-01-20T08:00:00Z',
    tags: ['traffic', 'navigation', 'addis-ababa'],
    likes: 45,
    featured: true,
    seriesId: 'nav-masterclass',
    seriesTitle: 'Navigation Masterclass',
    episodeNumber: 1,
    transcript: 'When you are near Bole Road, watch for the blue taxis. If they move to the left lane, the main road is blocked ahead...',
    points: 50
  },
  {
    id: 2,
    title: 'Handling Difficult Customers',
    description: 'Stay calm and professional. Listen actively, apologize sincerely, and offer solutions. A happy customer becomes a repeat customer.',
    audioUrl: '/audio/pro-tip-2.mp3',
    duration: 240,
    author: 'Almaz G.',
    role: 'Lead Dispatcher',
    created_at: '2024-01-19T10:00:00Z',
    tags: ['customer-service', 'communication', 'conflict'],
    likes: 38,
    featured: true,
    seriesId: 'soft-skills',
    seriesTitle: 'Driver Soft Skills',
    episodeNumber: 1,
    transcript: 'The first 10 seconds of the greeting define the entire ride. Always use the passenger\'s name if available in the app...',
    points: 40
  },
  {
    id: 3,
    title: 'Vehicle Safety Check',
    description: 'Before every shift: tires, brakes, lights, mirrors. A 2-minute check prevents hours of trouble. Your safety depends on it.',
    audioUrl: '/audio/pro-tip-3.mp3',
    duration: 150,
    author: 'Daniel B.',
    role: 'Safety Officer',
    created_at: '2024-01-18T14:00:00Z',
    tags: ['safety', 'maintenance', 'vehicle'],
    likes: 52,
    featured: false,
    seriesId: 'maintenance',
    seriesTitle: 'Vehicle Care',
    episodeNumber: 1,
    transcript: 'Check your tire pressure especially after heavy rains. Addis roads can be unpredictable with potholes...',
    points: 30
  },
  {
    id: 4,
    title: 'Landmark-Based Navigation',
    description: 'Forget perfect GPS. Learn the landmarks - churches, hotels, schools. They never move and help customers find you easily.',
    audioUrl: '/audio/pro-tip-4.mp3',
    duration: 200,
    author: 'Samuel M.',
    role: 'Tech Support Lead',
    created_at: '2024-01-17T09:00:00Z',
    tags: ['navigation', 'landmarks', 'gps'],
    likes: 29,
    featured: false,
    seriesId: 'nav-masterclass',
    seriesTitle: 'Navigation Masterclass',
    episodeNumber: 2,
    transcript: 'In Piassa, don\'t look for street signs. Look for the clock tower or the old bank building. That\'s what passengers will tell you...',
    points: 45
  }
];

export type ExpertLeaderboardEntry = {
  id: number;
  name: string;
  role: string;
  points: number;
  contributions: number;
  badges: string[];
  avatar?: string;
};

const sampleLeaderboard: ExpertLeaderboardEntry[] = [
  { id: 1, name: 'Tadesse K.', role: 'Senior Driver', points: 1250, contributions: 25, badges: ['Navigation Guru', 'Top Contributor', 'Street Wise'] },
  { id: 2, name: 'Almaz G.', role: 'Lead Dispatcher', points: 980, contributions: 18, badges: ['Conflict Resolver', 'Mentor'] },
  { id: 3, name: 'Samuel M.', role: 'Tech Support', points: 750, contributions: 12, badges: ['Tech Guide'] },
  { id: 4, name: 'Hiwot D.', role: 'Senior Dispatcher', points: 620, contributions: 10, badges: ['Safety First'] }
];

const sampleArticles: Article[] = [
  {
    id: 1,
    title: 'Navigating Addis Ababa Traffic Patterns',
    content: `Addis Ababa traffic follows unique patterns that every driver should understand. During peak hours (7-9 AM and 5-8 PM), main roads like Bole Road and Churchill Road become extremely congested.\n\nKey tips:\n- Use side streets during peak hours\n- Avoid roundabouts during rush hour\n- Know alternative routes in advance\n- Keep emergency contacts handy`,
    category: 'driver-tips',
    tags: ['addis-ababa', 'traffic', 'navigation', 'peak-hours'],
    author: 'Tadesse K.',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    views: 342,
    featured: true
  },
  {
    id: 2,
    title: 'Handling Customer Complaints Effectively',
    content: `Customer satisfaction is crucial in the ride-hailing industry. When handling complaints:\n\n1. Listen actively without interrupting\n2. Acknowledge the issue\n3. Apologize sincerely\n4. Offer a solution\n5. Follow up to ensure satisfaction\n\nRemember: A resolved complaint can turn into loyalty.`,
    category: 'dispatch-guide',
    tags: ['customer-service', 'complaints', 'satisfaction'],
    author: ' Almaz G.',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    views: 256,
    featured: false
  },
  {
    id: 3,
    title: 'GPS Solutions for Ethiopian Roads',
    content: `Standard GPS systems often fail in Ethiopia due to inaccurate mapping. Here are proven solutions:\n\n- Use Waze or Google Maps with user-reported updates\n- Combine GPS with landmark-based directions\n- Keep a physical map of your service area\n- Use local knowledge from experienced drivers\n- Report mapping errors when found`,
    category: 'troubleshooting',
    tags: ['gps', 'navigation', 'technology', 'mapping'],
    author: 'Samuel M.',
    created_at: '2024-01-08T09:00:00Z',
    updated_at: '2024-01-12T11:00:00Z',
    views: 489,
    featured: true
  },
  {
    id: 4,
    title: 'Understanding Ethiopian Cultural Context',
    content: `Cultural awareness is essential for providing excellent service:\n\n- Greetings are important - take time to greet properly\n- Coffee ceremonies are sacred - be respectful\n- Timings may be flexible - patience is key\n- Building rapport before business is valued\n- Respect for elders is paramount\n\nUnderstanding these cultural nuances improves both driver-customer and dispatcher-driver relationships.`,
    category: 'cultural-knowledge',
    tags: ['culture', 'ethiopia', 'communication', 'relationships'],
    author: 'Hiwot D.',
    created_at: '2024-01-05T14:00:00Z',
    updated_at: '2024-01-05T14:00:00Z',
    views: 178,
    featured: false
  },
  {
    id: 5,
    title: 'Night Shift Safety Protocols',
    content: `Working night shifts requires extra vigilance:\n\n1. Vehicle inspection before starting shift\n2. Keep phone charged and accessible\n3. Share your route with someone\n4. Stay in well-lit, populated areas\n5. Trust your instincts - if it feels wrong, leave\n6. Regular check-ins with dispatch\n\nYour safety is the top priority.`,
    category: 'safety-procedures',
    tags: ['safety', 'night-shift', 'protocols', 'security'],
    author: 'Daniel B.',
    created_at: '2024-01-03T20:00:00Z',
    updated_at: '2024-01-08T09:30:00Z',
    views: 234,
    featured: true
  },
  {
    id: 6,
    title: 'Efficient Route Planning Strategies',
    content: `Maximize efficiency with these route planning tips:\n\n- Study high-demand areas and times\n- Pre-plan routes for multiple pickups\n- Use real-time traffic data when available\n- Balance shortest distance with time savings\n- Consider weather and event impacts\n\nEfficient routing saves time, fuel, and increases earnings.`,
    category: 'best-practices',
    tags: ['routing', 'efficiency', 'planning', 'earnings'],
    author: 'Tadesse K.',
    created_at: '2024-01-01T11:00:00Z',
    updated_at: '2024-01-01T11:00:00Z',
    views: 412,
    featured: false
  }
];

const sampleExperts: Expert[] = [
  {
    id: 1,
    name: 'Tadesse K.',
    role: 'Senior Driver',
    expertise: ['Navigation', 'Customer Service', 'Night Shifts'],
    yearsOfExperience: 8,
    location: 'Addis Ababa',
    contact: 'tadesse.k@ride.com'
  },
  {
    id: 2,
    name: 'Almaz G.',
    role: 'Lead Dispatcher',
    expertise: ['Conflict Resolution', 'Dispatch Operations', 'Training'],
    yearsOfExperience: 5,
    location: 'Addis Ababa',
    contact: 'almaz.g@ride.com'
  },
  {
    id: 3,
    name: 'Samuel M.',
    role: 'Tech Support Lead',
    expertise: ['GPS Systems', 'App Issues', 'Device Setup'],
    yearsOfExperience: 4,
    location: 'Remote',
    contact: 'samuel.m@ride.com'
  }
];

const sampleLessons: Lesson[] = [
  {
    id: 1,
    title: 'The Importance of Landmark Navigation',
    description: 'Learned that relying solely on GPS leads to missed pickups. Drivers who use landmarks have 40% higher pickup success.',
    category: 'Navigation',
    created_at: '2024-01-15T08:00:00Z',
    author: 'Tadesse K.',
    impact: 'high'
  },
  {
    id: 2,
    title: 'Customer Communication During Delays',
    description: 'Proactive communication during traffic delays reduced complaints by 60%. Always keep customers informed.',
    category: 'Customer Service',
    created_at: '2024-01-10T10:00:00Z',
    author: 'Almaz G.',
    impact: 'high'
  },
  {
    id: 3,
    title: 'Tone Detection in Dispatch',
    description: 'Veteran dispatchers identified high-risk rides by voice cues. Junior staff now trained to flag unusual hesitation or background noise.',
    category: 'Safety',
    created_at: '2024-02-01T09:00:00Z',
    author: 'Almaz G.',
    impact: 'high'
  },
  {
    id: 4,
    title: 'Vehicle Maintenance Schedule',
    description: 'Implementing regular maintenance checks reduced breakdowns by 35%. Prevention is better than repair.',
    category: 'Operations',
    created_at: '2024-01-05T14:00:00Z',
    author: 'Daniel B.',
    impact: 'medium'
  }
];

export type SentimentLog = {
  id: number;
  keyword: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  count: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
};

const sampleSentimentLogs: SentimentLog[] = [
  {
    id: 1,
    keyword: 'wait time',
    sentiment: 'negative',
    count: 450,
    trend: 'up',
    insight: 'Increase in complaints near Piassa during road construction.'
  },
  {
    id: 2,
    keyword: 'politeness',
    sentiment: 'positive',
    count: 820,
    trend: 'up',
    insight: 'New customer service training for drivers is reflecting in reviews.'
  },
  {
    id: 3,
    keyword: 'app crash',
    sentiment: 'negative',
    count: 120,
    trend: 'down',
    insight: 'Recent update fixed the login loop for older Android devices.'
  },
  {
    id: 4,
    keyword: 'landmark',
    sentiment: 'positive',
    count: 310,
    trend: 'up',
    insight: 'Customers appreciate when drivers use landmarks for pickup.'
  }
];

const sampleLandmarks: Landmark[] = [
  {
    id: 1,
    name: 'Holy Trinity Cathedral',
    nameAmharic: 'ቅድስት ሥላሴ ካቲድራል',
    nameOromo: 'Kooddoo Qulqulluu',
    description: 'Major Orthodox Christian cathedral with distinctive tower. Popular meeting point.',
    latitude: 9.0195,
    longitude: 38.7611,
    category: 'church',
    notes: 'Road turns to swamp after rain. Wait at the green gate, not the main road.',
    created_at: '2024-01-15T10:00:00Z',
    author: 'Tadesse K.',
    verified: true
  },
  {
    id: 2,
    name: 'Bole Medhanialem Church',
    nameAmharic: 'ቦሌ መድሃኒየል ቤተክርስቲያን',
    nameOromo: 'Bole Maqaa Mirkanii',
    description: 'Large modern church in Bole area. Easy to find, well-known landmark.',
    latitude: 9.0058,
    longitude: 38.7632,
    category: 'church',
    notes: 'Very busy on Sundays. Best to use as reference during weekdays.',
    created_at: '2024-01-14T14:00:00Z',
    author: 'Samuel M.',
    verified: true
  },
  {
    id: 3,
    name: 'Addis Ababa University',
    nameAmharic: 'አዲስ አበባ ዩኒቨርሲቲ',
    nameOromo: 'Yuunivarsitii Gaaddisa Adaaddaabaa',
    description: 'Main campus of AAU. Well-known landmark visible from main road.',
    latitude: 9.0450,
    longitude: 38.7620,
    category: 'school',
    notes: 'Large gates face the main road. Good landmark for giving directions.',
    created_at: '2024-01-13T09:00:00Z',
    author: 'Daniel B.',
    verified: true
  },
  {
    id: 4,
    name: 'Shangri-La Hotel',
    nameAmharic: 'ሻንግሪላ ሆተል',
    nameOromo: 'Hooteelii Shangrilaa',
    description: 'Luxury hotel near Bole Road. High-end destination.',
    latitude: 9.0080,
    longitude: 38.7580,
    category: 'hotel',
    notes: 'Upscale area. Good for airport transfers. Valet parking available.',
    created_at: '2024-01-12T11:00:00Z',
    author: 'Almaz G.',
    verified: false
  },
  {
    id: 5,
    name: 'Piassa Market',
    nameAmharic: 'ፒያሳ ገበያ',
    nameOromo: 'Gabaa Piassa',
    description: 'Traditional market area. Very busy and crowded.',
    latitude: 9.0350,
    longitude: 38.7420,
    category: 'market',
    notes: 'Extremely congested on weekends. Use back entrance after 6 PM.',
    created_at: '2024-01-11T08:00:00Z',
    author: 'Tadesse K.',
    verified: true
  },
  {
    id: 6,
    name: 'Mexico Square',
    nameAmharic: 'ሜክሲኮ አደባባይ',
    nameOromo: 'Iddoo Waaraanaa Mexico',
    description: 'Major roundabout and square. Key intersection point.',
    latitude: 9.0200,
    longitude: 38.7450,
    category: 'landmark',
    notes: 'Often has traffic police. Avoid lane 3 due to construction.',
    created_at: '2024-01-10T15:00:00Z',
    author: 'Samuel M.',
    verified: true
  },
  {
    id: 7,
    name: 'Black Lion Hospital',
    nameAmharic: 'ጥቁር አንበሳ ሆስፒታል',
    nameOromo: 'Hospitaala Lixaa',
    description: 'Major public hospital. Well-known emergency destination.',
    latitude: 9.0420,
    longitude: 38.7500,
    category: 'hospital',
    notes: 'Emergency access is usually clear. Parking is difficult.',
    created_at: '2024-01-09T12:00:00Z',
    author: 'Daniel B.',
    verified: true
  },
  {
    id: 8,
    name: ' Anwar Mosque',
    nameAmharic: 'አንዋር ሃይማኖት ማተሚያ',
    nameOromo: 'Masjiid Anwar',
    description: 'Historic mosque in the city center. Important religious site.',
    latitude: 9.0320,
    longitude: 38.7420,
    category: 'mosque',
    notes: 'Friday prayers cause nearby congestion. Pedestrians often cross without signal.',
    created_at: '2024-01-08T10:00:00Z',
    author: 'Almaz G.',
    verified: true
  }
];

const sampleComments: Comment[] = [
  {
    id: 1,
    articleId: 1,
    author: 'Michael T.',
    authorRole: 'Driver',
    content: 'This is very helpful! I always knew about Bole Road congestion but never knew the exact peak hours. Thanks for sharing!',
    created_at: '2024-01-21T10:30:00Z',
    helpful: 12,
    replies: [
      {
        id: 1,
        author: 'Tadesse K.',
        content: 'Glad it helped! Feel free to share your own tips too.',
        created_at: '2024-01-21T11:00:00Z'
      }
    ]
  },
  {
    id: 2,
    articleId: 1,
    author: 'Sarah L.',
    authorRole: 'Dispatcher',
    content: 'I share these tips with new drivers during onboarding. Very practical advice.',
    created_at: '2024-01-22T08:15:00Z',
    helpful: 8,
    replies: []
  },
  {
    id: 3,
    articleId: 3,
    author: 'John D.',
    authorRole: 'Driver',
    content: 'Waze has been a lifesaver in areas where Google Maps fails. Highly recommend combining both.',
    created_at: '2024-01-23T14:45:00Z',
    helpful: 15,
    replies: []
  }
];

const sampleRatings: ArticleRating[] = [
  { articleId: 1, helpful: 45, notHelpful: 3, userVote: null },
  { articleId: 2, helpful: 32, notHelpful: 5, userVote: null },
  { articleId: 3, helpful: 58, notHelpful: 2, userVote: null },
  { articleId: 4, helpful: 28, notHelpful: 8, userVote: null },
  { articleId: 5, helpful: 41, notHelpful: 4, userVote: null },
  { articleId: 6, helpful: 35, notHelpful: 6, userVote: null }
];

export type Huddle = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  host: string;
  participants: string[];
  topic: string;
  recordingUrl?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export type UserProfile = {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
  expertise: string[];
  joinedAt: string;
  articlesContributed: number;
  tipsShared: number;
};

export type Bookmark = {
  id: number;
  userId: number;
  type: 'article' | 'landmark' | 'protip';
  itemId: number;
  createdAt: string;
};

export type Collection = {
  id: number;
  name: string;
  description: string;
  userId: number;
  items: { type: string; itemId: number }[];
  isPublic: boolean;
  createdAt: string;
};

export type ArticleVersion = {
  id: number;
  articleId: number;
  version: number;
  title: string;
  content: string;
  editedBy: string;
  editedAt: string;
  changes: string;
};

const sampleHuddles: Huddle[] = [
  {
    id: 1,
    title: 'Traffic Navigation Tips',
    description: 'Weekly discussion on navigation strategies in Addis Ababa',
    date: '2024-02-15',
    time: '10:00',
    duration: 60,
    host: 'Tadesse K.',
    participants: ['Tadesse K.', 'Samuel M.', 'Almaz G.', 'Daniel B.'],
    topic: 'Navigation',
    status: 'completed',
    recordingUrl: '/recordings/huddle-1.mp4'
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    description: 'Sharing best practices for handling difficult customers',
    date: '2024-02-22',
    time: '14:00',
    duration: 45,
    host: 'Almaz G.',
    participants: ['Almaz G.', 'Sarah L.', 'Michael T.'],
    topic: 'Customer Service',
    status: 'scheduled'
  }
];

const sampleUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Tadesse K.',
    role: 'Senior Driver',
    department: 'Operations',
    bio: '8 years experience in ride-hailing. Expert in Addis Ababa navigation.',
    expertise: ['Navigation', 'Customer Service', 'Night Shifts'],
    joinedAt: '2020-03-15',
    articlesContributed: 12,
    tipsShared: 8
  },
  {
    id: 2,
    name: 'Almaz G.',
    role: 'Lead Dispatcher',
    department: 'Operations',
    bio: 'Expert in conflict resolution and team management.',
    expertise: ['Conflict Resolution', 'Dispatch Operations', 'Training'],
    joinedAt: '2021-06-01',
    articlesContributed: 8,
    tipsShared: 5
  }
];

const sampleBookmarks: Bookmark[] = [
  { id: 1, userId: 1, type: 'article', itemId: 1, createdAt: '2024-01-20' },
  { id: 2, userId: 1, type: 'landmark', itemId: 1, createdAt: '2024-01-21' },
  { id: 3, userId: 1, type: 'protip', itemId: 1, createdAt: '2024-01-22' }
];

const sampleCollections: Collection[] = [
  {
    id: 1,
    name: 'Navigation Essentials',
    description: 'Essential navigation tips and landmark references',
    userId: 1,
    items: [
      { type: 'article', itemId: 1 },
      { type: 'article', itemId: 3 },
      { type: 'landmark', itemId: 1 },
      { type: 'protip', itemId: 4 }
    ],
    isPublic: true,
    createdAt: '2024-01-15'
  }
];

const sampleVersions: ArticleVersion[] = [
  {
    id: 1,
    articleId: 1,
    version: 1,
    title: 'Navigating Addis Traffic',
    content: 'Initial draft...',
    editedBy: 'Tadesse K.',
    editedAt: '2024-01-15T08:00:00Z',
    changes: 'Initial version'
  },
  {
    id: 2,
    articleId: 1,
    version: 2,
    title: 'Navigating Addis Ababa Traffic Patterns',
    content: 'Updated with more details about peak hours...',
    editedBy: 'Tadesse K.',
    editedAt: '2024-01-20T14:30:00Z',
    changes: 'Added peak hours information and alternative routes'
  }
];

export type CulturalEvent = {
  id: number;
  name: string;
  nameAmharic: string;
  date: string;
  impact: string;
  pricingLogic: string;
  fastingPeriod: boolean;
};

const sampleCulturalEvents: CulturalEvent[] = [
  {
    id: 1,
    name: 'Meskel',
    nameAmharic: 'መስቀል',
    date: '2024-09-27',
    impact: 'Massive demand near Meskel Square. Road closures expected.',
    pricingLogic: 'Surge pricing x1.8 active. High demand for late night trips.',
    fastingPeriod: false
  },
  {
    id: 2,
    name: 'Timket',
    nameAmharic: 'ጥምቀት',
    date: '2024-01-19',
    impact: 'Processions across the city. GPS routes may be blocked by crowds.',
    pricingLogic: 'Flat rate premium for airport transfers. High demand for shared rides.',
    fastingPeriod: false
  },
  {
    id: 3,
    name: 'Ramadan',
    nameAmharic: 'ረመዳን',
    date: '2024-03-11',
    impact: 'Peak demand shifted to evening (Iftar). Mid-day demand lower.',
    pricingLogic: 'Driver bonuses for evening shifts. Discounted group rides for Iftar.',
    fastingPeriod: true
  },
  {
    id: 4,
    name: 'Easter Fast (Hudadi)',
    nameAmharic: 'ሁዳዴ ጾም',
    date: '2024-03-11',
    impact: 'Increased demand for early morning church trips.',
    pricingLogic: 'No significant pricing change. Lower demand for food delivery.',
    fastingPeriod: true
  }
];

export const fakeKMS = {
  articles: [...sampleArticles] as Article[],
  experts: [...sampleExperts] as Expert[],
  lessons: [...sampleLessons] as Lesson[],
  proTips: [...sampleProTips] as ProTip[],
  landmarks: [...sampleLandmarks] as Landmark[],
  comments: [...sampleComments] as Comment[],
  ratings: [...sampleRatings] as ArticleRating[],
  huddles: [...sampleHuddles] as Huddle[],
  profiles: [...sampleUsers] as UserProfile[],
  bookmarks: [...sampleBookmarks] as Bookmark[],
  collections: [...sampleCollections] as Collection[],
  versions: [...sampleVersions] as ArticleVersion[],
  sentimentLogs: [...sampleSentimentLogs] as SentimentLog[],
  culturalEvents: [...sampleCulturalEvents] as CulturalEvent[],
  leaderboard: [...sampleLeaderboard] as ExpertLeaderboardEntry[],

  async getLeaderboard() {
    await delay(300);
    return { success: true, leaderboard: this.leaderboard };
  },

  async getArticles({
    page = 1,
    limit = 10,
    search,
    category
  }: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) {
    await delay(500);
    let results = [...this.articles];

    if (search) {
      results = matchSorter(results, search, {
        keys: ['title', 'content', 'tags', 'author']
      });
    }

    if (category) {
      results = results.filter((a) => a.category === category);
    }

    const total = results.length;
    const offset = (page - 1) * limit;
    const paginated = results.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Articles retrieved successfully',
      total_articles: total,
      offset,
      limit,
      articles: paginated
    };
  },

  async getArticleById(id: number) {
    await delay(300);
    const article = this.articles.find((a) => a.id === id);

    if (!article) {
      return { success: false, message: `Article ${id} not found` };
    }

    this.articles = this.articles.map((a) =>
      a.id === id ? { ...a, views: a.views + 1 } : a
    );

    return { success: true, article: { ...article, views: article.views + 1 } };
  },

  async createArticle(data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>) {
    await delay(500);
    const newArticle: Article = {
      ...data,
      id: this.articles.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views: 0
    };

    this.articles.unshift(newArticle);

    return { success: true, article: newArticle };
  },

  async updateArticle(id: number, data: Partial<Article>) {
    await delay(500);
    const index = this.articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return { success: false, message: `Article ${id} not found` };
    }

    this.articles[index] = {
      ...this.articles[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    return { success: true, article: this.articles[index] };
  },

  async deleteArticle(id: number) {
    await delay(300);
    const index = this.articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return { success: false, message: `Article ${id} not found` };
    }

    this.articles.splice(index, 1);

    return { success: true, message: 'Article deleted successfully' };
  },

  async getDashboardStats() {
    await delay(200);
    return {
      success: true,
      stats: {
        totalArticles: this.articles.length,
        totalViews: this.articles.reduce((sum, a) => sum + a.views, 0),
        totalExperts: this.experts.length,
        totalLessons: this.lessons.length,
        recentArticles: this.articles.slice(0, 5)
      }
    };
  },

  async getExperts() {
    await delay(300);
    return { success: true, experts: this.experts };
  },

  async getLessons() {
    await delay(300);
    return { success: true, lessons: this.lessons };
  },

  async getProTips() {
    await delay(300);
    return { success: true, proTips: this.proTips };
  },

  async searchAll(query: string) {
    await delay(400);
    const articles = matchSorter(this.articles, query, {
      keys: ['title', 'content', 'tags']
    }).map((a) => ({ ...a, type: 'article' }));

    const landmarks = matchSorter(this.landmarks, query, {
      keys: ['name', 'nameAmharic', 'nameOromo', 'description', 'notes']
    }).map((l) => ({ ...l, type: 'landmark' }));

    const proTips = matchSorter(this.proTips, query, {
      keys: ['title', 'description', 'tags', 'seriesTitle', 'transcript']
    }).map((p) => ({ ...p, type: 'protip' }));

    return {
      success: true,
      results: [...articles, ...landmarks, ...proTips]
    };
  },

  async getProTipById(id: number) {
    await delay(200);
    const proTip = this.proTips.find((p) => p.id === id);
    if (!proTip) {
      return { success: false, message: `ProTip ${id} not found` };
    }
    return { success: true, proTip };
  },

  async getLandmarks({ category }: { category?: string } = {}) {
    await delay(300);
    let results = [...this.landmarks];
    if (category) {
      results = results.filter((l) => l.category === category);
    }
    return { success: true, landmarks: results };
  },

  async getLandmarkById(id: number) {
    await delay(200);
    const landmark = this.landmarks.find((l) => l.id === id);
    if (!landmark) {
      return { success: false, message: `Landmark ${id} not found` };
    }
    return { success: true, landmark };
  },

  async createLandmark(data: Omit<Landmark, 'id' | 'created_at'>) {
    await delay(300);
    const newLandmark: Landmark = {
      ...data,
      id: this.landmarks.length + 1,
      created_at: new Date().toISOString()
    };
    this.landmarks.unshift(newLandmark);
    return { success: true, landmark: newLandmark };
  },

  async updateLandmark(id: number, data: Partial<Landmark>) {
    await delay(300);
    const index = this.landmarks.findIndex((l) => l.id === id);
    if (index === -1) {
      return { success: false, message: `Landmark ${id} not found` };
    }
    this.landmarks[index] = { ...this.landmarks[index], ...data };
    return { success: true, landmark: this.landmarks[index] };
  },

  async deleteLandmark(id: number) {
    await delay(200);
    const index = this.landmarks.findIndex((l) => l.id === id);
    if (index === -1) {
      return { success: false, message: `Landmark ${id} not found` };
    }
    this.landmarks.splice(index, 1);
    return { success: true, message: 'Landmark deleted successfully' };
  },

  async getCommentsByArticleId(articleId: number) {
    await delay(200);
    const comments = this.comments.filter((c) => c.articleId === articleId);
    return { success: true, comments };
  },

  async createComment(data: Omit<Comment, 'id' | 'created_at' | 'helpful' | 'replies'>) {
    await delay(300);
    const newComment: Comment = {
      ...data,
      id: this.comments.length + 1,
      created_at: new Date().toISOString(),
      helpful: 0,
      replies: []
    };
    this.comments.unshift(newComment);
    return { success: true, comment: newComment };
  },

  async addCommentReply(commentId: number, data: { author: string; content: string }) {
    await delay(200);
    const comment = this.comments.find((c) => c.id === commentId);
    if (!comment) {
      return { success: false, message: `Comment ${commentId} not found` };
    }
    const reply: CommentReply = {
      id: comment.replies.length + 1,
      ...data,
      created_at: new Date().toISOString()
    };
    comment.replies.push(reply);
    return { success: true, reply };
  },

  async voteComment(commentId: number) {
    await delay(100);
    const comment = this.comments.find((c) => c.id === commentId);
    if (!comment) {
      return { success: false, message: `Comment ${commentId} not found` };
    }
    comment.helpful += 1;
    return { success: true };
  },

  async getArticleRating(articleId: number) {
    await delay(100);
    const rating = this.ratings.find((r) => r.articleId === articleId);
    if (!rating) {
      return { success: false, message: 'Rating not found' };
    }
    return { success: true, rating };
  },

  async voteArticle(articleId: number, vote: 'helpful' | 'notHelpful') {
    await delay(100);
    const rating = this.ratings.find((r) => r.articleId === articleId);
    if (!rating) {
      return { success: false, message: 'Rating not found' };
    }
    if (vote === 'helpful') {
      rating.helpful += 1;
    } else {
      rating.notHelpful += 1;
    }
    rating.userVote = vote;
    return { success: true, rating };
  },

  async getSentimentLogs() {
    await delay(300);
    return { success: true, logs: this.sentimentLogs };
  },

  async getCulturalEvents() {
    await delay(200);
    return { success: true, events: this.culturalEvents };
  }
};
