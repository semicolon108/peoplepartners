// data/questions.ts

export interface Option {
    value: string;
    labelLao: string;
    labelEng: string;
    score?: number;
}

export interface Question {
    id: number;
    category: string;
    textLao: string;
    textEng: string;
    options: Option[];
}

export interface PersonalQuestion {
    id: string;
    labelLao: string;
    labelEng: string;
    type: 'text' | 'number' | 'email' | 'tel' | 'select';
    placeholder?: string;
    required: boolean;
    options?: { value: string; labelLao: string; labelEng: string }[];
}

// --- PART 1: DEMOGRAPHICS ---
export const personalQuestions: PersonalQuestion[] = [
    {
        id: "fullName",
        labelLao: "ຊື່ ແລະ ນາມສະກຸນ",
        labelEng: "Full Name",
        type: "text",
        placeholder: "Example: Somsak Phommavong",
        required: true
    },
    {
        id: "gender",
        labelLao: "ເພດ",
        labelEng: "Gender",
        type: "select",
        options: [
            { value: "Male", labelLao: "ຊາຍ", labelEng: "Male" },
            { value: "Female", labelLao: "ຍິງ", labelEng: "Female" },
            { value: "Other", labelLao: "ອື່ນໆ", labelEng: "Other" }
        ],
        required: true
    },
    {
        id: "province",
        labelLao: "ຜູ້ທົດສອບມາຈາກແຂວງໃດ?",
        labelEng: "Province",
        type: "select",
        options: [
            { value: "Vientiane Capital", labelLao: "ນະຄອນຫຼວງວຽງຈັນ", labelEng: "Vientiane Capital" },
            { value: "Vientiane Province", labelLao: "ແຂວງວຽງຈັນ", labelEng: "Vientiane Province" },
            { value: "Luang Prabang", labelLao: "ຫຼວງພະບາງ", labelEng: "Luang Prabang" },
            { value: "Champasak", labelLao: "ຈໍາປາສັກ", labelEng: "Champasak" },
            { value: "Savannakhet", labelLao: "ສະຫວັນນະເຂດ", labelEng: "Savannakhet" },
            { value: "Xieng Khouang", labelLao: "ຊຽງຂວາງ", labelEng: "Xieng Khouang" },
            { value: "Other", labelLao: "ອື່ນໆ", labelEng: "Other" }
        ],
        required: true
    },
    {
        id: "currentJob",
        labelLao: "ອາຊີບຂອງຜູ້ທົດສອບແມ່ນຫຍັງ?",
        labelEng: "Current Profession",
        type: "select",
        options: [
            { value: "Student", labelLao: "ນັກຮຽນ/ນັກສຶກສາ", labelEng: "Student" },
            { value: "Employee", labelLao: "ພະນັກງານ", labelEng: "Employee" },
            { value: "Business Owner", labelLao: "ເຈົ້າຂອງທຸລະກິດ", labelEng: "Business Owner" },
            { value: "Freelancer", labelLao: "ອາຊີບອິດສະຫຼະ", labelEng: "Freelancer" },
            { value: "Looking for a Job", labelLao: "ກໍາລັງຊອກວຽກ", labelEng: "Looking for a Job" }
        ],
        required: true
    },
    {
        id: "industry",
        labelLao: "ຂົງເຂດການປະກອບອາຊີບ",
        labelEng: "Career Field / Industry",
        type: "text",
        placeholder: "Example: Finance, Education, IT",
        required: true
    },
    {
        id: "experience",
        labelLao: "ປະສົບການໃນການເຮັດວຽກ",
        labelEng: "Work Experience",
        type: "select",
        options: [
            { value: "0-1", labelLao: "0-1 ປີ", labelEng: "0-1 Year" },
            { value: "2-5", labelLao: "2-5 ປີ", labelEng: "2-5 Years" },
            { value: "5-10", labelLao: "5-10 ປີ", labelEng: "5-10 Years" },
            { value: "10+", labelLao: "ຫຼາຍກວ່າ 10 ປີ", labelEng: "More than 10 Years" }
        ],
        required: true
    },
    {
        id: "language",
        labelLao: "ຕ້ອງການຜົນການທົດສອບເປັນພາສາ",
        labelEng: "Report Language",
        type: "select",
        options: [
            { value: "English", labelLao: "English (ພາສາອັງກິດ)", labelEng: "English" },
            { value: "ລາວ", labelLao: "Lao (ພາສາລາວ)", labelEng: "Lao" }
        ],
        required: true
    },
    {
        id: "age",
        labelLao: "ອາຍຸ",
        labelEng: "Age",
        type: "number",
        placeholder: "25",
        required: true
    },
    {
        id: "email",
        labelLao: "ອີເມວ (E-mail)",
        labelEng: "Email Address",
        type: "email",
        placeholder: "name@example.com",
        required: true
    },
    {
        id: "phone",
        labelLao: "ເບີໂທຕິດຕໍ່ (WhatsApp)",
        labelEng: "Phone Number (WhatsApp)",
        type: "tel",
        placeholder: "20 5555 5555",
        required: true
    },
    {
        id: "reason",
        labelLao: "ເປັນຫຍັງຄືຕ້ອງການເຮັດບົດທົດສອບຄວາມສົນໃຈທາງດ້ານອາຊີບ?",
        labelEng: "Why do you want to take this assessment?",
        type: "text",
        placeholder: "ເລົ່າໃຫ້ພວກເຮົາຟັງໄດ້ບໍ່? (May you tell us?)",
        required: true
    }
];

