import { GrammarLesson } from '../../types';

export const A2_LESSONS: GrammarLesson[] = [
  {
    id: 'g7_past_simple',
    level: 'A2',
    title: 'Past Simple (Regular & Irregular Verbs)',
    titleTh: '7. Past Simple เล่าเรื่องอดีตที่จบลงแล้ว',
    summary: 'ใช้บอกเหตุการณ์ในอดีตที่เกิดขึ้นและสิ้นสุดลงแล้วอย่างชัดเจน',
    sentencePattern: 'Subject + V.2 | ปฏิเสธ: Subject + did not + V.1 แท้',
    ruleExplanation: '• กริยาปกติ: เติม -ed (worked, visited, played)\n• กริยาอปกติ (3 ช่อง): เปลี่ยนรูป (went, saw, bought, took, wrote)\n• ปฏิเสธและคำถาม: ใช้ did / didn\'t + V.1 รูปเดิมเสมอ (I didn\'t see him.)\n• คำบอกเวลา: yesterday, last night, two days ago, in 2020',
    examples: [
      { en: 'I graduated from university three years ago.', th: 'ฉันจบการศึกษาจากมหาวิทยาลัยเมื่อสามปีที่แล้ว' },
      { en: 'She did not attend the meeting yesterday.', th: 'เธอไม่ได้เข้าร่วมการประชุมเมื่อวานนี้' },
      { en: 'Did you finish your project on time?', th: 'คุณทำโปรเจกต์เสร็จทันเวลาไหม?' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'They ___ to Japan last winter.',
            options: ['go', 'went', 'gone', 'going'],
            answer: 1,
            explanation: 'มีคำว่า last winter บอกอดีต กริยา go เปลี่ยนเป็น went (V.2)'
          },
          {
            type: 'choice',
            prompt: 'She ___ (buy) a new car two weeks ago.',
            options: ['buys', 'bought', 'buyed', 'buying'],
            answer: 1,
            explanation: 'กริยาช่อง 2 ของ buy คือ bought'
          },
          {
            type: 'type',
            prompt: 'We ___ (see) an interesting documentary yesterday.',
            answer: 'saw',
            explanation: 'กริยาช่อง 2 ของ see คือ saw'
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
            prompt: 'I ___ anything because I was not hungry.',
            options: ["didn't eat", "didn't ate", "not ate", "wasn't eat"],
            answer: 0,
            explanation: 'หลัง didn\'t กริยาต้องกลับเป็นรูปเดิม V.1 -> didn\'t eat'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ฉันพบเขาที่สนามบินเมื่อสัปดาห์ที่แล้ว"',
            scrambledWords: ['him', 'met', 'at', 'week.', 'airport', 'last', 'I', 'the'],
            answer: 'I met him at the airport last week.',
            explanation: 'โครงสร้าง: I met him at the airport last week.'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยคคำถาม: "คุณทำรายงานชิ้นนั้นเสร็จเมื่อคืนนี้ไหม?"',
            scrambledWords: ['you', 'finish', 'Did', 'that', 'night?', 'report', 'last'],
            answer: 'Did you finish that report last night?',
            explanation: 'คำถามในอดีต: Did + you + finish + that report last night?'
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
            prompt: 'หาจุดผิด: "Did you understood what the lecturer explained during the seminar?"',
            options: [
              'Did you understood (ต้องแก้เป็น Did you understand เพราะหลัง Did กริยาต้องเป็นรูปเดิม V.1)',
              'what the lecturer',
              'explained',
              'during the seminar'
            ],
            answer: 0,
            explanation: 'หลังกริยาช่วย Did ต้องใช้รูปกริยาไม่ผัน (bare infinitive) -> Did you understand'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ทันทีที่การนำเสนอจบลง ผู้ชมก็ปรบมืออย่างกึกก้อง"',
            scrambledWords: ['ended,', 'the', 'applauded', 'As', 'audience', 'soon', 'presentation', 'the', 'as', 'warmly.'],
            answer: 'As soon as the presentation ended, the audience applauded warmly.',
            explanation: 'As soon as the presentation ended, the audience applauded warmly.'
          },
          {
            type: 'type',
            prompt: 'ผันกริยาช่อง 2: "The wind ___ (blow) strongly all night."',
            answer: 'blew',
            explanation: 'กริยาช่อง 2 ของ blow คือ blew'
          }
        ]
      }
    }
  },
  {
    id: 'g8_present_continuous',
    level: 'A2',
    title: 'Present Continuous (Actions Happening Now)',
    titleTh: '8. Present Continuous กำลังกระทำอยู่ ณ ตอนนี้',
    summary: 'ใช้บอกสิ่งที่กำลังเกิดขึ้นในขณะที่พูด หรือแผนการที่กำหนดไว้แน่นอนในอนาคตอันใกล้',
    sentencePattern: 'Subject + is / am / are + V-ing',
    ruleExplanation: '• กำลังทำขณะนี้: Look! It is raining. / I am coding right now.\n• นัดหมายแน่นอนในอนาคต: We are meeting the client tomorrow morning.\n• คำบอกเวลา: now, right now, at the moment, currently, Listen!, Look!\n• ระวัง Stative Verbs (กริยาบอกความรู้สึก/ความคิด เช่น know, understand, like, need) ปกติไม่เติม -ing',
    examples: [
      { en: 'She is currently preparing for the IELTS exam.', th: 'เธอกำลังเตรียมตัวสอบ IELTS อยู่ในขณะนี้' },
      { en: 'Look! The stars are shining brightly tonight.', th: 'ดูสิ! คืนนี้ดวงดาวกำลังส่องแสงระยิบระยับ' },
      { en: 'I am not working this Friday.', th: 'ฉันไม่ได้ทำงานวันศุกร์นี้ (วางแผนไว้แล้ว)' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'Please be quiet. The baby ___.',
            options: ['sleeps', 'is sleeping', 'slept', 'are sleeping'],
            answer: 1,
            explanation: 'กำลังเกิดขึ้นในขณะนี้ ใช้ is sleeping'
          },
          {
            type: 'choice',
            prompt: 'They ___ their dinner right now.',
            options: ['have', 'are having', 'has', 'is having'],
            answer: 1,
            explanation: 'ประธาน They ใช้ are having'
          },
          {
            type: 'type',
            prompt: 'I ___ (learn) how to build interactive web apps.',
            answer: 'am learning',
            explanation: 'I + am + learning'
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
            prompt: 'Why ___ about the upcoming interview? Everything will be fine.',
            options: ['are you worrying', 'do you worrying', 'you are worrying', 'are you worry'],
            answer: 0,
            explanation: 'คำถาม Present Continuous: Why + are + you + worrying?'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "พวกเรากำลังทำงานร่วมกับทีมต่างประเทศในขณะนี้"',
            scrambledWords: ['international', 'currently', 'with', 'are', 'We', 'an', 'working', 'team.'],
            answer: 'We are currently working with an international team.',
            explanation: 'We are currently working with an international team.'
          },
          {
            type: 'choice',
            prompt: 'I ___ the explanation now. It makes complete sense.',
            options: ['am understanding', 'understand', 'understands', 'understanding'],
            answer: 1,
            explanation: 'understand เป็น Stative Verb (การรับรู้/เข้าใจ) จึงใช้ Present Simple (understand) ไม่ใช้รูป -ing'
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
            prompt: 'หาจุดผิด: "He is always lose his keys every time he leaves the house."',
            options: [
              'He is always lose (ต้องแก้เป็น is always losing เพื่อบ่นถึงพฤติกรรมน่ารำคาญที่เกิดขึ้นบ่อยๆ)',
              'his keys',
              'every time',
              'he leaves'
            ],
            answer: 0,
            explanation: 'เมื่อใช้ always กับ Present Continuous (is always losing) จะหมายถึงการบ่นว่าทำสิ่งนั้นซ้ำๆ เป็นนิสัย'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ราคาสินค้าอุปโภคบริโภคกำลังปรับตัวสูงขึ้นอย่างต่อเนื่องทั่วโลก"',
            scrambledWords: ['consumer', 'rising', 'are', 'The', 'globally.', 'steadily', 'prices', 'of', 'goods'],
            answer: 'The prices of consumer goods are steadily rising globally.',
            explanation: 'The prices of consumer goods are steadily rising globally.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปปฏิเสธ: "Look at the chart! The company\'s profit ___ (not decrease) this quarter."',
            answer: 'is not decreasing',
            explanation: 'The company\'s profit เป็นเอกพจน์ -> is not decreasing'
          }
        ]
      }
    }
  },
  {
    id: 'g9_comparatives',
    level: 'A2',
    title: 'Comparatives & Superlatives',
    titleTh: '9. การเปรียบเทียบขั้นกว่าและขั้นสูงสุด',
    summary: 'เปรียบเทียบความเท่ากัน ขั้นกว่า (-er / more) และขั้นสูงสุด (the -est / the most)',
    sentencePattern: 'as...as | Adj-er + than / more...than | the Adj-est / the most...',
    ruleExplanation: '• คำสั้น (1 พยางค์): เติม -er / -est (faster than, the fastest)\n• คำลงท้ายด้วย -y: เปลี่ยนเป็น -ier / -iest (easier, the easiest)\n• คำยาว (2+ พยางค์): more...than / the most... (more expensive, the most important)\n• รูปพิเศษ: good -> better -> best | bad -> worse -> worst | far -> further -> furthest',
    examples: [
      { en: 'This software is much faster than the old version.', th: 'ซอฟต์แวร์นี้เร็วกว่าเวอร์ชันเก่ามาก' },
      { en: 'She is the most experienced engineer on our team.', th: 'เธอเป็นวิศวกรที่มีประสบการณ์มากที่สุดในทีมเรา' },
      { en: 'My new phone is not as heavy as my previous one.', th: 'โทรศัพท์เครื่องใหม่ของฉันไม่หนักเท่าเครื่องก่อน' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'My new apartment is ___ than my old one.',
            options: ['big', 'bigger', 'more big', 'biggest'],
            answer: 1,
            explanation: 'big พยางค์เดียว สระเสียงสั้น เบิ้ลตัวสะกดแล้วเติม -er -> bigger'
          },
          {
            type: 'choice',
            prompt: 'This is ___ delicious meal I have ever had.',
            options: ['more', 'most', 'the most', 'the more'],
            answer: 2,
            explanation: 'ขั้นสูงสุดของคำยาว delicious ต้องใช้ the most delicious'
          },
          {
            type: 'type',
            prompt: 'Good in comparative form is ___ (better/gooder).',
            answer: 'better',
            explanation: 'ขั้นกว่าของ good คือ better'
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
            prompt: 'The traffic today is even ___ than it was yesterday.',
            options: ['badder', 'worse', 'worst', 'more bad'],
            answer: 1,
            explanation: 'ขั้นกว่าของ bad คือ worse'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "การเรียนรู้ด้วยการลงมือทำนั้นมีประสิทธิภาพมากกว่าการอ่านเพียงอย่างเดียว"',
            scrambledWords: ['doing', 'is', 'by', 'more', 'effective', 'than', 'reading.', 'just', 'Learning'],
            answer: 'Learning by doing is more effective than just reading.',
            explanation: 'Learning by doing is more effective than just reading.'
          },
          {
            type: 'choice',
            prompt: 'This solution is ___ expensive as the other one, but twice as fast.',
            options: ['as', 'more', 'than', 'so'],
            answer: 0,
            explanation: 'โครงสร้างความเท่ากัน as + adj + as -> as expensive as'
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
            prompt: 'หาจุดผิด: "Of the two proposals presented, the committee chose the most cost-effective one."',
            options: [
              'Of the two proposals',
              'presented',
              'the most cost-effective (ต้องแก้เป็น the more cost-effective เพราะเปรียบเทียบสิ่งของ 2 สิ่ง ใช้ขั้นกว่า)',
              'chose'
            ],
            answer: 2,
            explanation: 'เมื่อเปรียบเทียบสิ่งของ 2 สิ่งที่ชัดเจน (Of the two...) ไวยากรณ์กำหนดให้ใช้รูปขั้นกว่า: "the more cost-effective one"'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เธอมีความมั่นใจขึ้นอย่างเห็นได้ชัดเมื่อเทียบกับปีที่แล้ว"',
            scrambledWords: ['is', 'more', 'significantly', 'than', 'confident', 'She', 'was', 'last', 'she', 'year.'],
            answer: 'She is significantly more confident than she was last year.',
            explanation: 'She is significantly more confident than she was last year.'
          },
          {
            type: 'type',
            prompt: 'เติมคำเน้นขั้นกว่า: "This laptop is ___ (far/more/many) superior to all previous models."',
            answer: 'far',
            explanation: 'ใช้ far (หรือ much) ขยาย superior เพื่อบอกว่าเหนือกว่ามาก'
          }
        ]
      }
    }
  },
  {
    id: 'g10_modals_basic',
    level: 'A2',
    title: 'Modal Verbs (Can, Could, Should, Must)',
    titleTh: '10. กริยาช่วย Modal Verbs (Can, Should, Must)',
    summary: 'บอกความสามารถ การขอร้อง การให้คำแนะนำ และข้อบังคับจำเป็น',
    sentencePattern: 'Subject + Modal + V.1 แท้ (Infinitive without to)',
    ruleExplanation: '• can / could: ความสามารถ / การขอร้องอย่างสุภาพ (Could you help me?)\n• should / shouldn\'t: คำแนะนำ สิ่งที่ควรทำ (You should rest.)\n• must / have to: ความจำเป็น กฎระเบียบ (You must wear a helmet.)\n• mustn\'t (ห้ามทำเด็ดขาด) vs. don\'t have to (ไม่จำเป็นต้องทำ ทำก็ได้ไม่ทำก็ได้)\n• กฎเหล็ก: หลัง Modal ทุกตัว กริยาแท้ต้องไม่ผัน (ห้ามเติม s, ed, ing, to)',
    examples: [
      { en: 'You should practice speaking English every day.', th: 'คุณควรฝึกพูดภาษาอังกฤษทุกวัน' },
      { en: 'You must not disclose confidential passwords.', th: 'คุณต้องไม่เปิดเผยรหัสผ่านที่เป็นความลับ (ห้ามเด็ดขาด)' },
      { en: 'You don\'t have to come if you feel unwell.', th: 'คุณไม่จำเป็นต้องมาก็ได้ถ้าคุณรู้สึกไม่สบาย' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'You look exhausted. You ___ take a break.',
            options: ['should', 'must to', 'should to', 'can to'],
            answer: 0,
            explanation: 'ให้คำแนะนำใช้ should + V.1 ไม่ต้องมี to'
          },
          {
            type: 'choice',
            prompt: 'She ___ speak three languages fluently.',
            options: ['can', 'cans', 'can to', 'is can'],
            answer: 0,
            explanation: 'บอกความสามารถใช้ can + V.1 ไม่เติม s'
          },
          {
            type: 'type',
            prompt: 'You ___ (must/should) stop when the traffic light turns red.',
            answer: 'must',
            explanation: 'กฎจราจรเป็นข้อบังคับเด็ดขาด ใช้ must'
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
            prompt: 'Tomorrow is a public holiday, so we ___ go to the office.',
            options: ["mustn't", "don't have to", "shouldn't", "can't not"],
            answer: 1,
            explanation: 'ไม่จำเป็นต้องไป (หยุดก็ได้) ใช้ don\'t have to'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยคขอร้องอย่างสุภาพ: "คุณช่วยกรุณาตรวจสอบเอกสารนี้ให้ฉันได้ไหม?"',
            scrambledWords: ['Could', 'check', 'document', 'for', 'you', 'please', 'this', 'me?'],
            answer: 'Could you please check this document for me?',
            explanation: 'Could you please check this document for me?'
          },
          {
            type: 'choice',
            prompt: 'You ___ touch that high-voltage wire! It is extremely dangerous.',
            options: ["must not", "don't have to", "should", "need not"],
            answer: 0,
            explanation: 'ห้ามทำเด็ดขาดเพราะอันตราย ใช้ must not'
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
            prompt: 'หาจุดผิด: "Applicants must to submit their certified certificates before Friday."',
            options: [
              'Applicants',
              'must to submit (ต้องแก้เป็น must submit เพราะหลัง must ห้ามมี to)',
              'their certified certificates',
              'before Friday'
            ],
            answer: 1,
            explanation: 'หลัง modal verb "must" ต้องตามด้วย bare infinitive (กริยารูปเดิมไม่มี to)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เราควรพิจารณาตัวเลือกทั้งหมดอย่างรอบคอบก่อนสรุปแผนงาน"',
            scrambledWords: ['options', 'before', 'all', 'carefully', 'We', 'finalizing', 'should', 'the', 'plan.', 'consider'],
            answer: 'We should consider all options carefully before finalizing the plan.',
            explanation: 'We should consider all options carefully before finalizing the plan.'
          },
          {
            type: 'type',
            prompt: 'เติม modal: "___ (May/Must) I have permission to record this lecture for educational purposes?" (การขออนุญาตอย่างสุภาพเป็นทางการ)',
            answer: 'May',
            explanation: 'การขออนุญาตอย่างเป็นทางการใช้ May I...?'
          }
        ]
      }
    }
  },
  {
    id: 'g11_future_forms',
    level: 'A2',
    title: 'Future Forms (Will vs. Be Going To)',
    titleTh: '11. อนาคต Will vs. Be Going To',
    summary: 'แยกแยะการตัดสินใจกะทันหัน vs. แผนการที่ตั้งใจเตรียมการไว้ล่วงหน้า',
    sentencePattern: 'Will + V.1 (กะทันหัน / ทำนาย) | Be going to + V.1 (มีแผน / มีหลักฐานชัด)',
    ruleExplanation: '• will: ตัดสินใจทันที (The phone is ringing. I\'ll answer it.) / คำสัญญา / การคาดการณ์ทั่วไป\n• be going to: แผนการที่ตั้งใจไว้ล่วงหน้า (I am going to study abroad next year.) / คาดการณ์จากหลักฐานที่เห็น (Look at the dark clouds! It is going to rain.)',
    examples: [
      { en: 'I think our team will win the tournament.', th: 'ฉันคิดว่าทีมเราจะชนะการแข่งขัน (การคาดการณ์)' },
      { en: 'I am going to visit my parents this weekend.', th: 'ฉันตั้งใจจะไปเยี่ยมพ่อแม่สุดสัปดาห์นี้ (วางแผนไว้แล้ว)' },
      { en: 'Look at that glass! It is going to fall off the table.', th: 'ดูแก้วน้ำนั่นสิ! มันกำลังจะตกจากโต๊ะแล้ว (เห็นหลักฐานชัดเจน)' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: '"I don\'t have a pen." - "Don\'t worry, I ___ lend you mine."',
            options: ['will', 'am going to', 'am lending', 'went to'],
            answer: 0,
            explanation: 'ตัดสินใจช่วยในทันที ณ ขณะพูด ใช้ will'
          },
          {
            type: 'choice',
            prompt: 'Look at those dark clouds! It ___ rain.',
            options: ['will', 'is going to', 'is raining', 'rains'],
            answer: 1,
            explanation: 'มีหลักฐานชัดเจนตรงหน้า (เมฆดำ) ใช้ is going to'
          },
          {
            type: 'type',
            prompt: 'I promise I ___ (will/am going to) call you as soon as I arrive.',
            answer: 'will',
            explanation: 'การให้คำสัญญา (promise) ใช้ will เสมอ'
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
            prompt: 'We ___ a new product line next month. The budget has already been approved.',
            options: ['are going to launch', 'will launch', 'launched', 'launches'],
            answer: 0,
            explanation: 'มีแผนการและอนุมัติงบไว้ล่วงหน้าแล้ว ใช้ are going to launch (หรือ are launching)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ฉันจะส่งรายงานฉบับสมบูรณ์ให้คุณภายในวันพรุ่งนี้"',
            scrambledWords: ['send', 'report', 'the', 'I', 'will', 'you', 'tomorrow.', 'by', 'complete'],
            answer: 'I will send you the complete report by tomorrow.',
            explanation: 'I will send you the complete report by tomorrow.'
          },
          {
            type: 'choice',
            prompt: 'What ___ do after you finish university?',
            options: ['are you going to', 'will you', 'do you going to', 'are you will'],
            answer: 0,
            explanation: 'ถามถึงแผนการชีวิตที่วางไว้ ใช้ are you going to do'
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
            prompt: 'ประโยคใดแสดงถึง "การนัดหมายกำหนดการอย่างเป็นทางการที่มีตารางเวลาแน่นอน (Timetable)"?',
            options: [
              'The flight to Tokyo leaves at 8:00 AM tomorrow.',
              'The flight to Tokyo will leave at 8:00 AM tomorrow.',
              'The flight to Tokyo is going to leave at 8:00 AM tomorrow.',
              'The flight to Tokyo leaving at 8:00 AM tomorrow.'
            ],
            answer: 0,
            explanation: 'ตารางเวลาขนส่งสาธารณะ/ตารางสอบอย่างเป็นทางการ นิยมใช้ Present Simple (leaves at 8:00 AM)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ปัญญาประดิษฐ์จะเข้ามาเปลี่ยนแปลงวิธีการทำงานของเราอย่างแน่นอน"',
            scrambledWords: ['Artificial', 'undoubtedly', 'transform', 'intelligence', 'how', 'work.', 'will', 'we'],
            answer: 'Artificial intelligence will undoubtedly transform how we work.',
            explanation: 'Artificial intelligence will undoubtedly transform how we work.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปย่อ: "Don\'t worry! I ___ (will not) let you down." (รูปย่อคือ won\'t)',
            answer: "won't",
            explanation: 'รูปย่อปฏิเสธของ will not คือ won\'t'
          }
        ]
      }
    }
  },
  {
    id: 'g12_prepositions',
    level: 'A2',
    title: 'Prepositions of Time & Place (In, On, At)',
    titleTh: '12. บุพบทบอกเวลาและสถานที่ (In, On, At)',
    summary: 'กฎรูปสามเหลี่ยมพีระมิด In (กว้างสุด) -> On (แคบลงมา) -> At (เฉพาะเจาะจง)',
    sentencePattern: 'In (เดือน/ปี/เมือง) | On (วัน/วันที่/ถนน) | At (เวลา/สถานที่จุดเฉพาะ)',
    ruleExplanation: '• Time:\n  - In: เดือน, ปี, ฤดูกาล, ศตวรรษ (in May, in 2026, in the morning)\n  - On: วัน, วันที่, วันสำคัญ (on Monday, on May 5th, on my birthday)\n  - At: จุดเวลาบนหน้าปัดนาฬิกา, ช่วงเวลาเฉพาะ (at 7:30 AM, at noon, at night)\n• Place:\n  - In: ภายในพื้นที่ปิด, เมือง, ประเทศ (in a room, in Bangkok, in Thailand)\n  - On: บนพื้นผิว, ริมถนน, ยานพาหนะสาธารณะ (on the table, on Silom Road, on the train)\n  - At: พิกัดเฉพาะเจาะจง (at the bus stop, at home, at work, at the door)',
    examples: [
      { en: 'The conference begins at 9:00 AM on Monday in London.', th: 'การประชุมเริ่มเวลา 9:00 น. ในวันจันทร์ ที่ลอนดอน' },
      { en: 'She was born on July 14th in 1998.', th: 'เธอเกิดวันที่ 14 กรกฎาคม ในปี 1998' },
      { en: 'I am currently waiting for you at the front entrance.', th: 'ตอนนี้ฉันกำลังรอคุณอยู่ที่ทางเข้าด้านหน้า' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'The meeting starts ___ 9:30 AM sharp.',
            options: ['in', 'on', 'at', 'by'],
            answer: 2,
            explanation: 'จุดเวลาบนหน้าปัดนาฬิกาใช้ at'
          },
          {
            type: 'choice',
            prompt: 'We celebrate New Year\'s Day ___ January 1st.',
            options: ['in', 'on', 'at', 'from'],
            answer: 1,
            explanation: 'มีระบุ "วันที่" เจาะจง (January 1st) ใช้ on'
          },
          {
            type: 'type',
            prompt: 'She lives ___ (in/on/at) Thailand.',
            answer: 'in',
            explanation: 'ประเทศ/เมืองใหญ่ ใช้ in'
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
            prompt: 'I am reading an interesting book while traveling ___ the train.',
            options: ['in', 'on', 'at', 'by'],
            answer: 1,
            explanation: 'ยานพาหนะสาธารณะขนาดใหญ่ที่เดินไปมาได้ (train, bus, plane, ship) ใช้ on'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เราจะพบกันที่ร้านกาแฟในเช้าวันเสาร์"',
            scrambledWords: ['will', 'meet', 'the', 'at', 'on', 'Saturday', 'cafe', 'We', 'morning.'],
            answer: 'We will meet at the cafe on Saturday morning.',
            explanation: 'We will meet at the cafe on Saturday morning.'
          },
          {
            type: 'choice',
            prompt: 'He likes to read books ___ night before going to sleep.',
            options: ['in', 'on', 'at', 'by'],
            answer: 2,
            explanation: 'สำนวนเวลา "ตอนกลางคืน" ใช้ at night (แต่ in the morning, in the evening)'
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
            prompt: 'ข้อใดใช้ Preposition ได้ถูกต้องตามความหมาย "ตรงเวลาเป๊ะ (punctual)" และ "ทันเวลาพอดีก่อนสาย (before deadline)"?',
            options: [
              'on time (ตรงเวลาเป๊ะ) / in time (ทันเวลาก่อนสาย)',
              'in time (ตรงเวลาเป๊ะ) / on time (ทันเวลาก่อนสาย)',
              'at time (ตรงเวลาเป๊ะ) / for time (ทันเวลาก่อนสาย)',
              'by time (ตรงเวลาเป๊ะ) / with time (ทันเวลาก่อนสาย)'
            ],
            answer: 0,
            explanation: 'on time = ตรงตามตารางเวลาเป๊ะ (เช่น รถไฟออกตรงเวลา), in time = ทันเวลาพอดิบพอดี (เช่น วิ่งมาทันก่อนประตูปิด)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ผลวิจัยได้รับการตีพิมพ์ในวารสารวิทยาศาสตร์ในฤดูใบไม้ผลิ"',
            scrambledWords: ['findings', 'were', 'published', 'journal', 'a', 'in', 'The', 'the', 'scientific', 'spring.', 'in'],
            answer: 'The findings were published in a scientific journal in the spring.',
            explanation: 'The findings were published in a scientific journal in the spring.'
          },
          {
            type: 'type',
            prompt: 'เติม preposition: "He arrived ___ (in/at/to) the airport just before the gate closed."',
            answer: 'at',
            explanation: 'arrive at + สถานที่เฉพาะ (airport, station) หรือ arrive in + เมือง/ประเทศ'
          }
        ]
      }
    }
  }
];
