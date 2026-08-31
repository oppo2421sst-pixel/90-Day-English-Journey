import { GrammarLesson } from '../../types';

export const A1_LESSONS: GrammarLesson[] = [
  {
    id: 'g1_be',
    level: 'A1',
    title: 'Verb to Be (is / am / are)',
    titleTh: '1. การใช้ Verb to Be (is / am / are)',
    summary: 'พื้นฐานสำคัญที่สุด ใช้บอกว่าใครเป็นใคร อยู่ที่ไหน หรือมีสภาพเป็นอย่างไร',
    sentencePattern: 'Subject + is / am / are + (Noun / Adjective / Place)',
    ruleExplanation: '• I ใช้ am\n• He, She, It, นามเอกพจน์ ใช้ is\n• You, We, They, นามพหูพจน์ ใช้ are\n• ปฏิเสธ: เติม not หลัง is/am/are (isn\'t, aren\'t)\n• คำถาม: สลับ is/am/are มาไว้หน้าประธาน (Are you ready?)',
    examples: [
      { en: 'I am ready to learn English.', th: 'ฉันพร้อมที่จะเรียนภาษาอังกฤษแล้ว' },
      { en: 'She is a very dedicated student.', th: 'เธอเป็นนักเรียนที่มุ่งมั่นมาก' },
      { en: 'They are my colleagues.', th: 'พวกเขาคือเพื่อนร่วมงานของฉัน' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'She ___ very confident today.',
            options: ['am', 'is', 'are', 'be'],
            answer: 1,
            explanation: 'ประธาน She เป็นเอกพจน์ ใช้ is'
          },
          {
            type: 'choice',
            prompt: 'They ___ at the office right now.',
            options: ['is', 'are', 'am', 'was'],
            answer: 1,
            explanation: 'ประธาน They เป็นพหูพจน์ ใช้ are'
          },
          {
            type: 'type',
            prompt: 'I ___ (be) very proud of your progress.',
            answer: 'am',
            explanation: 'ประธาน I ใช้ am เสมอในรูปปัจจุบัน'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ฉันพร้อมสำหรับความท้าทายนี้แล้ว"',
            scrambledWords: ['for', 'am', 'I', 'this', 'ready', 'challenge.'],
            answer: 'I am ready for this challenge.',
            explanation: 'โครงสร้าง: I + am + ready + for this challenge.'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยคคำถาม: "พวกเขาพร้อมสำหรับการประชุมไหม?"',
            scrambledWords: ['meeting?', 'Are', 'for', 'they', 'the', 'ready'],
            answer: 'Are they ready for the meeting?',
            explanation: 'ประโยคคำถามนำ Are ขึ้นต้น: Are + they + ready for the meeting?'
          },
          {
            type: 'choice',
            prompt: 'The new manager and the designer ___ in the conference room.',
            options: ['is', 'are', 'am', 'being'],
            answer: 1,
            explanation: 'ประธานมี 2 คนเชื่อมด้วย and (พหูพจน์) จึงใช้ are'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'หาจุดผิดในประโยค: "Neither of the two candidates are ready for the interview."',
            options: [
              'Neither of',
              'are (ต้องแก้เป็น is เพราะ Neither of + plural noun ถือเป็นเอกพจน์ตามไวยากรณ์มาตรฐาน)',
              'ready for',
              'the interview'
            ],
            answer: 1,
            explanation: 'Neither of + คำนามพหูพจน์ ตามหลักไวยากรณ์ถือเป็นเอกพจน์ ต้องใช้ is'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ภาษาอังกฤษไม่ใช่เรื่องยากเมื่อคุณฝึกฝนทุกวัน"',
            scrambledWords: ['difficult', 'practice', 'English', 'is', 'not', 'when', 'you', 'daily.'],
            answer: 'English is not difficult when you practice daily.',
            explanation: 'โครงสร้าง: English is not difficult when you practice daily.'
          },
          {
            type: 'type',
            prompt: 'เปลี่ยนประโยค "He is busy" ให้เป็นปฏิเสธแบบรูปย่อ (พิมพ์คำ 2 คำ)',
            answer: "isn't busy",
            explanation: 'รูปย่อปฏิเสธคือ isn\'t busy'
          }
        ]
      }
    }
  },
  {
    id: 'g2_present_simple',
    level: 'A1',
    title: 'Present Simple (Habits & Facts)',
    titleTh: '2. Present Simple บอกกิจวัตรและความจริง',
    summary: 'ใช้พูดถึงสิ่งที่เป็นจริงเสมอ กฎธรรมชาติ หรือสิ่งที่ทำเป็นประจำทุกวัน',
    sentencePattern: 'Subject + V.1 (เติม -s/-es เมื่อประธานเป็น He/She/It)',
    ruleExplanation: '• ประธาน I, You, We, They: กริยาไม่ผัน (I study every day.)\n• ประธาน He, She, It: กริยาเติม -s หรือ -es (She studies every day.)\n• ปฏิเสธ: do not (don\'t) หรือ does not (doesn\'t) + V.1 แท้ไม่ผัน\n• คำบอกเวลา: always, usually, often, sometimes, every day',
    examples: [
      { en: 'I practice English for 15 minutes daily.', th: 'ฉันฝึกภาษาอังกฤษวันละ 15 นาทีทุกวัน' },
      { en: 'He drinks green tea every morning.', th: 'เขาดื่มชาเขียวทุกเช้า' },
      { en: 'Water boils at 100 degrees Celsius.', th: 'น้ำเดือดที่อุณหภูมิ 100 องศาเซลเซียส' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'My brother ___ English every evening.',
            options: ['study', 'studies', 'studying', 'studied'],
            answer: 1,
            explanation: 'ประธานเอกพจน์ กริยา study เปลี่ยน y เป็น i แล้วเติม es -> studies'
          },
          {
            type: 'choice',
            prompt: 'They ___ in Bangkok.',
            options: ['lives', 'live', 'living', 'is live'],
            answer: 1,
            explanation: 'ประธาน They ใช้กริยารูปเดิม live'
          },
          {
            type: 'type',
            prompt: 'She ___ (work) at a technology company.',
            answer: 'works',
            explanation: 'ประธาน She กริยา work เติม s -> works'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เขาดื่มกาแฟทุกเช้า"',
            scrambledWords: ['drinks', 'morning.', 'every', 'coffee', 'He'],
            answer: 'He drinks coffee every morning.',
            explanation: 'โครงสร้าง: He (ประธาน) + drinks (V.1+s) + coffee + every morning.'
          },
          {
            type: 'choice',
            prompt: 'She ___ coffee, she prefers green tea.',
            options: ["doesn't drink", "don't drink", "not drinks", "doesn't drinks"],
            answer: 0,
            explanation: 'ปฏิเสธของ She ใช้ doesn\'t + กริยารูปเดิม drink (ไม่เติม s)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยคคำถาม: "คุณตื่นนอนกี่โมงทุกวัน?"',
            scrambledWords: ['wake', 'do', 'What', 'up', 'you', 'time', 'every', 'day?'],
            answer: 'What time do you wake up every day?',
            explanation: 'คำถาม Wh-: What time + do + you + wake up + every day?'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'หาจุดผิด: "My father doesn\'t likes waking up early on weekends."',
            options: [
              'My father',
              'doesn\'t likes (ต้องแก้เป็น doesn\'t like เพราะหลัง doesn\'t กริยาต้องเป็นช่อง 1 ไม่เติม s)',
              'waking up',
              'on weekends'
            ],
            answer: 1,
            explanation: 'หลัง do / does / doesn\'t กริยาแท้ต้องไม่เติม -s หรือ -es'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "พระอาทิตย์ขึ้นทางทิศตะวันออกและตกทางทิศตะวันตกเสมอ"',
            scrambledWords: ['rises', 'in', 'and', 'the', 'The', 'east', 'sun', 'sets', 'in', 'west.', 'the'],
            answer: 'The sun rises in the east and sets in the west.',
            explanation: 'ข้อเท็จจริงทางธรรมชาติ: The sun rises in the east and sets in the west.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปคำถาม: "___ your sister speak fluent Japanese?" (Do หรือ Does)',
            answer: 'Does',
            explanation: 'ประธาน your sister เป็นเอกพจน์ จึงใช้ Does'
          }
        ]
      }
    }
  },
  {
    id: 'g3_articles',
    level: 'A1',
    title: 'Articles (A, An, The)',
    titleTh: '3. การใช้ A, An, The อย่างถูกต้อง',
    summary: 'คำนำหน้านามพื้นฐานที่ต้องแยกเสียงสระและการระบุเจาะจงให้แม่นยำ',
    sentencePattern: 'A/An + Singular Noun (ไม่เจาะจง) | The + Noun (เจาะจง)',
    ruleExplanation: '• a: ใช้นำหน้านามนับได้เอกพจน์ที่ไม่เจาะจง และขึ้นต้นด้วยเสียงพยัญชนะ (a book, a unique idea - เสียง ย)\n• an: ใช้นำหน้านามนับได้เอกพจน์ที่ขึ้นต้นด้วยเสียงสระ อะ/อา/อิ/อี/อุ/อู (an apple, an hour - เสียง อ)\n• the: ใช้เมื่อทั้งผู้พูดและผู้ฟังรู้กันว่าหมายถึงสิ่งไหนเจาะจง หรือสิ่งที่มีเพียงหนึ่งเดียว (the sun, the world)',
    examples: [
      { en: 'I bought an English dictionary yesterday.', th: 'ฉันซื้อพจนานุกรมภาษาอังกฤษหนึ่งเล่มเมื่อวาน' },
      { en: 'The dictionary is very easy to understand.', th: 'พจนานุกรมเล่มที่ซื้อนั้นเข้าใจง่ายมาก' },
      { en: 'He is an honest person.', th: 'เขาเป็นคนซื่อสัตย์คนหนึ่ง (honest ออกเสียง อ-)' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'She bought ___ apple and a banana.',
            options: ['a', 'an', 'the', '—'],
            answer: 1,
            explanation: 'apple ขึ้นต้นด้วยเสียงสระ (แ-) ใช้ an'
          },
          {
            type: 'choice',
            prompt: '___ sun rises in the morning.',
            options: ['A', 'An', 'The', '—'],
            answer: 2,
            explanation: 'ดวงอาทิตย์มีเพียงหนึ่งเดียวในโลก ใช้ The'
          },
          {
            type: 'type',
            prompt: 'We will meet in ___ (a/an) hour.',
            answer: 'an',
            explanation: 'hour ตัว h ไม่ออกเสียง ออกเสียงเป็น อาว-เออะ (เสียงสระ) จึงใช้ an'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'choice',
            prompt: 'He wants to study at ___ university in the UK.',
            options: ['a', 'an', 'the', '—'],
            answer: 0,
            explanation: 'university ขึ้นต้นด้วยเสียง ยู (เสียงพยัญชนะ /j/) ไม่ใช่เสียง อ- จึงใช้ a'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เขาเป็นคนที่มีความซื่อสัตย์มาก"',
            scrambledWords: ['is', 'He', 'honest', 'an', 'person.', 'very'],
            answer: 'He is a very honest person.',
            explanation: 'เมื่อมี very ขวางหน้า จะดูเสียง v ของ very จึงเป็น a very honest person.'
          },
          {
            type: 'choice',
            prompt: 'I play ___ guitar every weekend.',
            options: ['a', 'an', 'the', '—'],
            answer: 2,
            explanation: 'เครื่องดนตรีใช้กับ play มักมี the นำหน้า เช่น play the guitar'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'ข้อใดใช้ Article ได้ถูกต้องสมบูรณ์แบบที่สุด?',
            options: [
              'She is an European traveler with a MBA degree.',
              'She is a European traveler with an MBA degree.',
              'She is an European traveler with an MBA degree.',
              'She is a European traveler with a MBA degree.'
            ],
            answer: 1,
            explanation: 'European ออกเสียง ยู (/j/) ใช้ "a", ส่วน MBA ออกเสียง เอ็ม-บี-เอ (/em/) ขึ้นต้นด้วยเสียง เอ- จึงใช้ "an"'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ยิ่งฝึกฝนมากเท่าไร ก็ยิ่งเก่งขึ้นเท่านั้น"',
            scrambledWords: ['more', 'better', 'The', 'you', 'practice,', 'the', 'become.', 'you'],
            answer: 'The more you practice, the better you become.',
            explanation: 'โครงสร้างขั้นกว่าคู่ (The + comp..., the + comp...): The more you practice, the better you become.'
          },
          {
            type: 'type',
            prompt: 'เติม article: "Mount Everest is ___ highest mountain in the world." (a/an/the)',
            answer: 'the',
            explanation: 'ขั้นสูงสุด (superlative - highest) ต้องมี the เสมอ'
          }
        ]
      }
    }
  },
  {
    id: 'g4_there_is_are',
    level: 'A1',
    title: 'There is / There are & Quantifiers',
    titleTh: '4. การบอก "มี" (There is / There are) และบอกจำนวน',
    summary: 'ใช้บอกการมีอยู่ของสิ่งต่างๆ และการใช้ some, any, much, many ให้ถูกต้อง',
    sentencePattern: 'There is + Singular / Uncountable | There are + Plural',
    ruleExplanation: '• There is: ใช้นามเอกพจน์ หรือนามนับไม่ได้ (There is some water.)\n• There are: ใช้นามพหูพจน์ (There are three books.)\n• some: ประโยคบอกเล่า (some tea, some apples)\n• any: ประโยคปฏิเสธและคำถาม (not any sugar, any questions?)\n• many (นับได้) vs. much (นับไม่ได้)',
    examples: [
      { en: 'There is a new coffee shop on our street.', th: 'มีร้านกาแฟเปิดใหม่ร้านหนึ่งบนถนนของเรา' },
      { en: 'There are many opportunities for you here.', th: 'มีโอกาสมากมายรอคุณอยู่ที่นี่' },
      { en: 'Is there any milk left in the fridge?', th: 'มีนมเหลืออยู่ในตู้เย็นบ้างไหม?' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: '___ many students in the library today.',
            options: ['There is', 'There are', 'There be', 'There have'],
            answer: 1,
            explanation: 'many students เป็นพหูพจน์ ใช้ There are'
          },
          {
            type: 'choice',
            prompt: 'There is ___ water in the bottle.',
            options: ['some', 'any', 'many', 'a few'],
            answer: 0,
            explanation: 'water เป็นนามนับไม่ได้ ในประโยคบอกเล่าใช้ some'
          },
          {
            type: 'type',
            prompt: 'There ___ (is/are) a big problem with this code.',
            answer: 'is',
            explanation: 'a big problem เป็นเอกพจน์ ใช้ is'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'choice',
            prompt: 'We don\'t have ___ time before the presentation starts.',
            options: ['much', 'many', 'some', 'few'],
            answer: 0,
            explanation: 'time เป็นนามนับไม่ได้ ในประโยคปฏิเสธใช้ much'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยคคำถาม: "มีคำถามอะไรในใจอีกไหม?"',
            scrambledWords: ['Are', 'other', 'there', 'questions', 'in', 'your', 'any', 'mind?'],
            answer: 'Are there any other questions in your mind?',
            explanation: 'คำถามพหูพจน์: Are there any other questions in your mind?'
          },
          {
            type: 'choice',
            prompt: 'Would you like ___ coffee? (ข้อเสนอแนะ)',
            options: ['some', 'any', 'many', 'few'],
            answer: 0,
            explanation: 'ในประโยคยื่นข้อเสนอหรือเชิญชวน (Would you like...?) ให้ใช้ some แม้จะเป็นประโยคคำถาม'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'หาจุดผิด: "There have a lot of furniture in the living room."',
            options: [
              'There have (ต้องแก้เป็น There is เพราะภาษาอังกฤษใช้ There is บอกการมีอยู่ และ furniture เป็นนามนับไม่ได้)',
              'a lot of',
              'furniture',
              'in the living room'
            ],
            answer: 0,
            explanation: 'ภาษาอังกฤษไม่ใช้ "There have" สำหรับแปลว่า "มี" ต้องใช้ There is / There are และ furniture นับไม่ได้จึงใช้ There is'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "แทบไม่มีข้อมูลเพียงพอที่จะตัดสินใจในตอนนี้"',
            scrambledWords: ['is', 'enough', 'hardly', 'make', 'information', 'to', 'There', 'decision.', 'a'],
            answer: 'There is hardly enough information to make a decision.',
            explanation: 'There is hardly enough information to make a decision.'
          },
          {
            type: 'type',
            prompt: 'เติม quantifier: "He has ___ (few/a few/little/a little) friends, so he often feels very lonely." (แทบไม่มีเลย)',
            answer: 'few',
            explanation: 'few (ไม่มี a) แปลว่า แทบไม่มีเลย ในเชิงลบ ใช้กับนามนับได้พหูพจน์ friends'
          }
        ]
      }
    }
  },
  {
    id: 'g5_wh_questions',
    level: 'A1',
    title: 'Wh- Question Words',
    titleTh: '5. การตั้งคำถามด้วย Wh- Questions',
    summary: 'ตั้งคำถามหาข้อมูลอย่างแม่นยำด้วย Who, What, Where, When, Why, How',
    sentencePattern: 'Wh- word + Auxiliary (do/does/is/can) + Subject + Main Verb?',
    ruleExplanation: '• Who = ใคร\n• What = อะไร\n• Where = ที่ไหน\n• When = เมื่อไหร่\n• Why = ทำไม\n• How = อย่างไร (How much/How many/How often)\n• กฎสำคัญ: ต้องมีกริยาช่วย (do/does/is/are/did) คั่นระหว่าง Wh- กับประธานเสมอ ยกเว้นเมื่อ Wh- ทำหน้าที่เป็นประธานเอง (Who called you?)',
    examples: [
      { en: 'Where do you usually study English?', th: 'คุณมักจะอ่านภาษาอังกฤษที่ไหน?' },
      { en: 'Why are you learning this language?', th: 'ทำไมคุณถึงกำลังเรียนภาษานี้?' },
      { en: 'Who broke the window?', th: 'ใครทำหน้าต่างแตก? (Who เป็นประธาน ไม่ต้องใช้ did)' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: '"___ do you live?" - "I live in Chiang Mai."',
            options: ['Where', 'When', 'Who', 'Why'],
            answer: 0,
            explanation: 'ถามถึงสถานที่ใช้ Where'
          },
          {
            type: 'choice',
            prompt: '"___ does the train arrive?" - "At 6:30 PM."',
            options: ['When', 'Where', 'Who', 'Why'],
            answer: 0,
            explanation: 'ถามถึงเวลาใช้ When'
          },
          {
            type: 'type',
            prompt: '"___ (Why/Who/Where) is calling at this late hour?"',
            answer: 'Who',
            explanation: 'ถามว่า "ใคร" กำลังโทรมา ใช้ Who'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'reorder',
            prompt: 'เรียงประโยคคำถาม: "ทำไมคุณถึงต้องการเรียนภาษาอังกฤษ?"',
            scrambledWords: ['do', 'want', 'Why', 'to', 'English?', 'you', 'learn'],
            answer: 'Why do you want to learn English?',
            explanation: 'โครงสร้าง Wh- question: Why + do + you + want + to learn English?'
          },
          {
            type: 'choice',
            prompt: '___ do you go to the gym? - "Three times a week."',
            options: ['How often', 'How many', 'How long', 'How much'],
            answer: 0,
            explanation: 'ถามความถี่ (บ่อยแค่ไหน) ใช้ How often'
          },
          {
            type: 'reorder',
            prompt: 'เรียงคำถาม: "การเดินทางไปสนามบินใช้เวลานานเท่าไร?"',
            scrambledWords: ['How', 'does', 'take', 'it', 'to', 'the', 'long', 'airport?', 'reach'],
            answer: 'How long does it take to reach the airport?',
            explanation: 'โครงสร้าง: How long does it take to reach the airport?'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'ข้อใดตั้งคำถามถูกต้องเมื่อต้องการถามว่า "ใครบอกข่าวนี้กับคุณ?"',
            options: [
              'Who did tell you this news?',
              'Who told you this news?',
              'Who does tell you this news?',
              'Whom told you this news?'
            ],
            answer: 1,
            explanation: 'เมื่อ Who ทำหน้าที่เป็นประธานของประโยค ไม่ต้องใส่กริยาช่วย did/do ให้ใช้รูปกริยาตาม Tense ได้เลย -> Who told you this news?'
          },
          {
            type: 'choice',
            prompt: 'Indirect Question ข้อใดถูกต้อง? "Could you tell me ___?"',
            options: [
              'where does the bank locate',
              'where the bank is',
              'where is the bank',
              'where the bank locate'
            ],
            answer: 1,
            explanation: 'ใน Indirect Question ลำดับคำในอนุประโยคต้องเรียงแบบบอกเล่า (Subject + Verb) คือ "where the bank is"'
          },
          {
            type: 'type',
            prompt: 'เติมคำถาม: "___ of these two shirts do you like more?" (Which หรือ What)',
            answer: 'Which',
            explanation: 'เมื่อมีตัวเลือกจำกัดให้เลือก (two shirts) ต้องใช้ Which'
          }
        ]
      }
    }
  },
  {
    id: 'g6_pronouns',
    level: 'A1',
    title: 'Pronouns & Possessives',
    titleTh: '6. สรรพนามและความเป็นเจ้าของ (My, Mine, Me)',
    summary: 'แยกแยะ Subject, Object, Possessive Adjective และ Pronoun ได้อย่างไม่สับสน',
    sentencePattern: 'Subject (I) | Object (me) | Adj (my + noun) | Pronoun (mine)',
    ruleExplanation: '• Subject Pronoun: อยู่หน้ากริยา (I, You, He, She, It, We, They)\n• Object Pronoun: อยู่หลังกริยาหรือบุพบท (me, you, him, her, it, us, them)\n• Possessive Adjective: ต้องมีนามตามหลังเสมอ (my car, their house)\n• Possessive Pronoun: อยู่เดี่ยวๆ แทนคำนามได้เลย (This car is mine.)\n• Reflexive Pronoun: ทำเอง/สะท้อนตัวเอง (myself, himself, themselves)',
    examples: [
      { en: 'This laptop is mine, but you can borrow it.', th: 'โน้ตบุ๊กเครื่องนี้เป็นของฉัน แต่คุณยืมได้นะ' },
      { en: 'She taught herself how to write code.', th: 'เธอสอนตัวเองให้เขียนโค้ด' },
      { en: 'Give the document to him and me.', th: 'ส่งเอกสารนั้นมาให้เขาและฉัน' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'That book belongs to Sarah. It is ___.',
            options: ['her', 'hers', 'she', 'him'],
            answer: 1,
            explanation: 'hers เป็น Possessive Pronoun แทนคำว่า her book'
          },
          {
            type: 'choice',
            prompt: 'Please send ___ the report as soon as possible.',
            options: ['I', 'me', 'my', 'mine'],
            answer: 1,
            explanation: 'หลังกริยา send ต้องใช้กรรม me'
          },
          {
            type: 'type',
            prompt: 'This is ___ (my/mine) phone, not yours.',
            answer: 'my',
            explanation: 'มีคำนาม phone ตามหลัง ต้องใช้ Possessive Adjective -> my'
          }
        ]
      },
      medium: {
        difficulty: 'medium',
        tierNameTh: 'ระดับ 2: ประกอบประโยค & ไหวพริบ (Medium ⭐⭐)',
        badgeLabel: 'Silver',
        exercises: [
          {
            type: 'choice',
            prompt: 'Between you and ___, I think this project will succeed.',
            options: ['I', 'me', 'my', 'myself'],
            answer: 1,
            explanation: 'หลังคำบุพบท Between ต้องตามด้วย Object Pronoun เสมอ -> Between you and me'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "พวกเขาทำอาหารเย็นมื้อนี้ด้วยตัวเองทั้งหมด"',
            scrambledWords: ['cooked', 'They', 'dinner', 'this', 'themselves.', 'all', 'by'],
            answer: 'They cooked this dinner all by themselves.',
            explanation: 'โครงสร้าง: They cooked this dinner all by themselves.'
          },
          {
            type: 'choice',
            prompt: 'Every student must submit ___ assignment on time.',
            options: ['their', 'his or her', 'theirs', 'them'],
            answer: 0,
            explanation: 'ในภาษาอังกฤษสมัยใหม่ นิยมใช้ singular "their" กับคำว่า every student เพื่อความกระชับและครอบคลุม'
          }
        ]
      },
      hard: {
        difficulty: 'hard',
        tierNameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard ⭐⭐⭐)',
        badgeLabel: 'Gold',
        exercises: [
          {
            type: 'choice',
            prompt: 'หาจุดผิด: "My manager asked Sarah and I to prepare the slide deck."',
            options: [
              'My manager',
              'Sarah and I (ต้องแก้เป็น Sarah and me เพราะทำหน้าที่เป็นกรรมของกริยา asked)',
              'to prepare',
              'the slide deck'
            ],
            answer: 1,
            explanation: 'เป็นกรรมของ asked (asked who? -> asked me) จึงต้องใช้ Sarah and me ไม่ใช่ Sarah and I'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ความสำเร็จของทีมคือผลลัพธ์จากความทุ่มเทของสมาชิกทุกคน"',
            scrambledWords: ['is', 'dedication.', 'team\'s', 'its', 'success', 'The', 'members\'', 'of', 'result', 'the'],
            answer: 'The team\'s success is the result of its members\' dedication.',
            explanation: 'The team\'s success is the result of its members\' dedication.'
          },
          {
            type: 'type',
            prompt: 'เติมสรรพนามสะท้อน: "She repaired the bicycle ___ (herself/himself)."',
            answer: 'herself',
            explanation: 'ประธาน She สรรพนามสะท้อนคือ herself'
          }
        ]
      }
    }
  }
];