// --- PART 2: RIASEC QUESTIONS (54 ITEMS) ---
export const questions: Question[] = [
    {
        id: 1,
        category: "R",
        textLao: "1. ໜ້າວຽກທີ່ໄດ້ເດີນທາງໄປສະຖານທີ່ໃໝ່ໆເລື້ອຍໆ",
        textEng: "1. Work that involves traveling to new places frequently.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 2,
        category: "I",
        textLao: "2. ວຽກທີ່ກ່ຽວຂ້ອງກັບຄອມພິວເຕີ ເຊັ່ນ: ຂຽນໂປຣແກຣມ, ພັດທະນາເວັບໄຊ້, ຂຽນແອັບ",
        textEng: "2. Work related to computers, such as programming, website development, or app development.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 3,
        category: "S",
        textLao: "3. ວຽກທີ່ຊ່ວຍເຫຼືອຄົນ, ເຮັດວຽກກ່ຽວກັບອົງກອນສາກົນ ຫຼື ອົງກອນບໍ່ຫວັງຜົນກໍາໄລ",
        textEng: "3. Work that involves helping people, working with international organizations or non-profits (NGOs).",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 4,
        category: "C",
        textLao: "4. ເຮັດວຽກຕາມການມອບໝາຍຈາກຫົວໜ້າ",
        textEng: "4. Performing work exactly as assigned by a supervisor.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 5,
        category: "E",
        textLao: "5. ໂຄສະນາຜະລິດຕະພັນ, ການບໍລິການທີ່ຕົນເອງມີຢູ່",
        textEng: "5. Promoting or advertising your own products and services.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 6,
        category: "A",
        textLao: "6. ອອກແບບເສື້ອຜ້າແຟຊັ່ນ",
        textEng: "6. Designing fashion clothing and apparel.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 7,
        category: "R",
        textLao: "7. ມັກສ້ອມແປງກ໊ອກນໍ້າ ຫຼື ເຄື່ອງໃຊ້ພາຍໃນບ້ານທີ່ເປ່ເພ",
        textEng: "7. Repairing faucets or fixing broken household appliances.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 8,
        category: "I",
        textLao: "8. ມັກວິເຄາະພາວະເສດຖະກິດເປັນປະຈໍາ",
        textEng: "8. Analyzing economic trends and situations regularly.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 9,
        category: "S",
        textLao: "9. ຟັງບັນຫາຂອງຄົນອື່ນ ແລະ ຊ່ວຍເຂົາເຈົ້າໃນການແກ້ໄຂບັນຫາໃດໜຶ່ງ",
        textEng: "9. Listening to others' problems and helping them find solutions.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 10,
        category: "C",
        textLao: "10. ມັກຈັດມ້ຽນເອກະສານຕ່າງໆໃຫ້ເປັນລະບຽບ",
        textEng: "10. Organizing documents and filing them neatly.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 11,
        category: "E",
        textLao: "11. ເປັນຜູ້ນໍາກິດຈະກໍາ ຫຼື ເປັນຫົວໜ້າທີມໃນການເຮັດໂປຣເຈັກໃດໜຶ່ງ",
        textEng: "11. Being an activity leader or team lead for a specific project.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 12,
        category: "A",
        textLao: "12. ຮ້ອງເພງ, ແຕ່ງເພງ ຫຼື ຫຼິ້ນດົນຕີ",
        textEng: "12. Singing, composing songs, or playing musical instruments.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 13,
        category: "R",
        textLao: "13. ເປັນນາຍຊ່າງ ຫຼື ຜູ້ຮັບເໝົາກໍ່ສ້າງທີ່ເຮັດວຽກກ່ຽວກັບການກໍ່ສ້າງ",
        textEng: "13. Being a mechanic or a construction contractor working on building sites.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 14,
        category: "I",
        textLao: "14. ວິເຄາະທາດເຄມີໃນຫ້ອງແລ໋ບ ແລະ ເຮັດການຄົ້ນຄວ້າອັນໃດອັນໜຶ່ງ",
        textEng: "14. Analyzing chemicals in a lab and conducting research.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 15,
        category: "S",
        textLao: "15. ວຽກທີ່ໄດ້ບໍລິການຄົນອື່ນ ເຊັ່ນ: ເປັນໄກ້ນໍາທ່ຽວ, ພະນັກງານຕ້ອນຮັບຢູ່ໂຮງແຮມ",
        textEng: "15. Service-oriented work, such as being a tour guide or hotel receptionist.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 16,
        category: "C",
        textLao: "16. ພະນັກງານບັນຊີທີ່ເຮັດວຽກໃນຫ້ອງການ ແລະ ຈົດກ່າຍ, ບັນທຶກລາຍຮັບ-ລາຍຈ່າຍຂອງບໍລິສັດ",
        textEng: "16. Office accounting work, recording company income and expenses.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 17,
        category: "E",
        textLao: "17. ມັກໃນການຂາຍເຄື່ອງອອນລາຍ ແລະ ການຂາຍສິນຄ້າອື່ນໆທີ່ຢູ່ໜ້າຮ້ານ​",
        textEng: "17. Enjoy selling products online or at a storefront.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 18,
        category: "A",
        textLao: "18. ຂຽນກາຕູນ ຫຼື ເລື່ອງສັ້ນອື່ນໆ​",
        textEng: "18. Drawing cartoons or writing short stories.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 19,
        category: "R",
        textLao: "19. ເປັນຄູຝຶກນັກກິລາປະເພດຕ່າງໆ​",
        textEng: "19. Being a coach for various types of sports.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 20,
        category: "I",
        textLao: "20. ສຶກສາກ່ຽວກັບຮ່າງກາຍຂອງຄົນ ແລະ ການເຮັດວຽກຂອງຮ່າງກາຍ",
        textEng: "20. Studying the human body and how it functions.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 21,
        category: "S",
        textLao: "21. ເປັນຄູຝຶກໃນການສອນທັກສະອັນໃດອັນໜຶ່ງໃຫ້ກັບຄົນອື່ນ",
        textEng: "21. Being a trainer teaching specific skills to others.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 22,
        category: "C",
        textLao: "22. ວຽກທີ່ມີເຄື່ອງແບບ ແລະ ວຽກຫ້ອງການ",
        textEng: "22. Office work or jobs that require wearing a uniform.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 23,
        category: "E",
        textLao: "23. ເປັນທະນາຍຄວາມ ວ່າຄວາມໃຫ້ກັບຄົນອື່ນໆໃນສັງຄົມ",
        textEng: "23. Being a lawyer and advocating for others in society.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 24,
        category: "A",
        textLao: "24. ວຽກທີ່ກ່ຽວກັບສື່ມີເດຍຕ່າງໆ ເຊັ່ນ: ຂຽນຄອນເທັ້ນ, ຂຽນບົດຄວາມ ແລະ ອື່ນໆ",
        textEng: "24. Media-related work, such as content creation, article writing, etc.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 25,
        category: "R",
        textLao: "25. ວຽກທີ່ເຮັດກ່ຽວກັບເຄື່ອງຈັກ, ເຄື່ອງກົນຈັກເປັນຫຼັກ",
        textEng: "25. Work primarily involving machines and mechanical equipment.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 26,
        category: "I",
        textLao: "26. ກ່ອນຈະຕັດສິນໃຈອັນໃດແມ່ນຕ້ອງວິເຄາະໃຫ້ລະອຽດ ເຊັ່ນ: ຄວາມສ່ຽງ, ສິ່ງທີ່ຈະໄດ້ຮັບ, ຄວາມຄຸ້ມຄ່າ, ເວລາ",
        textEng: "26. Analyzing details like risks, benefits, worthiness, and time before making decisions.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 27,
        category: "S",
        textLao: "27. ເຮັດວຽກກ່ຽວກັບຊຸມຊົນ ຫຼື ວຽກສັງຄົມສົງເຄາະ ທີ່ໄດ້ຊ່ວຍເຫຼືອຜູ້ທີ່ມີບັນຫາຕ່າງໆໃນສັງຄົມ ເຊັ່ນ: ຖືກການຄ້າມະນຸດ, ຜູ້ທີ່ບໍ່ມີວຽກເຮັດງານທໍາ ເປັນຕົ້ນ",
        textEng: "27. Community or social work helping vulnerable groups (e.g., trafficking victims, unemployed).",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 28,
        category: "C",
        textLao: "28. ເຮັດວຽກກ່ຽວກັບເອກະສານ ເຊັ່ນ: ເອກະສານຂາເຂົ້າ, ເອກະສານຂາອອກ ເປັນຕົ້ນ",
        textEng: "28. Managing documentation, such as incoming and outgoing correspondence.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 29,
        category: "E",
        textLao: "29. ປະສານງານໃນການຈັດງານຝຶກອົບຮົມ ຫຼື ງານອີເວັ້ນຕ່າງໆ",
        textEng: "29. Coordinating training sessions or organizing various events.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 30,
        category: "A",
        textLao: "30. ນາຍແປພາສາ",
        textEng: "30. Working as a Translator or Interpreter.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 31,
        category: "R",
        textLao: "31. ສ້ອມແປງລົດຂອງຕົນເອງເມື່ອມີບັນຫາ ຫຼື ເປ່ເພ",
        textEng: "31. Repairing your own vehicle when it has problems or breaks down.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 32,
        category: "I",
        textLao: "32. ຂຽນບົດຄົ້ນຄວ້າ",
        textEng: "32. Writing research papers or academic studies.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 33,
        category: "S",
        textLao: "33. ໂອ້ລົມກັບຄົນແປກໜ້າໃນສະຖານທີ່ໃໝ່ໆທີ່ໄປ",
        textEng: "33. Talking to strangers or making connections in new places.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 34,
        category: "C",
        textLao: "34. ມັກສະສົມສິ່ງຂອງທີ່ຕົນເອງມັກ",
        textEng: "34. Enjoy collecting items or keeping collections organized.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 35,
        category: "E",
        textLao: "35. ບໍ່ຢ້ານໃນການສະແດງຄວາມເຫັນ ຫຼື ແລກປ່ຽນຄວາມຄິດເຫັນກັບຄົນອື່ນ",
        textEng: "35. Confident in expressing opinions or exchanging ideas with others.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 36,
        category: "A",
        textLao: "36. ຖ່າຍຮູບ, ຖ່າຍວິດີໂອ , ຕັດຕໍ່ວິດີໂອສັ້ນ, ກໍາກັບໜັງ",
        textEng: "36. Photography, videography, editing short videos, or directing films.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 37,
        category: "R",
        textLao: "37. ນັກແຂ່ງລົດ",
        textEng: "37. Being a race car driver.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 38,
        category: "I",
        textLao: "38. ສຶກສາພຶດຕິກໍາຂອງສັດ",
        textEng: "38. Studying the behavior of animals.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 39,
        category: "S",
        textLao: "39. ເປັນອາຈານສອນ",
        textEng: "39. Working as a teacher or professor.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 40,
        category: "C",
        textLao: "40. ມັກເຮັດວຽກຕາມຕົວຢ່າງທີ່ມີໃຫ້ ຫຼາຍກວ່າໃຫ້ຄິດເອງທັງໝົດ",
        textEng: "40. Prefer working from provided examples/templates rather than creating from scratch.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 41,
        category: "E",
        textLao: "41. ເວົ້າສ້າງແຮງບັນດານໃຈໃຫ້ກັບຄົນອື່ນ",
        textEng: "41. Speaking to inspire or motivate others.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 42,
        category: "A",
        textLao: "42. ສະແດງລະຄອນເວທີ ຫຼື ສະແດງຮູບເງົາ",
        textEng: "42. Acting in theater plays or movies.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 43,
        category: "R",
        textLao: "43. ຫຼິ້ນກິດຈະກໍາທີ່ໄດ້ປະຈົນໄພເຊັ່ນ: ໂດດຈ້ອງ, ປີນຜາ, ຂີ່ສະລິງ ເປັນຕົ້ນ",
        textEng: "43. Participating in adventure activities like skydiving, rock climbing, or zip-lining.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 44,
        category: "I",
        textLao: "44. ຄິດຄົ້ນຜະລິດຕະພັນ ຫຼື ຢາທີ່ກ່ຽວກັບການບໍາລຸງຮ່າງກາຍ ແລະ ເສີມຄວາມງາມ",
        textEng: "44. Developing health, body care, or beauty products.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 45,
        category: "S",
        textLao: "45. ໃຫ້ກໍາລັງໃຈຜູ້ທີ່ມີພາວະຊຶມເສົ້າ ແລະ ຢູ່ເປັນໝູ່ເຂົາເຈົ້າ.",
        textEng: "45. Providing support and companionship to those dealing with depression.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 46,
        category: "C",
        textLao: "46. ເປັນເລຂານຸການ",
        textEng: "46. Working as a secretary or administrative assistant.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 47,
        category: "E",
        textLao: "47. ເປັນພະນັກງານຈຸຫ້ອງໂດຍສານ(ພະນັກງານບໍລິການເທິງເຮືອບິນ)",
        textEng: "47. Working as a flight attendant (cabin crew).",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 48,
        category: "A",
        textLao: "48. ເດີນແບບ ຫຼື ເປັນນາງ/ນາຍແບບ",
        textEng: "48. Working as a fashion model.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 49,
        category: "R",
        textLao: "49. ປູກຜັກ, ຕົ້ນໄມ້ ແລະ ຜົນຜະລິດອື່ນໆກ່ຽວກັບກະສິກໍາ",
        textEng: "49. Growing vegetables, planting trees, and managing agricultural produce.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 50,
        category: "I",
        textLao: "50. ກ່ອນຈະຕັດສິນໃຈຊື້ອັນໃດອັນໜຶ່ງ ມັກວິເຄາະເຖິງຄວາມຄຸ້ມຄ່າ, ລາຄາ, ການໃຊ້ງານ ຫຼື ໃຊ້ເວລາຄິດດົນຈຶ່ງຕັດສິນໃຈຊື້",
        textEng: "50. Spending time analyzing worth, price, and utility before making a purchase.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 51,
        category: "S",
        textLao: "51. ເຮັດວຽກກ່ຽວກັບມູນລະນິທິຊ່ວຍເຫຼືອຜູ້ທີ່ຮ່າງກາຍບໍ່ສົມບູນ",
        textEng: "51. Working for a foundation that helps people with physical disabilities.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 52,
        category: "C",
        textLao: "52. ເປັນພະນັກງານທະນາຄານ",
        textEng: "52. Working as a bank employee.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 53,
        category: "E",
        textLao: "53. ສົນໃຈເລື່ອງການເມືອງ ແລະ ຢາກລົງເລືອກຕັ້ງໃນພັກ",
        textEng: "53. Interested in politics and running for political office.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    },
    {
        id: 54,
        category: "A",
        textLao: "54. ເປັນສະຖາປະນິກ ຫຼື ນັກອອກແບບຕົກແຕ່ງພາຍໃນ",
        textEng: "54. Working as an architect or interior designer.",
        options: [
            { value: "A", labelLao: "ມັກ ຫຼື ຕ້ອງການ", labelEng: "Like or Want", score: 2 },
            { value: "B", labelLao: "ບໍ່ແນ່ໃຈ ຫຼື ຄິດເບິ່ງກ່ອນ", labelEng: "Unsure / Let me think", score: 1 },
            { value: "C", labelLao: "ບໍ່ມັກ ຫຼື ບໍ່ສົນໃຈ", labelEng: "Dislike or Not Interested", score: 0 }
        ]
    }
];