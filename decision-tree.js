// Decision Tree Data
const decisionTreeData = {
    Q0: {
        text: "HackHope国は最初に難民をどう扱いますか？",
        choices: [
            { label: "入管施設に収容する", next: "Q1" },
            { label: "追い返す", next: "Q2" },
            { label: "受け入れる", next: "Q3" }
        ]
    },
    Q1: {
        text: "収容された Itanzi 難民はどうする？",
        choices: [
            { label: "難民申請をする", next: "Q1A" },
            { label: "無期限に収容される", next: "Q1B" }
        ]
    },
    Q1A: {
        text: "政府は申請を認める？",
        choices: [
            { label: "はい", result: "多文化共生社会" },
            { label: "いいえ", result: "受け入れ困難社会" }
        ]
    },
    Q1B: {
        text: "政府はどの対応を取る？",
        choices: [
            { label: "支援団体の抗議を受け入れず強硬を貫く", result: "収容重視社会" },
            { label: "生活費など「面倒を見る」負担を選ぶ", result: "人道的課題社会" }
        ]
    },
    Q2: {
        text: "追い返された Itanzi 難民はどう行動する？",
        choices: [
            { label: "強制送還される", next: "Q2A" },
            { label: "国内に留まり続ける", next: "Q2B" }
        ]
    },
    Q2A: {
        text: "強制送還された場合に顕在化する問題は？",
        choices: [
            { label: "国際イメージ悪化を受容", result: "排除主義社会" },
            { label: "難民の生命危険を承知", result: "対立助長社会" }
        ]
    },
    Q2B: {
        text: "国内に留まり続けた場合、次に起こり得る？",
        choices: [
            { label: "行き場のない人が増える状態を放置", result: "抑圧的対応社会" },
            { label: "結局 入管に再収容される", result: "多文化葛藤社会" }
        ]
    },
    Q3: {
        text: "受け入れ後、難民の社会適応は？",
        choices: [
            { label: "H 国になじめない", next: "Q3A" },
            { label: "H 国で仕事をする", next: "Q3B" }
        ]
    },
    Q3A: {
        text: "政府・社会が直面する課題は？",
        choices: [
            { label: "国を嫌う人が出る", result: "孤立社会" },
            { label: "ホームレスが増える", result: "社会的支援課題社会" }
        ]
    },
    Q3B: {
        text: "その結果、国内では？",
        choices: [
            { label: "経済が潤う", result: "経済発展社会" },
            { label: "住民の不満が高まる", result: "社会分断社会" }
        ]
    }
};

