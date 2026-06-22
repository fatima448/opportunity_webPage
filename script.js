// ===================== Mock Data =====================
const opportunitiesData = [
  {
    id: 1,
    title: "منحة الريادة البيئية للشباب العربي",
    type: "منحة",
    country: "الإمارات",
    deadline: "2026-08-15",
    funding: "ممولة بالكامل"
  },
  {
    id: 2,
    title: "برنامج تدريب الطاقة المتجددة",
    type: "تدريب",
    country: "مصر",
    deadline: "2026-07-20",
    funding: "ممولة جزئياً"
  },
  {
    id: 3,
    title: "مسابقة الابتكار في إعادة التدوير",
    type: "مسابقة",
    country: "السعودية",
    deadline: "2026-09-01",
    funding: "غير ممولة"
  },
  {
    id: 4,
    title: "منحة دراسات الاستدامة الزراعية",
    type: "منحة",
    country: "المغرب",
    deadline: "2026-10-10",
    funding: "ممولة بالكامل"
  },
  {
    id: 5,
    title: "تدريب ميداني في إدارة المياه",
    type: "تدريب",
    country: "الأردن",
    deadline: "2026-08-05",
    funding: "ممولة جزئياً"
  },
  {
    id: 6,
    title: "مسابقة أفكار المدن الذكية الخضراء",
    type: "مسابقة",
    country: "تونس",
    deadline: "2026-11-22",
    funding: "ممولة بالكامل"
  },
  {
    id: 7,
    title: "منحة بحثية في الطاقة الشمسية",
    type: "منحة",
    country: "الكويت",
    deadline: "2026-09-18",
    funding: "غير ممولة"
  },
  {
    id: 8,
    title: "برنامج تدريب القيادات البيئية الشابة",
    type: "تدريب",
    country: "لبنان",
    deadline: "2026-07-30",
    funding: "ممولة بالكامل"
  },
  {
    id: 9,
    title: "مسابقة تصميم حلول النفايات الصفرية",
    type: "مسابقة",
    country: "قطر",
    deadline: "2026-12-05",
    funding: "ممولة جزئياً"
  },
  {
    id: 10,
    title: "منحة ريادة الأعمال الخضراء للنساء",
    type: "منحة",
    country: "العراق",
    deadline: "2026-08-28",
    funding: "ممولة بالكامل"
  },
  {
    id: 11,
    title: "تدريب تحليل البيانات البيئية",
    type: "تدريب",
    country: "فلسطين",
    deadline: "2026-09-12",
    funding: "غير ممولة"
  },
  {
    id: 12,
    title: "مسابقة الحلول التقنية لتغير المناخ",
    type: "مسابقة",
    country: "البحرين",
    deadline: "2026-10-30",
    funding: "ممولة جزئياً"
  }
];

// ===================== Page Elements =====================
const cards = document.getElementById("cardsGrid");
const noResults = document.getElementById("emptyState");
const resultText = document.getElementById("resultsCount");

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const fundingFilter = document.getElementById("fundingFilter");
const resetBtn = document.getElementById("resetBtn");

// ===================== SVG Icons =====================
const icons = {
  calendar: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2"
        stroke="currentColor" stroke-width="2"/>
      <path d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round"/>
    </svg>
  `,

  location: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z"
        stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="9" r="2.5"
        stroke="currentColor" stroke-width="2"/>
    </svg>
  `,

  leaf: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C9 6 7 9 7 13a5 5 0 0010 0c0-4-2-7-5-11z"
        fill="currentColor"/>
    </svg>
  `
};

// ===================== Funding Classes =====================
function getFundingClass(funding) {
  if (funding === "ممولة بالكامل") return "funding-full";
  if (funding === "ممولة جزئياً") return "funding-partial";
  return "funding-none";
}

// ===================== Date Format =====================
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// ===================== Create Card =====================
function createCard(opportunity) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">
      <span class="type-badge badge-${opportunity.type}">
        ${opportunity.type}
      </span>

      <span class="card-icon">
        ${icons.leaf}
      </span>
    </div>

    <h3 class="card-title">
      ${opportunity.title}
    </h3>

    <div class="card-info">
      <div class="info-row">
        ${icons.location}
        <span>${opportunity.country}</span>
      </div>

      <div class="info-row">
        ${icons.calendar}
        <span>الموعد النهائي: ${formatDate(opportunity.deadline)}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="funding-status ${getFundingClass(opportunity.funding)}">
        ${opportunity.funding}
      </span>

      <button class="details-btn" type="button">
        التفاصيل
      </button>
    </div>
  `;

  return card;
}

// ===================== Render Cards =====================
function renderCards(list) {
  cards.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    resultText.textContent = "لم يتم العثور على نتائج";
    return;
  }

  noResults.hidden = true;

  list.forEach((opportunity) => {
    cards.appendChild(createCard(opportunity));
  });

  resultText.textContent =
    `عدد الفرص المعروضة: ${list.length} من أصل ${opportunitiesData.length}`;
}

// ===================== Filter Logic =====================
function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  const selectedFunding = fundingFilter.value;

  const filteredList = opportunitiesData.filter((opportunity) => {
    const matchesSearch = opportunity.title
      .toLowerCase()
      .includes(searchTerm);

    const matchesType =
      selectedType === "all" ||
      opportunity.type === selectedType;

    const matchesFunding =
      selectedFunding === "all" ||
      opportunity.funding === selectedFunding;

    return matchesSearch && matchesType && matchesFunding;
  });

  renderCards(filteredList);
}

// ===================== Reset Filters =====================
function resetFilters() {
  searchInput.value = "";
  typeFilter.value = "all";
  fundingFilter.value = "all";

  applyFilters();
}

// ===================== Event Listeners =====================
searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);
fundingFilter.addEventListener("change", applyFilters);
resetBtn.addEventListener("click", resetFilters);

// ===================== Initial Load =====================
document.addEventListener("DOMContentLoaded", () => {
  renderCards(opportunitiesData);
});