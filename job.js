let rejectList = [];
let interviewList = [];
let currentStatus = 'all-btn';

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const totalCount = document.getElementById('total');
const rejectCount = document.getElementById('rejected');
const interviewCount = document.getElementById('interview');
const cardSection = document.getElementById('all-card');
const filterSection = document.getElementById('filterd-section');
const mainContainer = document.querySelector('main');


function getEmptyStateHTML() {
    return `
        <div class="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-xl w-full">
            <img src="jobs.png" alt="No jobs" class="w-24 mb-4">
            <h2 class="text-2xl font-bold text-[#0f172a]">No jobs available</h2>
            <p class="text-gray-500 mt-2">Check back soon for new job opportunities</p>
        </div>
    `;
}

function calculateCount() {
 
    const totalCards = cardSection.querySelectorAll('.card').length;
    
    totalCount.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectList.length;
    
    if (currentStatus === 'all-btn' && totalCards === 0) {
        cardSection.innerHTML = getEmptyStateHTML();
    }
}
