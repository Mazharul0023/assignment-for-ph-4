const initialJobs = [
  {
    id: 1,
    companyName: 'Mobile First Corp',
    position: 'React Native Developer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description:
      'Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.',
    status: 'all',
  },
  {
    id: 2,
    companyName: 'WebFlow Agency',
    position: 'Web Designer & Developer',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$80,000 - $120,000',
    description:
      'Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.',
    status: 'all',
  },
  {
    id: 3,
    companyName: 'DataViz Solutions',
    position: 'Data Visualization Specialist',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125,000 - $165,000',
    description:
      'Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.',
    status: 'all',
  },
  {
    id: 4,
    companyName: 'CloudFirst Inc',
    position: 'Backend Developer',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140,000 - $190,000',
    description:
      'Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.',
    status: 'all',
  },
  {
    id: 5,
    companyName: 'Innovation Labs',
    position: 'UI/UX Engineer',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description:
      'Bridge the gap between design and engineering. Create intuitive user interfaces and seamless user experiences.',
    status: 'all',
  },
  {
    id: 6,
    companyName: 'MegaCorp Solutions',
    position: 'JavaScript Developer',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description:
      'Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation and health insurance.',
    status: 'all',
  },
  {
    id: 7,
    companyName: 'StartupXYZ',
    position: 'Full Stack Engineer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description:
      'Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.',
    status: 'all',
  },
  {
    id: 8,
    companyName: 'TechCorp Industries',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description:
      'We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript.',
    status: 'all',
  },
];

let jobs = [...initialJobs];
let currentFilter = 'all';

function updateDashboard() {
  const total = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'interview').length;
  const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

  document.getElementById('total-count').innerText = total;
  document.getElementById('interview-count').innerText = interviewCount;
  document.getElementById('rejected-count').innerText = rejectedCount;
}

function renderJobs() {
  const container = document.getElementById('job-container');
  const emptyState = document.getElementById('empty-state');
  const filtered =
    currentFilter === 'all'
      ? jobs
      : jobs.filter(j => j.status === currentFilter);

  document.getElementById('tab-job-count').innerText =
    `${filtered.length} jobs`;
  container.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
  } else {
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    filtered.forEach(job => {
      const card = document.createElement('div');
      card.className =
        'bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative';
      card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors">
                    <i class="fa-solid fa-trash-can text-lg"></i>
                </button>
                <div class="mb-4">
                    <h3 class="text-xl font-bold text-[#003366]">${job.companyName}</h3>
                    <p class="text-gray-500 font-medium">${job.position}</p>
                </div>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-4">
                    <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
                </div>
                <div class="mb-6">
                    <span class="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                        ${job.status === 'all' ? 'NOT APPLIED' : job.status}
                    </span>
                    <p class="text-gray-600 text-sm mt-3 leading-relaxed">${job.description}</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-outline btn-success btn-sm px-6 ${job.status === 'interview' ? 'bg-green-500 text-white' : ''}">INTERVIEW</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-outline btn-error btn-sm px-6 ${job.status === 'rejected' ? 'bg-red-500 text-white' : ''}">REJECTED</button>
                </div>
            `;
      container.appendChild(card);
    });
  }
}

function updateStatus(id, newStatus) {
  const jobIndex = jobs.findIndex(j => j.id === id);
  if (jobs[jobIndex].status === newStatus) {
    jobs[jobIndex].status = 'all'; // Toggle back if clicked again
  } else {
    jobs[jobIndex].status = newStatus;
  }
  updateDashboard();
  renderJobs();
}

function deleteJob(id) {
  jobs = jobs.filter(j => j.id !== id);
  updateDashboard();
  renderJobs();
}

function filterJobs(filter) {
  currentFilter = filter;
  ['all', 'interview', 'rejected'].forEach(f => {
    const btn = document.getElementById(`btn-${f}`);
    if (f === filter) {
      btn.className =
        'btn btn-sm px-6 bg-blue-500 hover:bg-blue-600 text-white border-none normal-case';
    } else {
      btn.className =
        'btn btn-sm px-6 bg-white hover:bg-gray-100 text-gray-500 border-gray-200 normal-case';
    }
  });
  renderJobs();
}

// Initial Load
updateDashboard();
renderJobs();
