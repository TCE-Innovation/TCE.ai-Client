const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const storageManager = {
    /**
     * Estimate current storage usage
     * @returns {Promise<{usage: number, quota: number, percentUsed: number}>}
     */
    async checkStorageUsed() {
        // Get localStorage usage regardless of Storage API availability
        let localStorageUsage = 0;
        try {
            // Only count our savedCalculations key
            const savedCalculations = localStorage.getItem('savedCalculations');
            if (savedCalculations) {
                // Add the size of the key name
                localStorageUsage = 'savedCalculations'.length * 2;
                // Add the size of the value with proper encoding consideration
                localStorageUsage += savedCalculations.length * 2; // UTF-16 uses 2 bytes per char
            }
        } catch (e) {
            console.error("Error measuring localStorage usage", e);
        }

        // Always use our defined limit, not the browser's limit
        return {
            usage: localStorageUsage,
            quota: MAX_STORAGE_SIZE,
            percentUsed: (localStorageUsage / MAX_STORAGE_SIZE) * 100
        };
    },

    /**
     * Check if storage is runing low (over 80% usage)
     * @returns {Promise<boolean>}
     */
    async isStorageLow() {
        const { percentUsed } = await this.checkStorageUsed();
        return percentUsed > 80;
    },

    /**
     * Calculate size of an object in bytes (more accurate)
     * @param {Object} object 
     * @returns {number} Size in bytes
     */
    getObjectSize(object) {
        const jsonString = JSON.stringify(object);
        
        // Calculate key size (since we're storing in localStorage)
        const keySize = 'savedCalculations'.length * 2; // UTF-16 encoding
        
        // Calculate value size
        const valueSize = jsonString.length * 2; // UTF-16 encoding
        
        // Add some overhead for JSON structure
        return keySize + valueSize;
    },

    /**
     * Save calculations safely with size checks
     * @param {Array} calculations Array of calculation objects
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async saveCalculations(calculations) {
        try {
            // Check object size before saving
            const dataSize = this.getObjectSize(calculations);

            // Check if we have enough space
            const { usage, quota } = await this.checkStorageUsed();
            const availableSpace = quota - usage;

            // Account for the size of existing savedCalculations that will be replaced
            let existingSize = 0;
            const existingData = localStorage.getItem('savedCalculations');
            if (existingData) {
                existingSize = existingData.length * 2; // UTF-16 uses 2 bytes per char
            }

            // Calculate actual remaining space by accounting for replacement
            const remainingSpace = quota - (usage - existingSize);

            if (dataSize > remainingSpace) {
                console.warn("Storage space low. Starting cleanup process.");
                return {
                    success: false,
                    message: "Not enough storage space available"
                };
            }

            // Save to localStorage
            localStorage.setItem('savedCalculations', JSON.stringify(calculations));
            
            // Notify service worker on save
            this.notifyServiceWorker();
            
            // Trigger storage update event
            this.triggerStorageUpdateEvent();
            
            return {
                success: true,
                message: "Calculations saved successfully"
            };
        } catch (error) {
            console.error("Storage error:", error);

            // Handle quota exceeded error
            if (error.name === 'QuotaExceededError' || error.code === 22) {
                return {
                    success: false,
                    message: "Storage quota exceeded. Please delete some saved calculations."
                };
            }

            return {
                success: false,
                message: "Failed to save calculations"
            };
        }
    },

    /**
     * Implements a storage cleanup strategy when space is low
     * @returns {Promise<{success: boolean, freedBytes: number}>}
     */
    async performStorageCleanup() {
        // Get calculations from localStorage
        const savedCalculationsString = localStorage.getItem('savedCalculations');
        if (!savedCalculationsString) {
            return { success: false, freedBytes: 0 };
        }

        const savedCalculations = JSON.parse(savedCalculationsString);
        if (savedCalculations.length <= 1) {
            return { success: false, freedBytes: 0 };
        }

        // Sort by date (oldest first)
        savedCalculations.sort((a, b) =>
            new Date(a.timestamp) - new Date(b.timestamp)
        );

        // Remove oldest entries until we're down to 50% of original size
        const originalSize = this.getObjectSize(savedCalculations);
        const targetSize = originalSize * 0.5;
        let currentSize = originalSize;
        let removedCount = 0;

        while (currentSize > targetSize && removedCount < savedCalculations.length - 1) {
            const removed = savedCalculations.shift(); // Remove oldest
            removedCount++;
            currentSize -= this.getObjectSize(savedCalculations);
        }

        // Save reduced list back to storage
        localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));

        return { 
            success: true,
            freedBytes: originalSize - currentSize,
            removedCount
        };
    },

    /**
     * Automatically prune old calculations when storage is almost low
     * @returns {Promise<{success: boolean, prunedCount: number}>}
     */
    async pruneOldCalculations() {
        const isLow = await this.isStorageLow();
        if (!isLow) {
            return { success: false, prunedCount: 0 };
        }

        try {
            const savedCalculationsString = localStorage.getItem('savedCalculations');
            if (!savedCalculationsString) { 
                return { success: false, prunedCount: 0 };
            }

            const savedCalculations = JSON.parse(savedCalculationsString);

            if (savedCalculations.length <= 10) {
                return { success: false, prunedCount: 0 };
            }

            // Keep only the 10 most recent calculations
            savedCalculations.sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );

            const pruneCount = savedCalculations.length - 10;
            const prunedCalculations = savedCalculations.slice(0, 10);

            localStorage.setItem('savedCalculations', JSON.stringify(prunedCalculations));

            return {
                success: true,
                prunedCount: pruneCount
            };
        } catch (error) {
            console.error("Error pruning calculations:", error);
            return { success: false, prunedCount: 0 };
        }
    },

    /**
     * Notify service worker about storage changes
     * @returns {void}
     */
    notifyServiceWorker() {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'STORAGE_UPDATED',
                timestamp: new Date().getTime()
            });
        }
    },

    /**
     * Trigger storage update events
     * This helps keep the UI in sync with storage changes
     */
    triggerStorageUpdateEvent() {
        // Create a custom event that components can listen for
        const event = new CustomEvent('storageUpdate', {
            detail: {
                key: 'savedCalculations',
                timestamp: new Date().getTime()
            }
        });
        window.dispatchEvent(event);
    }
};