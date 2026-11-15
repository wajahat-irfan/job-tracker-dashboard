// Job Tracker Dashboard — local-only, data saved in localStorage.
(function () {
  "use strict";

  var STORAGE_KEY = "waj-job-tracker";
  var jobs = loadJobs();

  var form = document.getElementById("jobForm");
  var companyInput = document.getElementById("company");
  var roleInput = document.getElementById("role");
  var dateInput = document.getElementById("date");
  var statusInput = document.getElementById("status");
  var filterSelect = document.getElementById("filter");
  var jobList = document.getElementById("jobList");
  var jobTable = document.getElementById("jobTable");
  var emptyMessage = document.getElementById("emptyMessage");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Default the date field to today.
  dateInput.value = new Date().toISOString().slice(0, 10);

  function loadJobs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveJobs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (e) {
      // Storage full or unavailable (e.g. private mode) — app still works in memory.
    }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateStats() {
    var counts = { total: jobs.length, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(function (job) {
      if (counts[job.status] !== undefined) {
        counts[job.status] += 1;
      }
    });
    document.getElementById("countTotal").textContent = counts.total;
    document.getElementById("countApplied").textContent = counts.Applied;
    document.getElementById("countInterview").textContent = counts.Interview;
    document.getElementById("countOffer").textContent = counts.Offer;
    document.getElementById("countRejected").textContent = counts.Rejected;
  }

  function render() {
    var filter = filterSelect.value;
    var visible = jobs.filter(function (job) {
      return filter === "All" || job.status === filter;
    });

    jobList.innerHTML = "";
    visible.forEach(function (job) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + escapeHtml(job.company) + "</td>" +
        "<td>" + escapeHtml(job.role) + "</td>" +
        "<td>" + escapeHtml(job.date) + "</td>" +
        '<td><span class="badge badge-' + escapeHtml(job.status) + '">' + escapeHtml(job.status) + "</span></td>" +
        '<td><button type="button" class="btn btn-danger" data-id="' + job.id + '">Delete</button></td>';
      jobList.appendChild(row);
    });

    jobTable.hidden = visible.length === 0;
    emptyMessage.hidden = visible.length !== 0;
    emptyMessage.textContent =
      jobs.length === 0
        ? "No applications yet. Add your first one above."
        : "No applications match this filter.";
    updateStats();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var company = companyInput.value.trim();
    var role = roleInput.value.trim();
    var date = dateInput.value;
    if (!company || !role || !date) {
      return;
    }
    jobs.unshift({
      id: Date.now(),
      company: company,
      role: role,
      date: date,
      status: statusInput.value
    });
    saveJobs();
    render();
    form.reset();
    dateInput.value = new Date().toISOString().slice(0, 10);
    companyInput.focus();
  });

  jobList.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-id]");
    if (!button) {
      return;
    }
    var id = Number(button.getAttribute("data-id"));
    jobs = jobs.filter(function (job) {
      return job.id !== id;
    });
    saveJobs();
    render();
  });

  filterSelect.addEventListener("change", render);

  render();
})();
