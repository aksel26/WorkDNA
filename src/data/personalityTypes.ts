export interface PersonalityType {
  id: string;
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  workStyle: string;
  teamRole: string;
  color: string;
}

export const personalityTypes: Record<string, PersonalityType> = {
  'AA': {
    id: 'AA',
    name: '외향형 감정가',
    description: '사람들과의 관계를 중시하며 활발하고 따뜻한 성격',
    traits: ['사교적', '감정적', '적극적', '공감능력'],
    strengths: ['팀 분위기 조성', '대인관계', '동기부여', '감정적 지원'],
    workStyle: '사람들과 활발히 소통하며 팀의 화합을 이끌어갑니다.',
    teamRole: '팀 리더, 관계 관리자',
    color: '#FF6B6B'
  },
  'AB': {
    id: 'AB',
    name: '외향형 논리가',
    description: '적극적이면서도 논리적인 사고를 하는 리더십 타입',
    traits: ['적극적', '논리적', '리더십', '설득력'],
    strengths: ['의사결정', '문제해결', '설득', '목표달성'],
    workStyle: '논리적 근거를 바탕으로 적극적으로 일을 추진합니다.',
    teamRole: '프로젝트 리더, 영업 관리자',
    color: '#4ECDC4'
  },
  'BA': {
    id: 'BA',
    name: '내향형 감정가',
    description: '신중하면서도 타인을 배려하는 세심한 성격',
    traits: ['신중함', '배려심', '공감', '섬세함'],
    strengths: ['세심한 관찰', '타인 배려', '깊은 공감', '안정감 제공'],
    workStyle: '깊이 있게 생각하며 타인을 배려하는 방식으로 일합니다.',
    teamRole: '서포터, 상담사',
    color: '#95E1D3'
  },
  'BB': {
    id: 'BB',
    name: '내향형 논리가',
    description: '신중하고 논리적인 사고로 정확한 판단을 하는 타입',
    traits: ['신중함', '논리적', '분석적', '완벽주의'],
    strengths: ['정확한 분석', '신중한 판단', '품질 관리', '전문성'],
    workStyle: '충분히 분석하고 신중하게 접근하여 정확한 결과를 만듭니다.',
    teamRole: '분석가, 전문가',
    color: '#A8E6CF'
  }
};

export function calculatePersonalityType(answers: Record<number, 'A' | 'B'>): {
  type: string;
  scores: Record<string, number>;
  typeCode: string;
} {
  let extrovertCount = 0;
  let feelingCount = 0;
  
  // Count A answers for questions 1-5 (extrovert/introvert)
  for (let i = 1; i <= 5; i++) {
    if (answers[i] === 'A') {
      extrovertCount++;
    }
  }
  
  // Count A answers for questions 6-10 (feeling/thinking)
  for (let i = 6; i <= 10; i++) {
    if (answers[i] === 'A') {
      feelingCount++;
    }
  }
  
  // Determine type codes
  const extrovertIntrovert = extrovertCount >= 3 ? 'A' : 'B';
  const feelingThinking = feelingCount >= 3 ? 'A' : 'B';
  const typeCode = extrovertIntrovert + feelingThinking;
  
  // Calculate scores for display
  const scores = {
    'AA': 0,
    'AB': 0,
    'BA': 0,
    'BB': 0
  };
  
  // Calculate exact scores based on answer counts
  scores['AA'] = (extrovertCount) + (feelingCount);
  scores['AB'] = (extrovertCount) + (5 - feelingCount);
  scores['BA'] = (5 - extrovertCount) + (feelingCount);
  scores['BB'] = (5 - extrovertCount) + (5 - feelingCount);

  return {
    type: typeCode,
    scores,
    typeCode
  };
}

// Import questions for the calculation function
import type { questions } from './questions';