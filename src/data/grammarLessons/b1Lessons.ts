import { GrammarLesson } from '../../types';

export const B1_LESSONS: GrammarLesson[] = [
  {
    id: 'g13_present_perfect',
    level: 'B1',
    title: 'Present Perfect (Have / Has + V.3)',
    titleTh: '13. Present Perfect เชื่อมโยงอดีตถึงปัจจุบัน',
    summary: 'ใช้บอกประสบการณ์ สิ่งที่ทำตั้งแต่อดีตจนถึงปัจจุบัน หรือเพิ่งเกิดขึ้นและส่งผลถึงตอนนี้',
    sentencePattern: 'Subject + have / has + V.3 (Past Participle)',
    ruleExplanation: '• ประสบการณ์ (เคย/ไม่เคย): ever, never (Have you ever visited London?)\n• ทำมาต่อเนื่องจนถึงปัจจุบัน: since (ตั้งแต่จุดเวลา), for (เป็นระยะเวลา)\n• เพิ่งเสร็จสิ้น / เกิดผลชัดเจน: already (แล้ว), just (เพิ่งจะ), yet (ยังไม่ - ใช้ในปฏิเสธและคำถาม)\n• ข้อแตกต่างสำคัญ: ถ้ามีเวลาระบุชัดเจนในอดีต (yesterday, in 2019) ห้ามใช้ Present Perfect ให้ใช้ Past Simple (V.2)',
    examples: [
      { en: 'I have lived in this city for over five years.', th: 'ฉันอาศัยอยู่ในเมืองนี้มานานกว่าห้าปีแล้ว (ตอนนี้ก็ยังอยู่)' },
      { en: 'She has already completed the quarterly audit.', th: 'เธอทำรายงานตรวจสอบประจำไตรมาสเสร็จเรียบร้อยแล้ว' },
      { en: 'Have you ever spoken English with a native speaker?', th: 'คุณเคยพูดภาษาอังกฤษกับเจ้าของภาษามาก่อนไหม?' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'She ___ at this company since 2018.',
            options: ['works', 'has worked', 'worked', 'is working'],
            answer: 1,
            explanation: 'มี since 2018 แสดงเหตุการณ์ที่ทำต่อเนื่องตั้งแต่อดีตถึงปัจจุบัน ใช้ has worked'
          },
          {
            type: 'choice',
            prompt: 'Have you ___ eaten authentic Mexican tacos?',
            options: ['ever', 'never', 'yet', 'already'],
            answer: 0,
            explanation: 'ถามถึงประสบการณ์ในประโยคคำถามว่า "เคย...ไหม" ใช้ ever'
          },
          {
            type: 'type',
            prompt: 'I have not received the confirmation email ___ (already/just/yet).',
            answer: 'yet',
            explanation: 'ในประโยคปฏิเสธ แปลว่า "ยัง..." อยู่ท้ายประโยค ใช้ yet'
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
            prompt: 'I ___ my keys! Can you help me find them?',
            options: ['have lost', 'lost', 'had lost', 'am losing'],
            answer: 0,
            explanation: 'กุญแจหายในอดีตและส่งผลถึงปัจจุบัน (ตอนนี้ยังหากุญแจไม่เจอ) ใช้ have lost'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "พวกเราทำงานร่วมกันมาเป็นเวลานานกว่าสิบปีแล้ว"',
            scrambledWords: ['for', 'have', 'more', 'together', 'worked', 'than', 'We', 'ten', 'years.'],
            answer: 'We have worked together for more than ten years.',
            explanation: 'We have worked together for more than ten years.'
          },
          {
            type: 'choice',
            prompt: 'She ___ to Paris three times in her life.',
            options: ['has been', 'has gone', 'went', 'was'],
            answer: 0,
            explanation: 'เคยไปแล้วกลับมาแล้ว (ประสบการณ์) ใช้ have/has been to (ถ้า has gone to แปลว่าไปแล้วยังไม่กลับมา)'
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
            prompt: 'หาจุดผิด: "I have seen that wonderful movie yesterday with my friends."',
            options: [
              'I have seen (ต้องแก้เป็น I saw เพราะมี yesterday ระบุเวลาชัดเจนในอดีต ห้ามใช้ Present Perfect)',
              'that wonderful movie',
              'yesterday',
              'with my friends'
            ],
            answer: 0,
            explanation: 'เมื่อมีคำระบุเวลาอดีตที่เจาะจงชัดเจน (yesterday) ต้องใช้ Past Simple (saw) เท่านั้น'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "นี่คือบทความที่เขียนได้น่าประทับใจที่สุดเท่าที่ฉันเคยอ่านมา"',
            scrambledWords: ['is', 'impressive', 'most', 'the', 'article', 'This', 'ever', 'read.', 'I', 'have'],
            answer: 'This is the most impressive article I have ever read.',
            explanation: 'โครงสร้าง Superlative + Present Perfect: This is the most impressive article I have ever read.'
          },
          {
            type: 'type',
            prompt: 'เติมกริยาช่อง 3 ของ write: "She has ___ (write) three successful books."',
            answer: 'written',
            explanation: 'กริยาช่อง 3 ของ write คือ written'
          }
        ]
      }
    }
  },
  {
    id: 'g14_past_continuous',
    level: 'B1',
    title: 'Past Continuous vs. Past Simple',
    titleTh: '14. เหตุการณ์กำลังเกิดขึ้นในอดีตและมีเหตุการณ์แทรก',
    summary: 'เหตุการณ์ที่กำลังดำเนินอยู่ (Past Cont: was/were + V-ing) และเหตุการณ์สั้นๆ เข้ามาแทรก (Past Sim: V.2)',
    sentencePattern: 'While + Past Continuous (was/were + V-ing), Past Simple (V.2)',
    ruleExplanation: '• เหตุการณ์ยาวกำลังดำเนินอยู่: was / were + V-ing (I was sleeping...)\n• เหตุการณ์สั้นเข้ามาแทรก: V.2 (the phone rang)\n• While / As มักตามด้วย Past Continuous (While I was driving...)\n• When มักตามด้วย Past Simple (When you called me...)',
    examples: [
      { en: 'While I was studying, the electricity suddenly went out.', th: 'ขณะที่ฉันกำลังอ่านหนังสืออยู่ ไฟฟ้าก็ดับลงกะทันหัน' },
      { en: 'What were you doing when the alarm sounded?', th: 'คุณกำลังทำอะไรอยู่ตอนที่สัญญาณเตือนภัยดังขึ้น?' },
      { en: 'They were discussing the proposal when the director entered.', th: 'พวกเขากำลังอภิปรายข้อเสนอกันอยู่ตอนที่ผู้อำนวยการเดินเข้ามา' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'I ___ (walk) in the park when it started to rain heavily.',
            options: ['was walking', 'walked', 'am walking', 'were walking'],
            answer: 0,
            explanation: 'I เป็นเอกพจน์ กำลังกระทำอยู่ตอนนั้น ใช้ was walking'
          },
          {
            type: 'choice',
            prompt: 'They ___ dinner when the doorbell rang.',
            options: ['were having', 'was having', 'had', 'are having'],
            answer: 0,
            explanation: 'They เป็นพหูพจน์ ใช้ were having'
          },
          {
            type: 'type',
            prompt: 'While she was cooking, she accidentally ___ (cut) her finger.',
            answer: 'cut',
            explanation: 'เหตุการณ์ที่เกิดแทรกใช้ Past Simple (กริยาช่อง 2 ของ cut คือ cut)'
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
            prompt: 'เรียงประโยค: "ขณะที่ฉันกำลังขับรถ ฉันได้ยินข่าวสำคัญทางวิทยุ"',
            scrambledWords: ['driving,', 'While', 'was', 'I', 'heard', 'the', 'I', 'on', 'news', 'radio.', 'the'],
            answer: 'While I was driving, I heard the news on the radio.',
            explanation: 'While I was driving, I heard the news on the radio.'
          },
          {
            type: 'choice',
            prompt: 'At 8:00 PM yesterday, we ___ the final match on TV.',
            options: ['were watching', 'watched', 'have watched', 'are watching'],
            answer: 0,
            explanation: 'ระบุจุดเวลาเจาะจงในอดีต (At 8:00 PM yesterday) แสดงว่ากำลังทำอยู่ ณ เวลานั้น ใช้ were watching'
          },
          {
            type: 'choice',
            prompt: 'While John was reading, Mary ___ the piano.',
            options: ['was playing', 'played', 'is playing', 'plays'],
            answer: 0,
            explanation: 'สองเหตุการณ์กำลังดำเนินไปพร้อมๆ กันในอดีต ใช้ Past Continuous ทั้งสองฝั่ง'
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
            prompt: 'หาจุดผิด: "When the earthquake occurred, hundreds of citizens were rush out of buildings."',
            options: [
              'When the earthquake occurred',
              'hundreds of citizens',
              'were rush (ต้องแก้เป็น were rushing เพราะเป็นรูป Past Continuous)',
              'out of buildings'
            ],
            answer: 2,
            explanation: 'โครงสร้าง Past Continuous คือ was/were + V-ing -> were rushing'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ฉันกำลังคิดถึงคุณอยู่พอดีตอนที่คุณส่งข้อความมาหาฉัน"',
            scrambledWords: ['just', 'I', 'thinking', 'was', 'about', 'when', 'texted', 'me.', 'you', 'you'],
            answer: 'I was just thinking about you when you texted me.',
            explanation: 'I was just thinking about you when you texted me.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปอดีต: "The server crashed while our engineers ___ (be) updating the database." (was/were)',
            answer: 'were',
            explanation: 'our engineers เป็นพหูพจน์ ใช้ were'
          }
        ]
      }
    }
  },
  {
    id: 'g15_first_conditional',
    level: 'B1',
    title: 'First Conditional (If + Present, Will)',
    titleTh: '15. ประโยคเงื่อนไขแบบที่ 1 (ความเป็นไปได้จริง)',
    summary: 'ใช้พูดถึงเงื่อนไขที่มีโอกาสเกิดขึ้นจริงในอนาคตและผลลัพธ์ที่จะตามมา',
    sentencePattern: 'If + Subject + V.1 (Present Simple), Subject + will + V.1',
    ruleExplanation: '• ส่วนของ If-clause: ใช้ Present Simple เสมอ (ห้ามใส่ will ในประโยคหลัง If)\n• ส่วนของ Main clause: ใช้ will / won\'t + V.1 แท้ (หรือ modal เช่น can, might)\n• สลับตำแหน่งได้: If you study hard, you will pass. = You will pass if you study hard. (ถ้า If อยู่ตรงกลาง ไม่ต้องใส่เครื่องหมายจุลภาค ,)\n• unless = if not (Unless you hurry, you will miss the train.)',
    examples: [
      { en: 'If you practice every single day, you will become fluent.', th: 'ถ้าคุณฝึกฝนทุกๆ วัน คุณจะพูดได้อย่างคล่องแคล่ว' },
      { en: 'We will cancel the outdoor event if it rains tomorrow.', th: 'เราจะยกเลิกกิจกรรมกลางแจ้งถ้าพรุ่งนี้ฝนตก' },
      { en: 'Unless you submit the application today, you will not be considered.', th: 'เว้นแต่ว่าคุณจะยื่นใบสมัครวันนี้ คุณจะไม่ได้รับการพิจารณา' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'If it ___ tomorrow, we will stay at home.',
            options: ['rains', 'will rain', 'rained', 'is raining'],
            answer: 0,
            explanation: 'หลัง If ใน First Conditional ต้องใช้ Present Simple (rains)'
          },
          {
            type: 'choice',
            prompt: 'If you finish the work early, I ___ you a treat.',
            options: ['buy', 'will buy', 'bought', 'have bought'],
            answer: 1,
            explanation: 'ส่วนผลลัพธ์ของ First Conditional ใช้ will + V.1 -> will buy'
          },
          {
            type: 'type',
            prompt: 'If he ___ (study) hard, he will pass the certification exam.',
            answer: 'studies',
            explanation: 'ประธาน he กริยา study เปลี่ยน y เป็น i แล้วเติม es -> studies'
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
            prompt: '___ you hurry up, you will miss the morning train.',
            options: ['Unless', 'If', 'Although', 'Despite'],
            answer: 0,
            explanation: 'Unless แปลว่า "เว้นแต่ว่า / ถ้าไม่..." (Unless you hurry = If you do not hurry)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "หากคุณมีคำถามใดๆ โปรดอย่าลังเลที่จะติดต่อฉัน"',
            scrambledWords: ['have', 'If', 'hesitate', 'any', 'questions,', 'do', 'not', 'you', 'to', 'contact', 'me.'],
            answer: 'If you have any questions, do not hesitate to contact me.',
            explanation: 'If you have any questions, do not hesitate to contact me.'
          },
          {
            type: 'choice',
            prompt: 'If the client approves the design, we ___ development immediately.',
            options: ['start', 'will start', 'started', 'would start'],
            answer: 1,
            explanation: 'First Conditional ใช้ will start'
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
            prompt: 'หาจุดผิด: "If you will invest in this venture, you will likely see great returns."',
            options: [
              'If you will invest (ต้องแก้เป็น If you invest เพราะห้ามใช้ will ใน If-clause ของ First Conditional)',
              'in this venture',
              'you will likely see',
              'great returns'
            ],
            answer: 0,
            explanation: 'ในเงื่อนไข If-clause ภาษาอังกฤษห้ามใส่ modal "will" ให้ใช้รูป Present Simple'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ตราบใดที่คุณยังคงมุ่งมั่น ไม่มีอุปสรรคใดขวางทางคุณได้"',
            scrambledWords: ['As', 'stay', 'long', 'you', 'nothing', 'can', 'stop', 'as', 'focused,', 'you.'],
            answer: 'As long as you stay focused, nothing can stop you.',
            explanation: 'As long as you stay focused, nothing can stop you.'
          },
          {
            type: 'type',
            prompt: 'เติมคำเชื่อมเงื่อนไข: "___ (Provided/Unless) that you follow the guidelines, you will receive full credit." (โดยมีเงื่อนไขว่า)',
            answer: 'Provided',
            explanation: 'Provided that / Providing that แปลว่า "โดยมีเงื่อนไขว่า/หากว่า"'
          }
        ]
      }
    }
  },
  {
    id: 'g16_relative_clauses',
    level: 'B1',
    title: 'Relative Clauses (Who, Which, That, Where)',
    titleTh: '16. ประโยคขยายความ Relative Clauses',
    summary: 'ใช้เชื่อมโยงและขยายความคำนามอย่างเป็นธรรมชาติด้วย Who, Which, That, Where, Whose',
    sentencePattern: 'Noun + [who (คน) / which (สิ่งของ) / that (คน/ของ) / where (สถานที่) / whose (ของใคร)] + Clause',
    ruleExplanation: '• who: ขยายคน (The woman who works here...)\n• which: ขยายสิ่งของหรือสัตว์ (The laptop which I bought...)\n• that: ขยายได้ทั้งคนและสิ่งของ (ใน Defining relative clauses)\n• where: ขยายสถานที่ (The city where I grew up...)\n• whose: แสดงความเป็นเจ้าของ (The student whose project won the award...)',
    examples: [
      { en: 'I met a software developer who built a famous AI app.', th: 'ฉันได้พบกับนักพัฒนาซอฟต์แวร์ผู้ซึ่งสร้างแอป AI ชื่อดัง' },
      { en: 'This is the cozy coffee shop where we first met.', th: 'นี่คือร้านกาแฟบรรยากาศอบอุ่นที่พวกเราพบกันเป็นครั้งแรก' },
      { en: 'The tutorial that you recommended was extremely helpful.', th: 'บทเรียนที่คุณแนะนำนั้นมีประโยชน์อย่างยิ่ง' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'The man ___ gave the presentation is our chief architect.',
            options: ['who', 'which', 'where', 'whose'],
            answer: 0,
            explanation: 'ขยายบุคคล (The man) ใช้ who'
          },
          {
            type: 'choice',
            prompt: 'I read the book ___ won the international prize.',
            options: ['who', 'which', 'where', 'whose'],
            answer: 1,
            explanation: 'ขยายสิ่งของ (the book) ใช้ which หรือ that'
          },
          {
            type: 'type',
            prompt: 'This is the town ___ (where/which) my grandparents were born.',
            answer: 'where',
            explanation: 'ขยายสถานที่ที่เกิดเหตุการณ์ข้างใน ใช้ where'
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
            prompt: 'The author ___ book became a bestseller will visit our bookstore.',
            options: ['whose', 'who', 'whom', 'which'],
            answer: 0,
            explanation: 'แสดงความเป็นเจ้าของ (หนังสือของเขา) ใช้ whose book'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "นี่คือบริษัทที่ผลิตชิปประมวลผลที่เร็วที่สุด"',
            scrambledWords: ['company', 'produces', 'This', 'the', 'fastest', 'that', 'processors.', 'is', 'the'],
            answer: 'This is the company that produces the fastest processors.',
            explanation: 'This is the company that produces the fastest processors.'
          },
          {
            type: 'choice',
            prompt: 'The candidate with ___ I spoke yesterday seemed very qualified.',
            options: ['whom', 'who', 'which', 'that'],
            answer: 0,
            explanation: 'หลังบุพบท (with) เมื่อขยายคนตามไวยากรณ์ทางการต้องใช้ whom (with whom)'
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
            prompt: 'หาจุดผิด: "My favorite car, that was manufactured in Germany, runs remarkably smoothly."',
            options: [
              'My favorite car',
              'that was manufactured (ต้องแก้เป็น which was manufactured เพราะใน Non-defining clause ที่มีลูกน้ำคั่น ห้ามใช้ that)',
              'in Germany',
              'runs remarkably smoothly'
            ],
            answer: 1,
            explanation: 'ใน Non-defining relative clause (มีเครื่องหมาย comma , ... , คั่น) ห้ามใช้ that ต้องใช้ which'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ผู้คนที่ไม่เคยยอมแพ้มักจะประสบความสำเร็จตามเป้าหมาย"',
            scrambledWords: ['never', 'give', 'who', 'People', 'reach', 'their', 'usually', 'up', 'goals.'],
            answer: 'People who never give up usually reach their goals.',
            explanation: 'People who never give up usually reach their goals.'
          },
          {
            type: 'type',
            prompt: 'เติม Relative Pronoun: "The reasons ___ (why/which) he resigned remain confidential."',
            answer: 'why',
            explanation: 'ขยาย The reasons ใช้ why'
          }
        ]
      }
    }
  },
  {
    id: 'g17_gerunds_infinitives',
    level: 'B1',
    title: 'Gerunds vs. Infinitives (Doing vs. To Do)',
    titleTh: '17. Gerund (V-ing) vs. Infinitive (To + V.1)',
    summary: 'แยกแยะกริยาที่ต้องตามด้วย V-ing หรือ To + V.1 และกริยาที่เปลี่ยนความหมาย',
    sentencePattern: 'Verb + V-ing (enjoy, avoid) | Verb + to + V.1 (decide, plan, hope)',
    ruleExplanation: '• ตามด้วย Gerund (V-ing) เสมอ: enjoy, avoid, consider, mind, practice, suggest, look forward to\n• ตามด้วย Infinitive (to + V.1) เสมอ: decide, plan, promise, hope, refuse, offer, agree\n• เปลี่ยนความหมาย:\n  - remember doing (จำได้ว่าเคยทำ) vs. remember to do (จำไว้ว่าต้องทำ)\n  - stop doing (เลิกทำสิ่งนั้น) vs. stop to do (หยุดพักเพื่อไปทำสิ่งนั้น)',
    examples: [
      { en: 'I really enjoy learning new programming languages.', th: 'ฉันสนุกกับการเรียนรู้ภาษาโปรแกรมใหม่ๆ มาก' },
      { en: 'We decided to launch the application next week.', th: 'พวกเราตัดสินใจที่จะเปิดตัวแอปพลิเคชันในสัปดาห์หน้า' },
      { en: 'Remember to save your work before closing the editor.', th: 'อย่าลืมบันทึกงานของคุณก่อนปิดโปรแกรมนะ' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'She enjoys ___ novels in her free time.',
            options: ['reading', 'to read', 'read', 'reads'],
            answer: 0,
            explanation: 'หลัง enjoy ต้องตามด้วย Gerund (V-ing) -> reading'
          },
          {
            type: 'choice',
            prompt: 'They decided ___ to Canada next summer.',
            options: ['to move', 'moving', 'move', 'moved'],
            answer: 0,
            explanation: 'หลัง decide ต้องตามด้วย Infinitive with to -> to move'
          },
          {
            type: 'type',
            prompt: 'I look forward to ___ (meet) you in person.',
            answer: 'meeting',
            explanation: 'look forward to เป็นสำนวนที่ to เป็น preposition ต้องตามด้วย V-ing -> meeting'
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
            prompt: 'He stopped ___ because it was causing severe damage to his health.',
            options: ['smoking', 'to smoke', 'smoke', 'smoked'],
            answer: 0,
            explanation: 'stop + V-ing แปลว่า เลิกทำสิ่งนั้นอย่างเด็ดขาด (เลิกสูบบุหรี่)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "โปรดจำไว้ว่าต้องล็อคประตูก่อนออกจากอาคาร"',
            scrambledWords: ['the', 'to', 'Please', 'lock', 'door', 'remember', 'leaving.', 'before'],
            answer: 'Please remember to lock the door before leaving.',
            explanation: 'remember to lock = จำไว้ว่าต้องล็อค'
          },
          {
            type: 'choice',
            prompt: 'Would you mind ___ the window? It feels a bit stuffy here.',
            options: ['opening', 'to open', 'open', 'opened'],
            answer: 0,
            explanation: 'หลัง Would you mind ต้องตามด้วย V-ing -> opening'
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
            prompt: 'ข้อใดมีความหมายว่า "ฉันจำได้ว่าเคยล็อคประตูเรียบร้อยแล้ว"?',
            options: [
              'I clearly remember locking the front door.',
              'I clearly remember to lock the front door.',
              'I clearly forgot to lock the front door.',
              'I clearly stop locking the front door.'
            ],
            answer: 0,
            explanation: 'remember + V-ing (locking) หมายถึง จำความทรงจำในอดีตได้ว่าเคยทำไปแล้ว'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เขาปฏิเสธที่จะยอมรับความผิดพลาดแม้ว่าจะมีหลักฐานชัดเจนก็ตาม"',
            scrambledWords: ['admit', 'the', 'refused', 'He', 'mistake', 'to', 'clear', 'despite', 'evidence.'],
            answer: 'He refused to admit the mistake despite clear evidence.',
            explanation: 'He refused to admit the mistake despite clear evidence.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปกริยา: "You should avoid ___ (make) assumptions without solid data." (make -> making)',
            answer: 'making',
            explanation: 'avoid + V-ing -> making'
          }
        ]
      }
    }
  },
  {
    id: 'g18_used_to',
    level: 'B1',
    title: 'Used to vs. Be used to vs. Get used to',
    titleTh: '18. เคยทำ (Used to) vs. คุ้นเคย (Be/Get used to)',
    summary: 'แยกแยะโครงสร้างบอกความเคยชินในอดีต vs. สภาพความคุ้นเคย vs. การปรับตัว',
    sentencePattern: 'used to + V.1 (เคยทำในอดีต) | be used to + V-ing (คุ้นเคยแล้ว) | get used to + V-ing (เริ่มปรับตัวจนชิน)',
    ruleExplanation: '• used to + V.1 แท้: เคยทำในอดีต ปัจจุบันเลิกทำแล้ว (I used to smoke, but I quit.)\n• be used to + V-ing / Noun: ชินแล้ว ไม่รู้สึกแปลก (I am used to waking up at 5 AM.)\n• get used to + V-ing / Noun: กำลังปรับตัวให้ชิน (You will soon get used to driving on the left.)',
    examples: [
      { en: 'I used to live in London when I was a student.', th: 'ฉันเคยอาศัยอยู่ในลอนดอนตอนเป็นนักเรียน (ตอนนี้ไม่ได้อยู่แล้ว)' },
      { en: 'He is used to working under intense pressure.', th: 'เขาคุ้นชินกับการทำงานภายใต้ความกดดันสูงแล้ว' },
      { en: 'It took me several months to get used to spicy food.', th: 'ฉันต้องใช้เวลาหลายเดือนกว่าจะเริ่มคุ้นชินกับอาหารรสเผ็ด' }
    ],
    difficultyTiers: {
      easy: {
        difficulty: 'easy',
        tierNameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy ⭐)',
        badgeLabel: 'Bronze',
        exercises: [
          {
            type: 'choice',
            prompt: 'I ___ play football every weekend, but now I prefer swimming.',
            options: ['used to', 'am used to', 'got used to', 'use to'],
            answer: 0,
            explanation: 'เคยทำในอดีตแต่ตอนนี้ไม่ทำแล้ว ใช้ used to + V.1'
          },
          {
            type: 'choice',
            prompt: 'She is used to ___ in a noisy environment.',
            options: ['working', 'work', 'worked', 'to work'],
            answer: 0,
            explanation: 'โครงสร้าง be used to + V-ing (working)'
          },
          {
            type: 'type',
            prompt: 'Did you ___ (use to / used to) live in Japan when you were younger?',
            answer: 'use to',
            explanation: 'ในประโยคคำถามที่มี Did ด้านหน้า ให้เปลี่ยน used to เป็น use to'
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
            prompt: 'Don\'t worry, you will soon get used to ___ the new software.',
            options: ['using', 'use', 'used', 'to use'],
            answer: 0,
            explanation: 'หลัง get used to ต้องตามด้วย V-ing (using)'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "ฉันคุ้นชินกับการตื่นแต่เช้าตรู่ทุกวันแล้ว"',
            scrambledWords: ['am', 'up', 'I', 'used', 'waking', 'early', 'to', 'every', 'day.'],
            answer: 'I am used to waking up early every day.',
            explanation: 'I am used to waking up early every day.'
          },
          {
            type: 'choice',
            prompt: 'He ___ drink coffee, but now he drinks three cups a day.',
            options: ["didn't use to", "wasn't used to", "used to not", "not used to"],
            answer: 0,
            explanation: 'ปฏิเสธของ used to คือ didn\'t use to + V.1'
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
            prompt: 'หาจุดผิด: "After moving to the United Kingdom, it took him a long time to get used to drive on the left side."',
            options: [
              'After moving',
              'took him a long time',
              'get used to drive (ต้องแก้เป็น get used to driving เพราะหลัง get used to ต้องตามด้วย Gerund V-ing)',
              'on the left side'
            ],
            answer: 2,
            explanation: 'โครงสร้าง get used to ต้องตามด้วย V-ing เสมอ -> get used to driving'
          },
          {
            type: 'reorder',
            prompt: 'เรียงประโยค: "เมืองนี้เคยเป็นหมู่บ้านชาวประมงเล็กๆ ที่เงียบสงบในอดีต"',
            scrambledWords: ['used', 'This', 'to', 'peaceful', 'be', 'city', 'a', 'fishing', 'village.'],
            answer: 'This city used to be a peaceful fishing village.',
            explanation: 'This city used to be a peaceful fishing village.'
          },
          {
            type: 'type',
            prompt: 'เติมรูปกริยา: "She isn\'t used to ___ (speak) in front of such large crowds." (speak -> speaking)',
            answer: 'speaking',
            explanation: 'be used to + V-ing -> speaking'
          }
        ]
      }
    }
  }
];
