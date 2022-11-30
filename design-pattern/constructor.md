# Constructor

아무 생각없이 썼던 `class - constructor` 가 **constructor pattern** 이라고 한다...

> ES2015에서 클래스가 추가되면서 Javascript도 클래스 인스턴스를 통한 객체 생성이 가능하게 됨.

```js
class Nft {
  constructor(name, chain, supply) {
    this.name = name;
    this.chain = chain;
    this.supply = supply;
  }
  toString() {
    return `${this.supply} ${this.name} is supplied on ${this.chain}`;
  }
}

const rayc = new Nft('rare apepe yc', 'ethereum', 10000);
const mk = new Nft('meta kongz', 'klaytn', 10000);
const bm = new Nft('bitcoin monkey', 'stacks', 2500);

console.log(rayc.toString());
console.log(mk.toString());
console.log(bm.toString());
// 10000 rare apepe yc is supplied on ethereum
// 10000 meta kongz is supplied on klaytn
// 2500 bitcoin monkey is supplied on stacks
```

`prototype`을 이용해서 클래스의 인스턴스들이 모두 사용할 수 있는 메서드를 추가해볼 수 있다. 새로운 메서드를 추가하는 것은 클래스 원본에 추가하면 될 것 같은데 동적으로 이것을 해야하는 경우가 있을까? 궁금하다. ~~js prototype 에 대해서 공부해야 겠다. 재밌을 것 같음~~
```js
Nft.prototype.setName = function(name) {
  this.name = name;
}
rayc.setName('zombie apepe yc');
mk.setName('baby kongz');
bm.setName('mutant monkey');
console.log(rayc);
console.log(mk);
console.log(bm);
// Nft {name: 'zombie apepe yc', chain: 'ethereum', supply: 10000}
// Nft {name: 'baby kongz', chain: 'klaytn', supply: 10000}
// Nft {name: 'mutant monkey', chain: 'stacks', supply: 2500}
```

## 참조
- https://www.patterns.dev/posts/classic-design-patterns/#singletonpatternjavascript
- https://www.devh.kr/2021/Design-Patterns-In-JavaScript/

[README](./README.md)