function solution(s)
/* https://school.programmers.co.kr/learn/courses/30/lessons/12973
 * 
 * 연속된 2개의 문자를 제거하는 것인데 연속된 문자를 찾아서 제거하는 것으로 읽어서
 * 해결하는데 문제를 겪었었다... 
 * 
 * -> "문제를 잘 읽어야 한다"
 * 
 *  "stack" 으로 해결
 *  - 스택의 top 문자와 새로운 문자를 비교
 *    - 같으면 top 문자 pop()
 *    - 다르면 새로운 문자 push()   
 */
{
    // 문자열이 홀수인 경우 
    if (s.length % 2 === 1) return 0;

    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (!stack.length || stack[stack.length-1] !== s[i]) {
            stack.push(s[i]);
        }
        else {
            stack.pop();
        }
    }
    
    return !stack.length ? 1 : 0
}