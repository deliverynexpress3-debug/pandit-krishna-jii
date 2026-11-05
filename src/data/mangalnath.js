// Shri Mangalnath Mandir Puja — prices & inclusions as given by the client.
// IMPORTANT: package 2 price is 5100 (NOT 5700).
export const MANGALNATH = {
  hi: {
    eyebrow: "श्री मंगलनाथ मंदिर",
    title: "श्री मंगलनाथ मंदिर पूजन",
    intro:
      "जय श्री महाकाल 🙏 श्री मंगलनाथ मंदिर पर हमारे द्वार से मंगल दोष, कालसर्प दोष, कुंभ विवाह, अर्क विवाह आदि सभी मांगलिक पूजन कार्य करवाए जाते हैं।",
    note:
      "पूजा की राशि मंगलनाथ मंदिर प्रबंध समिति द्वारा निर्धारित है, जिसमें कोई भी बदलाव संभव नहीं है।",
    bookBtn: "इस पूजा को बुक करें",
    mostComplete: "सबसे सम्पूर्ण",
    priceOne: "सम्पूर्ण दक्षिणा",
    priceTwo: "दक्षिणा / पूजा राशि",
  },
  en: {
    eyebrow: "Shri Mangalnath Mandir",
    title: "Shri Mangalnath Temple Puja",
    intro:
      "Jai Shri Mahakal 🙏 At Shri Mangalnath Mandir, we arrange every auspicious puja ceremony — Mangal dosha, Kaal Sarp dosha, Kumbh vivaha, Arka vivaha and more.",
    note:
      "The puja fee is fixed by the Mangalnath Temple Management Committee and cannot be changed.",
    bookBtn: "Book this puja",
    mostComplete: "Most Complete",
    priceOne: "Complete Dakshina",
    priceTwo: "Dakshina / Puja Rate",
  },
  packages: [
    {
      nameHi: "सम्पूर्ण दक्षिणा",
      nameEn: "Complete Seva",
      price: 2400,
      priceKey: "priceOne",
      items: [
        { hi: "श्री गणेश गौरी पूजन", en: "Shree Ganesh & Gauri Puja" },
        { hi: "कलश पूजन", en: "Kalash Puja" },
        {
          hi: "मंगलनाथ मंदिर गर्भ गृह में ब्रत पूजन",
          en: "Bhat puja in the garbhagriha of Mangalnath Mandir",
        },
        { hi: "नवग्रह शांति पूजन", en: "Navagrah Shanti Puja" },
        { hi: "सम्पूर्ण होम (हवन) कर", en: "Complete Homa (Havan) karma" },
      ],
    },
    {
      nameHi: "दक्षिणा / पूजा राशि",
      nameEn: "Full Puja",
      price: 5100,
      priceKey: "priceTwo",
      featured: true,
      items: [
        { hi: "श्री गणेश गौरी पूजन", en: "Shree Ganesh & Gauri Puja" },
        {
          hi: "श्री त्रिभुवन पति संबससदाशिव रुद्र अभिषेक",
          en: "Shree Tribhuvanpati Sambasadasiv Shiva Rudrabhishek",
        },
        { hi: "पुण्यवाचन कलश पूजन", en: "Punya Vaachan & Kalash Puja" },
        { hi: "नांदी मुख श्राद्ध पितृ पूजन", en: "Nandi Mukh Shradh & Pitru Puja" },
        {
          hi: "कुल देवी स्मरण षोडश मातृका पूजन",
          en: "Kuladevi Smaran & Shodasha Matruka Puja",
        },
        { hi: "प्रधान मंडल पूजन", en: "Pradhan Mandal Puja" },
        {
          hi: "मंगलनाथ मंदिर गर्भ गृह में ब्रत पूजन",
          en: "Bhat puja in the garbhagriha of Mangalnath Mandir",
        },
        { hi: "नवग्रह शांति पूजन", en: "Navagrah Shanti Puja" },
        { hi: "सम्पूर्ण होम (हवन) कर", en: "Complete Homa (Havan) karma" },
      ],
    },
  ],
}
