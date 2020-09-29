"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const TEXT_X = 120;
const TEXT_Y = 40;
const SECOND_TEXT_Y = 60;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const MAX_HEIGHT_BAR = 150;
const TIMES_HEIGHT = 160;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, TEXT_X, TEXT_Y);
  ctx.fillText(`Список результатов:`, TEXT_X, SECOND_TEXT_Y);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);
  renderText(ctx, `#000`);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + BAR_GAP + BAR_WIDTH + FONT_GAP + MAX_HEIGHT_BAR);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (TIMES_HEIGHT * times[i]) / maxTime - FONT_GAP * 2);
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(237, ${100 * Math.random()}%, 50%)`;
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (MAX_HEIGHT_BAR * times[i]) / maxTime - FONT_GAP * 2, BAR_WIDTH, (MAX_HEIGHT_BAR * times[i]) / maxTime);
    ctx.fillStyle = `#000`;
  }
};
