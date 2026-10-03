/**
 * All homepage copy lives here. Edit text, links and lists without touching layout code.
 *
 * NOTE: `rating`, `testimonials.headline` and the review cards are placeholder
 * marketing copy. Replace them with real figures and permissioned reviews
 * before launch.
 */
export const content = {
  brand: 'Edubull',
  tagline: 'Playful learning for ages 2–6',

  nav: [
    { label: 'Home', href: '#top' },
    { label: 'What they learn', href: '#learn' },
    { label: 'Why us', href: '#trust' },
    { label: 'Features', href: '#features' },
    { label: 'Contact Us', href: 'mailto:hello@edubull.com' }
  ],
  cta: { label: 'Try for Free', href: '/signup.html' },

  hero: {
    lines: ['Transforming', 'education into'],
    highlight: 'playful adventures',
    body: "At Edubull we believe in turning screen time into learning time. Little ones explore letters, numbers, shapes and stories through games made for curious minds.",
    secondary: 'Watch Preview',
    rating: { score: '4.9/5', note: 'based on 2000+ reviews' }
  },

  // Set to an embeddable video URL (e.g. a YouTube /embed/ link) to enable the preview player.
  previewVideoUrl: '',

  learn: {
    title: 'What Your Child Will Learn',
    stops: [
      { title: 'Alphabets & Phonics', text: 'Learn letters and their sounds through songs and games.', color: '#FFD43B', icon: 'abc' },
      { title: 'Numbers & Math', text: 'Counting, adding and early number sense.', color: '#D946EF', icon: 'num' },
      { title: 'AI Stories & Fun Games', text: 'Stories that adapt to your child as they read along.', color: '#A78BFA', icon: 'book' },
      { title: 'Shapes & Colors', text: 'Spot, sort and match shapes and colours.', color: '#4ADE80', icon: 'shapes' },
      { title: 'Birds & Animals', text: 'Meet creatures, their sounds and their homes.', color: '#2DD4BF', icon: 'bird' },
      { title: 'Fruits & Vegetables', text: 'Name healthy foods with bright, tasty visuals.', color: '#60A5FA', icon: 'apple' },
      { title: 'First Words & Parts of Body', text: 'Build vocabulary from eyes and ears to everyday words.', color: '#FB923C', icon: 'face' }
    ]
  },

  trust: [
    {
      art: 'family',
      heading: ['Why', 'Parents Trust Us'],
      text: 'A safe, ad-free space where kids learn by playing. Every activity is designed with early-years educators so your child builds real skills, never just screen time.'
    },
    {
      art: 'gift',
      heading: ['50+ Engaging Games'],
      text: 'Puzzles, tracing, matching and story games across every subject, with new ones added regularly to keep curiosity alive.'
    },
    {
      art: 'offline',
      heading: ['Play Anytime, Anywhere'],
      text: "No internet connection? That's fine! Lessons work offline, so learning comes along on car rides, flights and visits to grandma."
    }
  ],

  features: {
    title: 'Take a Closer Look',
    rows: [
      { title: 'Magical Stories That Grow With Your Child', text: 'AI-powered stories adjust their words and pace to your child’s reading level, building imagination and confidence.', screen: 'story' },
      { title: 'Master Writing With Guided Tracing', text: 'Follow the arrows to trace every letter. Gentle guidance builds fine-motor skills and correct letter formation.', screen: 'trace' },
      { title: 'Early Math Made Simple and Fun', text: 'Count, add and compare with friendly objects. Visual puzzles make numbers click.', screen: 'math' },
      { title: 'Learn Responsibility Through Clean-Up Play', text: 'Sort toys, recycling and laundry into the right bins and learn tidy habits through play.', screen: 'sort' },
      { title: 'Understand Shapes With Interactive Matching', text: 'Drag shapes onto the school bus windows to match colours and outlines.', screen: 'bus' }
    ]
  },

  newsletter: {
    title: 'Newsletter',
    text: 'Get learning tips, new games and activity ideas in your inbox once a month.',
    placeholder: 'Enter your email',
    button: 'Subscribe',
    success: 'Thanks! You’re on the list.',
    error: 'Please enter a valid email address.'
  },

  testimonials: {
    headline: '95% of parents said their children enjoy using Edubull',
    sub: 'Read what families are saying on the',
    stores: { appStore: '#', googlePlay: '#' },
    items: [
      { text: 'My daughter asks for "her letter game" every morning. She can now trace her whole name, and she is only four!', name: 'Priya S.', source: 'Google Play' },
      { text: 'Finally an app with no ads and no surprise purchases. The offline mode saved our long train journey.', name: 'Rahul M.', source: 'App Store' },
      { text: 'The stories change as he gets better at reading. He feels so proud when he finishes one by himself.', name: 'Anita K.', source: 'Google Play' }
    ]
  },

  footer: {
    about: 'Edubull turns screen time into learning time with playful lessons for preschoolers aged 2–6.',
    columns: [
      { title: 'Quick Links', links: [['Home', '#top'], ['Games', '#features'], ['Subjects', '#learn'], ['About', '#trust']] },
      { title: 'Company', links: [['Curriculum', '/class.html'], ['Practice', '/app.html'], ['Sign in', '/login.html'], ['Join', '/signup.html']] }
    ],
    social: [
      { label: 'Facebook', href: '#', icon: 'fb' },
      { label: 'Instagram', href: '#', icon: 'ig' },
      { label: 'X (Twitter)', href: '#', icon: 'x' },
      { label: 'TikTok', href: '#', icon: 'tt' }
    ],
    legal: [['Privacy Policy', '#'], ['Terms & Conditions', '#'], ['Support', 'mailto:hello@edubull.com']]
  }
};
