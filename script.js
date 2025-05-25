        document.addEventListener('DOMContentLoaded', () => {
            // --- DOM Element References ---
            const routineForm = document.getElementById('routine-form');
            const taskStartTimeInput = document.getElementById('task-start-time');
            const taskEndTimeInput = document.getElementById('task-end-time');
            const taskActivitySearchInput = document.getElementById('task-activity-search');
            const activitySuggestionsDiv = document.getElementById('activity-suggestions');
            const taskPriorityInput = document.getElementById('task-priority');
            const taskCategoryInput = document.getElementById('task-category');
            const taskNotesInput = document.getElementById('task-notes');
            const routineTableBody = document.getElementById('routine-table-body');
            const printButton = document.getElementById('print-button');
            const currentDateDisplay = document.getElementById('current-date');
            const printDateDisplay = document.getElementById('print-date');
            const currentTaskCard = document.querySelector('.current-task');
            const currentTaskInfo = document.getElementById('current-task-info');
            const currentTaskDetails = document.getElementById('current-task-details');
            const currentTaskIndicators = document.getElementById('current-task-indicators');
            const currentTaskTimerBar = document.getElementById('current-task-timer-bar');
            const currentTaskProgress = document.getElementById('current-task-progress');
            const emptyRoutineMessage = document.getElementById('empty-routine-message');
            const routineTable = document.querySelector('.routine-table');
            const notificationArea = document.getElementById('notification-area');
            const appContainer = document.querySelector('.app-container'); // Reference for print class toggling
            const fullscreenTimerBtn = document.getElementById('fullscreen-timer-btn');
            const fullscreenTimerModal = document.getElementById('fullscreen-timer-modal');
            const exitFullscreenBtn = document.getElementById('exit-fullscreen-btn');
            const fullscreenTaskName = document.getElementById('fullscreen-task-name');
            const fullscreenStartTime = document.getElementById('fullscreen-start-time');
            const fullscreenEndTime = document.getElementById('fullscreen-end-time');
            const fullscreenTimeRemaining = document.getElementById('fullscreen-time-remaining');
            const fullscreenProgressBar = document.getElementById('fullscreen-progress-bar');
            const fullscreenCurrentTime = document.getElementById('fullscreen-current-time');
            const fullscreenDigitalTimer = document.getElementById('fullscreen-digital-timer');
            const updateModal = document.getElementById('update-modal');
            const modalContent = document.getElementById('modal-content');
            const updateForm = document.getElementById('update-routine-form');
            const updateTaskIdInput = document.getElementById('update-task-id');
            const updateStartTimeInput = document.getElementById('update-start-time');
            const updateEndTimeInput = document.getElementById('update-end-time');
            const updateActivitySearchInput = document.getElementById('update-task-activity-search');
            const updateActivitySuggestionsDiv = document.getElementById('update-activity-suggestions');
            const updatePriorityInput = document.getElementById('update-task-priority');
            const updateCategoryInput = document.getElementById('update-task-category');
            const updateNotesInput = document.getElementById('update-task-notes');
            const modalCloseButton = document.getElementById('modal-close-button');
            const modalCancelButton = document.getElementById('modal-cancel-button');
            const ROUTINE_STORAGE_KEY = 'dailySmartRoutineV6_1';
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            document.getElementById('current-year').textContent = new Date().getFullYear();



            // --- Predefined Activity Options (Sorted Alphabetically) ---
            const activityOptions = [
                "ICT", "English 1st Paper", "English 2nd Paper", "অ্যাসাইনমেন্ট", "অন্যান্য", "অনলাইন কোর্স", "উচ্চতর গণিত ১ম পত্র", "উচ্চতর গণিত ২য় পত্র",
                "ইশা নামাজ", "ইয়োগা/মেডিটেশন", "ইবাদত", "কাজের প্রস্তুতি", "কলেজ/ভার্সিটি ক্লাস", "কোচিং/প্রাইভেট", "খাবার", "খেলাধুলা/বিনোদন",
                "ঘর গোছানো", "ঘুম (দুপুরের)", "ঘুম (রাতের)", "গ্রুপ স্টাডি", "জীববিজ্ঞান ১ম পত্র", "জীববিজ্ঞান ২য় পত্র", "তাহাজ্জুদ নামাজ",
                "দুআ ও যিকির", "দুপুরের খাবার", "নোট করা", "পরিষ্কার পরিচ্ছন্নতা", "পদার্থবিজ্ঞান ১ম পত্র", "পদার্থবিজ্ঞান ২য় পত্র",
                "পরীক্ষার প্রস্তুতি", "পারিবারিক সময়", "পানি পান", "প্রোগ্রামিং চর্চা", "ফজর নামাজ ও কুরআন পাঠ", "ফ্রিল্যান্সিং কাজ",
                "বই পড়া (অন্যান্য)", "বন্ধুদের সাথে আড্ডা", "ব্যায়াম/ওয়ার্কআউট", "বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "বাজার করা",
                "বিশ্রাম/বিনোদন", "ব্লগিং/লেখালেখি", "ভ্রমণ", "ভাষা শিক্ষা", "মডেল টেস্ট", "মাগরিব নামাজ", "যোহর নামাজ", "রসায়ন ১ম পত্র",
                "রসায়ন ২য় পত্র", "রাতের খাবার", "রিভিশন", "লেকচার দেখা", "ল্যাব ওয়ার্ক", "লাইব্রেরী ওয়ার্ক", "শিক্ষকের সাথে আলোচনা",
                "সকালের নাস্তা", "সিনেমা/সিরিজ দেখা", "Physics 1st Paper", "Chemistry 1st Paper", "Physics 2nd Paper", "Physics", "Chemistry", "Biology", "Math", "Playing", "Chemistry 2nd Paper", "Biology 1st Paper", "Biology 2nd Paper", "Math 1st Paper", "Math 2nd Paper", "Facebook", "Gym", "English", "Bangla", "Coaching", "Gaming", "Others",  "সোশ্যাল মিডিয়া ব্রাউজিং", "স্কিল ডেভেলপমেন্ট", "হাঁটা/জগিং", "হালকা নাস্তা/বিরতি", "আসর নামাজ", "ব্যক্তিগত কাজ"
            ].sort((a, b) => a.localeCompare(b, 'bn')); // Sort using Bengali locale

            // --- Category Mapping (with Bengali labels) ---
            const categoryMap = {
                study: { label: 'পড়াশোনা', icon: 'fas fa-book-open', colorClass: 'category-study' },
                prayer: { label: 'ইবাদত', icon: 'fas fa-mosque', colorClass: 'category-prayer' },
                meal: { label: 'খাবার', icon: 'fas fa-utensils', colorClass: 'category-meal' },
                break: { label: 'বিশ্রাম/বিনোদন', icon: 'fas fa-couch', colorClass: 'category-break' },
                personal: { label: 'ব্যক্তিগত', icon: 'fas fa-user', colorClass: 'category-personal' },
                work: { label: 'কাজ', icon: 'fas fa-briefcase', colorClass: 'category-work' },
                other: { label: 'অন্যান্য', icon: 'fas fa-ellipsis-h', colorClass: 'category-other' }
            };

             // --- Priority Mapping (with Bengali labels) ---
            const priorityMap = {
                high: { label: 'উচ্চ', colorClass: 'priority-high', sortOrder: 1 },
                medium: { label: 'মাঝারি', colorClass: 'priority-medium', sortOrder: 2 },
                low: { label: 'নিম্ন', colorClass: 'priority-low', sortOrder: 3 }
            };

            // --- Sound Synthesizer (Tone.js) ---
            let synth = null;
            let toneJsInitialized = false;
            let fullscreenUpdateInterval;

            async function initializeTone() {
                if (!toneJsInitialized && window.Tone) {
                    try {
                        await Tone.start(); // Requires user interaction (like a click)
                        synth = new Tone.Synth({
                            oscillator: { type: 'sine' },
                            envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 }
                        }).toDestination();
                        toneJsInitialized = true;
                        console.log("Tone.js AudioContext started and Synth initialized.");
                    } catch (e) {
                        console.error("Could not start Tone.js AudioContext:", e);
                        // Optionally show a message to the user to click the screen
                    }
                }
            }

            function playSound(note = 'C5', duration = '16n') {
                 if (!toneJsInitialized) {
                     console.warn("Tone.js not initialized. Sound playback skipped. Needs user interaction first.");
                     initializeTone();
                     return;
                 }
                 if (synth && Tone.context.state === 'running') {
                    try {
                        synth.triggerAttackRelease(note, duration, Tone.now());
                    } catch (err) {
                         console.error("Error playing sound:", err);
                    }
                } else {
                     console.warn("AudioContext not running or synth not ready.");
                     // Maybe context was suspended again
                     if (Tone.context.state !== 'running') initializeTone();
                }
            }


            // --- State ---
            let routine = loadRoutine();
            let currentTaskInterval;
            let userInteracted = false; 

            displayCurrentDate();
            renderRoutineTable();
            setupEventListeners();
            updateCurrentTaskDisplay(); // Initial call
            startCurrentTaskUpdater(); // Start interval

            function showNotification(message, type = 'success', duration = 3500) {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                let iconClass = 'fas fa-check-circle';
                if (type === 'error') iconClass = 'fas fa-times-circle';
                if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
                notification.innerHTML = `<i class="${iconClass}"></i> <span class="font-bengali font-medium">${message}</span>`;
                notification.setAttribute('role', 'alert'); // Accessibility
                notificationArea.appendChild(notification);

                // Force reflow to enable transition
                void notification.offsetWidth;

                requestAnimationFrame(() => {
                    notification.classList.add('show');
                });

                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.addEventListener('transitionend', () => notification.remove(), { once: true });
                }, duration);
            }

            function loadRoutine() {
                const storedRoutine = localStorage.getItem(ROUTINE_STORAGE_KEY);
                try {
                    const parsed = storedRoutine ? JSON.parse(storedRoutine) : [];
                    // Basic validation: check if it's an array and items have essential properties
                    if (Array.isArray(parsed) && parsed.every(item => item && typeof item.id === 'string' && item.startTime && item.endTime && item.activity && item.priority && item.category)) {
                        return parsed;
                    } else if (storedRoutine) { // If data exists but is invalid
                        console.warn("Invalid data found in localStorage for key:", ROUTINE_STORAGE_KEY, ". Resetting routine.");
                        localStorage.removeItem(ROUTINE_STORAGE_KEY); // Clear invalid data
                        showNotification("রুটিন ডেটা ত্রুটিপূর্ণ ছিল, রিসেট করা হয়েছে।", "warning", 5000);
                        return [];
                    } else {
                         return []; // No data found, return empty array
                    }
                } catch (e) {
                    console.error("Error parsing routine from localStorage:", e);
                    localStorage.removeItem(ROUTINE_STORAGE_KEY); // Clear potentially corrupted data
                    showNotification("রুটিন লোড করতে সমস্যা হয়েছে।", "error");
                    return [];
                }
            }

             function sortRoutine(routineArray) {
                 // Sort primarily by priority (High > Medium > Low), then by start time
                 routineArray.sort((a, b) => {
                     const priorityOrderA = priorityMap[a.priority]?.sortOrder ?? 99; // Default to low priority if map missing
                     const priorityOrderB = priorityMap[b.priority]?.sortOrder ?? 99;
                     if (priorityOrderA !== priorityOrderB) {
                         return priorityOrderA - priorityOrderB; // Lower number = higher priority = comes first
                     }
                     // If priorities are the same, sort by start time
                     return a.startTime.localeCompare(b.startTime);
                 });
             }

            function saveRoutine() {
                try {
                    sortRoutine(routine); // Sort before saving
                    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routine));
                } catch (e) {
                    console.error("Error saving routine to localStorage:", e);
                    showNotification("রুটিন সেভ করতে সমস্যা হচ্ছে! LocalStorage পূর্ণ হতে পারে।", "error", 5000);
                }
            }

            function displayCurrentDate() {
                const now = new Date();
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let dateString = '';
                try {
                    // Use bn-BD locale for Bengali date format
                    dateString = now.toLocaleDateString('bn-BD', options);
                } catch (e) {
                    console.warn("bn-BD locale not supported or failed. Using default locale.", e);
                    // Fallback to default locale
                    dateString = now.toLocaleDateString(undefined, options);
                }
                currentDateDisplay.textContent = `আজ: ${dateString}`;
                printDateDisplay.textContent = dateString; // Set print date as well
            }

            // Helper function to convert time string (HH:MM) to minutes since midnight
            function timeToMinutes(timeStr) {
                if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0;
                const [hours, minutes] = timeStr.split(':').map(Number);
                if (isNaN(hours) || isNaN(minutes)) return 0; // Handle invalid format
                return hours * 60 + minutes;
            }

            function calculateDuration(start, end) {
                const startMinutes = timeToMinutes(start);
                let endMinutes = timeToMinutes(end);

                if (endMinutes <= startMinutes) {
                    endMinutes += 24 * 60; // Add 24 hours in minutes
                }

                const diffMinutes = endMinutes - startMinutes;

                if (diffMinutes <= 0) return { totalMinutes: 0, text: "০ মিনিট" };

                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;

                let durationStr = "";
                if (hours > 0) durationStr += `${toBengaliDigits(hours)} ঘণ্টা `;
                if (minutes > 0 || hours === 0) durationStr += `${toBengaliDigits(minutes)} মিনিট`; // Show minutes if non-zero, or if hours is zero

                return { totalMinutes: diffMinutes, text: durationStr.trim() };
            }

            function formatTimeRemaining(diffMillis) {
                if (diffMillis <= 0) return "সময় শেষ";
                const totalSeconds = Math.ceil(diffMillis / 1000); // Round up seconds

                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                let remainingStr = "";
                if (hours > 0) remainingStr += `${toBengaliDigits(hours)} ঘণ্টা `;
                if (minutes > 0) remainingStr += `${toBengaliDigits(minutes)} মিনিট `;
                // Only show seconds if less than a minute remaining for better readability
                if (hours === 0 && minutes === 0 && seconds > 0) {
                    remainingStr += `${toBengaliDigits(seconds)} সেকেন্ড `;
                } else if (hours === 0 && minutes < 5) { // Show seconds if less than 5 mins left
                     remainingStr += `${toBengaliDigits(seconds)} সেকেন্ড `;
                }


                return remainingStr.trim() + " বাকি";
            }

            function formatTimeBengaliFancy(time24) {
                 if (!time24 || !time24.includes(':')) return '';
                 const [hourStr, minuteStr] = time24.split(':');
                 let hour = parseInt(hourStr, 10);
                 const minute = parseInt(minuteStr, 10);

                 if (isNaN(hour) || isNaN(minute)) return ''; // Handle parsing errors

                 const period = hour < 5 ? 'রাত' // Before 5 AM
                           : hour < 12 ? 'সকাল' // 5 AM to 11:59 AM
                           : hour < 17 ? 'দুপুর' // 12 PM to 4:59 PM
                           : hour < 20 ? 'সন্ধ্যা' // 5 PM to 7:59 PM
                           : 'রাত'; // 8 PM onwards

                 let displayHour = hour % 12;
                 if (displayHour === 0) displayHour = 12; // Handle midnight and noon

                 const bengaliHour = toBengaliDigits(displayHour);
                 const bengaliMinute = toBengaliDigits(minute).padStart(2, toBengaliDigits(0)); // Pad minutes with Bengali zero

                 return `<span class="font-medium">${period} ${bengaliHour}:${bengaliMinute}</span>`; //<span class="text-xs text-gray-500"> (${time24})</span>`; // Removed 24h for cleaner look
            }

            function renderRoutineTable() {
                 sortRoutine(routine); // Ensure data is sorted before rendering
                 routineTableBody.innerHTML = ''; // Clear previous content

                if (routine.length === 0) {
                    emptyRoutineMessage.style.display = 'block';
                    routineTable.classList.add('hidden'); // Hide table structure
                    printButton.disabled = true; // Disable print button
                    printButton.classList.add('opacity-50', 'cursor-not-allowed');

                } else {
                    emptyRoutineMessage.style.display = 'none';
                    routineTable.classList.remove('hidden'); // Show table structure
                    printButton.disabled = false;
                    printButton.classList.remove('opacity-50', 'cursor-not-allowed');


                    routine.forEach(task => {
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', task.id);
                        row.className = 'hover:bg-purple-50/50 transition duration-150';

                        const duration = calculateDuration(task.startTime, task.endTime);
                        const categoryInfo = categoryMap[task.category] || categoryMap.other;
                        const priorityInfo = priorityMap[task.priority] || priorityMap.medium;

                        // Text for print (Priority and Category)
                        const printExtraText = `(${priorityInfo.label}, ${categoryInfo.label})`;

                        row.innerHTML = `
                            <td class="px-4 py-2.5 whitespace-nowrap text-sm text-gray-700 font-bengali">${formatTimeBengaliFancy(task.startTime)} - ${formatTimeBengaliFancy(task.endTime)}</td>
                            <td class="px-4 py-2.5 whitespace-nowrap text-sm text-gray-600 font-bengali">${duration.text}</td>
                            <td class="px-4 py-2.5 text-sm text-gray-900 font-medium font-bengali">
                                <span class="priority-dot ${priorityInfo.colorClass}" title="অগ্রাধিকার: ${priorityInfo.label}"></span>
                                <span class="${categoryInfo.colorClass} category-badge mr-1.5" title="বিভাগ: ${categoryInfo.label}">
                                    <i class="${categoryInfo.icon} text-xs"></i>
                                    <span class="hidden sm:inline">${categoryInfo.label}</span> <!-- Hide label on small screens -->
                                </span>
                                ${escapeHtml(task.activity)}
                                <span class="print-only print-priority-category-text">${printExtraText}</span> <!-- Print-only text -->
                            </td>
                            <td class="px-4 py-2.5 text-sm text-gray-500 max-w-xs truncate font-bengali" title="${escapeHtml(task.notes || '')}">${escapeHtml(task.notes || '-')}</td>
                            <td class="px-4 py-2.5 whitespace-nowrap text-right text-sm font-medium no-print">
                                <div class="flex items-center justify-start gap-1.5">
                                    <button class="btn-update text-blue-500 hover:text-blue-700 transition duration-200 p-1.5 rounded-md hover:bg-blue-100" data-id="${task.id}" title="আপডেট করুন" aria-label="কাজ আপডেট করুন: ${escapeHtml(task.activity)}">
                                        <i class="fas fa-pencil-alt fa-fw"></i>
                                    </button>
                                    <button class="btn-delete text-red-500 hover:text-red-700 transition duration-200 p-1.5 rounded-md hover:bg-red-100" data-id="${task.id}" title="মুছে ফেলুন" aria-label="কাজ মুছে ফেলুন: ${escapeHtml(task.activity)}">
                                        <i class="fas fa-trash-alt fa-fw"></i>
                                    </button>
                                </div>
                            </td>
                        `;

                        if (task.isNew) {
                            row.classList.add('new-task-animation');
                            delete task.isNew;
                        }

                        routineTableBody.appendChild(row);
                    });
                }
            }

            // Simple HTML escaping function
            function escapeHtml(unsafe) {
                if (typeof unsafe !== 'string') return unsafe; // Return non-strings as is
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }

            function startCurrentTaskUpdater() {
                // Clear existing interval if any
                if (currentTaskInterval) clearInterval(currentTaskInterval);
                 // Run immediately first time
                 updateCurrentTaskDisplay();
                // Then set interval to run every second
                currentTaskInterval = setInterval(updateCurrentTaskDisplay, 1000);
            }

            function stopCurrentTaskUpdater() {
                 if (currentTaskInterval) clearInterval(currentTaskInterval);
                 currentTaskInterval = null;
            }

            function updateCurrentTaskDisplay() {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimeMinutes = currentHour * 60 + currentMinute;

                let currentTask = null;
                let nextTask = null;

                 // Find the current task
                for (const task of routine) { // Use the already sorted routine
                    const taskStartMinutes = timeToMinutes(task.startTime);
                    let taskEndMinutes = timeToMinutes(task.endTime);
                    let isOvernight = false;

                    if (taskEndMinutes <= taskStartMinutes) { 
                        taskEndMinutes += 24 * 60;
                        isOvernight = true;
                    }

                    // Check if current time falls within the task's duration
                    if (isOvernight) {
                        // Overnight task: current time is after start OR before end (on the next day)
                        if (currentTimeMinutes >= taskStartMinutes || currentTimeMinutes < (taskEndMinutes - 24 * 60)) {
                            currentTask = task;
                            break; // Found the current task
                        }
                    } else {
                        // Same-day task: current time is between start and end
                        if (currentTimeMinutes >= taskStartMinutes && currentTimeMinutes < taskEndMinutes) {
                            currentTask = task;
                            break; // Found the current task
                        }
                    }
                }

                 for (const task of routine) {
                     const taskStartMinutes = timeToMinutes(task.startTime);
                     if (taskStartMinutes > currentTimeMinutes) {

                         if (!nextTask || taskStartMinutes < timeToMinutes(nextTask.startTime)) {
                              nextTask = task;
                              break;
                         }
                     }
                 }

                 if (!nextTask && routine.length > 0) {
                     const firstTaskStartMinutes = timeToMinutes(routine[0].startTime);
                     if (firstTaskStartMinutes < currentTimeMinutes) {
                     } else if (firstTaskStartMinutes > currentTimeMinutes) {
                          
                           nextTask = routine[0];
                     }
                 }

                currentTaskCard.classList.remove('current-task-pulse-anim'); // Remove previous pulse
                void currentTaskCard.offsetWidth; // Trigger reflow for animation restart

                currentTaskIndicators.innerHTML = ''; // Clear previous indicators

                if (currentTask) {
                    fullscreenTimerBtn.style.display = 'block';
                    const duration = calculateDuration(currentTask.startTime, currentTask.endTime);
                    const categoryInfo = categoryMap[currentTask.category] || categoryMap.other;
                    const priorityInfo = priorityMap[currentTask.priority] || priorityMap.medium;

                    // Calculate time remaining & progress (handle overnight correctly)
                    const taskStartDateTime = new Date(now);
                    taskStartDateTime.setHours(...currentTask.startTime.split(':').map(Number), 0, 0);

                    const taskEndDateTime = new Date(now);
                    taskEndDateTime.setHours(...currentTask.endTime.split(':').map(Number), 0, 0);

                    // Adjust dates for overnight tasks relative to 'now'
                    if (taskEndDateTime <= taskStartDateTime) { // If end time is on or before start time (e.g., 22:00 - 06:00)
                       // If current time is after midnight but before end time
                       if (now < taskEndDateTime) {
                           taskStartDateTime.setDate(taskStartDateTime.getDate() - 1); // Start was yesterday
                       } else { // Current time is after start time but before midnight
                           taskEndDateTime.setDate(taskEndDateTime.getDate() + 1); // End is tomorrow
                       }
                    } else {
                        fullscreenTimerBtn.style.display = 'none';
                         // Handle edge case where task is 00:00 to 01:00 and now is 23:59
                         if (taskStartDateTime > now && taskEndDateTime > now && taskStartDateTime > taskEndDateTime) {
                              // This shouldn't happen with the above check but as safety
                              taskStartDateTime.setDate(taskStartDateTime.getDate() -1);
                         }
                    }

                    const totalDurationMillis = Math.max(1, taskEndDateTime - taskStartDateTime); // Avoid division by zero
                    const timeRemainingMillis = Math.max(0, taskEndDateTime - now);
                    const timeElapsedMillis = totalDurationMillis - timeRemainingMillis;
                    const progressPercentage = Math.min(100, (timeElapsedMillis / totalDurationMillis) * 100);

                    // Update Task Info Area
                    currentTaskInfo.innerHTML = `<i class="${categoryInfo.icon} mr-2 text-teal-600"></i> ${escapeHtml(currentTask.activity)}`;
                    currentTaskDetails.innerHTML = `
                        <div class="flex items-center gap-2 text-xs flex-wrap">
                            <i class="fas fa-clock fa-fw text-teal-500"></i>
                            <span>${formatTimeBengaliFancy(currentTask.startTime)} - ${formatTimeBengaliFancy(currentTask.endTime)}</span>
                            <span class="mx-1 text-gray-400 hidden sm:inline">|</span>
                            <i class="fas fa-hourglass-half fa-fw text-teal-500"></i>
                            <span>মোট: ${duration.text}</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs font-medium text-teal-600 mt-1">
                            <i class="fas fa-stopwatch fa-fw"></i>
                            <span>${formatTimeRemaining(timeRemainingMillis)}</span>
                        </div>
                        ${currentTask.notes ? `<div class="flex items-start gap-2 mt-1.5 pt-1.5 border-t border-teal-200/60 text-xs"><i class="fas fa-info-circle fa-fw text-teal-500 mt-0.5"></i><span class="break-words">${escapeHtml(currentTask.notes)}</span></div>` : ''}
                    `;

                    // Add indicators (Priority Dot & Category Badge)
                    currentTaskIndicators.innerHTML = `
                        <span class="priority-dot ${priorityInfo.colorClass}" title="অগ্রাধিকার: ${priorityInfo.label}"></span>
                        <span class="${categoryInfo.colorClass} category-badge" title="বিভাগ: ${categoryInfo.label}">
                            <i class="${categoryInfo.icon} text-xs"></i>
                            <span class="hidden sm:inline">${categoryInfo.label}</span>
                        </span>
                    `;

                    currentTaskProgress.style.width = `${progressPercentage}%`;
                    currentTaskTimerBar.style.display = 'block';
                    currentTaskCard.classList.add('current-task-pulse-anim'); // Add pulse effect
                    fullscreenTimerBtn.style.display = 'block';

                } else if (nextTask) {
                    fullscreenTimerBtn.style.display = 'none';
                     const categoryInfo = categoryMap[nextTask.category] || categoryMap.other;
                     const priorityInfo = priorityMap[nextTask.priority] || priorityMap.medium;

                     const taskStartDateTime = new Date(now);
                     taskStartDateTime.setHours(...nextTask.startTime.split(':').map(Number), 0, 0);

                      // If the next task's start time is earlier today than now, it must be for tomorrow
                     if (taskStartDateTime < now) {
                         taskStartDateTime.setDate(taskStartDateTime.getDate() + 1);
                     }

                     const timeUntilStartMillis = Math.max(0, taskStartDateTime - now);

                    currentTaskInfo.innerHTML = `<i class="fas fa-forward mr-2 text-indigo-600"></i> পরবর্তী: ${escapeHtml(nextTask.activity)}`;
                    currentTaskDetails.innerHTML = `
                        <div class="flex items-center gap-2 text-xs flex-wrap">
                            <i class="fas fa-hourglass-start fa-fw text-indigo-500"></i>
                            <span>শুরু হবে: ${formatTimeBengaliFancy(nextTask.startTime)} (${formatTimeRemaining(timeUntilStartMillis).replace('বাকি', 'পর')})</span>
                        </div>
                         ${nextTask.notes ? `<div class="flex items-start gap-2 mt-1.5 pt-1.5 border-t border-indigo-200/60 text-xs"><i class="fas fa-info-circle fa-fw text-indigo-500 mt-0.5"></i><span class="break-words">${escapeHtml(nextTask.notes)}</span></div>` : ''}
                    `;
                     // Add indicators for next task
                     currentTaskIndicators.innerHTML = `
                        <span class="priority-dot ${priorityInfo.colorClass}" title="অগ্রাধিকার: ${priorityInfo.label}"></span>
                        <span class="${categoryInfo.colorClass} category-badge" title="বিভাগ: ${categoryInfo.label}">
                            <i class="${categoryInfo.icon} text-xs"></i>
                            <span class="hidden sm:inline">${categoryInfo.label}</span>
                        </span>
                    `;
                    currentTaskTimerBar.style.display = 'none'; // Hide progress bar for next task
                } else {
                    // No current or upcoming task found
                    currentTaskInfo.innerHTML = `<i class="fas fa-coffee mr-2 text-gray-600"></i> এখন কোনো নির্ধারিত কাজ নেই`;
                    currentTaskDetails.innerHTML = `
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <i class="fas fa-plus-circle fa-fw"></i>
                            <span>নতুন কাজ যোগ করুন অথবা বিশ্রাম নিন!</span>
                        </div>
                    `;
                    currentTaskTimerBar.style.display = 'none'; // Hide progress bar
                }
            }


            // Converts numbers in a string to Bengali digits
            function toBengaliDigits(num) {
                if (num === null || num === undefined) return ''; // Handle null/undefined input
                const numStr = String(num); // Convert input to string
                const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
                return numStr.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)]);
            }

            // Sets up the searchable input with suggestions dropdown
             function setupSearchableInput(inputElement, suggestionsElement) {
                 inputElement.addEventListener('input', () => filterAndShowSuggestions(inputElement.value, inputElement, suggestionsElement));
                 inputElement.addEventListener('focus', () => filterAndShowSuggestions(inputElement.value, inputElement, suggestionsElement));
                 // Close suggestions when clicking outside
                 document.addEventListener('click', (e) => {
                     if (!inputElement.contains(e.target) && !suggestionsElement.contains(e.target)) {
                         suggestionsElement.classList.add('hidden');
                     }
                 });
                 // Keyboard navigation for suggestions
                 inputElement.addEventListener('keydown', (e) => handleSuggestionNav(e, inputElement, suggestionsElement));
            }

             // Filters activityOptions based on query and displays them
            function filterAndShowSuggestions(query, inputElement, suggestionsElement) {
                const lowerCaseQuery = query.trim().toLowerCase();
                suggestionsElement.innerHTML = ''; // Clear previous suggestions

                 // Filter options: check if the Bengali option includes the query
                const filteredOptions = activityOptions.filter(option =>
                     option.toLowerCase().includes(lowerCaseQuery)
                 );

                if (filteredOptions.length > 0 && query.length > 0) { // Show only if query exists and results found
                    filteredOptions.slice(0, 7).forEach(option => { // Limit to 7 suggestions
                        const item = document.createElement('div');
                        // Highlight matching part (case-insensitive)
                        const regex = new RegExp(`(${escapeRegExp(lowerCaseQuery)})`, 'ig');
                        const highlightedOption = escapeHtml(option).replace(regex, '<mark class="bg-yellow-200/70 px-0 rounded font-semibold">$1</mark>');

                        item.innerHTML = highlightedOption;
                        item.className = 'suggestion-item px-3 py-1.5 cursor-pointer hover:bg-purple-100 transition duration-150 text-sm text-gray-700 font-bengali';
                        item.setAttribute('role', 'option');
                        item.tabIndex = -1; // Make it focusable via keyboard navigation later
                        item.dataset.value = option; // Store original value

                        item.addEventListener('click', () => {
                            inputElement.value = item.dataset.value; // Set input value
                            suggestionsElement.classList.add('hidden'); // Hide suggestions
                            inputElement.focus(); // Keep focus on input or move to next field
                        });
                        suggestionsElement.appendChild(item);
                    });
                    suggestionsElement.classList.remove('hidden'); // Show suggestions list
                } else {
                    suggestionsElement.classList.add('hidden'); // Hide if no results or empty query
                }
            }

            function escapeRegExp(string) {
              return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
            }

             function handleSuggestionNav(e, inputElement, suggestionsElement) {
                const items = suggestionsElement.querySelectorAll('.suggestion-item');
                if (items.length === 0 || suggestionsElement.classList.contains('hidden')) return;

                let currentFocusIndex = -1;
                items.forEach((item, index) => {
                    if (item.classList.contains('bg-purple-100')) {
                        currentFocusIndex = index;
                    }
                    item.classList.remove('bg-purple-100'); 
                });

                if (e.key === 'ArrowDown') {
                    e.preventDefault(); // Prevent cursor move in input
                    currentFocusIndex = (currentFocusIndex + 1) % items.length;
                } else if (e.key === 'ArrowUp') {
                     e.preventDefault(); // Prevent cursor move in input
                    currentFocusIndex = (currentFocusIndex - 1 + items.length) % items.length;
                } else if (e.key === 'Enter' && currentFocusIndex > -1) {
                    e.preventDefault(); // Prevent form submission
                    items[currentFocusIndex].click(); // Simulate click on the selected item
                    return;
                } else if (e.key === 'Escape') {
                    suggestionsElement.classList.add('hidden');
                    return;
                } else {
                    return;
                }

                if (currentFocusIndex > -1) {
                     items[currentFocusIndex].classList.add('bg-purple-100'); 
                     items[currentFocusIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                 }
            }


            function setupEventListeners() {
            
                fullscreenTimerBtn.addEventListener('click', openFullscreenTimer);
                exitFullscreenBtn.addEventListener('click', closeFullscreenTimer);
                routineForm.addEventListener('submit', handleAddTask);
                routineTableBody.addEventListener('click', handleTableActions);
                setupSearchableInput(taskActivitySearchInput, activitySuggestionsDiv);
                setupSearchableInput(updateActivitySearchInput, updateActivitySuggestionsDiv);
                updateForm.addEventListener('submit', handleUpdateTask);
                modalCloseButton.addEventListener('click', closeUpdateModal);
                modalCancelButton.addEventListener('click', closeUpdateModal);
                updateModal.addEventListener('click', (e) => {
                    if (e.target === updateModal) {
                        closeUpdateModal();
                    }
  

                });

                                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !fullscreenTimerModal.classList.contains('hidden')) {
                        closeFullscreenTimer();
                    }
                });
                
                updateModal.addEventListener('click', (e) => {
                    if (e.target === updateModal) {
                        closeUpdateModal();
                    }
                });


                // Print button
                printButton.addEventListener('click', handlePrint);

                 document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        stopCurrentTaskUpdater();
                    } else {
                         startCurrentTaskUpdater();
                     }
                 });

                 const interactionEvents = ['click', 'keydown', 'touchstart'];
                 const interactionListener = () => {
                     if (!userInteracted) {
                        userInteracted = true;
                        initializeTone();
                        interactionEvents.forEach(event => document.body.removeEventListener(event, interactionListener));
                        console.log("User interaction detected, attempting Tone.js initialization.");
                     }
                 };
                 interactionEvents.forEach(event => document.body.addEventListener(event, interactionListener, { once: true }));

                 // Input validation for time fields
                 taskEndTimeInput.addEventListener('change', () => validateTimeOrder(taskStartTimeInput, taskEndTimeInput));
                 updateEndTimeInput.addEventListener('change', () => validateTimeOrder(updateStartTimeInput, updateEndTimeInput));
            }

            function validateTimeOrder(startInput, endInput) {
                const startTime = startInput.value;
                const endTime = endInput.value;
                if (startTime && endTime) {
                    const duration = calculateDuration(startTime, endTime);
                    if (duration.totalMinutes <= 0) {
                        showNotification("শেষের সময় অবশ্যই শুরুর সময়ের পরে হতে হবে।", "warning");
                        endInput.classList.add('border-red-500'); // Highlight error
                         // endInput.value = ''; // Optionally clear the invalid input
                    } else {
                        endInput.classList.remove('border-red-500'); // Remove error highlight
                    }
                } else {
                     endInput.classList.remove('border-red-500'); // Clear error if one is empty
                }
            }

            function handleAddTask(e) {
                e.preventDefault();
                 if (!userInteracted) { // Remind user if interaction needed for sound
                     console.warn("Attempting to add task before user interaction - sound might not play.");
                 }

                const startTime = taskStartTimeInput.value;
                const endTime = taskEndTimeInput.value;
                const activity = taskActivitySearchInput.value.trim();
                const priority = taskPriorityInput.value;
                const category = taskCategoryInput.value;
                const notes = taskNotesInput.value.trim();

                // --- Validation ---
                if (!startTime || !endTime || !activity) {
                    showNotification("অনুগ্রহ করে সময় এবং কাজ/বিষয় পূরণ করুন।", "warning");
                    // Highlight missing fields (optional)
                    if (!startTime) taskStartTimeInput.focus();
                    else if (!endTime) taskEndTimeInput.focus();
                    else taskActivitySearchInput.focus();
                    return;
                }

                 const durationCheck = calculateDuration(startTime, endTime);
                 if (durationCheck.totalMinutes <= 0) {
                    showNotification("শেষের সময় অবশ্যই শুরুর সময়ের পরে হতে হবে।", "warning");
                    taskEndTimeInput.focus();
                    taskEndTimeInput.classList.add('border-red-500');
                    return;
                 } else {
                     taskEndTimeInput.classList.remove('border-red-500');
                 }

                 if (hasTimeOverlap({ id: null, startTime, endTime })) {
                     showNotification("এই সময়ে অন্য একটি কাজ নির্ধারিত আছে। অনুগ্রহ করে সময় পরিবর্তন করুন।", "warning");
                     taskStartTimeInput.focus(); 
                     return;
                 }

                const newTask = {
                    id: Date.now().toString() + Math.random().toString(36).substring(2, 7), // More unique ID
                    startTime, endTime, activity, priority, category, notes,
                    isNew: true // Flag for animation
                };

                routine.push(newTask);
                saveRoutine(); // Save and sort
                renderRoutineTable();
                updateCurrentTaskDisplay(); // Refresh current task view
                showNotification("কাজ সফলভাবে যোগ করা হয়েছে!", "success");
                playSound('E5', '8n'); // Play confirmation sound

                routineForm.reset();
                taskActivitySearchInput.value = ''; // Explicitly clear search input
                activitySuggestionsDiv.classList.add('hidden'); // Hide suggestions
                taskStartTimeInput.focus(); // Focus back on the start time input
            }

             function hasTimeOverlap(taskToCheck) {
                const newStart = timeToMinutes(taskToCheck.startTime);
                let newEnd = timeToMinutes(taskToCheck.endTime);
                if (newEnd <= newStart) newEnd += 24 * 60;

                for (const existingTask of routine) {
                    if (taskToCheck.id && existingTask.id === taskToCheck.id) {
                        continue;
                    }

                    const existingStart = timeToMinutes(existingTask.startTime);
                    let existingEnd = timeToMinutes(existingTask.endTime);
                    if (existingEnd <= existingStart) existingEnd += 24 * 60;

                    if (newStart < existingEnd && newEnd > existingStart) {
                        console.warn("Overlap detected:", taskToCheck, "overlaps with", existingTask);
                        return true; 
                    }
                }
                return false; 
            }

            function handleTableActions(e) {
                const target = e.target;
                const updateButton = target.closest('.btn-update');
                const deleteButton = target.closest('.btn-delete');

                if (updateButton) {
                    const taskId = updateButton.dataset.id;
                    openUpdateModal(taskId);
                } else if (deleteButton) {
                    const taskId = deleteButton.dataset.id;
                    const taskRow = deleteButton.closest('tr'); 
                    handleDeleteTask(taskId, taskRow);
                }
            }

            function handleDeleteTask(taskId, taskRow) {
                 const taskToDelete = routine.find(task => task.id === taskId);
                 const taskActivity = taskToDelete ? `"${escapeHtml(taskToDelete.activity)}"` : "এই";

                if (confirm(`আপনি কি ${taskActivity} কাজটি তালিকা থেকে মুছে ফেলতে নিশ্চিত?`)) {
                    taskRow.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    taskRow.style.opacity = '0';
                    taskRow.style.transform = 'translateX(-30px)'; 

                    setTimeout(() => {
                        routine = routine.filter(task => task.id !== taskId);
                        saveRoutine(); 
                        renderRoutineTable(); 
                        updateCurrentTaskDisplay(); 
                        showNotification("কাজটি সফলভাবে মুছে ফেলা হয়েছে।", "success");
                         playSound('C4', '8n'); 
                    }, 400); 
                }
            }

            function openUpdateModal(taskId) {
                const taskToUpdate = routine.find(task => task.id === taskId);
                if (!taskToUpdate) {
                     showNotification("আপডেট করার জন্য কাজটি খুঁজে পাওয়া যায়নি!", "error");
                     console.error("Task not found for update:", taskId);
                     return;
                }

                updateTaskIdInput.value = taskToUpdate.id;
                updateStartTimeInput.value = taskToUpdate.startTime;
                updateEndTimeInput.value = taskToUpdate.endTime;
                updateActivitySearchInput.value = taskToUpdate.activity;
                updatePriorityInput.value = taskToUpdate.priority;
                updateCategoryInput.value = taskToUpdate.category;
                updateNotesInput.value = taskToUpdate.notes || '';
                updateActivitySearchInput.classList.remove('border-red-500'); 
                updateEndTimeInput.classList.remove('border-red-500');

                updateModal.classList.remove('hidden');
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { 
                        modalContent.style.transform = 'scale(1) translateY(0)';
                        modalContent.style.opacity = '1';
                    });
                });
                document.body.style.overflow = 'hidden'; 

                updateStartTimeInput.focus(); 
            }

            function closeUpdateModal() {
                 modalContent.style.transform = 'scale(0.95) translateY(-20px)';
                 modalContent.style.opacity = '0';
                 setTimeout(() => {
                    updateModal.classList.add('hidden');
                    document.body.style.overflow = ''; 
                    updateActivitySuggestionsDiv.classList.add('hidden'); 
                     updateForm.reset(); 
                 }, 300); 
            }

            function handleUpdateTask(e) {
                e.preventDefault();

                const id = updateTaskIdInput.value;
                const startTime = updateStartTimeInput.value;
                const endTime = updateEndTimeInput.value;
                const activity = updateActivitySearchInput.value.trim();
                const priority = updatePriorityInput.value;
                const category = updateCategoryInput.value;
                const notes = updateNotesInput.value.trim();

                 // --- Validation ---
                if (!startTime || !endTime || !activity) {
                    showNotification("অনুগ্রহ করে সময় এবং কাজ/বিষয় পূরণ করুন।", "warning"); return;
                }
                 // Check time order
                 const durationCheck = calculateDuration(startTime, endTime);
                 if (durationCheck.totalMinutes <= 0) {
                    showNotification("শেষের সময় অবশ্যই শুরুর সময়ের পরে হতে হবে।", "warning");
                    updateEndTimeInput.focus();
                    updateEndTimeInput.classList.add('border-red-500');
                    return;
                 } else {
                     updateEndTimeInput.classList.remove('border-red-500');
                 }
                 // Check for overlap, excluding the task itself
                 if (hasTimeOverlap({ id, startTime, endTime })) {
                     showNotification("এই সময়ে অন্য একটি কাজ নির্ধারিত আছে। অনুগ্রহ করে সময় পরিবর্তন করুন।", "warning");
                     updateStartTimeInput.focus();
                     return;
                 }
                const taskIndex = routine.findIndex(task => task.id === id);
                if (taskIndex > -1) {
                    routine[taskIndex] = { ...routine[taskIndex], startTime, endTime, activity, priority, category, notes };
                    saveRoutine(); // Save the updated & sorted routine
                    renderRoutineTable(); // Re-render the table
                    updateCurrentTaskDisplay(); // Refresh current task display
                    closeUpdateModal(); // Close the modal
                    showNotification("কাজটি সফলভাবে আপডেট করা হয়েছে!", "success");
                     playSound('G5', '8n'); // Play update confirmation sound
                } else {
                     showNotification("ত্রুটি: আপডেট করার সময় কাজটি খুঁজে পাওয়া যায়নি।", "error");
                     console.error("Task to update not found in routine array:", id);
                }
            }

