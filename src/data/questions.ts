export interface Question {
  id: number;
  textKey: string; // 번역 키로 변경
  options: {
    textKey: string; // 번역 키로 변경
    value: 'A' | 'B';
    type: 'extrovert' | 'introvert' | 'feeling' | 'thinking';
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    textKey: "questions.1.text",
    options: [
      {
        textKey: "questions.1.options.A",
        value: 'A',
        type: 'extrovert'
      },
      {
        textKey: "questions.1.options.B",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 2,
    textKey: "questions.2.text",
    options: [
      {
        textKey: "questions.2.options.A",
        value: 'A',
        type: 'extrovert'
      },
      {
        textKey: "questions.2.options.B",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 3,
    textKey: "questions.3.text",
    options: [
      {
        textKey: "questions.3.options.A",
        value: 'A',
        type: 'extrovert'
      },
      {
        textKey: "questions.3.options.B",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 4,
    textKey: "questions.4.text",
    options: [
      {
        textKey: "questions.4.options.A",
        value: 'A',
        type: 'extrovert'
      },
      {
        textKey: "questions.4.options.B",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 5,
    textKey: "questions.5.text",
    options: [
      {
        textKey: "questions.5.options.A",
        value: 'A',
        type: 'extrovert'
      },
      {
        textKey: "questions.5.options.B",
        value: 'B',
        type: 'introvert'
      }
    ]
  },
  {
    id: 6,
    textKey: "questions.6.text",
    options: [
      {
        textKey: "questions.6.options.A",
        value: 'A',
        type: 'feeling'
      },
      {
        textKey: "questions.6.options.B",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 7,
    textKey: "questions.7.text",
    options: [
      {
        textKey: "questions.7.options.A",
        value: 'A',
        type: 'feeling'
      },
      {
        textKey: "questions.7.options.B",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 8,
    textKey: "questions.8.text",
    options: [
      {
        textKey: "questions.8.options.A",
        value: 'A',
        type: 'feeling'
      },
      {
        textKey: "questions.8.options.B",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 9,
    textKey: "questions.9.text",
    options: [
      {
        textKey: "questions.9.options.A",
        value: 'A',
        type: 'feeling'
      },
      {
        textKey: "questions.9.options.B",
        value: 'B',
        type: 'thinking'
      }
    ]
  },
  {
    id: 10,
    textKey: "questions.10.text",
    options: [
      {
        textKey: "questions.10.options.A",
        value: 'A',
        type: 'feeling'
      },
      {
        textKey: "questions.10.options.B",
        value: 'B',
        type: 'thinking'
      }
    ]
  }
];