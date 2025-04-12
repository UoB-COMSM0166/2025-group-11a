class BannerManager {
    constructor() {
        this.banners = [];
        this.killCount = 0;
        this.killTimestamp = 0;
        this.previousLength = 5; // 初始蛇长度
        this.lastItemCheck = {}; // 上次道具状态检查结果
    }

    // 添加一个新的横幅提示
    addBanner(message, type = 'normal', duration = 3000, progress = null) {
        // 确定横幅位置（中央上部）
        const bannerY = 70; // 与得分和时间在同一高度
        const bannerHeight = 50; // 横幅高度（包括间距）

        // 创建新的横幅对象
        const banner = {
            message: message,
            type: type, // 类型: normal, kill, combo, length, item
            startTime: millis(),
            duration: duration,
            opacity: 0, // 初始透明度为0，实现淡入效果
            y: bannerY - 40, // 初始位置在稍高处，实现下滑动效
            targetY: bannerY, // 目标Y位置
            movingDown: false, // 标记是否正在向下移动（为其他横幅让路）
            progress: progress // 进度信息，用于道具倒计时
        };

        // 将现有横幅向下移动
        for (let i = 0; i < this.banners.length; i++) {
            const existingBanner = this.banners[i];
            // 计算新的目标位置
            existingBanner.targetY = bannerY + ((i+1) * bannerHeight);
            existingBanner.movingDown = true;
        }

        // 将新横幅添加到数组前面（这样新的横幅在顶部）
        this.banners.unshift(banner);

        // 如果是击杀信息，更新击杀计数
        if (type === 'kill') {
            const currentTime = millis();

            // 判断是否是连续击杀（10秒内）
            if (currentTime - this.killTimestamp < 10000) {
                this.killCount++;

                // 如果是第二次击杀，添加连击横幅
                if (this.killCount === 2) {
                    this.addBanner("DOUBLE KILL!", 'combo', 3500);
                } else if (this.killCount === 3) {
                    this.addBanner("TRIPLE KILL!", 'combo', 4000);
                } else if (this.killCount > 3) {
                    this.addBanner("MULTI KILL!", 'combo', 4500);
                }
            } else {
                // 超过10秒，重置计数
                this.killCount = 1;
            }

            this.killTimestamp = currentTime;
        }
    }

    // 更新和绘制所有横幅
    update() {
        push();
        resetMatrix(); // 重置矩阵，确保在屏幕坐标系中绘制

        // 更新并绘制所有横幅
        for (let i = this.banners.length - 1; i >= 0; i--) {
            const banner = this.banners[i];
            const elapsed = millis() - banner.startTime;

            // 计算动画参数
            if (elapsed < 500) {
                // 淡入和下滑阶段
                banner.opacity = map(elapsed, 0, 500, 0, 255);
                banner.y = map(elapsed, 0, 500, banner.y, banner.targetY);
            } else if (elapsed > banner.duration - 500) {
                // 淡出阶段
                banner.opacity = map(elapsed, banner.duration - 500, banner.duration, 255, 0);
            } else {
                // 显示阶段
                banner.opacity = 255;

                // 如果横幅需要移动，平滑过渡到目标位置
                if (banner.movingDown) {
                    // 平滑移动到目标位置
                    banner.y = lerp(banner.y, banner.targetY, 0.1);

                    // 当接近目标位置时，停止移动
                    if (Math.abs(banner.y - banner.targetY) < 1) {
                        banner.y = banner.targetY;
                        banner.movingDown = false;
                    }
                }
            }

            // 绘制横幅背景
            this.drawBannerBackground(banner);

            // 绘制横幅文本
            this.drawBannerText(banner);

            // 如果有进度条，绘制进度条
            if (banner.progress !== null) {
                this.drawProgressBar(banner);
            }

            // 移除超时的横幅
            if (elapsed > banner.duration) {
                this.banners.splice(i, 1);

                // 当一个横幅被移除时，更新其他横幅的目标位置
                this.updateBannerPositions();
            }
        }

        pop();
    }

    // 更新所有横幅的位置
    updateBannerPositions() {
        const bannerY = 70; // 初始Y位置
        const bannerHeight = 50; // 横幅高度（包括间距）

        for (let i = 0; i < this.banners.length; i++) {
            const banner = this.banners[i];
            banner.targetY = bannerY + (i * bannerHeight);
            banner.movingDown = true;
        }
    }

    // 绘制横幅背景
    drawBannerBackground(banner) {
        rectMode(CENTER);

        // 根据横幅类型选择颜色
        switch(banner.type) {
            case 'kill':
                fill(255, 0, 0, banner.opacity * 0.7); // 红色底
                break;
            case 'combo':
                fill(255, 50, 0, banner.opacity * 0.7); // 橙红色底
                break;
            case 'length':
                fill(50, 100, 255, banner.opacity * 0.7); // 蓝色底
                break;
            case 'item':
                fill(50, 200, 50, banner.opacity * 0.7); // 绿色底
                break;
            default:
                fill(0, 0, 0, banner.opacity * 0.7); // 黑色底
        }

        // 绘制背景矩形
        noStroke();
        rect(width/2, banner.y, 400, 40, 10);

        // 绘制边框
        strokeWeight(2);
        stroke(255, banner.opacity);
        noFill();
        rect(width/2, banner.y, 400, 40, 10);
    }

    // 绘制横幅文本
    drawBannerText(banner) {
        textAlign(CENTER, CENTER);
        textSize(22);
        noStroke();
        // 设置字体样式
        textFont('HelveticaRoundedLT-BlackObl');
        // 根据横幅类型选择文本颜色
        switch(banner.type) {
            case 'kill':
            case 'combo':
                fill(255, 255, 0, banner.opacity); // 黄色文字
                break;
            default:
                fill(255, banner.opacity); // 白色文字
        }

        // 绘制文本
        text(banner.message, width/2, banner.y);
    }


    // 绘制进度条
    drawProgressBar(banner) {
        // 进度条参数
        const barWidth = 350;
        const barHeight = 6;
        const xPos = width/2;
        const yPos = banner.y + 15;

        // 绘制进度条背景
        noStroke();
        fill(255, banner.opacity * 0.3);
        rectMode(CENTER);
        rect(xPos, yPos, barWidth, barHeight, 3);

        // 计算当前进度
        const progressWidth = barWidth * banner.progress;

        // 绘制进度条
        fill(255, banner.opacity);
        rectMode(CORNER);
        rect(xPos - barWidth/2, yPos - barHeight/2, progressWidth, barHeight, 3);
    }

    // 检查蛇长度变化并添加相应横幅
    checkSnakeLength(snake) {
        const currentLength = snake.body.length;

        // 检查是否达到特定长度
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

        // 更新之前的长度
        this.previousLength = currentLength;
    }

    // 添加AI蛇被击杀的横幅
    addKillBanner() {
        this.addBanner("SNAKE DEFEATED!", 'kill');
    }

    // 添加道具效果横幅
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

        // 对于有持续时间的道具，添加进度条
        if (itemType === "invincible" || itemType === "enlarge") {
            // 检查是否已经有相同类型的道具横幅
            for (let i = 0; i < this.banners.length; i++) {
                if (this.banners[i].itemType === itemType) {
                    // 如果已有相同类型的横幅，更新它
                    this.banners[i].progress = 1.0;
                    this.banners[i].startTime = millis(); // 重置开始时间
                    this.banners[i].duration = duration; // 重置持续时间
                    this.banners[i].totalDuration = duration; // 重置总持续时间
                    return;
                }
            }

            // 如果没有相同类型的横幅，创建新的
            const bannerY = 70; // 与得分和时间在同一高度
            const bannerHeight = 50; // 横幅高度（包括间距）

            // 新横幅将在顶部，现有横幅向下移动
            for (let i = 0; i < this.banners.length; i++) {
                const existingBanner = this.banners[i];
                existingBanner.targetY = bannerY + ((i+1) * bannerHeight);
                existingBanner.movingDown = true;
            }

            const banner = {
                message: message,
                type: 'item',
                startTime: millis(),
                duration: duration, // 与道具持续时间相同
                opacity: 0,
                y: 70 - 40,
                targetY: bannerY,
                progress: 1.0, // 初始进度为100%
                totalDuration: duration, // 总持续时间
                itemType: itemType, // 记录道具类型
                movingDown: false
            };

            this.banners.unshift(banner);
        } else {
            // 对于无持续时间的道具，使用普通横幅
            this.addBanner(message, 'item');
        }
    }

    // 更新道具效果进度条
    updateItemProgress() {
        for (const banner of this.banners) {
            if (banner.type === 'item' && banner.itemType) {
                const elapsed = millis() - banner.startTime;

                // 如果是无敌道具
                if (banner.itemType === "invincible" && playerSnake.isInvincible) {
                    banner.progress = playerSnake.invincibleDuration / 180;
                    banner.duration = banner.totalDuration; // 重置持续时间以保持显示

                    // 如果无敌结束，让横幅消失
                    if (playerSnake.invincibleDuration <= 0) {
                        banner.duration = millis() - banner.startTime + 500; // 设置500ms后消失
                    }
                }

                // 如果是范围扩大道具
                else if (banner.itemType === "enlarge" && playerSnake.isEnlarged) {
                    banner.progress = playerSnake.enlargeDuration / 180;
                    banner.duration = banner.totalDuration; // 重置持续时间以保持显示

                    // 如果效果结束，让横幅消失
                    if (playerSnake.enlargeDuration <= 0) {
                        banner.duration = millis() - banner.startTime + 500; // 设置500ms后消失
                    }
                }
            }
        }
    }

    // 检查道具状态变化
    checkItemStatus(playerSnake) {
        // 检查无敌状态
        if (playerSnake.isInvincible && !this.lastItemCheck.invincible && !playerSnake.isInitialInvincibility) {
            this.addItemBanner("invincible", 6000);
            this.lastItemCheck.invincible = true;
        } else if (!playerSnake.isInvincible && this.lastItemCheck.invincible) {
            this.lastItemCheck.invincible = false;
        }

        // 检查范围扩大状态
        if (playerSnake.isEnlarged && !this.lastItemCheck.enlarged) {
            this.addItemBanner("enlarge", 6000);
            this.lastItemCheck.enlarged = true;
        } else if (!playerSnake.isEnlarged && this.lastItemCheck.enlarged) {
            this.lastItemCheck.enlarged = false;
        }
    }
}