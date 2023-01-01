# 타겟 넘버

```js
// 처음 해결한 방법
function solution(numbers, target) {
  let sums = [0];
  let answer = 0;
    
  for (let num of numbers) {
    sums = sums.reduce((ret, ele) => {
      ret.push(ele + num);
      ret.push(ele - num);
      return ret;
    }, []);
  }
  sums.forEach(num => num === target ? answer++ : null);
    
  return answer;
}
```
- 시간복잡도가 O(2^n) 나오는데 좋은 방법은 아닌 것 같다.

```js
// 다른 분 코드 참고해서 작성,, 
function solution(numbers, target) {
    let ret = 0;
    
    const dfs = (num, level) => {
        if (level === numbers.length) {
            if (num === target) {
                ret++;
            }
            return;
        }
        
        dfs(num + numbers[level], level+1);
        dfs(num - numbers[level], level+1);
    }
    dfs(numbers[0], 1);
    dfs(-numbers[0], 1);
    
    return ret;
}
```
- 확실히 recursive 로 푸는 것은 코드가 간단하게 나온다.
- recursive function 을 작성할 때 꼭!! **함수 종료 조건 작성**, **인자 변화** 신경 쓰자.