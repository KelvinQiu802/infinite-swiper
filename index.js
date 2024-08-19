const images = [
  'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
  'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
  'https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w',
  'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
  'https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o',
];

const imageContainer = document.getElementById('image-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

images.forEach((image) => {
  const img = document.createElement('img');
  img.src = image;
  imageContainer.appendChild(img);
});

// 在开头插入最后一张图片，再结尾插入第一张图片
const lastImage = document.createElement('img');
lastImage.src = images[images.length - 1];
imageContainer.insertBefore(lastImage, imageContainer.firstChild);
const firstImage = document.createElement('img');
firstImage.src = images[0];
imageContainer.appendChild(firstImage);

let index = 0;
imageContainer.children[index + 1].classList.add('active');

function moveTo(index) {
  imageContainer.style.transform = `translateX(calc((-100% - var(--image-gap)) * ${
    index + 1
  }))`;
}

// Auto Scrool
// setInterval(moveToNext, 2000);

function moveToNext() {
  if (index === images.length - 1) {
    imageContainer.style.transition = 'none';
    moveTo(-1);
    imageContainer.clientHeight; // 强制重绘
    imageContainer.style.transition = 'transform 0.3s';
    index = 0;
    moveTo(index);
  } else {
    moveTo(++index);
  }
}

nextButton.addEventListener('click', () => {
  imageContainer.children[index + 1].classList.remove('active');
  if (index !== images.length - 1) {
    moveTo(++index);
  } else {
    imageContainer.style.transition = 'none';
    moveTo(-1);
    imageContainer.clientHeight; // 强制重绘
    imageContainer.style.transition = 'transform 0.3s';
    index = 0;
    moveTo(index);
  }
  imageContainer.children[index + 1].classList.add('active');
});

prevButton.addEventListener('click', () => {
  imageContainer.children[index + 1].classList.remove('active');
  if (index !== 0) {
    moveTo(--index);
  } else {
    imageContainer.style.transition = 'none';
    moveTo(images.length);
    imageContainer.clientHeight; // 强制重绘
    imageContainer.style.transition = 'transform 0.3s';
    index = images.length - 1;
    moveTo(index);
  }
  imageContainer.children[index + 1].classList.add('active');
});
