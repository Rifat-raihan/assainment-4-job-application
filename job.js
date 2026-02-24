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

function togglestyle(id) {
    currentStatus = id;

    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-black');
    });
    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-200', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');


    if (id === 'all-btn') {
        cardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        if (cardSection.querySelectorAll('.card').length === 0) {
            cardSection.innerHTML = getEmptyStateHTML();
        }
    } else {
        cardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderCards(id === 'interview-btn' ? interviewList : rejectList);
    }
}

mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    const parentNode = target.closest('.card'); 

    if (!parentNode) return;

    const cardInfo = {
        companyName: parentNode.querySelector('.company-name').innerText,
        post: parentNode.querySelector('.post').innerText,
        selary: parentNode.querySelector('.selary').innerText,
        note: parentNode.querySelector('.note').innerText
    };

    if (target.closest('.btn-delate')) {
        interviewList = interviewList.filter(item => item.companyName !== cardInfo.companyName);
        rejectList = rejectList.filter(item => item.companyName !== cardInfo.companyName);
        
        parentNode.remove();
        
        if (currentStatus === 'all-btn') {
            calculateCount();
        } else {
            renderCards(currentStatus === 'interview-btn' ? interviewList : rejectList);
            calculateCount();
        }
        return;
    }


    if (target.classList.contains('interview-btn')) {
        parentNode.querySelector('.not-applied-btn').innerText = 'INTERVIEW';
        if (!interviewList.find(item => item.companyName === cardInfo.companyName)) {
            interviewList.push({ ...cardInfo, notAppliedBtn: 'INTERVIEW' });
        }
        rejectList = rejectList.filter(item => item.companyName !== cardInfo.companyName);
    } 

  
    else if (target.classList.contains('rejected-btn')) {
        parentNode.querySelector('.not-applied-btn').innerText = 'REJECTED';
        if (!rejectList.find(item => item.companyName === cardInfo.companyName)) {
            rejectList.push({ ...cardInfo, notAppliedBtn: 'REJECTED' });
        }
        interviewList = interviewList.filter(item => item.companyName !== cardInfo.companyName);
    }


    if (currentStatus !== 'all-btn') {
        renderCards(currentStatus === 'interview-btn' ? interviewList : rejectList);
    }
    calculateCount();
});

function renderCards(list) {
    filterSection.innerHTML = '';
    
    if (list.length === 0) {
        filterSection.innerHTML = getEmptyStateHTML();
        return;
    }
