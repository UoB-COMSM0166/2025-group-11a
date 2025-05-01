class BannerManager {
    constructor() {
        this.banners = [];
        this.killCount = 0;
        this.killTimestamp = 0;
        this.previousLength = 5; 
        this.lastItemCheck = {}; 
        this.maxBanners = 4;
    }

    addBanner(message, type = 'normal', duration = 3000, progress = null) {
        const bannerY = 70; 
        const bannerHeight = 50; 
        const banner = {
            message: message,
            type: type, // type: normal, kill, combo, length, item
            startTime: millis(),
            duration: duration,
            opacity: 0,
            y: bannerY - 40,
            targetY: bannerY,
            movingDown: false,
            progress: progress
        };

        // move existing banners down, new banner will be at the top
        for (let i = 0; i < this.banners.length; i++) {
            const existingBanner = this.banners[i];
            existingBanner.targetY = bannerY + ((i+1) * bannerHeight);
            existingBanner.movingDown = true;
        }

        // limit the number of banners
        if (this.banners.length >= this.maxBanners) {
            this.banners.pop();
        }
        
        this.banners.unshift(banner);

        // kill banner
        if (type === 'kill') {
            const gameTime = millis();

            // check for consecutive kills within 10 seconds
            if (gameTime - this.killTimestamp < 10000) {
                this.killCount++;
                if (this.killCount === 2) {
                    this.addBanner("DOUBLE KILL!", 'combo', 3500);
                } else if (this.killCount === 3) {
                    this.addBanner("TRIPLE KILL!", 'combo', 4000);
                } else if (this.killCount > 3) {
                    this.addBanner("MULTI KILL!", 'combo', 4500);
                }
            } else {
                this.killCount = 1;
            }
            this.killTimestamp = gameTime;
        }
    }

    update() {
        push();
        resetMatrix();

        for (let i = this.banners.length - 1; i >= 0; i--) {
            const banner = this.banners[i];
            const elapsed = millis() - banner.startTime;

            if (elapsed < 500) {
                // fade-in and decline phase
                banner.opacity = map(elapsed, 0, 500, 0, 200);
                banner.y = map(elapsed, 0, 500, banner.y, banner.targetY);
            } else if (elapsed > banner.duration - 500) {
                // fade-out phase
                banner.opacity = map(elapsed, banner.duration - 500, banner.duration, 200, 0);
            } else {
                // show phase
                banner.opacity = 200;

                if (banner.movingDown) {
                    banner.y = lerp(banner.y, banner.targetY, 0.1);
                    if (Math.abs(banner.y - banner.targetY) < 1) {
                        banner.y = banner.targetY;
                        banner.movingDown = false;
                    }
                }
            }

            this.drawBannerBackground(banner);
            this.drawBannerText(banner);
            if (banner.progress !== null) {
                this.drawProgressBar(banner);
            }
            if (elapsed > banner.duration) {
                this.banners.splice(i, 1);
                this.updateBannerPositions();
            }
        }

        pop();
    }

    updateBannerPositions() {
        const bannerY = 70; 
        const bannerHeight = 50; 

        for (let i = 0; i < this.banners.length; i++) {
            const banner = this.banners[i];
            banner.targetY = bannerY + (i * bannerHeight);
            banner.movingDown = true;
        }
    }

    drawBannerBackground(banner) {
        rectMode(CENTER);
        switch(banner.type) {
            case 'kill':
                fill(255, 0, 0, banner.opacity * 0.7);
                break;
            case 'combo':
                fill(255, 50, 0, banner.opacity * 0.7); 
                break;
            case 'length':
                fill(50, 100, 255, banner.opacity * 0.7); 
                break;
            case 'item':
                fill(50, 200, 50, banner.opacity * 0.7);
                break;
            default:
                fill(0, 0, 0, banner.opacity * 0.7);
        }

        noStroke();
        rect(width/2, banner.y, 400, 40, 10);
        strokeWeight(2);
        stroke(255, banner.opacity);
        noFill();
        rect(width/2, banner.y, 400, 40, 10);
    }

    drawBannerText(banner) {
        textAlign(CENTER, CENTER);
        textSize(22);
        noStroke();
        textFont('HelveticaRoundedLT-BlackObl');
        switch(banner.type) {
            case 'kill':
            case 'combo':
                fill(255, 255, 0, banner.opacity);
                break;
            default:
                fill(255, banner.opacity);
        }
        text(banner.message, width/2, banner.y);
    }

    drawProgressBar(banner) {
        const barWidth = 350;
        const barHeight = 6;
        const xPos = width/2;
        const yPos = banner.y + 15;
        const progressWidth = barWidth * banner.progress;

        noStroke();
        fill(255, banner.opacity * 0.3);
        rectMode(CENTER);
        rect(xPos, yPos, barWidth, barHeight, 3);

        fill(255, banner.opacity);
        rectMode(CORNER);
        rect(xPos - barWidth/2, yPos - barHeight/2, progressWidth, barHeight, 3);
    }

    checkSnakeLength(snake) {
        const currentLength = snake.body.length;

        if (currentLength >= 10 && this.previousLength < 10) {
            this.addBanner("LENGTH MILESTONE: 10!", 'length');
        } else if (currentLength >= 15 && this.previousLength < 15) {
            this.addBanner("LENGTH MILESTONE: 15!", 'length');
        } else if (currentLength >= 20 && this.previousLength < 20) {
            this.addBanner("LENGTH MILESTONE: 20!", 'length');
        } else if (currentLength >= 30 && this.previousLength < 30) {
            this.addBanner("LENGTH MILESTONE: 30!", 'length');
        } else if (currentLength >= 50 && this.previousLength < 50) {
            this.addBanner("AMAZING LENGTH: 50!", 'length');
        }

        this.previousLength = currentLength;
    }

    addKillBanner() {
        this.addBanner("SNAKE DEFEATED!", 'kill');
    }

    addItemBanner(itemType, duration) {
        let message = "";

        switch(itemType) {
            case "invincible":
                message = "INVINCIBILITY ACTIVE!";
                break;
            case "stamina":
                message = "STAMINA RESTORED!";
                break;
            case "enlarge":
                message = "FOOD DETECTION ENHANCED!";
                break;
            default:
                message = "ITEM ACTIVATED!";
        }

        if (itemType === "invincible" || itemType === "enlarge") {
            // for props with a duration, check if the same type of banner already exists
            for (let i = 0; i < this.banners.length; i++) {
                if (this.banners[i].itemType === itemType) {
                    // if the same type of banner already exists, reset its duration
                    this.banners[i].progress = 1.0;
                    this.banners[i].startTime = millis();
                    this.banners[i].duration = duration;
                    this.banners[i].totalDuration = duration;
                    return;
                }
            }

            // for props with a duration, create a new banner
            const bannerY = 70; 
            const bannerHeight = 50;

            for (let i = 0; i < this.banners.length; i++) {
                const existingBanner = this.banners[i];
                existingBanner.targetY = bannerY + ((i+1) * bannerHeight);
                existingBanner.movingDown = true;
            }

            const banner = {
                message: message,
                type: 'item',
                startTime: millis(),
                duration: duration,
                opacity: 0,
                y: 70 - 40,
                targetY: bannerY,
                progress: 1.0,
                totalDuration: duration,
                itemType: itemType,
                movingDown: false
            };

            if (this.banners.length >= this.maxBanners) {
                this.banners.pop();
            }

            this.banners.unshift(banner);
        } else {
            // for props without a duration, just add a normal banner
            this.addBanner(message, 'item');
        }
    }

    updateItemProgress() {
        for (const banner of this.banners) {
            if (banner.type === 'item' && banner.itemType) {
                const elapsed = millis() - banner.startTime;

                // invincible item
                if (banner.itemType === "invincible" && playerSnake.isInvincible) {
                    banner.progress = playerSnake.invincibleDuration / 180;
                    banner.duration = banner.totalDuration;
                    // if the effect ends, let the banner disappear
                    if (playerSnake.invincibleDuration <= 0) {
                        banner.duration = millis() - banner.startTime + 500;
                    }
                }

                // enlarge item
                else if (banner.itemType === "enlarge" && playerSnake.isEnlarged) {
                    banner.progress = playerSnake.enlargeDuration / 180;
                    banner.duration = banner.totalDuration;
                    if (playerSnake.enlargeDuration <= 0) {
                        banner.duration = millis() - banner.startTime + 500;
                    }
                }
            }
        }
    }

    checkItemStatus(playerSnake) {
        // invincible status
        if (playerSnake.isInvincible && !this.lastItemCheck.invincible && !playerSnake.isInitialInvincibility) {
            this.addItemBanner("invincible", 6000);
            this.lastItemCheck.invincible = true;
        } else if (!playerSnake.isInvincible && this.lastItemCheck.invincible) {
            this.lastItemCheck.invincible = false;
        }

        // enlarge status
        if (playerSnake.isEnlarged && !this.lastItemCheck.enlarged) {
            this.addItemBanner("enlarge", 6000);
            this.lastItemCheck.enlarged = true;
        } else if (!playerSnake.isEnlarged && this.lastItemCheck.enlarged) {
            this.lastItemCheck.enlarged = false;
        }
    }
}