function handlePrint() {
    // Check if dark mode is currently enabled
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // If dark mode is enabled, temporarily switch to light mode
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
    }
    
    // Print the document
    window.print();
    
    // If dark mode was enabled, restore it after printing
    if (isDarkMode) {
        // Use setTimeout to ensure the print dialog has closed before restoring
        setTimeout(() => {
            document.body.classList.add('dark-mode');
        }, 500);
    }
}

            // Full Screen Timer Functions
function openFullscreenTimer() {
    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    
    // Find current task
    let currentTask = null;
    for (const task of routine) {
        const taskStartMinutes = timeToMinutes(task.startTime);
        let taskEndMinutes = timeToMinutes(task.endTime);
        let isOvernight = false;

        if (taskEndMinutes <= taskStartMinutes) {
            taskEndMinutes += 24 * 60;
            isOvernight = true;
        }

        if (isOvernight) {
            if (currentTimeMinutes >= taskStartMinutes || currentTimeMinutes < (taskEndMinutes - 24 * 60)) {
                currentTask = task;
                break;
            }
        } else {
            if (currentTimeMinutes >= taskStartMinutes && currentTimeMinutes < taskEndMinutes) {
                currentTask = task;
                break;
            }
        }
    }

    if (!currentTask) {
        showNotification("পূর্ণ স্ক্রিনে দেখার জন্য কোনো সক্রিয় কাজ নেই", "warning");
        return;
    }

    fullscreenTaskName.textContent = currentTask.activity;
    fullscreenStartTime.innerHTML = formatTimeBengaliFancy(currentTask.startTime);
    fullscreenEndTime.innerHTML = formatTimeBengaliFancy(currentTask.endTime);
    
    // Initial update
    updateFullscreenTimer(currentTask);
    
    // Start updating every second
    fullscreenUpdateInterval = setInterval(() => updateFullscreenTimer(currentTask), 1000);
    
    fullscreenTimerModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

        function updateFullscreenTimer(task) {
            const now = new Date();
            const taskStartDateTime = new Date(now);
            taskStartDateTime.setHours(...task.startTime.split(':').map(Number), 0, 0);

            const taskEndDateTime = new Date(now);
            taskEndDateTime.setHours(...task.endTime.split(':').map(Number), 0, 0);

            // Adjust for overnight tasks
            if (taskEndDateTime <= taskStartDateTime) {
                if (now < taskEndDateTime) {
                    taskStartDateTime.setDate(taskStartDateTime.getDate() - 1);
                } else {
                    taskEndDateTime.setDate(taskEndDateTime.getDate() + 1);
                }
            }

            const totalDurationMillis = Math.max(1, taskEndDateTime - taskStartDateTime);
            const timeRemainingMillis = Math.max(0, taskEndDateTime - now);
            const timeElapsedMillis = totalDurationMillis - timeRemainingMillis;
            const progressPercentage = Math.min(100, (timeElapsedMillis / totalDurationMillis) * 100);



            // Helper function to format time with period
            function formatTimeWithPeriod(time24) {
                if (!time24 || !time24.includes(':')) return '';
                const [hourStr, minuteStr] = time24.split(':');
                let hour = parseInt(hourStr, 10);
                const minute = parseInt(minuteStr, 10);

                if (isNaN(hour) || isNaN(minute)) return '';

                // Determine period
                const period = hour < 5 ? 'রাত'
                            : hour < 12 ? 'সকাল'
                            : hour < 17 ? 'দুপুর'
                            : hour < 20 ? 'সন্ধ্যা'
                            : 'রাত';

                let displayHour = hour % 12;
                if (displayHour === 0) displayHour = 12;

                const bengaliHour = toBengaliDigits(displayHour);
                const bengaliMinute = toBengaliDigits(minute).padStart(2, toBengaliDigits(0));

                return `${period} ${bengaliHour}:${bengaliMinute}`;
            }

            // Update current time display with period
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentPeriod = currentHours < 5 ? 'রাত'
                               : currentHours < 12 ? 'সকাল'
                               : currentHours < 17 ? 'দুপুর'
                               : currentHours < 20 ? 'সন্ধ্যা'
                               : 'রাত';
            const currentTimeStr = `${currentPeriod} ${toBengaliDigits(currentHours)}:${toBengaliDigits(currentMinutes).padStart(2, toBengaliDigits(0))}`;
            fullscreenCurrentTime.textContent = currentTimeStr;

            // Update start and end times with periods
            fullscreenStartTime.textContent = formatTimeWithPeriod(task.startTime);
            fullscreenEndTime.textContent = formatTimeWithPeriod(task.endTime);

            // Update digital countdown timer (HH:MM:SS)
            const totalSeconds = Math.ceil(timeRemainingMillis / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const digitalTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            fullscreenDigitalTimer.textContent = digitalTimeStr;

            fullscreenTimeRemaining.textContent = formatTimeRemaining(timeRemainingMillis);
            fullscreenProgressBar.style.width = `${progressPercentage}%`;
        }

function closeFullscreenTimer() {
    clearInterval(fullscreenUpdateInterval);
    fullscreenTimerModal.classList.add('hidden');
    document.body.style.overflow = '';
}


function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    } else {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    }
}

// Check for saved preference or system preference
if (localStorage.getItem('darkMode') === 'enabled' || 
    (localStorage.getItem('darkMode') === null && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', toggleDarkMode);

        }); 
