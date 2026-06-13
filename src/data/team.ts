export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: SocialLinks;
}

export interface Position {
  x: string;
  y: string;
}

export interface TeamLayout {
  mobile: Position[];
  tablet: Position[];
  desktop: Position[];
}

export const teamMembers: TeamMemberData[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years scaling enterprise SaaS platforms from seed to Series D.",
    avatar: "https://i.pravatar.cc/300?u=sarah.chen@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "marcus-rivera",
    name: "Marcus Rivera",
    role: "CTO",
    bio: "Former infrastructure lead at FAANG. Architect of distributed systems processing 10B+ requests daily.",
    avatar: "https://i.pravatar.cc/300?u=marcus.rivera@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    role: "Lead Designer",
    bio: "Crafting pixel-perfect experiences at the intersection of art and engineering for 10+ years.",
    avatar: "https://i.pravatar.cc/300?u=aisha.patel@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "Head of Engineering",
    bio: "Building high-performance teams that ship reliable, scalable systems at startup velocity.",
    avatar: "https://i.pravatar.cc/300?u=james.okonkwo@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    role: "Marketing Director",
    bio: "Growth strategist who has led 3 IPOs and built brand narratives reaching 50M+ users globally.",
    avatar: "https://i.pravatar.cc/300?u=yuki.tanaka@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Customer Success",
    bio: "Obsessed with customer outcomes. Driving 98% retention through data-backed success programs.",
    avatar: "https://i.pravatar.cc/300?u=priya.sharma@luminal.io",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export const teamLayout: TeamLayout = {
  desktop: [
    { x: "12%", y: "20%" },
    { x: "72%", y: "14%" },
    { x: "33%", y: "40%" },
    { x: "65%", y: "56%" },
    { x: "16%", y: "72%" },
    { x: "50%", y: "82%" },
  ],
  tablet: [
    { x: "22%", y: "16%" },
    { x: "72%", y: "16%" },
    { x: "22%", y: "44%" },
    { x: "72%", y: "44%" },
    { x: "22%", y: "72%" },
    { x: "72%", y: "72%" },
  ],
  mobile: [
    { x: "50%", y: "14%" },
    { x: "50%", y: "30%" },
    { x: "50%", y: "46%" },
    { x: "50%", y: "62%" },
    { x: "50%", y: "78%" },
    { x: "50%", y: "92%" },
  ],
};
