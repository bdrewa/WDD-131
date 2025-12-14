const pcBuilds = [
    {
        id: 1,
        name: "Build 1",
        type: "Gaming PC",
        specs: {
            cpu: "Intel i7-13700K",
            gpu: "RTX 4070 Ti",
            ram: "32GB DDR5",
            storage: "2TB NVMe SSD"
        }
    },
    {
        id: 2,
        name: "Build 2",
        type: "Workstation",
        specs: {
            cpu: "AMD Ryzen 5 5600X",
            gpu: "RX 6700 XT",
            ram: "16GB DDR4",
            storage: "1TB NVMe SSD"
        }
    },
    {
        id: 3,
        name: "Build 3",
        type: "Budget Gaming PC",
        specs: {
            cpu: "Intel i5-12400F",
            gpu: "RTX 3060",
            ram: "16GB DDR4",
            storage: "500GB SSD + 1TB HDD"
        }
    },
    {
        id: 4,
        name: "Build 4",
        type: "High-End Workstation",
        specs: {
            cpu: "AMD Ryzen 9 7950X",
            gpu: "RTX 4090",
            ram: "64GB DDR5",
            storage: "4TB NVMe SSD"
        }
    },
    {
        id: 5,
        name: "Build 5",
        type: "Gaming PC",
        specs: {
            cpu: "Intel i9-13900K",
            gpu: "RTX 4080",
            ram: "32GB DDR5",
            storage: "2TB NVMe + 2TB SSD"
        }
    },
    {
        id: 6,
        name: "Build 6",
        type: "Gaming PC",
        specs: {
            cpu: "AMD Ryzen 7 5800X3D",
            gpu: "RX 7800 XT",
            ram: "32GB DDR4",
            storage: "1TB NVMe SSD"
        }
    }
];

let selectedBuilds = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeCheckboxes();
    initializeComparisonButton();
    initializeHoverEffects();
    demonstrateArrayMethods();
});

function initializeCheckboxes() {
    const buildCards = document.querySelectorAll('.build-card');
    
    buildCards.forEach((card, index) => {
        const checkbox = card.querySelector('.checkbox');
        const buildId = index + 1;
        
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleBuildSelection(buildId, checkbox);
        });
    });
}

function toggleBuildSelection(buildId, checkbox) {
    const isSelected = selectedBuilds.includes(buildId);
    
    if (isSelected) {
        selectedBuilds = selectedBuilds.filter(id => id !== buildId);
        checkbox.style.backgroundColor = 'var(--secondary-color)';
    } else {
        if (selectedBuilds.length >= 2) {
            showNotification('Please select only 2 builds to compare. Deselect one first.');
            return;
        }
        selectedBuilds.push(buildId);
        checkbox.style.backgroundColor = 'var(--primary-color)';
    }
    
    updateComparisonButton();
}

function updateComparisonButton() {
    const button = document.querySelector('.comparison-button');
    
    if (selectedBuilds.length === 0) {
        button.textContent = 'Select 2 PCs to Compare';
    } else if (selectedBuilds.length === 1) {
        button.textContent = `Selected ${selectedBuilds.length} PC - Select 1 More`;
    } else {
        button.textContent = 'Compare Selected PCs';
    }
}

function initializeComparisonButton() {
    const button = document.querySelector('.comparison-button');
    button.textContent = 'Select 2 PCs to Compare';
    
    button.addEventListener('click', function() {
        if (selectedBuilds.length !== 2) {
            showNotification('Please select exactly 2 builds to compare.');
            return;
        }
        showComparison();
    });
}

function showComparison() {
    const build1 = pcBuilds.find(pc => pc.id === selectedBuilds[0]);
    const build2 = pcBuilds.find(pc => pc.id === selectedBuilds[1]);
    
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="comparison-content">
            <span class="close-modal">&times;</span>
            <h2>PC Comparison</h2>
            <div class="comparison-grid">
                <div class="comparison-column">
                    <h3>${build1.name}</h3>
                    <p class="pc-type">${build1.type}</p>
                    <div class="spec-list">
                        <p><strong>CPU:</strong> ${build1.specs.cpu}</p>
                        <p><strong>GPU:</strong> ${build1.specs.gpu}</p>
                        <p><strong>RAM:</strong> ${build1.specs.ram}</p>
                        <p><strong>Storage:</strong> ${build1.specs.storage}</p>
                    </div>
                </div>
                <div class="comparison-divider"></div>
                <div class="comparison-column">
                    <h3>${build2.name}</h3>
                    <p class="pc-type">${build2.type}</p>
                    <div class="spec-list">
                        <p><strong>CPU:</strong> ${build2.specs.cpu}</p>
                        <p><strong>GPU:</strong> ${build2.specs.gpu}</p>
                        <p><strong>RAM:</strong> ${build2.specs.ram}</p>
                        <p><strong>Storage:</strong> ${build2.specs.storage}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function initializeHoverEffects() {
    const buildCards = document.querySelectorAll('.build-card');
    
    buildCards.forEach((card, index) => {
        const buildId = index + 1;
        const pcType = pcBuilds[index].type;
        
        card.addEventListener('mouseenter', function() {
            showTypeNotification(card, pcType);
        });
        
        card.addEventListener('mouseleave', function() {
            removeTypeNotification(card);
        });
    });
}

function showTypeNotification(card, type) {
    const notification = document.createElement('div');
    notification.className = 'type-notification';
    notification.textContent = type;
    card.appendChild(notification);
}

function removeTypeNotification(card) {
    const notification = card.querySelector('.type-notification');
    if (notification) {
        notification.remove();
    }
}

function showNotification(message) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function demonstrateArrayMethods() {
    console.log('=== All PC Builds (forEach) ===');
    pcBuilds.forEach(build => {
        console.log(`${build.name}: ${build.type} - CPU: ${build.specs.cpu}`);
    });
    
    const cpuList = pcBuilds.map(build => build.specs.cpu);
    console.log('=== CPU List (map) ===');
    console.log(cpuList);
    
    const gamingPCs = pcBuilds.filter(build => build.type === "Gaming PC");
    console.log('=== Gaming PCs Only (filter) ===');
    console.log(gamingPCs);
    
    const typeCount = pcBuilds.reduce((acc, build) => {
        acc[build.type] = (acc[build.type] || 0) + 1;
        return acc;
    }, {});
    console.log('=== Build Count by Type (reduce) ===');
    console.log(typeCount);
    
    const ddr5Builds = pcBuilds.filter(build => build.specs.ram.includes('DDR5'));
    console.log('=== DDR5 Builds (filter) ===');
    console.log(ddr5Builds);
    
    return { cpuList, gamingPCs, typeCount, ddr5Builds };
}

function getBuildsByType(type) {
    return pcBuilds.filter(build => build.type === type);
}

function getAllGPUs() {
    return pcBuilds.map(build => build.specs.gpu);
}

function getAverageRAM() {
    const ramSizes = pcBuilds.map(build => {
        const ramAmount = parseInt(build.specs.ram);
        return ramAmount;
    });
    
    const total = ramSizes.reduce((sum, size) => sum + size, 0);
    return total / ramSizes.length;
}