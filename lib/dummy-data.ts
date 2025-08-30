export interface Issue {
  id: string
  ticketId: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "received" | "in-progress" | "resolved" | "closed"
  submittedBy: {
    name?: string
    phone?: string
    email?: string
    isAnonymous: boolean
  }
  attachments: string[]
  createdAt: Date
  updatedAt: Date
  comments: Array<{
    id: string
    text: string
    author: string
    createdAt: Date
  }>
}

// Dummy data for demonstration
export const dummyIssues: Issue[] = [
  {
    id: "1",
    ticketId: "RW-2024-001",
    title: "Pothole on Main Street needs repair",
    description:
      "There is a large pothole on Main Street near the market that is causing damage to vehicles and creating safety hazards for pedestrians.",
    category: "infrastructure",
    priority: "high",
    status: "in-progress",
    submittedBy: {
      name: "Jean Baptiste",
      phone: "+250788123456",
      email: "jean@example.com",
      isAnonymous: false,
    },
    attachments: ["/pothole-on-road.png"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    comments: [
      {
        id: "c1",
        text: "We have received your report and assigned a team to assess the situation.",
        author: "City Infrastructure Team",
        createdAt: new Date("2024-01-16"),
      },
      {
        id: "c2",
        text: "Our team visited the location and confirmed the issue. Repair work is scheduled for next week.",
        author: "City Infrastructure Team",
        createdAt: new Date("2024-01-18"),
      },
    ],
  },
  {
    id: "2",
    ticketId: "RW-2024-002",
    title: "Request for additional street lighting",
    description:
      "The area near the school lacks proper lighting, making it unsafe for students walking home in the evening.",
    category: "security",
    priority: "medium",
    status: "received",
    submittedBy: {
      isAnonymous: true,
    },
    attachments: [],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    comments: [],
  },
  {
    id: "3",
    ticketId: "RW-2024-003",
    title: "Water supply interruption in Sector 5",
    description:
      "Residents in Sector 5 have been without water supply for the past 3 days. This is affecting daily activities and hygiene.",
    category: "infrastructure",
    priority: "urgent",
    status: "resolved",
    submittedBy: {
      name: "Marie Uwimana",
      phone: "+250789654321",
      email: "marie@example.com",
      isAnonymous: false,
    },
    attachments: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-14"),
    comments: [
      {
        id: "c3",
        text: "Emergency repair team has been dispatched to fix the main water line.",
        author: "Water Authority",
        createdAt: new Date("2024-01-11"),
      },
      {
        id: "c4",
        text: "Water supply has been restored. We apologize for the inconvenience.",
        author: "Water Authority",
        createdAt: new Date("2024-01-14"),
      },
    ],
  },
  {
    id: "4",
    ticketId: "RW-2024-004",
    title: "Incomplete submission - Need to add more details",
    description: "This is a draft submission that needs more information to be completed.",
    category: "other",
    priority: "low",
    status: "received",
    submittedBy: {
      name: "Draft User",
      phone: "+250787000000",
      email: "draft@example.com",
      isAnonymous: false,
    },
    attachments: [],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    comments: [
      {
        id: "c5",
        text: "Please provide more details about your issue to help us assist you better.",
        author: "Support Team",
        createdAt: new Date("2024-01-20"),
      },
    ],
  },
]

export function generateTicketId(): string {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return `RW-${year}-${randomNum}`
}

export function findIssueByTicketId(ticketId: string): Issue | undefined {
  return dummyIssues.find((issue) => issue.ticketId === ticketId)
}

export interface Announcement {
  id: string
  title: string
  description: string
  content: string
  publishedAt: Date
  category: "policy" | "infrastructure" | "health" | "education" | "emergency" | "general"
  priority: "low" | "medium" | "high" | "urgent"
  attachments: Array<{
    id: string
    name: string
    type: "image" | "video" | "document"
    url: string
    size?: string
  }>
  author: {
    name: string
    department: string
  }
  isActive: boolean
}

// Dummy government announcements
export const dummyAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "New Digital Services Platform Launch",
    description:
      "The Government of Rwanda is launching a new digital services platform to improve citizen access to government services.",
    content:
      "We are excited to announce the launch of our new digital services platform that will allow citizens to access various government services online. This platform includes services for document requests, permit applications, and citizen feedback systems. The platform will be available 24/7 and supports multiple languages including Kinyarwanda, English, and French.",
    publishedAt: new Date("2024-01-25"),
    category: "policy",
    priority: "high",
    attachments: [
      {
        id: "att-1",
        name: "Digital Platform Guide",
        type: "document",
        url: "/documents/digital-platform-guide.pdf",
        size: "2.5 MB",
      },
      {
        id: "att-2",
        name: "Platform Demo Video",
        type: "video",
        url: "/videos/platform-demo.mp4",
        size: "15.2 MB",
      },
    ],
    author: {
      name: "Ministry of ICT and Innovation",
      department: "Digital Transformation",
    },
    isActive: true,
  },
  {
    id: "ann-2",
    title: "Road Maintenance Schedule - Kigali District",
    description: "Scheduled road maintenance activities in Kigali District for February 2024.",
    content:
      "The Ministry of Infrastructure will conduct routine maintenance on major roads in Kigali District during February 2024. This includes pothole repairs, road marking, and drainage system improvements. Citizens are advised to plan their travel accordingly and use alternative routes where necessary.",
    publishedAt: new Date("2024-01-22"),
    category: "infrastructure",
    priority: "medium",
    attachments: [
      {
        id: "att-3",
        name: "Road Maintenance Map",
        type: "image",
        url: "/images/road-maintenance-map.jpg",
        size: "1.8 MB",
      },
      {
        id: "att-4",
        name: "Alternative Routes Guide",
        type: "document",
        url: "/documents/alternative-routes.pdf",
        size: "950 KB",
      },
    ],
    author: {
      name: "Ministry of Infrastructure",
      department: "Road Maintenance Division",
    },
    isActive: true,
  },
  {
    id: "ann-3",
    title: "Health Insurance Registration Extended",
    description: "The deadline for health insurance registration has been extended to March 31, 2024.",
    content:
      "Due to high demand and to ensure all citizens have adequate time to register, the Ministry of Health has extended the health insurance registration deadline to March 31, 2024. Citizens can register online through our digital platform or visit their local health centers. All necessary documents and registration procedures are outlined in the attached guide.",
    publishedAt: new Date("2024-01-20"),
    category: "health",
    priority: "urgent",
    attachments: [
      {
        id: "att-5",
        name: "Registration Process",
        type: "video",
        url: "/videos/health-insurance-registration.mp4",
        size: "8.7 MB",
      },
      {
        id: "att-6",
        name: "Required Documents List",
        type: "document",
        url: "/documents/health-insurance-docs.pdf",
        size: "650 KB",
      },
    ],
    author: {
      name: "Ministry of Health",
      department: "Health Insurance Division",
    },
    isActive: true,
  },
  {
    id: "ann-4",
    title: "Education Sector Development Program",
    description: "New initiatives to improve education quality and accessibility across Rwanda.",
    content:
      "The Ministry of Education announces the launch of the Education Sector Development Program 2024-2027. This comprehensive program focuses on improving education quality, expanding access to education, and integrating technology in learning. The program includes teacher training, infrastructure development, and digital learning resources.",
    publishedAt: new Date("2024-01-18"),
    category: "education",
    priority: "medium",
    attachments: [
      {
        id: "att-7",
        name: "Program Overview",
        type: "image",
        url: "/images/education-program-overview.jpg",
        size: "2.1 MB",
      },
      {
        id: "att-8",
        name: "Implementation Timeline",
        type: "document",
        url: "/documents/education-timeline.pdf",
        size: "1.2 MB",
      },
    ],
    author: {
      name: "Ministry of Education",
      department: "Policy and Planning",
    },
    isActive: true,
  },
]

export function getActiveAnnouncements(): Announcement[] {
  return dummyAnnouncements
    .filter((announcement) => announcement.isActive)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export function getAnnouncementById(id: string): Announcement | undefined {
  return dummyAnnouncements.find((announcement) => announcement.id === id)
}
