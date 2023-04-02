# Throttling Debouncing

동일하게 이벤트 처리를 최적화하기 위한 기법이지만 차이가 존재한다.

- Throttling : **일정 시간 간격 동안** 이벤트 처리를 최대 한 번만 실행하도록 제한한다.

- Debouncing : **연속된 이벤트 발생 후 일정 시간이 지난 후에** 한 번만 이벤트 처리를 실행하도록 한다.

## Throttling

```js
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}
function handleScrollEvent() {
  console.log("스크롤 이벤트 처리");
}

const throttledScrollHandler = throttle(handleScrollEvent, 200);

window.addEventListener("scroll", throttledScrollHandler);
```

## Debouncing

```js
function debounce(func, delay) {
  let debounceTimeout;
  return function (...args) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
}

const searchInput = document.getElementById("search-input");

function handleSearchInput() {
  console.log("검색어 처리:", searchInput.value);
}

const debouncedSearchHandler = debounce(handleSearchInput, 300);

searchInput.addEventListener("input", debouncedSearchHandler);
```
