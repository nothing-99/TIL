function solution(numbers=[4, 1, 2, 1], target=4) {
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
  };
  dfs(numbers[0], 1);
  dfs(-numbers[0], 1);
  
  return ret;
}
console.log(solution());