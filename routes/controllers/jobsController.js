exports.getJobs = (req, res) => {
    const jobs = [

        // 💻 TECH
        { title: "Frontend Developer Intern", company: "TechCorp", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/web-development-internship" },
        { title: "Backend Developer Intern", company: "CodeBase", location: "Bangalore", type: "Internship", applyLink: "https://internshala.com/internships/backend-development-internship" },
        { title: "Full Stack Developer", company: "InnovateX", location: "Hyderabad", type: "Job", applyLink: "https://www.linkedin.com/jobs" },
        { title: "Data Analyst", company: "DataMind", location: "Mumbai", type: "Job", applyLink: "https://www.naukri.com/data-analyst-jobs" },
        { title: "UI/UX Designer Intern", company: "PixelCraft", location: "Pune", type: "Internship", applyLink: "https://internshala.com/internships/ui-ux-design-internship" },
        { title: "Game Developer", company: "PlayTech", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-game-developer-jobs.html" },
        { title: "Animator", company: "AnimStudio", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-animator-jobs.html" },

        // 📊 BUSINESS / MANAGEMENT
        { title: "Business Analyst", company: "ConsultPro", location: "Chennai", type: "Job", applyLink: "https://www.naukri.com/business-analyst-jobs" },
        { title: "Marketing Intern", company: "BrandBoost", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/marketing-internship" },
        { title: "Sales Executive", company: "SalesPro", location: "Delhi", type: "Job", applyLink: "https://www.naukri.com/sales-jobs" },
        { title: "HR Intern", company: "PeopleFirst", location: "Delhi", type: "Internship", applyLink: "https://internshala.com/internships/hr-internship" },
        { title: "Operations Intern", company: "BizOps", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/operations-internship" },

        // 💰 FINANCE
        { title: "Finance Intern", company: "FinEdge", location: "Mumbai", type: "Internship", applyLink: "https://internshala.com/internships/finance-internship" },
        { title: "Accountant", company: "MoneyMatters", location: "Hyderabad", type: "Job", applyLink: "https://www.naukri.com/accountant-jobs" },
        { title: "Bank Clerk", company: "BankPro", location: "India", type: "Job", applyLink: "https://www.naukri.com/bank-clerk-jobs" },
        { title: "Insurance Advisor", company: "SecureLife", location: "India", type: "Job", applyLink: "https://www.naukri.com/insurance-jobs" },

        // 🎨 CREATIVE
        { title: "Graphic Designer", company: "DesignHub", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-graphic-designer-jobs.html" },
        { title: "Content Writer", company: "WriteWell", location: "Remote", type: "Job", applyLink: "https://internshala.com/internships/content-writing-internship" },
        { title: "Fashion Designer", company: "StyleHub", location: "Mumbai", type: "Job", applyLink: "https://www.indeed.com/q-fashion-designer-jobs.html" },
        { title: "Interior Designer", company: "HomeDesign", location: "Bangalore", type: "Job", applyLink: "https://www.indeed.com/q-interior-designer-jobs.html" },
        { title: "Video Editor", company: "MediaWorks", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-video-editor-jobs.html" },

        // 📚 EDUCATION
        { title: "Teacher", company: "EduWorld", location: "Kolkata", type: "Job", applyLink: "https://www.naukri.com/teacher-jobs" },
        { title: "Research Assistant", company: "UniLab", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/research-internship" },

        // ⚕️ MEDICAL
        { title: "Nurse", company: "HealthCare+", location: "Chennai", type: "Job", applyLink: "https://www.naukri.com/nurse-jobs" },
        { title: "Pharmacist", company: "MediStore", location: "Bangalore", type: "Job", applyLink: "https://www.naukri.com/pharmacist-jobs" },
        { title: "Lab Technician", company: "BioLab", location: "Hyderabad", type: "Job", applyLink: "https://www.naukri.com/lab-technician-jobs" },

        // 🏗️ ENGINEERING
        { title: "Mechanical Engineer", company: "AutoTech", location: "Pune", type: "Job", applyLink: "https://www.naukri.com/mechanical-engineer-jobs" },
        { title: "Civil Engineer", company: "BuildRight", location: "Delhi", type: "Job", applyLink: "https://www.naukri.com/civil-engineer-jobs" },
        { title: "Electrical Engineer", company: "PowerGrid", location: "Mumbai", type: "Job", applyLink: "https://www.naukri.com/electrical-engineer-jobs" },

        // 🍴 HOTEL / EVENTS
        { title: "Hotel Manager", company: "StayEasy", location: "Goa", type: "Job", applyLink: "https://www.indeed.com/q-hotel-manager-jobs.html" },
        { title: "Chef Intern", company: "Foodies", location: "Mumbai", type: "Internship", applyLink: "https://internshala.com/internships/hotel-management-internship" },
        { title: "Event Manager", company: "EventPro", location: "Delhi", type: "Job", applyLink: "https://www.indeed.com/q-event-manager-jobs.html" },

        // ⚖️ LAW
        { title: "Law Intern", company: "LegalEdge", location: "Delhi", type: "Internship", applyLink: "https://internshala.com/internships/law-internship" },
        { title: "Paralegal", company: "LawFirmX", location: "Mumbai", type: "Job", applyLink: "https://www.indeed.com/q-paralegal-jobs.html" },

        // 📰 MEDIA
        { title: "Journalist", company: "NewsNow", location: "Delhi", type: "Job", applyLink: "https://www.indeed.com/q-journalist-jobs.html" },
        { title: "Social Media Manager", company: "BuzzMedia", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-social-media-manager-jobs.html" },
        { title: "Digital Marketing Intern", company: "GrowthHack", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/digital-marketing-internship" },

        // 🌾 OTHER STREAMS
        { title: "Agriculture Officer", company: "AgriTech", location: "Punjab", type: "Job", applyLink: "https://www.naukri.com/agriculture-jobs" },
        { title: "Food Inspector", company: "FoodSafe", location: "Delhi", type: "Job", applyLink: "https://www.naukri.com/food-inspector-jobs" },

        // 🧠 PSYCHOLOGY
        { title: "Psychologist", company: "MindCare", location: "Remote", type: "Job", applyLink: "https://www.indeed.com/q-psychologist-jobs.html" },
        { title: "Counselor Intern", company: "WellnessHub", location: "Remote", type: "Internship", applyLink: "https://internshala.com/internships/psychology-internship" },

        // 📦 OPERATIONS
        { title: "Supply Chain Analyst", company: "LogiFlow", location: "Delhi", type: "Job", applyLink: "https://www.naukri.com/supply-chain-jobs" },

        // ☎️ SUPPORT
        { title: "Customer Support Executive", company: "HelpDesk", location: "Remote", type: "Job", applyLink: "https://www.naukri.com/customer-support-jobs" },
        { title: "Call Center Intern", company: "VoiceConnect", location: "India", type: "Internship", applyLink: "https://internshala.com/internships/call-center-internship" }
    ];

    res.json({ jobs });
};