// Result descriptions
const resultDescriptions = {
    "多文化共生社会": "難民申請を多く認定する社会では、多様な文化や価値観が共存し、国際性に富んだ活気ある社会が形成される可能性がある。一方で、受け入れ態勢が不十分なまま進めば、言語や宗教の違いによる摩擦、社会的孤立、雇用や福祉をめぐる競争などの課題も生じる。",
    "受け入れ困難社会": "難民申請をほとんど認定しない社会では、治安や社会秩序が保たれやすく、受け入れに伴う行政負担や社会的摩擦を回避できるという利点がある。一方で、人道的責任を果たさず、国際社会からの信頼を損なう恐れがある。排他的な姿勢が固定化すれば、多様性を受け入れにくい社会風土が広がり、国の柔軟性や国際的な競争力にも影響を与える可能性がある。",
    "収容重視社会": "難民を無期限で施設に収容する社会では、出入国管理の徹底や治安維持がしやすくなる一方、人権侵害との批判を受けやすく、国際的な非難や信頼低下を招く恐れがある。支援団体の反対は、社会に多様な視点をもたらし、制度改善のきっかけにもなるが、政府と市民の対立が深まれば、社会の分断や政策の混乱を招く可能性もある。",
    "人道的課題社会": "難民を無期限で施設に収容する社会では、治安維持や出入国管理の徹底がしやすいという利点がある一方で、長期的な収容によって管理費用が膨大になり、財政負担が増すという課題がある。また、収容される側の精神的・身体的負担が深刻化し、人道的観点からの批判も強まる。",
    "排除主義社会": "難民を追い返して強制送還する社会では、移民管理の厳格さや国の主権を強調できる一方で、人道的配慮に欠けるとして国内外から強い批判を受ける可能性がある。特に、迫害の恐れがある国へ送り返すことは、国際法や人権条約に違反する恐れがあり、国際的な信用の低下につながる。",
    "対立助長社会": "難民を追い返して強制送還する社会では、国境管理の厳格化や一部の国民の不安解消といった短期的な利点がある一方で、帰国した難民が迫害や紛争に巻き込まれ、命の危険にさらされる深刻な問題が生じる。これは国際社会からの批判や、人道的責任の放棄として非難を受ける原因となる。",
    "抑圧的対応社会": "難民を追い返そうとする社会では、自国の治安や経済的負担を抑えられるという利点がある一方、人道的責任を果たせず、国際的な批判を受ける可能性がある。居場所を失った難民が不安定な状況で居座ることで、社会の緊張や治安悪化の原因にもなりかねない。また、支援の届かない人々が増えることで、長期的には社会の分断や不信感が深まり、持続可能な共生の道が閉ざされる恐れもある。",
    "多文化葛藤社会": "難民を追い返そうとする社会では、治安や経済的負担への懸念から国の秩序を守る意識が強まる。一方で、行き場を失った難民が長期にわたり入管に収容されることで、人道的な問題や国際的な批判を招く恐れがある。こうした対応は、国の排他的な姿勢を強め、差別や孤立を生む原因にもなり得る。難民の尊厳や基本的人権をどう守るかが問われ、社会全体の価値観が試される状況となる。",
    "孤立社会": "難民を受け入れる社会では、多様な文化や価値観が共存し、国際的な寛容さが育まれる一方で、言語や生活習慣の違いから地域社会に溶け込めず、摩擦が生じることもある。その結果、偏見や差別が広がり、受け入れ側の不満や不安が増す場合もある。しかし、このような課題に向き合うことで、共生社会のあり方を見直し、より包摂的な社会づくりにつながる可能性もある。",
    "社会的支援課題社会": "難民を受け入れることで多様性が広がり、人道的な支援が実現する一方、言語や文化の壁から社会に馴染めず、仕事や住居を失いホームレスになる人も出てくる。これにより治安や福祉への不安が高まることもあるが、支援体制を整えることで社会の包容力を高める機会にもなり得る。",
    "経済発展社会": "難民を受け入れ、彼らが労働力として社会に参加することで、人手不足の解消や経済の活性化が期待できる。一方で、言語や文化の違いから地域社会との摩擦が生じることもある。制度や支援が不十分だと、差別や孤立を招く可能性もあるため、受け入れ体制の整備が重要となる。",
    "社会分断社会": "難民を受け入れ、彼らが仕事に就く社会は、人手不足の解消や多様性の促進という良い面がある。一方で、地元住民が仕事を奪われたと感じ、不満や差別が生まれることもある。共に働くには理解と制度の整備が必要であり、共生には時間と努力が求められる。"
};

// Result icons mapping
const resultIcons = {
    "多文化共生社会": "🌍",
    "受け入れ困難社会": "🌍",
    "収容重視社会": "🌍",
    "人道的課題社会": "🌍",
    "排除主義社会": "🌍",
    "対立助長社会": "🌍",
    "抑圧的対応社会": "🌍",
    "多文化葛藤社会": "🌍",
    "孤立社会": "🌍",
    "社会的支援課題社会": "🌍",
    "経済発展社会": "🌍",
    "社会分断社会": "🌍"
};

// State management
let currentQuestion = 'Q0';
let questionHistory = [];
let totalQuestions = 0;

// DOM elements
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const decisionCard = document.getElementById('decision-card');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Initialize the decision tree
function initializeDecisionTree() {
    currentQuestion = 'Q0';
    questionHistory = [];
    totalQuestions = 0;
    
    // Show decision card, hide result card
    decisionCard.classList.remove('hidden');
    resultCard.classList.remove('show');
    resultCard.classList.add('hidden');
    
    // Load first question
    loadQuestion(currentQuestion);
    updateProgress();
}

