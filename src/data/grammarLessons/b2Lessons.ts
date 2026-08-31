import { GrammarLesson } from '../../types';

export const B2_LESSONS: GrammarLesson[] = [
  {
    id: 'g19_passive_voice',
    level: 'B2',
    title: 'Passive Voice (Be + V.3)',
    titleTh: '19. Passive Voice ประธานถูกกระทำ',
    summary: 'เน้นผู้ถูกกระทำหรือผลลัพธ์ของการกระทำ นิยมใช้ในข่าว รายงาน และบทความวิชาการ',
    sentencePattern: 'Subject + be (ผันตาม Tense) + V.3 (Past Participle) [+ by Agent]',
    ruleExplanation: '• Present Simple: is / am / are + V.3 (The software is updated regularly.)\n• Past Simple: was / were + V.3 (The temple was built in 1782.)\n• Present Perfect: has / have been + V.3 (All bugs have been fixed.)\n• Modals: modal + be + V.3 (Safety rules must be followed.)\n• ไม่จำเป็นต้องใส่ by agent หากไม่ทราบว่าใครทำหรือไม่สำคัญ',
    examples: [
      { en: 'The new feature was thoroughly tested before release.', th: 'ฟีเจอร์ใหม่ได้รับการทดสอบอย่างละเอียดถี่ถ้วนก่อนปล่อยใช้งาน' },
      { en: 'Over one million copies have been sold worldwide.', th: 'มียอดจำหน่ายมากกว่าหนึ่งล้านเล่มทั่วโลก' },
      { en: 'These regulations must be strictly observed by all staff.', th: 'กฎระเบียบเหล่านี้ต้องได้รับการปฏิบัติตามอย่างเคร่งครัดโดยพนักงานทุกคน' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'This bridge ___ in 1895.',
            options: ['built', 'was built', 'is built', 'has built'],
            answer: 1,
            explanation: 'ระบุปีในอดีต (1895) และสะพานถูกสร้าง จึงใช้ Past Simple Passive -> was built'
          },
          {
            type: 'choice',
            prompt: 'English ___ all over the world.',
            options: ['speaks', 'is spoken', 'spoken', 'is speaking'],
            answer: 1,
            explanation: 'ภาษาอังกฤษถูกพูดโดยผู้คนทั่วโลก ใช้ is spoken'
          },
          {
            type: 'type',
            prompt: 'All emails ___ (be) sent yesterday afternoon.',
            answer: 'were',
            explanation: 'emails เป็นพหูพจน์ในอดีต ใช้ were sent'
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
            prompt: 'The new system ___ right now, so please do not turn off your computer.',
            options: ['is being installed', 'is installing', 'installs', 'was installed'],
            answer: 0,
            explanation: 'กำลังถูกติดตั้ง ณ ตอนนี้ (Present Continuous Passive) ใช้ is being installed'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เอกสารที่เป็นความลับทั้งหมดถูกทำลายเรียบร้อยแล้ว"',
            scrambledWords: ['documents', 'have', 'confidential', 'been', 'All', 'destroyed.', 'already'],
            answer: 'All confidential documents have already been destroyed.',
            explanation: 'All confidential documents have already been destroyed.'
          },
          {
            type: 'choice',
            prompt: 'The package should ___ by tomorrow afternoon.',
            options: ['be delivered', 'deliver', 'delivered', 'being delivered'],
            answer: 0,
            explanation: 'หลัง Modal (should) ในรูป Passive ใช้ should be delivered'
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
            prompt: 'หาจุดผิด: "It is widely believing that regular exercise enhances mental clarity."',
            options: [
              'It is widely believing (ต้องแก้เป็น It is widely believed เพราะเป็นโครงสร้าง Impersonal Passive)',
              'that regular exercise',
              'enhances',
              'mental clarity'
            ],
            answer: 0,
            explanation: 'โครงสร้างความเชื่อทั่วไป Impersonal Passive ต้องเป็น It is widely believed that...'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "นักวิทยาศาสตร์คาดว่าวัคซีนตัวใหม่จะมีประสิทธิภาพสูง"',
            scrambledWords: ['is', 'highly', 'vaccine', 'The', 'expected', 'to', 'effective.', 'be', 'new'],
            answer: 'The new vaccine is expected to be highly effective.',
            explanation: 'The new vaccine is expected to be highly effective.'
          },
          {
            type: 'type',
            prompt: 'เติมกริยาช่อง 3: "The stolen painting has finally been ___ (find) by investigators."',
            answer: 'found',
            explanation: 'กริยาช่อง 3 ของ find คือ found'
          }
        ]
      }
    }
  },
  {
    id: 'g20_second_conditional',
    level: 'B2',
    title: 'Second Conditional (Unreal Present)',
    titleTh: '20. ประโยคเงื่อนไขแบบที่ 2 (สมมติสิ่งที่ไม่จริงในปัจจุบัน)',
    summary: 'ใช้จินตนาการถึงสิ่งที่เป็นไปไม่ได้ หรือตรงข้ามกับความเป็นจริงในปัจจุบัน',
    sentencePattern: 'If + Subject + V.2 (were), Subject + would + V.1 แท้',
    ruleExplanation: '• If-clause: ใช้ Past Simple (V.2) เสมอ (ในภาษาทางการ นิยมใช้ were กับทุกประธาน: If I were you...)\n• Main clause: would / could / might + V.1 แท้\n• ใช้สมมติสิ่งตรงข้ามกับปัจจุบัน หรือให้คำแนะนำอย่างสุภาพ\n• ตัวอย่างคลาสสิก: If I won the lottery, I would travel around the world.',
    examples: [
      { en: 'If I were in your position, I would accept the promotion.', th: 'ถ้าฉันเป็นคุณ ฉันจะตอบรับการเลื่อนตำแหน่งนั้น (ให้คำแนะนำ)' },
      { en: 'If we had more financial resources, we could expand faster.', th: 'ถ้าเรามีทรัพยากรทางการเงินมากกว่านี้ เราคงขยายกิจการได้เร็วกว่านี้' },
      { en: 'What would you do if you were invisible for a day?', th: 'คุณจะทำอะไรถ้าคุณล่องหนได้หนึ่งวัน?' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'If I ___ a million dollars, I would build an animal sanctuary.',
            options: ['have', 'had', 'will have', 'have had'],
            answer: 1,
            explanation: 'สมมติสิ่งที่ไม่จริงในปัจจุบัน If-clause ใช้ Past Simple (had)'
          },
          {
            type: 'choice',
            prompt: 'If she knew his number, she ___ him right away.',
            options: ['calls', 'will call', 'would call', 'called'],
            answer: 2,
            explanation: 'Main clause ของ Second Conditional ใช้ would + V.1 -> would call'
          },
          {
            type: 'type',
            prompt: 'If I ___ (be) you, I would take that golden opportunity.',
            answer: 'were',
            explanation: 'ใน Second Conditional สำนวน "If I were you" นิยมใช้ were เสมอ'
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
            prompt: 'We ___ more often if we lived closer to each other.',
            options: ['would meet', 'will meet', 'met', 'meet'],
            answer: 0,
            explanation: 'Second Conditional Main clause ใช้ would meet'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ถ้าฉันมีเวลาว่างมากกว่านี้ ฉันจะเรียนภาษาที่สาม"',
            scrambledWords: ['had', 'If', 'time,', 'more', 'I', 'free', 'would', 'third', 'a', 'language.', 'learn', 'I'],
            answer: 'If I had more free time, I would learn a third language.',
            explanation: 'If I had more free time, I would learn a third language.'
          },
          {
            type: 'choice',
            prompt: 'Where ___ you travel if you could fly anywhere in the world for free?',
            options: ['would', 'will', 'did', 'can'],
            answer: 0,
            explanation: 'คำถาม Second Conditional ใช้ Where would you travel...?'
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
            prompt: 'หาจุดผิด: "If he would study harder, he would score much higher on the entrance exam."',
            options: [
              'If he would study (ต้องแก้เป็น If he studied เพราะห้ามใส่ would ใน If-clause)',
              'harder',
              'he would score',
              'much higher'
            ],
            answer: 0,
            explanation: 'ห้ามใส่ would ในประโยคย่อย If-clause ให้ใช้รูปกริยาช่อง 2 (studied)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "หากไม่ใช่เพราะความช่วยเหลือของคุณ เราคงไม่มีทางทำสำเร็จได้เลย"',
            scrambledWords: ['for', 'Were', 'help,', 'it', 'your', 'not', 'we', 'succeed.', 'never', 'could'],
            answer: 'Were it not for your help, we could never succeed.',
            explanation: 'การสลับประธาน (Inversion) ใน Second Conditional: Were it not for your help, we could never succeed.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปปฏิเสธ: "If I ___ (not have) to work tomorrow, I would go hiking with you."',
            answer: "didn't have",
            explanation: 'รูปปฏิเสธ Past Simple ใน If-clause คือ didn\'t have'
          }
        ]
      }
    }
  },
  {
    id: 'g21_third_conditional',
    level: 'B2',
    title: 'Third Conditional (Past Regrets)',
    titleTh: '21. ประโยคเงื่อนไขแบบที่ 3 (เสียดายอดีตที่แก้ไขไม่ได้)',
    summary: 'ใช้พูดถึงเหตุการณ์ในอดีตที่ไม่ได้เกิดขึ้นจริง และแสดงความเสียดายหรือข้อสมมติตรงข้ามอดีต',
    sentencePattern: 'If + Subject + had + V.3, Subject + would have + V.3',
    ruleExplanation: '• If-clause: ใช้ Past Perfect (had + V.3)\n• Main clause: would have / could have / might have + V.3\n• มักใช้แสดงความเสียดาย (Regret) หรือโล่งใจที่เรื่องไม่เกิดขึ้น\n• เช่น If I had set an alarm, I would not have overslept.',
    examples: [
      { en: 'If I had studied harder, I would have passed the exam.', th: 'ถ้าตอนนั้นฉันตั้งใจอ่านหนังสือมากกว่านี้ ฉันคงสอบผ่านไปแล้ว (แต่ความจริงไม่ได้ตั้งใจและสอบตก)' },
      { en: 'We would have won the match if our key striker had not been injured.', th: 'พวกเราคงชนะการแข่งขันไปแล้วถ้ากองหน้าคนสำคัญของเราไม่ได้รับบาดเจ็บ' },
      { en: 'If you had told me earlier, I could have helped you.', th: 'ถ้าตอนนั้นคุณบอกฉันเร็วกว่านี้ ฉันคงช่วยคุณได้แล้ว' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'If you ___ earlier, you would have caught the flight.',
            options: ['leave', 'left', 'had left', 'have left'],
            answer: 2,
            explanation: 'If-clause ของ Third Conditional ใช้ had + V.3 -> had left'
          },
          {
            type: 'choice',
            prompt: 'If she had known the truth, she ___ so angry.',
            options: ['would not be', 'would not have been', 'will not be', 'was not'],
            answer: 1,
            explanation: 'Main clause ของ Third Conditional ใช้ would not have been (would have + V.3)'
          },
          {
            type: 'type',
            prompt: 'If we had taken the taxi, we would have ___ (arrive) on time.',
            answer: 'arrived',
            explanation: 'would have + V.3 (arrived)'
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
            prompt: 'เรียงประโยค: "ถ้าคุณบอกฉัน ฉันคงช่วยคุณไปแล้ว"',
            scrambledWords: ['had', 'told', 'me,', 'I', 'helped', 'you.', 'would', 'have', 'If', 'you'],
            answer: 'If you had told me, I would have helped you.',
            explanation: 'If you had told me, I would have helped you.'
          },
          {
            type: 'choice',
            prompt: 'They ___ the contract if their lawyer had advised against it.',
            options: ["wouldn't sign", "wouldn't have signed", "hadn't signed", "won't have signed"],
            answer: 1,
            explanation: 'Third Conditional ผลลัพธ์ในอดีตใช้ wouldn\'t have signed'
          },
          {
            type: 'choice',
            prompt: 'If the weather had been sunny yesterday, we ___ gone to the beach.',
            options: ['could have', 'can have', 'will have', 'must have'],
            answer: 0,
            explanation: 'บอกความสามารถในอดีตที่ไม่ได้ทำ ใช้ could have gone'
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
            prompt: 'ประโยค Inversion (การละ If ในภาษาอังกฤษระดับสูง) ข้อใดถูกต้อง?',
            options: [
              'Had you warned us earlier, we would have avoided the mistake.',
              'Did you warn us earlier, we would have avoided the mistake.',
              'Have you warned us earlier, we would have avoided the mistake.',
              'Would you warn us earlier, we would have avoided the mistake.'
            ],
            answer: 0,
            explanation: 'การละ If ใน Third Conditional ทำได้โดยยก Had ขึ้นต้นประโยค: Had you warned us earlier...'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "หากไม่ใช่เพราะการเตือนของคุณ เราคงสูญเสียทุกอย่างไปแล้ว"',
            scrambledWords: ['Had', 'lost', 'your', 'not', 'been', 'it', 'for', 'warning,', 'we', 'would', 'have', 'everything.'],
            answer: 'Had it not been for your warning, we would have lost everything.',
            explanation: 'Had it not been for your warning, we would have lost everything.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปกริยา: "If they ___ (listen) to the forecast, they wouldn\'t have set sail in the storm."',
            answer: 'had listened',
            explanation: 'had + V.3 -> had listened'
          }
        ]
      }
    }
  },
  {
    id: 'g22_reported_speech',
    level: 'B2',
    title: 'Reported Speech & Backshifting',
    titleTh: '22. การถ่ายทอดคำพูด (Reported Speech)',
    summary: 'เปลี่ยนคำพูดตรง (Direct Speech) เป็นคำบอกเล่า (Reported Speech) โดยการถอย Tense (Backshifting)',
    sentencePattern: 'Direct: "I am ready." -> Reported: She said that she was ready.',
    ruleExplanation: '• กฎการถอย Tense (เมื่อกริยานำเป็นอดีต เช่น said, told):\n  - Present Simple -> Past Simple (am/is -> was, are -> were, like -> liked)\n  - Present Continuous -> Past Continuous (is doing -> was doing)\n  - Present Perfect / Past Simple -> Past Perfect (had done)\n  - will -> would, can -> could\n• เปลี่ยนคำบอกเวลา: now -> then, today -> that day, tomorrow -> the next day, yesterday -> the day before',
    examples: [
      { en: 'Direct: "I will call you tomorrow." -> Reported: He said he would call me the next day.', th: 'เขาบอกว่าเขาจะโทรหาฉันในวันรุ่งขึ้น' },
      { en: 'Direct: "Where do you live?" -> Reported: She asked me where I lived.', th: 'เธอถามฉันว่าฉันอาศัยอยู่ที่ไหน (เรียงแบบบอกเล่า)' },
      { en: 'The doctor advised him to get plenty of rest.', th: 'คุณหมอแนะนำให้เขาพักผ่อนให้มากๆ' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'Direct: "I am tired." -> Reported: She said that she ___ tired.',
            options: ['is', 'was', 'were', 'been'],
            answer: 1,
            explanation: 'ถอย Tense จาก Present Simple (am) เป็น Past Simple (was)'
          },
          {
            type: 'choice',
            prompt: 'Direct: "I will help you." -> Reported: He promised that he ___ help me.',
            options: ['will', 'would', 'shall', 'can'],
            answer: 1,
            explanation: 'will ถอยเป็น would'
          },
          {
            type: 'type',
            prompt: 'Direct: "I can speak Spanish." -> Reported: She said she ___ (can/could) speak Spanish.',
            answer: 'could',
            explanation: 'can ถอยเป็น could'
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
            prompt: 'She asked me ___ I had completed the assignment.',
            options: ['if', 'that', 'what', 'which'],
            answer: 0,
            explanation: 'การถ่ายทอดคำถาม Yes/No Question ต้องใช้ if หรือ whether'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เขาถามฉันว่าฉันอาศัยอยู่ที่ไหน"',
            scrambledWords: ['where', 'asked', 'He', 'I', 'me', 'lived.'],
            answer: 'He asked me where I lived.',
            explanation: 'ลำดับคำใน Reported Question เรียงแบบบอกเล่า: He asked me where I lived.'
          },
          {
            type: 'choice',
            prompt: 'He told ___ that he was leaving immediately.',
            options: ['me', 'to me', 'I', 'mine'],
            answer: 0,
            explanation: 'tell ต้องมีกรรมตามหลังทันที (told me) ไม่ต้องมี to'
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
            prompt: 'หาจุดผิด: "The interviewer asked me what was my greatest weakness."',
            options: [
              'The interviewer',
              'asked me',
              'what was my greatest weakness (ต้องแก้เป็น what my greatest weakness was เพราะใน Reported Question ลำดับคำต้องเป็น Subject + Verb)',
              'greatest weakness'
            ],
            answer: 2,
            explanation: 'ใน Reported Question กริยา (was) ต้องอยู่หลังประธาน: "what my greatest weakness was"'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ทนายความแนะนำให้ลูกค้าของเขานิ่งเงียบไว้"',
            scrambledWords: ['advised', 'The', 'lawyer', 'client', 'his', 'remain', 'to', 'silent.'],
            answer: 'The lawyer advised his client to remain silent.',
            explanation: 'โครงสร้าง advise someone to do something: The lawyer advised his client to remain silent.'
          },
          {
            type: 'type',
            prompt: 'เปลี่ยนคำบอกเวลา: ใน Reported Speech คำว่า "yesterday" มักถูกเปลี่ยนเป็น "the ___ (day before/next day)"',
            answer: 'day before',
            explanation: 'yesterday -> the day before หรือ the previous day'
          }
        ]
      }
    }
  },
  {
    id: 'g23_connectors',
    level: 'B2',
    title: 'Discourse Connectors (Although, Despite, However)',
    titleTh: '23. คำเชื่อมประโยคระดับสูง (Although, Despite, However)',
    summary: 'สร้างประโยคที่มีความลึกซึ้ง แสดงความขัดแย้ง ความเป็นเหตุเป็นผล และการเสริมข้อมูล',
    sentencePattern: 'Although + Clause | Despite / In spite of + Noun/V-ing | However, [Clause]',
    ruleExplanation: '• ความขัดแย้ง:\n  - Although / Even though + S + V (Although it rained, we went out.)\n  - Despite / In spite of + Noun / V-ing (Despite the heavy rain, we went out.)\n  - However: ขึ้นต้นประโยคใหม่แล้วตามด้วย comma (It rained. However, we went out.)\n• เหตุและผล: Because / Since (เพราะว่า) vs. Therefore / Consequently (ดังนั้น)\n• เสริมข้อมูล: Furthermore / Moreover / In addition (นอกจากนี้)',
    examples: [
      { en: 'Despite facing fierce competition, their startup became profitable.', th: 'แม้ว่าจะต้องเผชิญกับการแข่งขันอันดุเดือด สตาร์ทอัพของพวกเขาก็ทำกำไรได้' },
      { en: 'Although she lacked formal training, her performance was extraordinary.', th: 'แม้ว่าเธอจะขาดการฝึกอบรมอย่างเป็นทางการ ผลงานของเธอก็ยอดเยี่ยมอย่างยิ่ง' },
      { en: 'The budget was cut; therefore, we had to adjust our targets.', th: 'งบประมาณถูกตัดทอน ดังนั้นเราจึงจำเป็นต้องปรับเป้าหมายของเรา' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: '___ it was raining heavily, they continued the match.',
            options: ['Although', 'Despite', 'In spite of', 'Because of'],
            answer: 0,
            explanation: 'ข้างหลังเป็นประโยคสมบูรณ์ (it was raining heavily) ใช้ Although'
          },
          {
            type: 'choice',
            prompt: '___ the heavy traffic, we arrived on time.',
            options: ['Although', 'Despite', 'Even though', 'However'],
            answer: 1,
            explanation: 'ข้างหลังเป็นกลุ่มคำนาม (the heavy traffic) ใช้ Despite หรือ In spite of'
          },
          {
            type: 'type',
            prompt: 'He was exhausted; ___ (however/although), he finished the task.',
            answer: 'however',
            explanation: 'ตามหลังเซมิโคลอนและมีจุลภาคคั่น ใช้ however'
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
            prompt: 'In spite of ___ a high salary, he was not satisfied with his job.',
            options: ['earning', 'earn', 'earned', 'to earn'],
            answer: 0,
            explanation: 'หลัง In spite of ต้องตามด้วย Gerund (V-ing) -> earning'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "แม้จะมีอุปสรรคมากมาย พวกเขาก็ไม่เคยสูญเสียความหวัง"',
            scrambledWords: ['obstacles,', 'Despite', 'never', 'numerous', 'hope.', 'they', 'lost'],
            answer: 'Despite numerous obstacles, they never lost hope.',
            explanation: 'Despite numerous obstacles, they never lost hope.'
          },
          {
            type: 'choice',
            prompt: 'The software is fast and reliable; ___, it is completely free to use.',
            options: ['moreover', 'despite', 'although', 'whereas'],
            answer: 0,
            explanation: 'เสริมข้อมูลเชิงบวกเพิ่ม ใช้ moreover (นอกจากนี้)'
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
            prompt: 'หาจุดผิด: "Despite of his extensive experience, he was not selected for the leadership role."',
            options: [
              'Despite of (ต้องแก้เป็น Despite หรือ In spite of เพราะ Despite ห้ามมี of)',
              'his extensive experience',
              'he was not selected',
              'for the leadership role'
            ],
            answer: 0,
            explanation: 'Despite ต้องไม่มี of (ใช้ Despite เดี่ยวๆ หรือ In spite of)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ในขณะที่บางคนชอบความมั่นคง คนอื่นๆ กลับแสวงหาความเสี่ยง"',
            scrambledWords: ['prefer', 'security,', 'others', 'Whereas', 'seek', 'some', 'adventure.', 'people'],
            answer: 'Whereas some people prefer security, others seek adventure.',
            explanation: 'Whereas some people prefer security, others seek adventure.'
          },
          {
            type: 'type',
            prompt: 'เติมคำเชื่อมบอกผล: "The evidence was incontrovertible; ___ (therefore/because), the jury found the defendant guilty." (ดังนั้น)',
            answer: 'therefore',
            explanation: 'therefore = ดังนั้น'
          }
        ]
      }
    }
  },
  {
    id: 'g24_modals_deduction',
    level: 'B2',
    title: 'Modals of Deduction (Must be, Can\'t be, Might have)',
    titleTh: '24. การคาดคะเนตามหลักฐาน (Modals of Deduction)',
    summary: 'คาดการณ์ระดับความมั่นใจในปัจจุบันและอดีตด้วย Must be, Can\'t be, Might have been',
    sentencePattern: 'ปัจจุบัน: must / can\'t / might + V.1 | อดีต: must / can\'t / might + have + V.3',
    ruleExplanation: '• ปัจจุบัน:\n  - must be: มั่นใจ 95%+ ว่าเป็นจริง (He must be the CEO.)\n  - can\'t be: มั่นใจ 95%+ ว่าเป็นไปไม่ได้ (That can\'t be true!)\n  - might / may / could be: เป็นไปได้ 50% (She might be in a meeting.)\n• อดีต:\n  - must have + V.3: มั่นใจว่าเกิดขึ้นในอดีตแน่ๆ (You must have worked very hard.)\n  - can\'t have + V.3: มั่นใจว่าเป็นไปไม่ได้ในอดีต (He can\'t have stolen the money; he was with me.)\n  - might have + V.3: อาจจะเกิดขึ้นในอดีต (I might have left my keys at home.)',
    examples: [
      { en: 'You have been studying for six hours non-stop; you must be exhausted!', th: 'คุณอ่านหนังสือติดต่อกันมาหกชั่วโมงแล้ว คุณต้องเหนื่อยมากแน่ๆ!' },
      { en: 'That woman can\'t be his grandmother; she looks only thirty years old.', th: 'ผู้หญิงคนนั้นไม่มีทางเป็นย่าของเขาได้แน่ๆ เธอดูอายุเพิ่งสามสิบเอง' },
      { en: 'They must have missed the flight because the highway was completely blocked.', th: 'พวกเขาต้องตกเครื่องบินแน่ๆ เพราะทางด่วนปิดสนิท' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'You have been working all day without food. You ___ be starving!',
            options: ['must', "can't", 'might not', 'should to'],
            answer: 0,
            explanation: 'มั่นใจจากหลักฐาน (ทำงานทั้งวันไม่ได้กินข้าว) ว่าต้องหิวมากแน่ๆ ใช้ must be'
          },
          {
            type: 'choice',
            prompt: 'The lights are off and the door is locked. They ___ be at home.',
            options: ["can't", 'must', 'should', 'might'],
            answer: 0,
            explanation: 'มั่นใจว่าเป็นไปไม่ได้ที่จะอยู่บ้าน ใช้ can\'t be'
          },
          {
            type: 'type',
            prompt: 'I am not sure, but she ___ (might/must) know the answer to this question.',
            answer: 'might',
            explanation: 'ไม่แน่ใจ (50%) ใช้ might'
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
            prompt: 'Look at the wet ground! It ___ heavily last night.',
            options: ['must have rained', 'must rain', 'can rain', 'might rain'],
            answer: 0,
            explanation: 'คาดคะเนเหตุการณ์ในอดีตจากหลักฐานที่เห็น (must have + V.3) -> must have rained'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "คุณต้องเหนื่อยมากแน่ๆ หลังจากเดินทางไกล"',
            scrambledWords: ['after', 'very', 'must', 'You', 'be', 'tired', 'the', 'trip.', 'long'],
            answer: 'You must be very tired after the long trip.',
            explanation: 'You must be very tired after the long trip.'
          },
          {
            type: 'choice',
            prompt: 'He ___ the email; otherwise, he would have replied by now.',
            options: ["can't have received", 'must receive', 'should receive', 'could receive'],
            answer: 0,
            explanation: 'มั่นใจว่าเป็นไปไม่ได้ที่เขาได้รับอีเมล (ไม่งั้นคงตอบแล้ว) ในอดีตใช้ can\'t have received'
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
            prompt: 'หาจุดผิด: "John wasn\'t in the office all morning, so he must been working remotely from home."',
            options: [
              'wasn\'t in the office',
              'all morning',
              'must been working (ต้องแก้เป็น must have been working เพราะโครงสร้างอดีตคือ must have been)',
              'remotely from home'
            ],
            answer: 2,
            explanation: 'โครงสร้าง Modal of deduction ในอดีตคือ must have been + V-ing -> must have been working'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "พวกเขาอาจจะเข้าใจผิดคำแนะนำของเราในตอนแรก"',
            scrambledWords: ['instructions', 'They', 'have', 'might', 'misunderstood', 'initially.', 'our'],
            answer: 'They might have misunderstood our instructions initially.',
            explanation: 'They might have misunderstood our instructions initially.'
          },
          {
            type: 'type',
            prompt: 'เติม modal: "She ___ (can\'t/must) have committed the crime because she was on live television in Tokyo at that exact hour." (เป็นไปไม่ได้แน่นอน)',
            answer: "can't",
            explanation: 'มีหลักฐานชัดเจนว่าเป็นไปไม่ได้อย่างแน่นอน ใช้ can\'t have'
          }
        ]
      }
    }
  }
];
