export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: 'A' | 'B';
    type: 'extrovert' | 'introvert' | 'feeling' | 'thinking';
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "평소에 사람들과 대화할 때 나는",
    options: [
      {
        text: "상대방의 말에 맞장구치면서 호응하는 편이다.",
        value: 'A',
        type: 'extrovert'
      },
      {
        text: "상대방의 말을 잘 들어주는 편이다.",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 2,
    text: "내 의견이 받아들여지지 않을 것 같은 상황에서 나는",
    options: [
      {
        text: "그래도 일단 말해보는 편이다.",
        value: 'A',
        type: 'extrovert'
      },
      {
        text: "그렇다면 굳이 말하지 않는 편이다.",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 3,
    text: "평소에 나는",
    options: [
      {
        text: "쾌활하고 말이 많은 것 같다",
        value: 'A',
        type: 'extrovert'
      },
      {
        text: "신중하고 생각이 많은 것 같다",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 4,
    text: "평소 업무 상황에서 나는",
    options: [
      {
        text: "적극적으로 의견을 내는 편이다.",
        value: 'A',
        type: 'extrovert'
      },
      {
        text: "다른 사람의 의견을 지지하고 따르는 편이다.",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 5,
    text: "새로운 사람을 만나면 나는",
    options: [
      {
        text: "대화를 이끌어가는 편이다.",
        value: 'A',
        type: 'extrovert'
      },
      {
        text: "가급적 필요한 이야기만 하는 편이다.",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 6,
    text: "내가 함께 일하고 싶은 사람은",
    options: [
      {
        text: "친절하고 인간미가 있는 사람이다.",
        value: 'A',
        type: 'feeling'
      },
      {
        text: "감정에 치우치지 않고 공정한 사람이다.",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 7,
    text: "내가 잘하는 것은",
    options: [
      {
        text: "주변 사람을 즐겁게/기쁘게 하는 것이다.",
        value: 'A',
        type: 'feeling'
      },
      {
        text: "다른 사람을 설명/설득하는 일이다.",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 8,
    text: "다른 사람과 대화 중 불편한 부분이 있을 때 나는",
    options: [
      {
        text: "싫은 소리를 잘 못하고 참는 편이다.",
        value: 'A',
        type: 'feeling'
      },
      {
        text: "상대가 싫어할 수 있어도 해야 할 말은 하는 편이다.",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 9,
    text: "평소 상대방이 고민 상담을 할 때 나는",
    options: [
      {
        text: "공감과 위로를 하는 편이다.",
        value: 'A',
        type: 'feeling'
      },
      {
        text: "해결 방안을 제시하는 편이다.",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 10,
    text: "나는 평소에 상대방으로부터",
    options: [
      {
        text: "친절하고 따뜻한 사람이라는 소리를 듣는다.",
        value: 'A',
        type: 'feeling'
      },
      {
        text: "합리적이고 논리적인 사람이라는 소리를 듣는다.",
        value: 'B',
        type: 'thinking'
      }
    ]
  }
];