// Load a question
function loadQuestion(questionId) {
    const question = decisionTreeData[questionId];
    if (!question) return;
    
    totalQuestions++;
    
    // Add fade out animation
    decisionCard.classList.add('card-fade-out');
    
    setTimeout(() => {
        // Update question text
        questionText.textContent = question.text;
        
        // Clear choices container
        choicesContainer.innerHTML = '';
        
        // Create choice buttons
        question.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.label;
            button.style.animationDelay = `${1.2 + (index * 0.2)}s`;
            
            button.addEventListener('click', () => {
                handleChoice(choice);
            });
            
            choicesContainer.appendChild(button);
        });
        
        // Add fade in animation
        decisionCard.classList.remove('card-fade-out');
        decisionCard.classList.add('card-fade-in');
        
        setTimeout(() => {
            decisionCard.classList.remove('card-fade-in');
        }, 500);
        
        updateProgress();
    }, 250);
}

// Handle choice selection
function handleChoice(choice) {
    // Add choice to history
    questionHistory.push({
        questionId: currentQuestion,
        choice: choice.label
    });
    
    if (choice.result) {
        // Show result
        showResult(choice.result);
    } else if (choice.next) {
        // Load next question
        currentQuestion = choice.next;
        
        setTimeout(() => {
            loadQuestion(currentQuestion);
        }, 300);
    }
}

// Show final result
function showResult(resultType) {
    const description = resultDescriptions[resultType] || "未知の結果です。";
    const icon = resultIcons[resultType] || "🌍";
    
    // Add fade out animation to decision card
    decisionCard.classList.add('card-fade-out');
    
    setTimeout(() => {
        // Hide decision card
        decisionCard.classList.add('hidden');
        
        // Set result text with enhanced HTML structure in a single unified card
        resultText.innerHTML = `
            <div class="unified-result-container">
                <div class="result-icon-container">
                    <div class="result-icon">${icon}</div>
                </div>
                <h2 class="result-type-title">${resultType}</h2>
                <div class="result-description-expanded">
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        // Show result card with animation
        resultCard.classList.remove('hidden');
        setTimeout(() => {
            resultCard.classList.add('show');
            
            // Add celebration effect for positive results
            if (isPositiveResult(resultType)) {
                addCelebrationEffect();
            }
        }, 100);
        
        updateProgress(100);
    }, 500);
}

// Check if result is positive
function isPositiveResult(resultType) {
    const positiveResults = ["多文化共生社会", "経済発展社会", "人道的課題社会"];
    return positiveResults.includes(resultType);
}

// Add celebration effect for positive results
function addCelebrationEffect() {
    const celebrationContainer = document.createElement('div');
    celebrationContainer.className = 'celebration-container';
    celebrationContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Create floating emojis
    const emojis = ['✨', '🎉', '🌟', '🎊', '💫'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: 100%;
                font-size: ${Math.random() * 20 + 20}px;
                animation: celebrationFloat 3s ease-out forwards;
                pointer-events: none;
            `;
            celebrationContainer.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }
    
    document.body.appendChild(celebrationContainer);
    setTimeout(() => celebrationContainer.remove(), 5000);
}

// Add celebration animation to CSS
const celebrationCSS = `
@keyframes celebrationFloat {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}
`;

// Inject celebration CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = celebrationCSS;
document.head.appendChild(styleSheet);

// Update progress bar
function updateProgress(percentage = null) {
    if (percentage !== null) {
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = '完了';
    } else {
        // Calculate progress based on question depth
        const maxDepth = 4; // Maximum possible depth in the tree
        const progress = Math.min((totalQuestions / maxDepth) * 100, 90);
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `質問 ${totalQuestions}`;
    }
}

// Restart the decision tree
function restartDecisionTree() {
    // Add fade out animation to result card
    resultCard.classList.remove('show');
    
    setTimeout(() => {
        resultCard.classList.add('hidden');
        initializeDecisionTree();
    }, 800);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Wait for page load animation to complete
    setTimeout(() => {
        initializeDecisionTree();
    }, 1500);
});

restartBtn.addEventListener('click', restartDecisionTree);

// Page loader functionality (reuse from main site)
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    const container = document.querySelector('.container');
    const body = document.body;
    
    setTimeout(() => {
        loader.classList.add('hidden');
        container.classList.add('loaded');
        body.classList.add('loaded');
    }, 1000);
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth'; 