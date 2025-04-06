class BannerManager {
    constructor() {
        this.banners = []; // 存储当前显示的横幅
        this.displayTime = 120; // 普通横幅显示时间（帧数）
    }

    // 添加横幅提示
    addBanner(message, type = 'normal', duration = null, maxDuration = null) {
        // 类型：normal（普通消息）, achievement（成就）, warning（警告）, buff（道具效果）

        // 为buff类型设置特殊的生命周期，与道具持续时间相同
        let bannerLife = this.displayTime;
        if (type === 'buff' && duration !== null && maxDuration !== null) {
            bannerLife = maxDuration; // 设置为道具的最大持续时间
        }

        this.banners.push({
            message: message,
            type: type,
            life: bannerLife,
            opacity: 0,
            y: -50, // 起始位置在屏幕外
            targetY: 40, // 目标位置
            duration: duration, // 道具剩余时间（如果有）
            maxDuration: maxDuration, // 道具最大持续时间（如果有）
            isBuff: (type === 'buff' && duration !== null) // 标记是否为有持续时间的buff横幅
        });
    }

    // 更新所有横幅状态
    update() {
        for (let i = this.banners.length - 1; i >= 0; i--) {
            let banner = this.banners[i];

            // 对于buff横幅，不使用常规的生命周期递减逻辑
            if (banner.isBuff) {
                // 如果是buff横幅，生命周期与道具持续时间保持一致
                banner.life = banner.duration;

                // 当buff效果结束时移除横幅
                if (banner.life <= 0) {
                    this.banners.splice(i, 1);
                    continue;
                }

                // 淡入阶段（只有开始的30帧）
                if (banner.maxDuration - banner.life < 30) {
                    banner.opacity = map(banner.maxDuration - banner.life, 0, 30, 0, 255);
                    banner.y = lerp(banner.y, banner.targetY, 0.1);
                } else {
                    banner.opacity = 255;
                }
            } else {
                // 常规横幅的处理逻辑不变
                // 淡入阶段
                if (banner.life > this.displayTime - 30) {
                    banner.opacity = map(banner.life, this.displayTime, this.displayTime - 30, 0, 255);
                    banner.y = lerp(banner.y, banner.targetY, 0.1);
                }
                // 显示阶段
                else if (banner.life > 30) {
                    banner.opacity = 255;
                }
                // 淡出阶段
                else {
                    banner.opacity = map(banner.life, 0, 30, 0, 255);
                    banner.y = lerp(banner.y, -50, 0.05);
                }

                banner.life--;

                // 移除生命周期结束的横幅
                if (banner.life <= 0) {
                    this.banners.splice(i, 1);
                }
            }
        }
    }

    // 更新特定道具效果的持续时间
    updateDuration(type, duration) {
        for (let banner of this.banners) {
            if (banner.type === 'buff' && banner.message.includes(type)) {
                banner.duration = duration;
            }
        }
    }

    // 绘制所有横幅
    draw() {
        push();
        resetMatrix(); // 重置变换，确保横幅固定在屏幕位置
        textAlign(CENTER, CENTER);
        textFont('Press Start 2P', 16);

        for (let i = 0; i < this.banners.length; i++) {
            let banner = this.banners[i];
            let y = banner.y + i * 60; // 多条消息时垂直排列

            // 根据类型设置样式
            switch (banner.type) {
                case 'achievement':
                    this.drawAchievementBanner(banner.message, y, banner.opacity);
                    break;
                case 'warning':
                    this.drawWarningBanner(banner.message, y, banner.opacity);
                    break;
                case 'buff':
                    this.drawBuffBanner(banner.message, y, banner.opacity, banner.duration, banner.maxDuration);
                    break;
                default:
                    this.drawNormalBanner(banner.message, y, banner.opacity);
            }
        }
        pop();
    }

    // 绘制普通横幅
    drawNormalBanner(message, y, opacity) {
        // 横幅背景
        fill(50, 50, 50, opacity * 0.8);
        stroke(100, 100, 255, opacity);
        strokeWeight(3);
        rect(width / 2 - 200, y - 20, 400, 40, 10);

        // 文字
        noStroke();
        fill(255, 255, 255, opacity);
        text(message, width / 2, y);
    }

    // 绘制成就横幅
    drawAchievementBanner(message, y, opacity) {
        // 横幅背景
        fill(50, 50, 80, opacity * 0.9);
        stroke(255, 215, 0, opacity); // 金色边框
        strokeWeight(3);
        rect(width / 2 - 220, y - 20, 440, 40, 10);

        // 成就图标
        fill(255, 215, 0, opacity);
        noStroke();
        let iconX = width / 2 - 190;
        let iconY = y;
        this.star(iconX, iconY, 8, 15, 5); // 绘制星星图标

        // 文字
        textAlign(CENTER, CENTER);
        fill(255, 255, 255, opacity);
        text(message, width / 2, y);
    }

    // 绘制警告横幅
    drawWarningBanner(message, y, opacity) {
        // 横幅背景
        fill(80, 30, 30, opacity * 0.9);
        stroke(255, 50, 50, opacity);
        strokeWeight(3);
        rect(width / 2 - 200, y - 20, 400, 40, 10);

        // 警告图标
        fill(255, 50, 50, opacity);
        noStroke();
        let iconX = width / 2 - 180;
        let iconY = y;
        triangle(
            iconX - 10, iconY + 10,
            iconX, iconY - 10,
            iconX + 10, iconY + 10
        );
        fill(80, 30, 30);
        ellipse(iconX, iconY + 5, 4, 4);

        // 文字
        textAlign(CENTER, CENTER);
        fill(255, 255, 255, opacity);
        text(message, width / 2, y);
    }

    // 绘制道具效果横幅（添加进度条）
    drawBuffBanner(message, y, opacity, duration, maxDuration) {
        // 横幅背景
        fill(30, 80, 30, opacity * 0.9);
        stroke(50, 255, 50, opacity);
        strokeWeight(3);
        rect(width / 2 - 200, y - 20, 400, 40, 10);

        // 道具图标
        fill(100, 255, 100, opacity);
        noStroke();
        let iconX = width / 2 - 180;
        let iconY = y;
        ellipse(iconX, iconY, 20, 20);
        fill(30, 80, 30);
        ellipse(iconX, iconY, 10, 10);

        // 文字
        textAlign(CENTER, CENTER);
        fill(255, 255, 255, opacity);
        text(message, width / 2, y);

        // 如果有持续时间信息，绘制进度条
        if (duration !== null && maxDuration !== null) {
            // 进度条背景
            noStroke();
            fill(30, 30, 30, opacity * 0.7);
            rect(width / 2 - 180, y + 15, 360, 6, 3);

            // 进度条填充
            let progressWidth = map(duration, 0, maxDuration, 0, 360);
            fill(100, 255, 100, opacity);
            rect(width / 2 - 180, y + 15, progressWidth, 6, 3);

            // 显示剩余秒数（假设30帧/秒）
            textSize(10);
            textAlign(RIGHT, CENTER);
            let secondsLeft = Math.ceil(duration / 30);
            text(secondsLeft + "秒", width / 2 + 195, y + 15);
        }
    }

    // 清除所有横幅
    clearBanners() {
        this.banners = [];
    }

    // 绘制星星形状
    star(x, y, radius1, radius2, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius2;
            let sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}