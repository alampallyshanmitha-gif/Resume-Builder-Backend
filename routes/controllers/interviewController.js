exports.getInterviewQuestions = (req, res) => {
    const role = req.query.role;

    const data = {

        // 💻 FRONTEND DEVELOPER
        frontend: [
            { question: "What is HTML?", answer: "HTML is used to structure web pages." },
            { question: "What is CSS?", answer: "CSS is used for styling web pages." },
            { question: "What is JavaScript?", answer: "JS is used to make web pages interactive." },
            { question: "What is DOM?", answer: "DOM represents HTML as objects." },
            { question: "What is Flexbox?", answer: "Layout system for alignment." },
            { question: "What is Grid?", answer: "CSS grid layout system." },
            { question: "What is responsive design?", answer: "Design for all screen sizes." },
            { question: "What is React?", answer: "JS library for UI." },
            { question: "What is useState?", answer: "React hook for state." },
            { question: "What is API?", answer: "Used for communication." },
            { question: "What is fetch?", answer: "Used to call APIs." },
            { question: "Difference between var, let, const?", answer: "Scope difference." },
            { question: "What is event handling?", answer: "Handling user actions." },
            { question: "What is localStorage?", answer: "Store data in browser." },
            { question: "What is Git?", answer: "Version control system." },
            { question: "What is GitHub?", answer: "Code hosting platform." },
            { question: "What is debugging?", answer: "Fixing errors." },
            { question: "What is browser?", answer: "Runs web apps." },
            { question: "What is HTTP?", answer: "Communication protocol." },
            { question: "What is SEO?", answer: "Search engine optimization." }
        ],

        // 📊 COMMERCE
        commerce: [
            { question: "What is accounting?", answer: "Recording financial transactions." },
            { question: "What is balance sheet?", answer: "Shows assets & liabilities." },
            { question: "What is GST?", answer: "Goods and Services Tax." },
            { question: "What is journal entry?", answer: "Recording transactions." },
            { question: "What is ledger?", answer: "Classification of accounts." },
            { question: "What is capital?", answer: "Owner's investment." },
            { question: "What is liability?", answer: "Amount owed." },
            { question: "What is asset?", answer: "Owned resources." },
            { question: "What is depreciation?", answer: "Decrease in asset value." },
            { question: "What is profit?", answer: "Revenue - expenses." },
            { question: "What is loss?", answer: "Expenses > revenue." },
            { question: "What is auditing?", answer: "Checking accounts." },
            { question: "What is invoice?", answer: "Bill document." },
            { question: "What is bank reconciliation?", answer: "Match bank records." },
            { question: "What is cash flow?", answer: "Money movement." },
            { question: "What is taxation?", answer: "Government charges." },
            { question: "What is working capital?", answer: "Short-term funds." },
            { question: "What is dividend?", answer: "Profit share." },
            { question: "What is equity?", answer: "Ownership." },
            { question: "What is budgeting?", answer: "Financial planning." }
        ],

        // 🤖 AI / DATA
        ai: [
            { question: "What is AI?", answer: "Machines simulating intelligence." },
            { question: "What is Machine Learning?", answer: "Learning from data." },
            { question: "What is Deep Learning?", answer: "Neural networks." },
            { question: "What is dataset?", answer: "Collection of data." },
            { question: "What is training?", answer: "Teaching model." },
            { question: "What is testing?", answer: "Evaluating model." },
            { question: "What is overfitting?", answer: "Too much training." },
            { question: "What is Python?", answer: "Popular AI language." },
            { question: "What is TensorFlow?", answer: "ML library." },
            { question: "What is NLP?", answer: "Text processing." },
            { question: "What is computer vision?", answer: "Image processing." },
            { question: "What is model?", answer: "Trained system." },
            { question: "What is data cleaning?", answer: "Fixing data." },
            { question: "What is feature?", answer: "Input variable." },
            { question: "What is algorithm?", answer: "Step-by-step solution." },
            { question: "What is regression?", answer: "Prediction method." },
            { question: "What is classification?", answer: "Category prediction." },
            { question: "What is clustering?", answer: "Grouping data." },
            { question: "What is accuracy?", answer: "Correct predictions." },
            { question: "What is bias?", answer: "Error in model." }
        ],

        // 🏥 MEDICAL
        medical: [
            { question: "What is anatomy?", answer: "Study of body." },
            { question: "What is physiology?", answer: "Body functions." },
            { question: "What is diagnosis?", answer: "Identify disease." },
            { question: "What is treatment?", answer: "Cure disease." },
            { question: "What is infection?", answer: "Harmful microorganisms." },
            { question: "What is vaccine?", answer: "Prevents disease." },
            { question: "What is blood pressure?", answer: "Force of blood." },
            { question: "What is heart rate?", answer: "Beats per minute." },
            { question: "What is surgery?", answer: "Operation." },
            { question: "What is emergency care?", answer: "Immediate help." },
            { question: "What is ICU?", answer: "Critical care unit." },
            { question: "What is pharmacy?", answer: "Medicines." },
            { question: "What is prescription?", answer: "Doctor instruction." },
            { question: "What is hygiene?", answer: "Cleanliness." },
            { question: "What is first aid?", answer: "Immediate care." },
            { question: "What is virus?", answer: "Disease agent." },
            { question: "What is bacteria?", answer: "Microorganism." },
            { question: "What is immunity?", answer: "Body defense." },
            { question: "What is nutrition?", answer: "Food health." },
            { question: "What is mental health?", answer: "Mind wellbeing." }
        ]
    };

    res.json({ questions: data[role] || [] });
};