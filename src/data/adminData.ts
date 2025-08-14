import { Leader, IssueAssignment, EscalationAction } from '../types';

export const leaders: Leader[] = [
  {
    id: 'l1',
    firstName: 'Jean Pierre',
    lastName: 'Habimana',
    name: 'Jean Pierre Habimana',
    email: 'jp.habimana@cell.gov.rw',
    phoneNumber: '+250788111222',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'cell',
    location: {
      district: 'Gasabo',
      sector: 'Kacyiru',
      cell: 'Kamatamu'
    },
    department: 'Cell Administration',
    verified: true,
    joinedAt: new Date('2023-03-01'),
  },
  {
    id: 'l2',
    firstName: 'Marie Claire',
    lastName: 'Uwamahoro',
    name: 'Marie Claire Uwamahoro',
    email: 'mc.uwamahoro@sector.gov.rw',
    phoneNumber: '+250788333444',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'sector',
    location: {
      district: 'Gasabo',
      sector: 'Kacyiru'
    },
    department: 'Sector Administration',
    verified: true,
    joinedAt: new Date('2022-08-15'),
  },
  {
    id: 'l3',
    firstName: 'Emmanuel',
    lastName: 'Ntirenganya',
    name: 'Emmanuel Ntirenganya',
    email: 'e.ntirenganya@district.gov.rw',
    phoneNumber: '+250788555666',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'district',
    location: {
      district: 'Gasabo'
    },
    department: 'District Administration',
    verified: true,
    joinedAt: new Date('2021-12-01'),
  },
  {
    id: 'l4',
    firstName: 'Claudine',
    lastName: 'Mukamana',
    name: 'Claudine Mukamana',
    email: 'c.mukamana@cell.gov.rw',
    phoneNumber: '+250788777888',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'cell',
    location: {
      district: 'Nyarugenge',
      sector: 'Nyamirambo',
      cell: 'Biryogo'
    },
    department: 'Cell Administration',
    verified: true,
    joinedAt: new Date('2023-05-20'),
  },
  {
    id: 'l5',
    firstName: 'David',
    lastName: 'Nzeyimana',
    name: 'David Nzeyimana',
    email: 'd.nzeyimana@sector.gov.rw',
    phoneNumber: '+250788999000',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'sector',
    location: {
      district: 'Nyarugenge',
      sector: 'Nyamirambo'
    },
    department: 'Sector Administration',
    verified: true,
    joinedAt: new Date('2022-11-10'),
  },
  {
    id: 'l6',
    firstName: 'Grace',
    lastName: 'Kayitesi',
    name: 'Grace Kayitesi',
    email: 'g.kayitesi@district.gov.rw',
    phoneNumber: '+250788111333',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'district',
    location: {
      district: 'Nyarugenge'
    },
    department: 'District Administration',
    verified: true,
    joinedAt: new Date('2021-07-01'),
  },
];

export const issueAssignments: IssueAssignment[] = [
  {
    id: 'ia1',
    issueId: '1', // Poor Road Conditions on KG 15 Ave
    assignedTo: 'l2', // Marie Claire (Sector level - Kacyiru)
    assignedBy: 'system',
    assignedAt: new Date('2024-01-15'),
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date('2024-02-15'),
    notes: 'Road repairs require coordination with RTDA and budget approval.',
  },
  {
    id: 'ia2',
    issueId: '2', // Water Supply Issues in Nyamirambo Sector
    assignedTo: 'l6', // Grace (District level - Nyarugenge)
    assignedBy: 'system',
    assignedAt: new Date('2024-01-18'),
    status: 'in_progress',
    priority: 'urgent',
    dueDate: new Date('2024-02-01'),
    notes: 'Requires coordination with WASAC and emergency water distribution.',
  },
  {
    id: 'ia3',
    issueId: '3', // Need for More Healthcare Centers in Rural Areas
    assignedTo: 'l4', // Claudine (Cell level - Biryogo)
    assignedBy: 'l5', // Assigned by David (Sector level)
    assignedAt: new Date('2024-01-12'),
    status: 'resolved',
    priority: 'medium',
    dueDate: new Date('2024-03-01'),
    notes: 'Funding approved, construction plans finalized.',
  },
];

export const escalationActions: EscalationAction[] = [
  {
    id: 'ea1',
    issueId: '1',
    fromLeader: 'l1', // Jean Pierre (Cell) escalating to sector
    toLeader: 'l2', // Marie Claire (Sector)
    escalationType: 'up',
    reason: 'Road repair requires sector-level coordination and budget approval. Beyond cell capabilities.',
    createdAt: new Date('2024-01-16'),
    status: 'accepted',
  },
  {
    id: 'ea2',
    issueId: '2',
    fromLeader: 'l5', // David (Sector) escalating to district
    toLeader: 'l6', // Grace (District)
    escalationType: 'up',
    reason: 'Water supply issue affects multiple sectors and requires district-level coordination with WASAC.',
    createdAt: new Date('2024-01-19'),
    status: 'accepted',
  },
];

// Helper function to get issues assigned to a specific leader
export const getIssuesForLeader = (leaderId: string): IssueAssignment[] => {
  return issueAssignments.filter(assignment => assignment.assignedTo === leaderId);
};

// Helper function to check if a leader can handle issues at a specific level
export const canHandleIssueLevel = (leaderLevel: 'cell' | 'sector' | 'district', issueLevel: 'village' | 'cell' | 'sector' | 'district'): boolean => {
  const levels = {
    village: 1,
    cell: 2,
    sector: 3,
    district: 4,
  };
  
  const leaderLevelNum = levels[leaderLevel] || 0;
  const issueLevelNum = levels[issueLevel] || 0;
  
  return leaderLevelNum >= issueLevelNum;
};

// Helper function to get possible escalation targets for a leader
export const getEscalationTargets = (fromLeader: Leader): Leader[] => {
  // Get leaders at higher levels in the same geographic area
  return leaders.filter(leader => {
    // Can't escalate to self
    if (leader.id === fromLeader.id) return false;
    
    // Must be in same district
    if (leader.location.district !== fromLeader.location.district) return false;
    
    if (fromLeader.level === 'cell') {
      // Cell leader can escalate to sector (same sector) or district
      return (leader.level === 'sector' && leader.location.sector === fromLeader.location.sector) ||
             leader.level === 'district';
    } else if (fromLeader.level === 'sector') {
      // Sector leader can only escalate to district
      return leader.level === 'district';
    }
    
    // District leaders can't escalate higher in this system
    return false;
  });
};
