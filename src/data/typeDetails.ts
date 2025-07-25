export interface TypeDetail {
  type: string;
  summary: string;
  characteristics: string[];
  needs: string;
  negativeTraits: string[];
}

export const typeDetails: Record<string, TypeDetail> = {
  'AB': {
    type: 'AB',
    summary: '진취적이며 자신감 있는 행동대장',
    characteristics: [
      '#주도적이고 적극적인',
      '#성과/결과 창출을 중시하는',
      '#빠르고 과감한 의사결정',
      '#합리적이고 논리적으로 판단하는'
    ],
    needs: '다른 사람의 인정과 존경, 그리고 권한',
    negativeTraits: [
      '논리적으로 따지며 공격적인 행동을 함',
      '회사나 상사의 방침에 적극적으로 반항함',
      '문제를 찾아내고 이슈를 제기함',
      '불만이 있으면 바로 상부조직에 고발함'
    ]
  },
  'AA': {
    type: 'AA',
    summary: '관계 속에서 빛나는 사교왕',
    characteristics: [
      '#관계 중심적이고 사교적인',
      '#감정표현이 풍부한',
      '#관심 받는 것을 즐기는',
      '#계산적이지 않고 순진한'
    ],
    needs: '다른 사람의 관심과 호감, 그리고 찬사',
    negativeTraits: [
      '서운한 감정이 쌓이면 쉽게 토라짐',
      '감정적인 방식으로 주변과 대립함',
      '지나치게 외부활동에 많은 시간을 투자함',
      '상대가 논리적으로 설명하면 훈계를 한다고 생각함'
    ]
  },
  'BB': {
    type: 'BB',
    summary: '신뢰할 수 있는 솔직한 조언자',
    characteristics: [
      '#말수가 적고 신중함',
      '#간단명료하게 자신의 생각을 표현함',
      '#합리적이고 분석적인',
      '#엄격하고 완벽주의적인'
    ],
    needs: '다른 사람과의 신뢰관계와 공정성, 그리고 원리원칙',
    negativeTraits: [
      '누군가 특혜를 받거나 공정성이 위배됐다고 생각하면 분노함',
      '신뢰관계를 잃은 상대방에게는 사소한 실수도 용납하지 않음',
      '새로운 일에 대해 부정적인 측면을 강조하고 냉소적임',
      '공정하지 않은 것에 분개하며 날카롭게 지적함'
    ]
  },
  'BA': {
    type: 'BA',
    summary: '배려가 넘치는 따뜻한 평화주의자',
    characteristics: [
      '#논쟁보다 협력을 좋아하는',
      '#모두를 존중하고 수용하는',
      '#다른 사람에게 강요하지 않는',
      '#조화를 위해 인내하는'
    ],
    needs: '다른 사람의 지지와 확신, 그리고 평화',
    negativeTraits: [
      '자신감이 떨어지고 자신을 스스로 평가절하함',
      '결정을 내려야 할 때 우유부단해하고 회피함',
      '수동적인 태도를 보이고 지나치게 높은 의존도를 보임',
      '자신감이 없어 동료들에게 짜증을 불러일으킴'
    ]
  }
};