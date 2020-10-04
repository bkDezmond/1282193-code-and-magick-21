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
const WHITE_COLOR = `#fff`;
const BLACK_COLOR = `#000`;
const BLACK_OPACITY = `rgba(0, 0, 0, 0.7)`;
const RED_COLOR = `rgba(255, 0, 0, 1)`;
const NICKNAME = `Вы`;

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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, BLACK_OPACITY);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
  renderText(ctx, BLACK_COLOR);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    const xCoordinate = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    const heightForTime = (MAX_HEIGHT_BAR * times[i]) / maxTime;
    const randomColor = `hsl(237, ${100 * Math.random()}%, 50%)`;

    ctx.fillText(
      names[i],
      xCoordinate,
      CLOUD_Y + BAR_GAP + BAR_WIDTH + FONT_GAP + MAX_HEIGHT_BAR
    );
    ctx.fillText(
      Math.round(times[i]),
      xCoordinate,
      CLOUD_HEIGHT - (TIMES_HEIGHT * times[i]) / maxTime - FONT_GAP * 2
    );
    ctx.fillStyle = names[i] === NICKNAME ? RED_COLOR : randomColor;
    ctx.fillRect(
      xCoordinate,
      CLOUD_HEIGHT - heightForTime - FONT_GAP * 2,
      BAR_WIDTH,
      heightForTime
    );
    ctx.fillStyle = BLACK_COLOR;
  }
};
